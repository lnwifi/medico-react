import React, { useState } from 'react';
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
import History from './components/History';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';

function App() {
  const [activeSection, setActiveSection] = useState('calculadora');
  const [initialSearch, setInitialSearch] = useState('');

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
            {activeSection === 'vacunacion' && <VacunacionAvanzada initialSearch={initialSearch} setInitialSearch={setInitialSearch} />}
            {activeSection === 'historial' && <History setActiveSection={setActiveSection} setInitialSearch={setInitialSearch} />}
          </main>
          
          <Footer />
          <InstallPWA />
        </div>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
