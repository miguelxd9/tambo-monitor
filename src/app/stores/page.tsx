'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Store {
  id: number;
  name: string;
  status: string;
  energy_consumption: string;
  last_report: string;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    // Load stores data
    const storesData = [
      {
        id: 1,
        name: "Tienda A",
        status: "En Línea",
        energy_consumption: "1200 kWh",
        last_report: "2023-08-15"
      },
      {
        id: 2,
        name: "Tienda B",
        status: "Fuera de Línea",
        energy_consumption: "N/A",
        last_report: "2023-08-10"
      },
      {
        id: 3,
        name: "Tienda C",
        status: "En Línea",
        energy_consumption: "1500 kWh",
        last_report: "2023-08-15"
      },
      {
        id: 4,
        name: "Tienda D",
        status: "En Línea",
        energy_consumption: "1100 kWh",
        last_report: "2023-08-15"
      },
      {
        id: 5,
        name: "Tienda E",
        status: "Fuera de Línea",
        energy_consumption: "N/A",
        last_report: "2023-08-12"
      }
    ];
    
    setStores(storesData);
    setFilteredStores(storesData);
  }, []);

  useEffect(() => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm, stores]);

  // Cerrar menú de perfil cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStoreClick = (storeId: number) => {
    router.push(`/equipment/${storeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="font-bold text-lg mr-1" style={{ color: 'var(--tambo-logo)' }}>TAMBO</span>
                <span className="text-white font-semibold text-lg ml-2">Monitor</span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => router.push('/reports?from=tiendas')}
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Reportes
              </button>
              {/* User Profile */}
              <div className="flex items-center space-x-4 relative profile-menu-container">
                <div 
                  className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <span className="text-white text-sm">👤</span>
                </div>
                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Salir
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburguesa - Mobile */}
            <button
              className="block lg:hidden text-white focus:outline-none"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Abrir menú"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Overlay menú mobile */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-purple-900 z-50 flex flex-col items-center justify-center text-white text-2xl">
            <button
              className="absolute top-6 right-6 text-white text-4xl focus:outline-none"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Cerrar menú"
            >
              &times;
            </button>
            <nav className="flex flex-col space-y-8">
              <button onClick={() => { setShowMobileMenu(false); router.push('/stores'); }} className="hover:text-yellow-300 transition-colors">Tiendas</button>
              <button onClick={() => { setShowMobileMenu(false); router.push('/reports?from=tiendas'); }} className="hover:text-yellow-300 transition-colors">Reportes</button>
              <button onClick={() => { setShowMobileMenu(false); handleLogout(); }} className="mt-8 text-lg bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">Salir</button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Tiendas</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar tiendas"
              />
            </div>
          </div>

          {/* Stores Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de la Tienda
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consumo de Energía
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último Reporte
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStores.map((store) => (
                    <tr
                      key={store.id}
                      onClick={() => handleStoreClick(store.id)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {store.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          store.status === 'En Línea' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {store.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {store.energy_consumption}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {store.last_report}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}