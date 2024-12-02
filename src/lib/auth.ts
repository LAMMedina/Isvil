// src/lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '@lib/db';

const JWT_SECRET = import.meta.env.JWT_SECRET || 'your-secret-key';

export async function login(email: string, password: string) {
  console.log(`Attempting login for email: ${email}`);
  
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email]
  });
  
  const user = result.rows[0];
  if (!user) {
    console.log('User not found');
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, String(user.password));
  if (!isValid) {
    console.log('Invalid password');
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  console.log('Login successful, token generated');
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, role: string };
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [decoded.userId]
    });
    const user = result.rows[0];
    if (!user) throw new Error('User not found');
    return user as unknown as User;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error);
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('Invalid token:', error);
      throw new Error('Invalid token');
    }
    console.error('Token verification error:', error);
    throw new Error('Token verification failed');
  }
}

