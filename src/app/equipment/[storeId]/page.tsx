'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Equipment {
  id: number;
  name: string;
  type_id: number;
  store_id: number;
  temperature: string;
  energy_consumption: string;
  status: string;
}

interface EquipmentType {
  id: number;
  name: string;
}

export default function EquipmentStatusPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [storeName, setStoreName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const params = useParams();
  const storeId = Number(params.storeId);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    // Load equipment types
    const types = [
      { id: 1, name: "Refrigeración" },
      { id: 2, name: "Climatización" },
      { id: 3, name: "Iluminación" }
    ];
    setEquipmentTypes(types);

    // Load equipment data for store 1 (Tienda Central)
    const equipmentData = [
      {
        id: 1,
        name: "Refrigerador Principal",
        type_id: 1,
        store_id: 1,
        temperature: "2°C",
        energy_consumption: "120",
        status: "Funcionando"
      },
      {
        id: 2,
        name: "Congelador de Helados",
        type_id: 1,
        store_id: 1,
        temperature: "-18°C",
        energy_consumption: "85",
        status: "Funcionando"
      },
      {
        id: 3,
        name: "Vitrina de Bebidas",
        type_id: 1,
        store_id: 1,
        temperature: "5°C",
        energy_consumption: "60",
        status: "Funcionando"
      },
      {
        id: 4,
        name: "Aire Acondicionado Principal",
        type_id: 2,
        store_id: 1,
        temperature: "22°C",
        energy_consumption: "250",
        status: "Funcionando"
      },
      {
        id: 5,
        name: "Ventilación de Cocina",
        type_id: 2,
        store_id: 1,
        temperature: "N/A",
        energy_consumption: "45",
        status: "Funcionando"
      },
      {
        id: 6,
        name: "Iluminación Interior",
        type_id: 3,
        store_id: 1,
        temperature: "N/A",
        energy_consumption: "150",
        status: "Funcionando"
      },
      {
        id: 7,
        name: "Iluminación Exterior",
        type_id: 3,
        store_id: 1,
        temperature: "N/A",
        energy_consumption: "80",
        status: "Funcionando"
      }
    ];
    setEquipment(equipmentData);
    setStoreName("Tienda Central");
  }, []);

  const getEquipmentByType = (typeId: number) => {
    return equipment.filter(eq => eq.type_id === typeId);
  };

  const handleEquipmentClick = (equipmentId: number) => {
    router.push(`/equipment-detail/${equipmentId}`);
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
                onClick={() => router.push('/stores')}
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Tiendas
              </button>
              <button
                onClick={() => router.push('/energy')}
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Energía
              </button>
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
              <button onClick={() => { setShowMobileMenu(false); router.push('/energy'); }} className="hover:text-yellow-300 transition-colors">Energía</button>
              <button onClick={() => { setShowMobileMenu(false); router.push('/reports?from=tiendas'); }} className="hover:text-yellow-300 transition-colors">Reportes</button>
              <button onClick={() => { setShowMobileMenu(false); handleLogout(); }} className="mt-8 text-lg bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">Salir</button>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <button
                  onClick={() => router.push('/stores')}
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Tiendas
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-900">Estado de Equipos</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Estado de Equipos - {storeName}
          </h1>

          {/* Equipment by Type */}
          {equipmentTypes.map((type) => {
            const typeEquipment = getEquipmentByType(type.id);
            if (typeEquipment.length === 0) return null;

            return (
              <div key={type.id} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{type.name}</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Equipo
                          </th>
                          {type.id !== 3 && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Temperatura
                            </th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Consumo (kWh)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {typeEquipment.map((eq) => (
                          <tr
                            key={eq.id}
                            onClick={() => handleEquipmentClick(eq.id)}
                            className="hover:bg-gray-50 cursor-pointer"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {eq.name}
                            </td>
                            {type.id !== 3 && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {eq.temperature}
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {eq.energy_consumption}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                {eq.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 