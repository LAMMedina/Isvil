import React from 'react';
import '@css/MarqueeCarousel.css';

const brands = [
  'img-marcas/recurso-1.svg',
  'img-marcas/recurso-2.svg',
  'img-marcas/recurso-3.svg',
  'img-marcas/recurso-4.svg',
  'img-marcas/recurso-5.svg',
  /* 'img-marcas/recurso-6.svg', */
  'img-marcas/recurso-7.svg',
  /* 'img-marcas/recurso-8.svg', */
  'img-marcas/recurso-9.svg',
  'img-marcas/recurso-10.svg',
  'img-marcas/recurso-11.svg',
  'img-marcas/recurso-12.svg',
  'img-marcas/recurso-13.svg',
  'img-marcas/recurso-14.svg',
  
  

  // Agrega tantas imágenes como necesites
];

export default function MarqueeCarousel() {
  const shuffledBrands1 = shuffle([...brands]);
  const shuffledBrands2 = shuffle([...brands]);

  return (
    <div className='bg-six'>
    <div className="marquee-container bg-six max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="marquee ">
        {shuffledBrands1.map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`Marca ${index + 1}`}
            className="marquee-item w-24 mx-8 md:w-24 md:h-auto md:mx-16"
          />
        ))}
      </div>
    <div className="marquee-gradient-right"></div>
    <div className="marquee-gradient-left"></div>
    </div>
    <div className=" md:block">
      <div className="marquee-container bg-six max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="marquee-reverse ">
          {shuffledBrands2.map((brand, index) => (
            <img
              key={index}
              src={brand}
              alt={`Marca ${index + 1}`}
              className="marquee-item w-24 mx-8 md:w-24 md:h-auto md:mx-16"
            />
          ))}
        </div>
      <div className="marquee-gradient-right"></div>
      <div className="marquee-gradient-left"></div>
      </div>
    </div>
    
    </div>
        
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
