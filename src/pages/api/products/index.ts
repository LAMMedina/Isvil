import type { APIRoute } from 'astro';
import db from '@lib/db';
import { uploadImage } from '@lib/cloudinary';

// Función auxiliar para convertir BigInt a número
function bigIntToNumber(value: bigint | number): number {
  return typeof value === 'bigint' ? Number(value) : value;
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');

  let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
  let args = [];

  if (name) {
    query += ' WHERE p.name = ?';
    args.push(name);
  }

  const result = await db.execute({
    sql: query,
    args: args
  });

  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const category_id = parseInt(formData.get('category_id') as string);
    const image = formData.get('image') as File | null;

    // Validación de datos
    if (!name || !description || isNaN(price) || price < 0 || isNaN(stock) || stock < 0 || isNaN(category_id) || category_id <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    let image_url = '';
    if (image && image instanceof File) {
      try {
        image_url = await uploadImage(image);
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return new Response(JSON.stringify({ error: 'Failed to upload image' }), { status: 500 });
      }
    }

    const result = await db.execute({
      sql: 'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      args: [name, description, price, stock, category_id, image_url]
    });
    
    // Convertir BigInt a número antes de la serialización
    const insertedId = bigIntToNumber(result.lastInsertRowid);

    return new Response(JSON.stringify({ 
      id: insertedId, 
      name, 
      description, 
      price, 
      stock, 
      category_id, 
      image_url 
    }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ error: 'Failed to create product', details: error.message }), { status: 500 });
  }
};