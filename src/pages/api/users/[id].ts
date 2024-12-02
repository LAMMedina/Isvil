// src/pages/api/users/[id].ts
import type { APIRoute } from 'astro';
import db from '@lib/db';

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    // Verificar si el usuario existe antes de intentar eliminar
    const userCheck = await db.execute({
      sql: 'SELECT id FROM users WHERE id = ?',
      args: [id]
    });

    if (userCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [id]
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();

  try {
    // Verificar si el usuario existe antes de intentar actualizar
    const userCheck = await db.execute({
      sql: 'SELECT id FROM users WHERE id = ?',
      args: [id]
    });

    if (userCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await db.execute({
      sql: 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      args: [body.name, body.email, body.role, id]
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
};
