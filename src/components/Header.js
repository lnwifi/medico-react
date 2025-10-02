import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ activeSection, setActiveSection }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="logo">🏥 PediaEmergencias AR</h1>
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
            <button 
              className={`nav-btn ${activeSection === 'calculadora' ? 'active' : ''}`}
              onClick={() => handleNavClick('calculadora')}
            >
              Calculadora
            </button>
            <button 
              className={`nav-btn ${activeSection === 'diagnosticos' ? 'active' : ''}`}
              onClick={() => handleNavClick('diagnosticos')}
            >
              Diagnósticos
            </button>
            <button 
              className={`nav-btn ${activeSection === 'diagnostico-avanzado' ? 'active' : ''}`}
              onClick={() => handleNavClick('diagnostico-avanzado')}
            >
              Diagnóstico Avanzado
            </button>
            <button 
              className={`nav-btn ${activeSection === 'protocolos' ? 'active' : ''}`}
              onClick={() => handleNavClick('protocolos')}
            >
              Protocolos
            </button>
            <button 
              className={`nav-btn ${activeSection === 'emergencias' ? 'active' : ''}`}
              onClick={() => handleNavClick('emergencias')}
            >
              Emergencias
            </button>
            <button 
              className={`nav-btn ${activeSection === 'algoritmos' ? 'active' : ''}`}
              onClick={() => handleNavClick('algoritmos')}
            >
              Algoritmos
            </button>
            <button 
              className={`nav-btn ${activeSection === 'vacunacion' ? 'active' : ''}`}
              onClick={() => handleNavClick('vacunacion')}
            >
              Vacunación
            </button>
            <button
              className={`nav-btn ${activeSection === 'historial' ? 'active' : ''}`}
              onClick={() => handleNavClick('historial')}
            >
              Historial
            </button>
            <button
              className={`nav-btn ${activeSection === 'rutas' ? 'active' : ''}`}
              onClick={() => handleNavClick('rutas')}
            >
              🗺️ Rutas
            </button>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
              <span>{isDarkMode ? 'Claro' : 'Oscuro'}</span>
            </button>
            <div className="menu-footer">
              App creada con mucho ❤️ por Lucas Navarro
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay para menú móvil */}
      <div 
        className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;