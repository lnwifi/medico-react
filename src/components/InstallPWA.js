import React, { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setIsInstalled(false);
      }, 3000);
    };

    // Detectar si ya está instalada
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        setIsInstalled(true);
        // Ocultar el mensaje después de 2 segundos si ya está instalada
        setTimeout(() => {
          setIsInstalled(false);
        }, 2000);
        return;
      }
      
      // Mostrar después de 10 segundos si no hay prompt automático
      setTimeout(() => {
        if (!isInstallable && !isInstalled) {
          setShowManualInstructions(true);
        }
      }, 10000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);
    
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const getManualInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    
    if (isIOS) {
      return {
        title: '📱 Instalar en iOS',
        steps: ['1. Toca el botón "Compartir" 📤', '2. Selecciona "Agregar a pantalla de inicio"', '3. Confirma la instalación']
      };
    } else if (isAndroid) {
      return {
        title: '📱 Instalar en Android',
        steps: ['1. Toca menú ⋮ (3 puntos)', '2. Selecciona "Agregar a pantalla de inicio"', '3. Confirma la instalación']
      };
    } else if (isChrome) {
      return {
        title: '💻 Instalar en Chrome',
        steps: ['1. Busca ícono de instalación en barra de direcciones', '2. O menú ⋮ → "Instalar aplicación"', '3. Confirma la instalación']
      };
    } else {
      return {
        title: '💻 Instalar aplicación',
        steps: ['1. Busca opción "Instalar" o "Agregar a inicio"', '2. En el menú del navegador', '3. Confirma la instalación']
      };
    }
  };

  if (isInstalled) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#4CAF50',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 1000,
        maxWidth: '300px'
      }}>
        <div>
          <strong>✅ App Instalada</strong>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '14px' }}>
          PediaEmergencias está instalada y funciona offline
        </p>
      </div>
    );
  }

  if (!isInstallable && !showManualInstructions) return null;

  const instructions = getManualInstructions();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: isInstallable ? '#2196F3' : '#FF9800',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 1000,
      maxWidth: '320px'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>
          {isInstallable ? '📱 Instalar App' : instructions.title}
        </strong>
      </div>
      
      {isInstallable ? (
        <>
          <p style={{ margin: '0 0 15px', fontSize: '14px' }}>
            Instala PediaEmergencias para acceso rápido offline
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleInstallClick}
              style={{
                background: 'white',
                color: '#2196F3',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Instalar Ahora
            </button>
            <button
              onClick={() => setIsInstallable(false)}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Después
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: '13px', lineHeight: '1.4', marginBottom: '15px' }}>
            {instructions.steps.map((step, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {step}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowManualInstructions(false)}
              style={{
                background: 'white',
                color: '#FF9800',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Entendido
            </button>
            <button
              onClick={() => window.open('/INSTALACION_MANUAL.md', '_blank')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Más info
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InstallPWA;