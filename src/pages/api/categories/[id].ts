import type { APIRoute } from 'astro';
import db from '@lib/db';

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    // Verificar si la categoría existe antes de intentar eliminar
    const categoryCheck = await db.execute({
      sql: 'SELECT id FROM categories WHERE id = ?',
      args: [id]
    });

    if (categoryCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    await db.execute({
      sql: 'DELETE FROM categories WHERE id = ?',
      args: [id]
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const { name } = await request.json();

  try {
    // Verificar si la categoría existe antes de intentar actualizar
    const categoryCheck = await db.execute({
      sql: 'SELECT id FROM categories WHERE id = ?',
      args: [id]
    });

    if (categoryCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    await db.execute({
      sql: 'UPDATE categories SET name = ? WHERE id = ?',
      args: [name, id]
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 500 });
  }
};

