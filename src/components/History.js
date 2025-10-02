import React, { useState } from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { useTheme } from '../contexts/ThemeContext';
import ConsultationModal from './ConsultationModal';

const History = ({ setActiveSection, setInitialSearch }) => {
  const { consultHistory, clearHistory, removeFromHistory } = useHistory();
  const { colors } = useTheme();
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (item) => {
    // Si tiene datos completos, mostrar modal
    if (item.fullData) {
      setSelectedConsultation(item);
      setShowModal(true);
    } else {
      // Fallback al comportamiento anterior
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
      } else if (item.type === 'vacunacion') {
        setInitialSearch(item.name);
        setActiveSection('vacunacion');
      } else if (item.type === 'algoritmo') {
        setInitialSearch(item.name);
        setActiveSection('algoritmos');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConsultation(null);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medicamento': return '💊';
      case 'diagnostico': return '🔍';
      case 'protocolo': return '📋';
      case 'emergencia': return '🚨';
      case 'vacunacion': return '💉';
      case 'algoritmo': return '🚨';
      default: return '📝';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'medicamento': return 'Medicamento';
      case 'diagnostico': return 'Diagnóstico';
      case 'protocolo': return 'Protocolo';
      case 'emergencia': return 'Emergencia';
      case 'vacunacion': return 'Vacunación';
      case 'algoritmo': return 'Algoritmo';
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
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(20px, 5vw, 28px)' }}>📋 Historial de Consultas</h2>
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
                fontSize: '14px',
                whiteSpace: 'nowrap'
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
                  padding: '15px',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  gap: '10px'
                }}
                onClick={() => handleItemClick(item)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surfaceVariant;
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surface;
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(16px, 4vw, 18px)',
                      color: colors.text,
                      wordBreak: 'break-word'
                    }}>
                      {item.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginTop: '8px',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      color: colors.textSecondary,
                      alignItems: 'center'
                    }}>
                      <span>{getTypeName(item.type)}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                      {item.fullData && (
                        <>
                          <span>•</span>
                          <span style={{
                            backgroundColor: colors.primary,
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            DETALLADO
                          </span>
                        </>
                      )}
                    </div>
                    {item.details && (
                      <div style={{
                        fontSize: 'clamp(11px, 3vw, 13px)',
                        color: colors.textSecondary,
                        marginTop: '5px',
                        fontStyle: 'italic',
                        wordBreak: 'break-word'
                      }}>
                        {item.details}
                      </div>
                    )}
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
                    fontSize: '18px',
                    flexShrink: 0
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

      {/* Modal para mostrar detalles de la consulta */}
      <ConsultationModal 
        consultation={selectedConsultation}
        isOpen={showModal}
        onClose={closeModal}
      />
    </div>
  );
};

export default History;