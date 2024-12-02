// src/pages/api/users/index.ts
import type { APIRoute } from 'astro';
import db from '@lib/db';
import bcrypt from 'bcryptjs';

export const GET: APIRoute = async ({ request }) => {
  const result = await db.execute('SELECT id, email, name, role FROM users');
  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  // Validar que los campos no estén vacíos
  if (!body.email || !body.name || !body.password || !body.role) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  // Verificar si el correo electrónico ya existe
  const existingUser = await db.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: [body.email]
  });

  if (existingUser.rows.length > 0) {
    return new Response(JSON.stringify({ error: 'Email already in use' }), { status: 409 });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const result = await db.execute({
      sql: 'INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)',
      args: [body.email, body.name, hashedPassword, body.role]
    });

    return new Response(JSON.stringify({ id: result.lastInsertRowid, email: body.email, name: body.name, role: body.role }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
};
