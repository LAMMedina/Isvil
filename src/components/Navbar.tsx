// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-six shadow-md mb-1 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src="/img/logo-no-fondo.png" alt="" className='w-10'/>
            <a href="/" className=" text-2xl font-bold text-primary">
                Medical Isvil
            </a>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Inicio
                </a>
                <a href="/productos" className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Productos
                </a>
                <a href="/sobre-nosotros" className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Sobre nosotros
                </a>
              </div>
            </div>
              {/* <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full sm:w-64 pr-10 border rounded-md py-2 px-3 focus:outline-none focus:ring-2 
                  focus:ring-primary caret-orange-500 focus:placeholder-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-third" />
                </div>
              </div>
              <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm 
              font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-primary">
                Cotizar
              </button>
            </div> */} 
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary hover:text-primary focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                Inicio
              </a>
              <a href="/productos" className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                Productos
              </a>
              <a href="/sobre-nosotros" className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                Sobre nosotros
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}