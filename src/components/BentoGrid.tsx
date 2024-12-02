  // Start of Selection
// src/components/BentoGrid.tsx
import React from 'react';
import '@css/globals.css';

const categories = [
  { name: 'Cuidado Bucal', image: '/img-categories/cuidadoBucal1.png', hoverImage: '/img-categories/cuidadoBucal2.png' },
  { name: 'Cuidado Personal y Hogar', image: '/img-categories/cuidadoPersonal1.png', hoverImage: '/img-categories/cuidadoPersonal2.png' },
  { name: 'Material Médico', image: '/img-categories/materialMedico1.png', hoverImage: '/img-categories/materialMedico2.png' },
  { name: 'Dispositivos In Vitro', image: '/img-categories/inVitro1.png', hoverImage: '/img-categories/inVitro2.png' },
  { name: 'Pruebas Rápidas', image: '/img-categories/pruebasRapidas1.png', hoverImage: '/img-categories/pruebasRapidas2.png' },
  { name: 'Equipos de Laboratorio', image: '/img-categories/equiposLab1.png', hoverImage: '/img-categories/equiposLab2.png' },
  /* { name: 'Insumos Hospitalarios', image: '/placeholder.svg?height=300&width=400', link: '/productos?categoria=Insumos Hospitalarios' },
  { name: 'otro', link: '/productos?categoria=otro'},
  { name: 'otro2', link: '/productos?categoria=otro2'}, */
];



export default function BentoGrid() {
  return (
    <div className="bg-six py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold dark:text-gray-800 mb-8">Nuestras Categorías</h2>
        <div className="flex flex-col md:grid gap-4 h-auto md:h-[600px] md:grid-cols-4 md:grid-rows-3 md:gap-6 ">
          {categories.map((category, index) => {
            // Calcular el tamaño del texto basado en el índice
            const textSize = index === 0 ? 'md:text-3xl' : index === 4 ? 'md:text-2xl' : '';

            return (
              <a href={`/productos?categoria=${encodeURIComponent(category.name)}`} key={index} className={`relative overflow-hidden rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:translate-y-[-10px] transition-transform duration-300 ease-in-out md:shadow-slate-700 ${
                  index === 0 ? 'col-span-3 row-span-2' : 
                  index === 4 ? 'col-span-2' : ''
                }`}>
                {/* Imagen principal */}
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={`text-white text-lg ${textSize} font-semibold`}>
                    {category.name}
                  </h3>
                </div>

                {/* Contenido en hover */}
                <div className="absolute inset-0 w-full h-full  opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {/* Imagen de hover */}
                  <img src={category.hoverImage} alt="Diagonal Overlay" className="w-full h-full object-cover z-10" />

                  {/* Contenedor del texto y sombra */}
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    {/* Sombra desenfocada detrás del texto */}
                    <div className="absolute inset-0 bg-[#00B14B]/50 blur-md -z-10"></div>

                    {/* Texto */}
                    <h3 className={`relative text-white ${textSize} font-semibold text-shadow`}>
                      {category.name}
                    </h3>
                    {/* Underline animado */}
                    <div className="absolute inset-x-0 bottom-4 h-1 bg-gradient-to-r from-[#00B14B] to-transparent"></div>
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