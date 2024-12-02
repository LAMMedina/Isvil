import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Spinner from '@admin/Spinner';

export default function ProductsSPA({ categoria }) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  // Cargar productos y categorías desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      // Verificar si los productos están en caché
      const cachedProducts = localStorage.getItem('products');
      if (cachedProducts) {
        setAllProducts(JSON.parse(cachedProducts));
        setProducts(JSON.parse(cachedProducts)); // Inicializa los productos a todos al principio
      }

      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();

        // Solo actualizar el caché si hay nuevos productos
        if (JSON.stringify(data) !== cachedProducts) {
          setAllProducts(data);
          setProducts(data); // Inicializa los productos a todos al principio
          localStorage.setItem('products', JSON.stringify(data)); // Guardar en caché
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Ocultar el spinner al finalizar la carga
      }
    };

    const fetchCategories = async () => {
      // Verificar si las categorías están en caché
      const cachedCategories = localStorage.getItem('categories');
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
      }

      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Error al cargar las categorías');
        }
        const data = await response.json();
        // solo actualizar el caché si hay nuevas categorías
        if (JSON.stringify(data) !== cachedCategories) {
          setCategories(data);
          localStorage.setItem('categories', JSON.stringify(data)); // Guardar en caché
        }
        // Encontrar el ID de la categoría que coincide con el nombre recibido
        const category = data.find(cat => cat.name === categoria);
        if (category) {
          setSelectedCategoryId(category.id); // Guardar el ID de la categoría
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [categoria]);

  // Memorizar Fuse.js para búsqueda
  const fuse = useMemo(() => {
    if (allProducts.length > 0) {
      const fuseOptions = {
        keys: ['name', 'category', 'description'],
        threshold: 0.3,
      };
      return new Fuse(allProducts, fuseOptions);
    }
    return null;
  }, [allProducts]);

  // Filtrar productos por categoría
  const filteredByCategory = useMemo(() => {
    if (selectedCategoryId) {
      return allProducts.filter(product => product.category_id === Number(selectedCategoryId));
    }
    return allProducts;
  }, [selectedCategoryId, allProducts]);

  // Filtrar productos por búsqueda
  useEffect(() => {
    let filteredProducts = filteredByCategory;

    if (searchTerm && fuse) {
      const results = fuse.search(searchTerm);
      filteredProducts = results.map(result => result.item);
    }

    setProducts(filteredProducts);
  }, [searchTerm, filteredByCategory, fuse]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCategoryId(null); // Limpiar categoría al buscar
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
    setSearchTerm(''); // Limpiar búsqueda al seleccionar categoría
  };

  // Mostrar mensaje de error si ocurre
  if (error) {
    return <div className="text-red-500 ">{error}</div>;
  }

  // Mostrar mensaje de carga si los productos o categorías no están disponibles
  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
      <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full relative">
      <div className='flex justify-between items-center max-w-6xl'>
      {!selectedCategoryId && <h1 className="text-3xl font-bold mb-8 hidden sm:block">Nuestros Productos</h1>} 
      {selectedCategoryId && <h1 className="text-3xl font-bold mb-8 float-end relative right-0 text-right">Categoría: <span className="text-primary text-xl">{categories.find(category => category.id === Number(selectedCategoryId))?.name || 'No disponible'}</span></h1>}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
       
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary caret-orange-500 focus:placeholder-transparent"
          aria-label="Buscar productos"
        />
        
        <select
          value={selectedCategoryId || ''}
          onChange={handleCategoryChange}
          className="w-full sm:w-auto border rounded-md py-2 px-5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary caret-orange-500 focus:placeholder-transparent"
          aria-label="Seleccionar categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <a key={product.id} href={`/productos/${product.id}`} className="border rounded-lg overflow-hidden shadow-md block hover:scale-105 hover:translate-y-[-10px] transition-transform duration-300 ease-in-out">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.category}</p>
                {/* <p className="text-gray-800 mb-4">${product.price.toFixed(2)}</p> */}
              </div>
            </a>
          ))
        ) : (
          <div>No se encontraron productos para mostrar.</div>
        )}
      </div>
    </div>
  );
}
