'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface MaintenanceRecord {
  id: number;
  date: string;
  maintenance_type: string;
  technician_name: string;
  observations: string;
}

export default function MaintenanceHistoryPage() {
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[]>([]);
  const [equipmentName, setEquipmentName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const params = useParams();
  const equipmentId = Number(params.equipmentId);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    // Load maintenance history data
    const historyData = [
      {
        id: 1,
        date: "2024-07-26",
        maintenance_type: "Preventivo",
        technician_name: "Carlos Pérez",
        observations: "Revisión general y limpieza"
      },
      {
        id: 2,
        date: "2024-04-15",
        maintenance_type: "Correctivo",
        technician_name: "Ana García",
        observations: "Reparación del motor"
      },
      {
        id: 3,
        date: "2024-01-20",
        maintenance_type: "Preventivo",
        technician_name: "Carlos Pérez",
        observations: "Revisión de niveles de refrigerante"
      },
      {
        id: 4,
        date: "2023-10-05",
        maintenance_type: "Correctivo",
        technician_name: "Luis Martínez",
        observations: "Cambio de termostato"
      },
      {
        id: 5,
        date: "2023-07-10",
        maintenance_type: "Preventivo",
        technician_name: "Ana García",
        observations: "Limpieza de serpentines"
      }
    ];
    setMaintenanceHistory(historyData);
    setEquipmentName("Refrigerador #12345");
  }, []);

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
                onClick={() => router.push('/reports')}
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
            <button className="block lg:hidden text-white focus:outline-none" onClick={() => setShowMobileMenu(true)} aria-label="Abrir menú">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {showMobileMenu && (
        <div className="fixed inset-0 bg-purple-900 z-50 flex flex-col items-center justify-center text-white text-2xl">
          <button className="absolute top-6 right-6 text-white text-4xl focus:outline-none" onClick={() => setShowMobileMenu(false)} aria-label="Cerrar menú">&times;</button>
          <nav className="flex flex-col space-y-8">
            <button onClick={() => { setShowMobileMenu(false); router.push('/stores'); }} className="hover:text-yellow-300 transition-colors">Tiendas</button>
            <button onClick={() => { setShowMobileMenu(false); router.push('/reports'); }} className="hover:text-yellow-300 transition-colors">Reportes</button>
            <button onClick={() => { setShowMobileMenu(false); handleLogout(); }} className="mt-8 text-lg bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">Salir</button>
          </nav>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <button
                  onClick={() => router.push(`/equipment-detail/${equipmentId}`)}
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Equipos
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-900">Historial de Mantenimiento</span>
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
            Historial de Mantenimiento - {equipmentName}
          </h1>

          {/* Maintenance History Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Mantenimiento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Técnico
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenanceHistory.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.maintenance_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.technician_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.observations}
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