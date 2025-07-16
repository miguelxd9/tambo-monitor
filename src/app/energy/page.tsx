'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { label: 'Diario', value: 'diario' },
  { label: 'Semanal', value: 'semanal' },
  { label: 'Mensual', value: 'mensual' },
];

const CONSUMO = [
  { equipo: 'Equipo 1', consumo: 300, estado: 'Activo', fecha: '2024-07-26' },
  { equipo: 'Equipo 2', consumo: 250, estado: 'Activo', fecha: '2024-07-26' },
  { equipo: 'Equipo 3', consumo: 200, estado: 'Inactivo', fecha: '2024-07-26' },
  { equipo: 'Equipo 4', consumo: 220, estado: 'Activo', fecha: '2024-07-26' },
  { equipo: 'Equipo 5', consumo: 230, estado: 'Activo', fecha: '2024-07-26' },
];

export default function EnergyPage() {
  const [tab, setTab] = useState('diario');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-bold text-lg mr-1" style={{ color: 'var(--tambo-logo)' }}>TAMBO</span>
              <span className="text-white font-semibold text-lg ml-2">Monitor</span>
            </div>
            {/* Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => router.push('/stores')} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">Tiendas</button>
              <button onClick={() => router.push('/reports')} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">Reportes</button>
              <div className="flex items-center space-x-4 relative profile-menu-container">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors">
                  <span className="text-white text-sm">👤</span>
                </div>
                {showProfileMenu && (
                  <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">Salir</button>
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
      </header>

      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de Actividades y Consumo</h1>
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-200 mb-6">
          {TABS.map(t => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`pb-2 text-base font-medium focus:outline-none transition-colors ${tab === t.value ? 'border-b-2 border-blue-600 text-blue-900' : 'text-gray-400 hover:text-blue-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Métricas y gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Consumo Energético Diario */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
            <span className="text-gray-500 text-sm mb-2">Consumo Energético Diario</span>
            <span className="text-3xl font-bold text-gray-900 mb-1">1200 kWh</span>
            <span className="text-green-600 text-sm font-semibold">Hoy +5%</span>
            {/* Gráfico de línea */}
            <div className="mt-4 flex-1 flex items-end">
              <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                <img src="/line-chart.png" alt="Gráfico de línea" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          {/* Actividad de Equipos Diaria */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
            <span className="text-gray-500 text-sm mb-2">Actividad de Equipos Diaria</span>
            <span className="text-3xl font-bold text-gray-900 mb-1">500 eventos</span>
            <span className="text-red-600 text-sm font-semibold">Hoy -2%</span>
            {/* Gráfico de barras */}
            <div className="mt-4 flex-1 flex items-end">
              <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                <img src="/bar-chart.png" alt="Gráfico de barras" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de detalles */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Consumo</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumo (kWh)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {CONSUMO.map((row, idx) => (
                  <tr key={row.equipo} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.equipo}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.consumo}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`inline-block px-6 py-1 rounded-full text-sm font-semibold ${row.estado === 'Activo' ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-400'}`}>
                        {row.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 