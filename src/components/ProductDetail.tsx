import React, { useState, useEffect } from 'react';
import Spinner from '@admin/Spinner';
import { ArrowLeft } from 'lucide-react';
import normalizeString from '@utils/stringUtils';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  category_name: string;
}

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      /* console.log('Fetching product with id/name:', id); */
      const cacheKey = `product_${id}`;
      const cachedProduct = localStorage.getItem(cacheKey);
      
      if (cachedProduct) {
        /* console.log('Found product in cache'); */
        const parsedProduct = JSON.parse(cachedProduct);
        /* console.log('Parsed cached product:', parsedProduct); */
        setProduct(parsedProduct);
        setLoading(false);
        return;
      }

      try {
        // Si el ID no es un número, buscamos en el endpoint principal con el parámetro name
        if (isNaN(Number(id))) {
          /* console.log('ID is not a number, searching by name'); */
          const response = await fetch(`/api/products`);
          if (!response.ok) {
            throw new Error('Error al cargar los productos');
          }
          const products = await response.json();
          /* console.log('All products:', products); */

          // Buscar el producto que coincida con el nombre (id en este caso)
          const foundProduct = products.find((p: Product) => normalizeString(p.name) === decodeURIComponent(id));
          /* console.log('Found product:', foundProduct); */
          
          if (foundProduct) {
            /* console.log('Setting product:', foundProduct); */
            setProduct(foundProduct);
            localStorage.setItem(cacheKey, JSON.stringify(foundProduct));
          } else {
            throw new Error('Producto no encontrado');
          }
        } else {
          // Si es un número, usar la ruta con ID
          /* console.log('ID is a number, fetching directly'); */
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error('Error al cargar el producto');
          }
          const data = await response.json();
          setProduct(data);
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } catch (error) {
        /* console.error('Error in fetchProduct:', error); */
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
    <div className='h-screen flex justify-center items-center'>
      <Spinner />
    </div>
    );
  }

  if (error) {
    return <div className="text-red-500" role="alert">{error}</div>;
  }

  if (!product) {
    return <div role="alert">Producto no encontrado</div>;
  }

  /* console.log('Current product state:', product); */
  return (
    <div>
      <button 
        onClick={() => window.history.back()} 
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black hover:underline focus:outline-none md:ml-60 mt-4 group relative"
        aria-label="Volver atrás"
      >
        <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2 mt-[-5px] group-hover:text-gray-900 text-gray-400" aria-hidden="true" />
        <div className="relative ml-[-10px]">
          <img src="/img/logo-no-fondo.png" alt="" className='h-8 w-auto ml-2 transition-opacity duration-300 group-hover:opacity-0' aria-hidden="true" />
          <span className='absolute top-0 left-0 h-8 w-auto ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>Atrás</span>
        </div>
      </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.category_name}</p>
            <p className='text-gray-800 mb-6 text-lg'>Descripción: </p>
            <p className="text-gray-800 mb-6">{product.description}</p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => {
              const encodedMessage = encodeURIComponent(
                `Hola, vengo de la web. Quisiera saber más sobre el producto: ${product.name}.`
              );
              window.location.href = `https://api.whatsapp.com/send?phone=51972708799&text=${encodedMessage}`;
              }}
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

