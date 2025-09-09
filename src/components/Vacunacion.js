import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useHistory } from '../contexts/HistoryContext';
import { calendarioVacunacion, gruposEspeciales } from '../data/vacunacion';

const Vacunacion = ({ initialSearch, setInitialSearch }) => {
  const { colors } = useTheme();
  const { addToHistory } = useHistory();
  const [selectedAge, setSelectedAge] = useState('');
  const [expandedVaccine, setExpandedVaccine] = useState(null);
  const [showSpecialGroups, setShowSpecialGroups] = useState(false);

  // Manejar búsqueda inicial desde historial
  React.useEffect(() => {
    if (initialSearch) {
      const foundAge = Object.keys(calendarioVacunacion).find(key => 
        calendarioVacunacion[key].nombre.toLowerCase().includes(initialSearch.toLowerCase())
      );
      if (foundAge) {
        setSelectedAge(foundAge);
      }
      setInitialSearch('');
    }
  }, [initialSearch, setInitialSearch]);

  const handleAgeSelect = (ageKey) => {
    setSelectedAge(ageKey);
    const ageData = calendarioVacunacion[ageKey];
    addToHistory({
      type: 'vacunacion',
      name: ageData.nombre,
      details: `${ageData.vacunas.length} vacuna(s) programada(s)`
    });
  };

  const toggleVaccineDetails = (index) => {
    setExpandedVaccine(expandedVaccine === index ? null : index);
  };

  const getAgeColor = (ageKey) => {
    if (ageKey === 'recien_nacido') return '#e91e63';
    if (['2_meses', '4_meses', '6_meses'].includes(ageKey)) return '#2196f3';
    if (['12_meses', '15_meses', '15_18_meses', '18_meses'].includes(ageKey)) return '#ff9800';
    if (ageKey === '5_6_anos') return '#4caf50';
    if (ageKey === '11_anos') return '#9c27b0';
    return '#607d8b';
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
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: colors.surface,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ color: colors.primary, marginBottom: '10px' }}>
            💉 Calendario Nacional de Vacunación
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '16px' }}>
            República Argentina - Actualizado 2024
          </p>
        </div>

        {/* Selector de edad */}
        <div style={{
          marginBottom: '30px',
          backgroundColor: colors.surface,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{ color: colors.text, marginBottom: '15px' }}>
            📅 Seleccionar edad
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px'
          }}>
            {Object.entries(calendarioVacunacion).map(([key, data]) => (
              <button
                key={key}
                onClick={() => handleAgeSelect(key)}
                style={{
                  backgroundColor: selectedAge === key ? getAgeColor(key) : colors.surfaceVariant,
                  color: selectedAge === key ? 'white' : colors.text,
                  border: `2px solid ${selectedAge === key ? getAgeColor(key) : colors.border}`,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedAge === key ? 'bold' : 'normal',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedAge !== key) {
                    e.target.style.backgroundColor = colors.surfaceVariant;
                    e.target.style.borderColor = getAgeColor(key);
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAge !== key) {
                    e.target.style.backgroundColor = colors.surfaceVariant;
                    e.target.style.borderColor = colors.border;
                  }
                }}
              >
                {data.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Botón para grupos especiales */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button
            onClick={() => setShowSpecialGroups(!showSpecialGroups)}
            style={{
              backgroundColor: colors.secondary,
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {showSpecialGroups ? '📋 Ocultar' : '🏥 Ver'} Grupos Especiales
          </button>
        </div>

        {/* Información de la edad seleccionada */}
        {selectedAge && (
          <div style={{
            backgroundColor: colors.surface,
            padding: '25px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginBottom: '20px'
          }}>
            <div style={{
              borderLeft: `5px solid ${getAgeColor(selectedAge)}`,
              paddingLeft: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                color: getAgeColor(selectedAge),
                fontSize: '24px',
                margin: 0
              }}>
                {calendarioVacunacion[selectedAge].nombre}
              </h3>
              <p style={{ 
                color: colors.textSecondary,
                margin: '5px 0 0 0',
                fontSize: '16px'
              }}>
                Edad: {calendarioVacunacion[selectedAge].edad}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '15px'
            }}>
              {calendarioVacunacion[selectedAge].vacunas.map((vacuna, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: colors.surfaceVariant,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onClick={() => toggleVaccineDetails(index)}
                  >
                    <div>
                      <h4 style={{ 
                        color: colors.primary,
                        margin: 0,
                        fontSize: '18px'
                      }}>
                        💉 {vacuna.nombre}
                      </h4>
                      <p style={{ 
                        color: colors.text,
                        margin: '5px 0',
                        fontSize: '14px'
                      }}>
                        {vacuna.enfermedad} - {vacuna.dosis}
                      </p>
                    </div>
                    <span style={{
                      color: colors.textSecondary,
                      fontSize: '18px',
                      transform: expandedVaccine === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}>
                      ▼
                    </span>
                  </div>

                  {expandedVaccine === index && (
                    <div style={{
                      padding: '0 20px 20px',
                      borderTop: `1px solid ${colors.border}`,
                      backgroundColor: colors.background
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginTop: '15px'
                      }}>
                        <div>
                          <strong style={{ color: colors.text }}>Vía:</strong>
                          <p style={{ color: colors.textSecondary, margin: '3px 0' }}>
                            {vacuna.via}
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: colors.text }}>Sitio:</strong>
                          <p style={{ color: colors.textSecondary, margin: '3px 0' }}>
                            {vacuna.sitio}
                          </p>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <strong style={{ color: colors.text }}>Observaciones:</strong>
                          <p style={{ 
                            color: colors.textSecondary,
                            margin: '3px 0',
                            fontSize: '14px',
                            lineHeight: '1.4'
                          }}>
                            {vacuna.observaciones}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grupos especiales */}
        {showSpecialGroups && (
          <div style={{
            backgroundColor: colors.surface,
            padding: '25px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginBottom: '20px'
          }}>
            <h3 style={{ color: colors.primary, marginBottom: '20px' }}>
              🏥 Grupos Especiales
            </h3>
            
            {Object.entries(gruposEspeciales).map(([key, data]) => (
              <div key={key} style={{
                backgroundColor: colors.surfaceVariant,
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '15px',
                border: `1px solid ${colors.border}`
              }}>
                <h4 style={{ color: colors.text, marginBottom: '15px' }}>
                  {data.nombre}
                </h4>
                
                {data.vacunas && data.vacunas.map((vacuna, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong style={{ color: colors.primary }}>
                      {vacuna.nombre}:
                    </strong>
                    <span style={{ color: colors.text, marginLeft: '10px' }}>
                      {vacuna.momento}
                    </span>
                    <p style={{ 
                      color: colors.textSecondary,
                      fontSize: '14px',
                      margin: '5px 0',
                      paddingLeft: '20px'
                    }}>
                      {vacuna.observaciones}
                    </p>
                  </div>
                ))}
                
                {data.observaciones && (
                  <ul style={{ color: colors.textSecondary, fontSize: '14px', marginTop: '10px' }}>
                    {data.observaciones.map((obs, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>
                        {obs}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {!selectedAge && !showSpecialGroups && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: colors.surface,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📅</div>
            <h3 style={{ color: colors.textSecondary, marginBottom: '10px' }}>
              Selecciona una edad para ver las vacunas
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Haz clic en una edad del calendario o explora los grupos especiales
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacunacion;