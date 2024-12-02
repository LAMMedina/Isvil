import type { APIRoute } from 'astro';
import db from '@lib/db';

export const GET: APIRoute = async ({ request }) => {
  const result = await db.execute('SELECT * FROM categories');

  const categories = result.rows.map((row) => ({
    ...row,
    id: row.id.toString(), // Convierte `BigInt` a `string`
  }));


  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const result = await db.execute({
    sql: 'INSERT INTO categories (name) VALUES (?)',
    args: [body.name]
  });
  return new Response(JSON.stringify({ id: result.lastInsertRowid.toString(), name: body.name }), {
    status: 201,
    headers: {
      "Content-Type": "application/json"
    }
  });
};