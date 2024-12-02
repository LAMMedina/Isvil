import type { APIRoute } from 'astro';
import db from '@lib/db';
import { uploadImage, deleteImage } from '@lib/cloudinary';

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  if (isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'ID de producto inválido' }), { status: 400 });
  }

  try {
    const productResult = await db.execute({
      sql: 'SELECT image_url FROM products WHERE id = ?',
      args: [id]
    });

    if (productResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
    }

    const imageUrl = productResult.rows[0].image_url;

    const result = await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id]
    });

    if (result.rowsAffected > 0 && imageUrl) {
      await deleteImage(imageUrl as string);
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar el producto', detalles: error.message }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  
  if (isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'ID de producto inválido' }), { status: 400 });
  }

  try {
    const formData = await request.formData();

    const productCheck = await db.execute({
      sql: 'SELECT id, image_url FROM products WHERE id = ?',
      args: [id]
    });

    if (productCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const category_id = parseInt(formData.get('category_id') as string);
    const image = formData.get('image') as File | null;

    if (!name || !description || isNaN(price) || price < 0 || isNaN(stock) || stock < 0 || isNaN(category_id) || category_id <= 0) {
      return new Response(JSON.stringify({ error: 'Datos de entrada inválidos' }), { status: 400 });
    }

    let image_url = productCheck.rows[0].image_url;

    if (image && image instanceof File) {
      try {
        if (image_url) {
          await deleteImage(image_url as string);
        }
        image_url = await uploadImage(image);
      } catch (uploadError) {
        console.error('Error al cargar la imagen:', uploadError);
        return new Response(JSON.stringify({ error: 'Error al cargar la imagen' }), { status: 500 });
      }
    }

    await db.execute({
      sql: 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, image_url = ? WHERE id = ?',
      args: [name, description, price, stock, category_id, image_url, id]
    });

    return new Response(JSON.stringify({ id, name, description, price, stock, category_id, image_url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el producto', detalles: error.message }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    const productCheck = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id]
    });

    if (productCheck.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify(productCheck.rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al recuperar el producto' }), { status: 500 });
  }
};