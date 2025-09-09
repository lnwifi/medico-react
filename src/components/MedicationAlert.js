import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MedicationAlert = ({ medicamento, alertas }) => {
  const { colors } = useTheme();

  if (!alertas) return null;

  const { contraindicaciones, precauciones, alergias } = alertas;

  return (
    <div style={{
      backgroundColor: colors.surfaceVariant,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '20px',
      marginTop: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        color: colors.warning
      }}>
        <span style={{ fontSize: '24px', marginRight: '10px' }}>⚠️</span>
        <h3 style={{ margin: 0, fontSize: '18px' }}>
          Alertas Médicas - {medicamento}
        </h3>
      </div>

      {contraindicaciones && contraindicaciones.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ 
            color: colors.error,
            fontSize: '16px',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            🚫 Contraindicaciones
          </h4>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: colors.text
          }}>
            {contraindicaciones.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {precauciones && precauciones.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ 
            color: colors.warning,
            fontSize: '16px',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            ⚡ Precauciones
          </h4>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: colors.text
          }}>
            {precauciones.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {alergias && alergias.length > 0 && (
        <div>
          <h4 style={{ 
            color: colors.error,
            fontSize: '16px',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            🤧 Reacciones Alérgicas
          </h4>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: colors.text
          }}>
            {alergias.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{
        backgroundColor: colors.info,
        color: 'white',
        padding: '12px',
        borderRadius: '6px',
        marginTop: '15px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '18px', marginRight: '8px' }}>💡</span>
        <span>
          <strong>Recordatorio:</strong> Siempre verificar alergias del paciente y considerar condiciones médicas preexistentes antes de prescribir.
        </span>
      </div>
    </div>
  );
};

export default MedicationAlert;