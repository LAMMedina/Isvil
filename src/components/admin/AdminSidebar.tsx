import React, { useState, useEffect } from 'react';
import { HomeIcon, FolderIcon, ShoppingBagIcon, UsersIcon } from '@heroicons/react/24/outline';
import { LogOut } from 'lucide-react';
import Spinner from '@admin/Spinner';

export default function AdminSidebar() {
  const [loading, setLoading] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Categories', href: '/admin/categories', icon: FolderIcon },
    { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Log Out', href: '/login', icon: LogOut },
  ];

  const handleClick = async (href: string) => {
    setLoading(true);
    // Simular carga (puedes reemplazar esto con la lógica real de navegación)
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = href; // Navegar a la nueva URL
    setLoading(false);
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-[#48629b] overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-auto w-auto" src="/img/logo.png" alt="Your Company" />
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleClick(item.href)}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-[#9b8c48] hover:text-indigo-100"
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
}