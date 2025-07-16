'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
// Importa el icono de InformationCircle si usas Heroicons.
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Equipment {
  id: number;
  name: string;
  model: string;
  location: string;
  installation_date: string;
  current_status: string;
  current_temperature: string;
  current_energy_consumption: string;
}

interface OperationHistory {
  id: number;
  date: string;
  time: string;
  action: string;
  user_name: string;
}

interface Alert {
  id: number;
  message: string;
  timestamp: string;
}

export default function EquipmentDetailPage() {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [operationHistory, setOperationHistory] = useState<OperationHistory[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadingButton, setLoadingButton] = useState<string | null>(null); // Para simular carga en botones
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const params = useParams();
  const equipmentId = typeof params.equipmentId === 'string' ? Number(params.equipmentId) : undefined;

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    // Simulando carga de datos. En una app real, harías un fetch a tu API aquí.
    setTimeout(() => {
      const equipmentData = {
        id: 1,
        name: "Refrigerador Principal",
        model: "Modelo XYZ-2000",
        location: "Tienda Central - Pasillo de Lácteos",
        installation_date: "2023-01-15",
        current_status: "Encendido",
        current_temperature: "4°C",
        current_energy_consumption: "120 kWh"
      };
      setEquipment(equipmentData);

      const historyData = [
        {
          id: 1,
          date: "2024-07-26",
          time: "14:30",
          action: "Encendido",
          user_name: "Supervisor 1"
        },
        {
          id: 2,
          date: "2024-07-26",
          time: "08:00",
          action: "Apagado",
          user_name: "Sistema Automático"
        },
        {
          id: 3,
          date: "2024-07-25",
          time: "22:00",
          action: "Encendido",
          user_name: "Supervisor 2"
        },
        {
          id: 4,
          date: "2024-07-25",
          time: "07:00",
          action: "Apagado",
          user_name: "Sistema Automático"
        },
        {
          id: 5,
          date: "2024-07-24",
          time: "15:00",
          action: "Encendido",
          user_name: "Supervisor 1"
        }
      ];
      setOperationHistory(historyData);

      const alertsData = [
        {
          id: 1,
          message: "Temperatura fuera de rango",
          timestamp: "2024-07-25 10:00"
        },
        {
          id: 2,
          message: "Consumo energético elevado",
          timestamp: "2024-07-24 18:00"
        }
      ];
      setAlerts(alertsData);
    }, 500); // Pequeño delay para simular carga
  }, []);

  const handleButtonClick = async (buttonType: 'encender' | 'apagar' | 'mantenimientos') => {
    setLoadingButton(buttonType); // Establece el botón que está cargando
    try {
      if (buttonType === 'mantenimientos') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un delay
        router.push(`/maintenance-history/${equipmentId}`);
      } else {
        console.log(`Action: ${buttonType} for equipment ${equipment?.name}`);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un delay
        
        // Actualizar el estado del equipo
        if (equipment) {
          const newStatus = buttonType === 'encender' ? 'Encendido' : 'Apagado';
          setEquipment(prev => prev ? {
            ...prev,
            current_status: newStatus
          } : null);
          
          // Agregar nueva entrada al historial
          const newHistoryEntry = {
            id: operationHistory.length + 1,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            action: newStatus,
            user_name: 'Administrador'
          };
          
          setOperationHistory(prev => [newHistoryEntry, ...prev]);
        }
        
        alert(`Acción "${buttonType}" completada para ${equipment?.name}`);
      }
    } catch (error) {
      console.error('Error al ejecutar la acción:', error);
      alert('Hubo un error al ejecutar la acción.');
    } finally {
      setLoadingButton(null); // Restablece el estado de carga
    }
  };

  if (!equipment) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center">
        <p>Cargando información del equipo...</p>
      </div>
    );
  }

  // Componente auxiliar para las tarjetas de estado
  const StatusCard = ({ title, value, isHighlighted = false }: { title: string, value: string, isHighlighted?: boolean }) => {
    const isStatusCard = title === 'Estado';
    const isOn = value === 'Encendido';
    
    return (
      <div className={`p-6 rounded-lg shadow-md ${
        isStatusCard 
          ? (isOn ? 'bg-blue-600' : 'bg-gray-500') 
          : 'bg-white'
      }`}>
        <p className={`text-sm mb-2 ${
          isStatusCard 
            ? (isOn ? 'text-blue-200' : 'text-gray-200') 
            : 'text-gray-600'
        }`}>{title}</p>
        <p className={`text-2xl font-bold ${
          isStatusCard 
            ? 'text-white' 
            : 'text-black'
        }`}>{value}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900"> {/* Fondo principal gris claro y texto oscuro */}
      {/* Header - No se modifica */}
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

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <button
                  onClick={() => router.push('/equipment/1')}
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Estado de Equipos
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-900">Detalle del Equipo</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> 
        <div className="px-0 py-0 sm:px-0">
          {/* Title and Location */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2"> {/* Texto negro/gris oscuro */}
              Detalle del Equipo: {equipment.name}
            </h1>
            <p className="text-gray-600 text-base"> {/* Texto gris más claro */}
              Ubicación: {equipment.location}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column (takes 2/3 width on xl screens) */}
            <div className="xl:col-span-2 space-y-8">
              {/* Current Status */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado Actual</h2> {/* Texto negro/gris oscuro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatusCard
                    title="Estado"
                    value={equipment.current_status}
                  />
                  <StatusCard
                    title="Temperatura"
                    value={equipment.current_temperature}
                  />
                  <StatusCard
                    title="Consumo Energético"
                    value={equipment.current_energy_consumption}
                  />
                </div>
              </section>

              {/* Remote Control */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Control Remoto</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row gap-4"> {/* Fondo blanco */}
                    <button
                      onClick={() => handleButtonClick('encender')}
                      className={`
                        py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 cursor-pointer flex-1
                        ${loadingButton === 'encender' ? 'opacity-75 cursor-not-allowed' : ''}
                        ${equipment.current_status === 'Encendido' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-900 border border-gray-300'
                        }
                      `}
                      disabled={loadingButton !== null}
                    >
                      {loadingButton === 'encender' ? 'Encendiendo...' : 'Encender'}
                    </button>
                    <button
                      onClick={() => handleButtonClick('apagar')}
                      className={`
                        py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 cursor-pointer flex-1
                        ${loadingButton === 'apagar' ? 'opacity-75 cursor-not-allowed' : ''}
                        ${equipment.current_status === 'Apagado' 
                          ? 'bg-gray-500 text-white' 
                          : 'bg-white text-gray-900 border border-gray-300'
                        }
                      `}
                      disabled={loadingButton !== null}
                    >
                      {loadingButton === 'apagar' ? 'Apagando...' : 'Apagar'}
                    </button>
                    <button
                      onClick={() => handleButtonClick('mantenimientos')}
                      className={`
                        py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 cursor-pointer flex-1
                        ${loadingButton === 'mantenimientos' ? 'opacity-75 cursor-not-allowed' : ''}
                        bg-white hover:bg-gray-50 text-gray-900 border border-gray-300
                      `}
                      disabled={loadingButton !== null}
                    >
                      Mantenimientos
                    </button>
                  </div>
                </div>
              </section>

              {/* Operation History */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Operaciones</h2>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto"> {/* Fondo blanco */}
                  <table className="min-w-full divide-y divide-gray-200"> {/* Divisor gris claro */}
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th> {/* Texto gris oscuro */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200"> {/* Divisor gris claro */}
                      {operationHistory.map((op) => (
                        <tr key={op.id} className="hover:bg-gray-50"> {/* Hover gris muy claro */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{op.date}</td> {/* Texto negro/gris oscuro */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{op.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{op.action}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{op.user_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column (takes 1/3 width on xl screens) */}
            <div className="xl:col-span-1 space-y-8">
              {/* Equipment Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Información del Equipo</h2>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4"> {/* Fondo blanco */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-200"> {/* Divisor gris claro */}
                    <span className="text-gray-600 text-sm">Nombre:</span> {/* Texto gris oscuro */}
                    <span className="text-gray-900 text-base font-medium">{equipment.name}</span> {/* Texto negro/gris oscuro */}
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">Tipo:</span>
                    <span className="text-gray-900 text-base font-medium">Refrigerador</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">Modelo:</span>
                    <span className="text-gray-900 text-base font-medium">{equipment.model}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">Ubicación:</span>
                    <span className="text-gray-900 text-base font-medium">{equipment.location}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600 text-sm">Fecha de Instalación:</span>
                    <span className="text-gray-900 text-base font-medium">{equipment.installation_date}</span>
                  </div>
                </div>
              </section>

              {/* Recent Alerts */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas Recientes</h2>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4"> {/* Fondo blanco */}
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200"> {/* Fondo rojo muy claro y borde rojo claro */}
                      <div className="flex-shrink-0">
                        <InformationCircleIcon className="h-6 w-6 text-red-500" /> 
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">{alert.message}</p> {/* Texto negro/gris oscuro */}
                        <p className="text-xs text-gray-500">{alert.timestamp}</p> {/* Texto gris */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}