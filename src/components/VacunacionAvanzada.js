import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useHistory } from '../contexts/HistoryContext';
import { 
  calendarioNinosCompleto,
  calendarioAdultos, 
  calendarioEmbarazadas,
  gruposEspeciales,
  getVacunasEsperadasHastaEdad,
  calcularVacunasFaltantes
} from '../data/vacunacion';

const VacunacionAvanzada = ({ initialSearch, setInitialSearch }) => {
  const { colors } = useTheme();
  const { addToHistory } = useHistory();
  
  const [categoria, setCategoria] = useState('ninos');
  const [edadPaciente, setEdadPaciente] = useState('');
  const [unidadEdad, setUnidadEdad] = useState('meses');
  const [vacunasAplicadas, setVacunasAplicadas] = useState(new Set());
  const [mostrarFaltantes, setMostrarFaltantes] = useState(false);
  const [vacunasFaltantes, setVacunasFaltantes] = useState([]);
  const [pacienteData, setPacienteData] = useState(null);

  // Función para convertir edad a meses
  const convertirEdadAMeses = (edad, unidad) => {
    const edadNum = parseInt(edad);
    if (!edadNum) return 0;
    
    switch (unidad) {
      case 'dias': return edadNum / 30;
      case 'meses': return edadNum;
      case 'anos': return edadNum * 12;
      default: return edadNum;
    }
  };

  // Calcular vacunas faltantes cuando cambia la edad o las vacunas aplicadas
  useEffect(() => {
    if (categoria === 'ninos' && edadPaciente) {
      const edadEnMeses = convertirEdadAMeses(edadPaciente, unidadEdad);
      const faltantes = calcularVacunasFaltantes(edadEnMeses, Array.from(vacunasAplicadas));
      setVacunasFaltantes(faltantes);
      
      setPacienteData({
        edad: edadPaciente,
        unidad: unidadEdad,
        edadEnMeses: edadEnMeses,
        totalVacunasEsperadas: getVacunasEsperadasHastaEdad(edadEnMeses).length,
        vacunasAplicadas: vacunasAplicadas.size,
        vacunasFaltantes: faltantes.length
      });
    }
  }, [categoria, edadPaciente, unidadEdad, vacunasAplicadas]);

  const toggleVacunaAplicada = (vacunaId) => {
    const nuevasVacunas = new Set(vacunasAplicadas);
    if (nuevasVacunas.has(vacunaId)) {
      nuevasVacunas.delete(vacunaId);
    } else {
      nuevasVacunas.add(vacunaId);
    }
    setVacunasAplicadas(nuevasVacunas);
  };

  const calcularEstadoVacunacion = () => {
    if (!pacienteData) return { estado: 'sin_datos', porcentaje: 0, color: colors.textSecondary };
    
    const porcentaje = (pacienteData.vacunasAplicadas / pacienteData.totalVacunasEsperadas) * 100;
    
    if (porcentaje >= 100) {
      return { estado: 'completo', porcentaje: 100, color: '#4caf50' };
    } else if (porcentaje >= 80) {
      return { estado: 'casi_completo', porcentaje, color: '#ff9800' };
    } else if (porcentaje >= 50) {
      return { estado: 'parcial', porcentaje, color: '#2196f3' };
    } else {
      return { estado: 'incompleto', porcentaje, color: '#f44336' };
    }
  };

  const getCalendarioActual = () => {
    switch (categoria) {
      case 'ninos': return calendarioNinosCompleto;
      case 'adultos': return calendarioAdultos;
      case 'embarazadas': return calendarioEmbarazadas;
      default: return {};
    }
  };

  const resetearDatos = () => {
    setVacunasAplicadas(new Set());
    setEdadPaciente('');
    setMostrarFaltantes(false);
    setPacienteData(null);
  };

  const generarResumen = () => {
    if (!pacienteData) return null;
    
    const estadoVacunacion = calcularEstadoVacunacion();
    
    addToHistory({
      type: 'vacunacion',
      name: `Paciente ${pacienteData.edad} ${pacienteData.unidad}`,
      details: `${pacienteData.vacunasAplicadas}/${pacienteData.totalVacunasEsperadas} vacunas - ${estadoVacunacion.estado}`,
      fullData: {
        categoria,
        paciente: pacienteData,
        estadoVacunacion,
        vacunasFaltantes: vacunasFaltantes.length > 0 ? vacunasFaltantes : null
      }
    });
  };

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      color: colors.text,
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: colors.surface,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ color: colors.primary, marginBottom: '10px' }}>
            💉 Control de Vacunación Avanzado
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '16px' }}>
            Seguimiento personalizado del esquema de vacunación
          </p>
        </div>

        {/* Selector de categoría */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: colors.surface,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{ color: colors.text, marginBottom: '15px' }}>
            👥 Seleccionar categoría de paciente
          </h3>
          <div style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'ninos', label: 'Niños (0-17 años)', icon: '👶' },
              { key: 'adultos', label: 'Adultos (18+ años)', icon: '👤' },
              { key: 'embarazadas', label: 'Embarazadas', icon: '🤱' }
            ].map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  setCategoria(cat.key);
                  resetearDatos();
                }}
                style={{
                  backgroundColor: categoria === cat.key ? colors.primary : colors.surfaceVariant,
                  color: categoria === cat.key ? 'white' : colors.text,
                  border: `2px solid ${categoria === cat.key ? colors.primary : colors.border}`,
                  padding: '15px 25px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: categoria === cat.key ? 'bold' : 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Configuración de paciente */}
        {categoria === 'ninos' && (
          <div style={{
            marginBottom: '25px',
            backgroundColor: colors.surface,
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <h3 style={{ color: colors.text, marginBottom: '15px' }}>
              📊 Datos del paciente
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{ color: colors.text, fontSize: '14px', fontWeight: 'bold' }}>
                  Edad del paciente:
                </label>
                <input
                  type="number"
                  value={edadPaciente}
                  onChange={(e) => setEdadPaciente(e.target.value)}
                  min="0"
                  max={unidadEdad === 'anos' ? 17 : (unidadEdad === 'meses' ? 204 : 6000)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginTop: '5px',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '6px',
                    backgroundColor: colors.surfaceVariant,
                    color: colors.text,
                    fontSize: '16px'
                  }}
                  placeholder="Ej: 6"
                />
              </div>
              <div>
                <label style={{ color: colors.text, fontSize: '14px', fontWeight: 'bold' }}>
                  Unidad:
                </label>
                <select
                  value={unidadEdad}
                  onChange={(e) => setUnidadEdad(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginTop: '5px',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '6px',
                    backgroundColor: colors.surfaceVariant,
                    color: colors.text,
                    fontSize: '16px'
                  }}
                >
                  <option value="dias">Días</option>
                  <option value="meses">Meses</option>
                  <option value="anos">Años</option>
                </select>
              </div>
              <div>
                <button
                  onClick={generarResumen}
                  disabled={!pacienteData}
                  style={{
                    backgroundColor: pacienteData ? colors.success : colors.textSecondary,
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    cursor: pacienteData ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  📋 Guardar en Historial
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Estado de vacunación */}
        {pacienteData && (
          <div style={{
            marginBottom: '25px',
            backgroundColor: colors.surface,
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`
          }}>
            <h3 style={{ color: colors.text, marginBottom: '15px' }}>
              📈 Estado de vacunación
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: calcularEstadoVacunacion().color,
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  {Math.round(calcularEstadoVacunacion().porcentaje)}%
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Esquema completado
                </div>
              </div>
              <div style={{
                backgroundColor: colors.surfaceVariant,
                padding: '20px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '24px', color: colors.primary, marginBottom: '5px' }}>
                  {pacienteData.vacunasAplicadas} / {pacienteData.totalVacunasEsperadas}
                </div>
                <div style={{ color: colors.text, fontSize: '14px' }}>
                  Vacunas aplicadas
                </div>
              </div>
              <div style={{
                backgroundColor: colors.surfaceVariant,
                padding: '20px',
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '24px', color: colors.error, marginBottom: '5px' }}>
                  {pacienteData.vacunasFaltantes}
                </div>
                <div style={{ color: colors.text, fontSize: '14px' }}>
                  Vacunas faltantes
                </div>
                <button
                  onClick={() => setMostrarFaltantes(!mostrarFaltantes)}
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.error,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline',
                    marginTop: '5px'
                  }}
                >
                  {mostrarFaltantes ? 'Ocultar' : 'Ver detalles'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de vacunas faltantes */}
        {mostrarFaltantes && vacunasFaltantes.length > 0 && (
          <div style={{
            marginBottom: '25px',
            backgroundColor: '#ffebee',
            border: `2px solid ${colors.error}`,
            padding: '20px',
            borderRadius: '12px'
          }}>
            <h3 style={{ color: colors.error, marginBottom: '15px' }}>
              ⚠️ Vacunas pendientes (Urgente)
            </h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {vacunasFaltantes.map((vacuna) => (
                <div
                  key={vacuna.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.error}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ color: colors.error }}>
                      💉 {vacuna.nombre}
                    </strong>
                    <div style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '3px' }}>
                      {vacuna.enfermedad} - {vacuna.edadNombre}
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: colors.error,
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {vacuna.prioridad === 'alta' ? 'URGENTE' : 'PENDIENTE'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendario de vacunas */}
        <div style={{
          backgroundColor: colors.surface,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{ color: colors.text, marginBottom: '20px' }}>
            📅 Calendario de vacunación - {categoria === 'ninos' ? 'Niños' : categoria === 'adultos' ? 'Adultos' : 'Embarazadas'}
          </h3>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {Object.entries(getCalendarioActual()).map(([key, grupo]) => (
              <div
                key={key}
                style={{
                  backgroundColor: colors.surfaceVariant,
                  padding: '20px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`
                }}
              >
                <h4 style={{ 
                  color: colors.primary,
                  marginBottom: '15px',
                  fontSize: '18px'
                }}>
                  📍 {grupo.nombre}
                </h4>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  {grupo.vacunas.map((vacuna) => {
                    const estaAplicada = vacunasAplicadas.has(vacuna.id);
                    
                    return (
                      <div
                        key={vacuna.id}
                        style={{
                          backgroundColor: estaAplicada ? '#e8f5e9' : colors.background,
                          border: `2px solid ${estaAplicada ? '#4caf50' : colors.border}`,
                          padding: '15px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px'
                        }}
                      >
                        {categoria === 'ninos' && (
                          <input
                            type="checkbox"
                            checked={estaAplicada}
                            onChange={() => toggleVacunaAplicada(vacuna.id)}
                            style={{
                              width: '20px',
                              height: '20px',
                              cursor: 'pointer'
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '5px'
                          }}>
                            <strong style={{ color: colors.text, fontSize: '16px' }}>
                              💉 {vacuna.nombre}
                            </strong>
                            {estaAplicada && (
                              <span style={{
                                backgroundColor: '#4caf50',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>
                                ✓ APLICADA
                              </span>
                            )}
                          </div>
                          <div style={{ color: colors.textSecondary, fontSize: '14px' }}>
                            <strong>Enfermedad:</strong> {vacuna.enfermedad}
                          </div>
                          <div style={{ color: colors.textSecondary, fontSize: '14px' }}>
                            <strong>Dosis:</strong> {vacuna.dosis}
                          </div>
                          <div style={{ color: colors.textSecondary, fontSize: '14px' }}>
                            <strong>Vía:</strong> {vacuna.via} - <strong>Sitio:</strong> {vacuna.sitio}
                          </div>
                          {vacuna.momento && (
                            <div style={{ color: colors.textSecondary, fontSize: '14px' }}>
                              <strong>Momento:</strong> {vacuna.momento}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grupos especiales */}
        <div style={{
          backgroundColor: colors.surface,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginTop: '20px'
        }}>
          <h3 style={{ color: colors.primary, marginBottom: '20px' }}>
            🏥 Grupos Especiales
          </h3>
          
          {Object.entries(gruposEspeciales).map(([key, data]) => (
            <div key={key} style={{
              backgroundColor: colors.surfaceVariant,
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              border: `1px solid ${colors.border}`
            }}>
              <h4 style={{ color: colors.text, marginBottom: '10px' }}>
                {data.nombre}
              </h4>
              <ul style={{ color: colors.textSecondary, fontSize: '14px', marginLeft: '20px' }}>
                {data.observaciones.map((obs, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VacunacionAvanzada;