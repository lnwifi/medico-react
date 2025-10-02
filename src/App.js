import React, { useState, useEffect } from 'react';
import './styles.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { HistoryProvider } from './contexts/HistoryContext';
import Header from './components/Header';
import Calculadora from './components/Calculadora';
import Diagnosticos from './components/Diagnosticos';
import DiagnosticoAvanzado from './components/DiagnosticoAvanzado';
import Protocolos from './components/Protocolos';
import Emergencias from './components/Emergencias';
import VacunacionAvanzada from './components/VacunacionAvanzada';
import AlgoritmosEmergencia from './components/AlgoritmosEmergencia';
import History from './components/History';
import RutasVisitas from './components/RutasVisitas';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import { googleSheetsService } from './services/googleSheetsService';

function App() {
  const [activeSection, setActiveSection] = useState('calculadora');
  const [initialSearch, setInitialSearch] = useState('');

  // Verificar recordatorios al cargar la app
  useEffect(() => {
    const verificarRecordatoriosInicio = async () => {
      try {
        const hoy = new Date().toISOString().split('T')[0];
        const ultimaVerificacion = localStorage.getItem('ultimaVerificacionRecordatorios');

        // Solo mostrar si no se ha verificado hoy
        if (ultimaVerificacion === hoy) {
          return;
        }

        const pacientes = await googleSheetsService.obtenerPacientes();
        const programadas = JSON.parse(localStorage.getItem('visitasProgramadas') || '{}');

        const hoyStr = hoy;
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        const mananaStr = manana.toISOString().split('T')[0];

        const recordatoriosHoy = [];
        const recordatoriosManana = [];

        Object.keys(programadas).forEach(pacienteId => {
          const visita = programadas[pacienteId];
          const paciente = pacientes.find(p => p.id === parseInt(pacienteId));

          if (paciente) {
            if (visita.fecha === hoyStr) {
              recordatoriosHoy.push(paciente.nombre);
            } else if (visita.fecha === mananaStr) {
              recordatoriosManana.push(paciente.nombre);
            }
          }
        });

        let mensaje = '';

        if (recordatoriosHoy.length > 0) {
          mensaje += `🔔 VISITAS PROGRAMADAS PARA HOY:\n\n${recordatoriosHoy.join('\n')}`;
        }

        if (recordatoriosManana.length > 0) {
          if (mensaje) mensaje += '\n\n';
          mensaje += `⏰ RECORDATORIO - Visitas para MAÑANA:\n\n${recordatoriosManana.join('\n')}`;
        }

        if (mensaje) {
          alert(mensaje);
          // Marcar que ya se verificó hoy
          localStorage.setItem('ultimaVerificacionRecordatorios', hoy);
        }
      } catch (error) {
        console.error('Error al verificar recordatorios:', error);
      }
    };

    verificarRecordatoriosInicio();
  }, []);

  return (
    <ThemeProvider>
      <HistoryProvider>
        <div className="App">
          <Header activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <main className="main">
            {activeSection === 'calculadora' && <Calculadora initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'diagnosticos' && <Diagnosticos initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'diagnostico-avanzado' && <DiagnosticoAvanzado />}
            {activeSection === 'protocolos' && <Protocolos initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'emergencias' && <Emergencias initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'algoritmos' && <AlgoritmosEmergencia initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'vacunacion' && <VacunacionAvanzada initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'historial' && <History setActiveSection={setActiveSection} setInitialSearch={setInitialSearch} />}
            {activeSection === 'rutas' ? <RutasVisitas /> : null}
          </main>
          
          <Footer />
          <InstallPWA />
        </div>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
