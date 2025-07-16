'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ReportEvent {
  id: number;
  date: string;
  time: string;
  event_type: string;
  description: string;
  equipment_name: string;
  store_name: string;
  value: string;
}

export default function ReportsPage() {
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [reportData, setReportData] = useState<ReportEvent[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    // Si viene de Tiendas, seleccionar Tienda Central por defecto
    const from = searchParams.get('from');
    if (from === 'tiendas') {
      setSelectedStore('1'); // id de Tienda Central
    }
  }, [searchParams]);

  const stores = [
    { id: 1, name: "Tienda Central" },
    { id: 2, name: "Tienda Norte" },
    { id: 3, name: "Tienda Sur" }
  ];

  const reportTypes = [
    { id: 1, name: "Eventos" },
    { id: 2, name: "Mantenimiento" },
    { id: 3, name: "Energía" }
  ];

  const periods = [
    { id: 1, name: "Último día" },
    { id: 2, name: "Última semana" },
    { id: 3, name: "Último mes" }
  ];

  const equipment = [
    { id: 1, name: "Refrigerador Principal" },
    { id: 2, name: "Congelador de Helados" },
    { id: 3, name: "Aire Acondicionado" }
  ];

  useEffect(() => {
    const data: ReportEvent[] = [
      {
        id: 1,
        date: "2024-07-26",
        time: "08:00",
        event_type: "Consumo Energético",
        description: "Refrigerador 1",
        equipment_name: "Refrigerador Principal",
        store_name: "Tienda Central",
        value: "120 kWh"
      },
      {
        id: 2,
        date: "2024-07-26",
        time: "09:30",
        event_type: "Evento",
        description: "Sensor de Temperatura",
        equipment_name: "Congelador de Helados",
        store_name: "Tienda Central",
        value: "Temperatura alta"
      },
      {
        id: 3,
        date: "2024-07-26",
        time: "11:00",
        event_type: "Consumo Energético",
        description: "Iluminación",
        equipment_name: "Aire Acondicionado",
        store_name: "Tienda Central",
        value: "80 kWh"
      },
      {
        id: 4,
        date: "2024-07-26",
        time: "13:45",
        event_type: "Evento",
        description: "Puerta Abierta",
        equipment_name: "Equipo de Almacén",
        store_name: "Tienda Central",
        value: "Principal"
      },
      {
        id: 5,
        date: "2024-07-26",
        time: "15:00",
        event_type: "Consumo Energético",
        description: "Refrigerador 2",
        equipment_name: "Refrigerador Secundario",
        store_name: "Tienda Central",
        value: "110 kWh"
      }
    ];
    setReportData(data);
  }, []);

  const handleGenerateReport = () => {
    console.log("Generando reporte con filtros:", { selectedStore, selectedReportType, selectedPeriod, selectedEquipment });
    alert('Reporte generado (simulado).');
  };

  const handleExportExcel = () => {
    alert('Exportando a Excel...');
  };

  const handleExportPDF = () => {
    alert('Exportando a PDF...');
  };

  // Determinar si el enlace de Reportes está activo
  const isReportsActive = pathname === '/reports';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Horizontal Dashboard */}
      <header className="shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-bold text-lg mr-1" style={{ color: 'var(--tambo-logo)' }}>TAMBO</span>
              <span className="text-white font-semibold text-lg ml-2">Monitor</span>
            </div>

            {/* Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => router.push('/stores')} className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">Tiendas</button>
              <button onClick={() => router.push('/reports')} className={`text-white text-sm font-medium transition-colors cursor-pointer ${pathname === '/reports' ? 'bg-purple-800' : 'hover:text-gray-200'} px-3 py-2`}>Reportes</button>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Title and Subtitle */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Reportes Personalizados</h1>
            <p className="text-gray-600 text-lg">
              Crea y visualiza reportes detallados sobre el consumo energético, eventos y otros datos relevantes de tus tiendas.
            </p>
          </div>

          {/* Configuración del Reporte */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración del Reporte</h2>
            {/* Grid para los selectores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center mb-6"> {/* Ajustado gap y mb-6 */}
              {/* Tienda */}
              <div>
                <label htmlFor="store-select" className="sr-only">Seleccionar Tienda</label>
                {/* Eliminado 'appearance-none' y el div con el svg de la flecha personalizada */}
                <select
                  id="store-select"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm"
                >
                  <option value="">Seleccionar Tienda</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Reporte */}
              <div>
                <label htmlFor="report-type-select" className="sr-only">Seleccionar Tipo de Reporte</label>
                {/* Eliminado 'appearance-none' y el div con el svg de la flecha personalizada */}
                <select
                  id="report-type-select"
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm"
                >
                  <option value="">Seleccionar Tipo de Reporte</option>
                  {reportTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Período */}
              <div>
                <label htmlFor="period-select" className="sr-only">Seleccionar Período</label>
                {/* Eliminado 'appearance-none' y el div con el svg de la flecha personalizada */}
                <select
                  id="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm"
                >
                  <option value="">Seleccionar Período</option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipo (Opcional) */}
              <div>
                <label htmlFor="equipment-select" className="sr-only">Seleccionar Equipos (Opcional)</label>
                {/* Eliminado 'appearance-none' y el div con el svg de la flecha personalizada */}
                <select
                  id="equipment-select"
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm"
                >
                  <option value="">Seleccionar Equipos (Opcional)</option>
                  {equipment.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón Generar Reporte - Fuera del grid para que esté en su propia fila */}
            <button
              onClick={handleGenerateReport}
              className="mt-4 bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md w-fit"
            >
              Generar Reporte
            </button>
          </section>

          {/* Visualización del Reporte */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Visualización del Reporte</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Equipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.event_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Export Buttons */}
          <div className="flex justify-start space-x-4">
            <button
              onClick={handleExportExcel}
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-md"
            >
              Exportar a Excel
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-md"
            >
              Exportar a PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}