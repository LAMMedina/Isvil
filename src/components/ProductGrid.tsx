// src/components/ProductGrid.tsx
import React from 'react';

const products = [
  { id: 1, name: 'Analizador de Tiras de Orina', category: 'Equipos de Laboratorio', image: '/img-categories/analizador1.png', link: '/productos/1', hoverImage: '/img-categories/analizador2.png' },
  { id: 2, name: '3M Clinpro', category: 'Cuidado Bucal', image: '/img-categories/clinpro1.png', link: '/productos/2', hoverImage: '/img-categories/clinpro2.png'},
  { id: 3, name: 'HCG Tiras o Cassete', category: 'Pruebas Rápidas', image: '/img-categories/hcg1.png', link: '/productos/3', hoverImage: '/img-categories/hcg2.png'},
  { id: 4, name: 'Tips para Pipetas', category: 'Materiales Médicos', image: '/img-categories/tips1.png', link: '/productos/4', hoverImage: '/img-categories/tips2.png'},
  { id: 5, name: 'Dermosol', category: 'Cuidado Personal y Hogar', image: '/img-categories/dermosol1.png', link: '/productos/5', hoverImage: '/img-categories/dermosol2.png'},
  { id: '', name: 'Agujas Berpu', category: 'Materiales Médicos', image: '/img-categories/berpu1.png', link: '/productos/6', hoverImage: '/img-categories/berpu2.png'},
];

export default function ProductGrid() {
  return (
    <div className="bg-six py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold dark:text-gray-800 mb-8">Productos Destacados</h2>
        <div className="flex flex-col md:grid gap-4 h-auto md:h-[600px] md:grid-cols-4 md:grid-rows-3 md:gap-6">
          {products.map((product, index) => { 
            // Calcular el tamaño del texto basado en el índice
            const textSize = index === 4 ? 'md:text-3xl' : index === 1 ? 'md:text-2xl' : '';
            
            return (
            <a href={`/productos/${encodeURIComponent(product.name)}`} key={index} className={`relative overflow-hidden rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:translate-y-[-10px] transition-transform duration-300 ease-in-out md:shadow-slate-700 ${
              index === 4 ? 'col-span-3 row-span-2' : 
              index === 1 ? 'col-span-2' : ''
            }`}>
              {/* Imagen principal */}
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className={`text-white ${textSize} font-semibold`}>
                {product.name}
              </h3>
              <p className="text-sm text-third">{product.category}</p>
            </div>
            {/* Contenido en hover */}
            <div className="absolute inset-0 w-full h-full  opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {/* Imagen de hover */}
                  <img src={product.hoverImage} alt="Diagonal Overlay" className="w-full h-full object-cover z-10" />

                  {/* Contenedor del texto y sombra */}
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    {/* Sombra desenfocada detrás del texto */}
                    <div className="absolute inset-0 bg-orange-500/50 blur-md -z-10"></div>

                    {/* Texto */}
                    <h3 className={`relative text-white ${textSize} font-semibold text-shadow`}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-third text-shadow">{product.category}</p>
                    {/* Underline animado */}
                    <div className="absolute inset-x-0 bottom-4 h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                  </div>
                </div>
          </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}