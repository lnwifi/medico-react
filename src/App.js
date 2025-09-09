import React, { useState } from 'react';
import './styles.css';
import Header from './components/Header';
import Calculadora from './components/Calculadora';
import Diagnosticos from './components/Diagnosticos';
import DiagnosticoAvanzado from './components/DiagnosticoAvanzado';
import Protocolos from './components/Protocolos';
import Emergencias from './components/Emergencias';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';

function App() {
  const [activeSection, setActiveSection] = useState('calculadora');

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main">
        {activeSection === 'calculadora' && <Calculadora />}
        {activeSection === 'diagnosticos' && <Diagnosticos />}
        {activeSection === 'diagnostico-avanzado' && <DiagnosticoAvanzado />}
        {activeSection === 'protocolos' && <Protocolos />}
        {activeSection === 'emergencias' && <Emergencias />}
      </main>
      
      <Footer />
      <InstallPWA />
    </div>
  );
}

export default App;
