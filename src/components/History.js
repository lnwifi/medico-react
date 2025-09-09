import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { useTheme } from '../contexts/ThemeContext';

const History = ({ setActiveSection, setInitialSearch }) => {
  const { consultHistory, clearHistory, removeFromHistory } = useHistory();
  const { colors } = useTheme();

  const handleItemClick = (item) => {
    if (item.type === 'medicamento') {
      setInitialSearch(item.name);
      setActiveSection('calculadora');
    } else if (item.type === 'diagnostico') {
      setInitialSearch(item.name);
      setActiveSection('diagnosticos');
    } else if (item.type === 'protocolo') {
      setInitialSearch(item.name);
      setActiveSection('protocolos');
    } else if (item.type === 'emergencia') {
      setInitialSearch(item.name);
      setActiveSection('emergencias');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medicamento': return '💊';
      case 'diagnostico': return '🔍';
      case 'protocolo': return '📋';
      case 'emergencia': return '🚨';
      default: return '📝';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'medicamento': return 'Medicamento';
      case 'diagnostico': return 'Diagnóstico';
      case 'protocolo': return 'Protocolo';
      case 'emergencia': return 'Emergencia';
      default: return 'Consulta';
    }
  };

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      color: colors.text,
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2>📋 Historial de Consultas</h2>
          {consultHistory.length > 0 && (
            <button
              onClick={clearHistory}
              style={{
                backgroundColor: colors.error,
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Limpiar Historial
            </button>
          )}
        </div>

        {consultHistory.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: colors.surface,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <h3 style={{ color: colors.textSecondary, marginBottom: '10px' }}>
              No hay consultas en el historial
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Cuando realices búsquedas de medicamentos, diagnósticos o protocolos, aparecerán aquí
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {consultHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: colors.surface,
                  padding: '20px',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleItemClick(item)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.surfaceVariant;
                  e.target.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.surface;
                  e.target.style.borderColor = colors.border;
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                  <div style={{ fontSize: '24px' }}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '18px',
                      color: colors.text
                    }}>
                      {item.name}
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      gap: '15px', 
                      marginTop: '5px',
                      fontSize: '14px',
                      color: colors.textSecondary
                    }}>
                      <span>{getTypeName(item.type)}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(item.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: colors.textSecondary,
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.error;
                    e.target.style.backgroundColor = colors.surfaceVariant;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = colors.textSecondary;
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;