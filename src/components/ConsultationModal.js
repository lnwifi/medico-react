import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ConsultationModal = ({ consultation, isOpen, onClose }) => {
  const { colors } = useTheme();

  if (!isOpen || !consultation) return null;

  const { fullData } = consultation;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      padding: '20px'
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: colors.surface,
          borderRadius: '16px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          border: `1px solid ${colors.border}`,
          boxShadow: `0 10px 30px ${colors.shadow}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: `2px solid ${colors.border}`
        }}>
          <h2 style={{
            margin: 0,
            color: colors.primary,
            fontSize: '24px'
          }}>
            📊 Detalle de Consulta
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: colors.textSecondary,
              padding: '5px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Información del paciente */}
        <div style={{
          backgroundColor: colors.surfaceVariant,
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            color: colors.text,
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            👤 Información del Paciente
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            color: colors.text
          }}>
            <div>
              <strong>Peso:</strong> {fullData.peso} kg
            </div>
            {fullData.edad && (
              <div>
                <strong>Edad:</strong> {fullData.edad}
              </div>
            )}
            <div>
              <strong>Fecha:</strong> {consultation.date}
            </div>
          </div>
        </div>

        {/* Medicamento y presentación */}
        <div style={{
          backgroundColor: colors.surfaceVariant,
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            color: colors.text,
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            💊 Medicamento
          </h3>
          <div style={{ color: colors.text }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Medicamento:</strong> {fullData.medicamento}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Presentación:</strong> {fullData.presentacion}
            </div>
            {fullData.indicaciones && (
              <div>
                <strong>Indicaciones:</strong> {fullData.indicaciones.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Dosis calculada */}
        <div style={{
          backgroundColor: colors.primary,
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            color: 'white',
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            📏 Dosis Calculada
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px'
          }}>
            <div>
              <strong>Dosis:</strong> {fullData.dosis.dosisMg} mg
            </div>
            <div>
              <strong>Volumen:</strong> {fullData.dosis.dosisMl} ml
            </div>
            <div>
              <strong>Concentración:</strong> {fullData.dosis.concentracion} mg/ml
            </div>
            <div>
              <strong>Intervalo:</strong> Cada {fullData.dosis.intervalo} horas
            </div>
            {fullData.dosis.maxDosis && (
              <div>
                <strong>Máximo:</strong> {fullData.dosis.maxDosis} dosis/día
              </div>
            )}
          </div>
        </div>

        {/* Validación y advertencias */}
        {fullData.validacion && fullData.validacion.advertencias && fullData.validacion.advertencias.length > 0 && (
          <div style={{
            backgroundColor: colors.warning,
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              color: 'white',
              marginBottom: '15px',
              fontSize: '18px'
            }}>
              ⚠️ Advertencias
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {fullData.validacion.advertencias.map((adv, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {adv}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
          marginTop: '25px'
        }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: colors.surface,
              border: `2px solid ${colors.border}`,
              color: colors.text,
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.surfaceVariant;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.surface;
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;