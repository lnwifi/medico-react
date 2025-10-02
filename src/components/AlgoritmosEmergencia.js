import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useHistory } from '../contexts/HistoryContext';
import { algoritmosEmergencia, categorias } from '../data/algoritmosEmergencia';

const AlgoritmosEmergencia = ({ initialSearch, setInitialSearch }) => {
  const { colors } = useTheme();
  const { addToHistory } = useHistory();
  
  const [algoritmoActivo, setAlgoritmoActivo] = useState(null);
  const [pasoActual, setPasoActual] = useState(0);
  const [cronometro, setCronometro] = useState(0);
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [tiemposPasos, setTiemposPasos] = useState({});
  const [edadPaciente, setEdadPaciente] = useState('');
  const intervalRef = useRef(null);

  // Cronómetro
  useEffect(() => {
    if (cronometroActivo) {
      intervalRef.current = setInterval(() => {
        setCronometro(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [cronometroActivo]);

  // Búsqueda inicial
  useEffect(() => {
    if (initialSearch) {
      const algoritmo = Object.values(algoritmosEmergencia).find(alg => 
        alg.nombre.toLowerCase().includes(initialSearch.toLowerCase())
      );
      if (algoritmo) {
        setAlgoritmoActivo(algoritmo);
      }
      setInitialSearch('');
    }
  }, [initialSearch, setInitialSearch]);

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const iniciarAlgoritmo = (algoritmo) => {
    setAlgoritmoActivo(algoritmo);
    setPasoActual(0);
    setCronometro(0);
    setTiemposPasos({});
    setCronometroActivo(true);
    
    // Agregar al historial
    addToHistory({
      type: 'algoritmo',
      name: algoritmo.nombre,
      details: `Algoritmo iniciado - ${algoritmo.categoria}`,
      fullData: {
        algoritmo: algoritmo.id,
        inicioTiempo: new Date().toISOString(),
        edadPaciente: edadPaciente
      }
    });
  };

  const avanzarPaso = () => {
    const algoritmo = algoritmoActivo;
    if (!algoritmo) return;

    // Registrar tiempo del paso actual
    const pasoId = algoritmo.pasos[pasoActual]?.id;
    if (pasoId) {
      setTiemposPasos(prev => ({
        ...prev,
        [pasoId]: cronometro
      }));
    }

    if (pasoActual < algoritmo.pasos.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      // Algoritmo completado
      setCronometroActivo(false);
      addToHistory({
        type: 'algoritmo',
        name: `${algoritmo.nombre} - Completado`,
        details: `Duración total: ${formatearTiempo(cronometro)}`,
        fullData: {
          algoritmo: algoritmo.id,
          tiempoTotal: cronometro,
          tiemposPasos: tiemposPasos,
          completado: true
        }
      });
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const detenerAlgoritmo = () => {
    setCronometroActivo(false);
    setAlgoritmoActivo(null);
    setPasoActual(0);
    setCronometro(0);
    setTiemposPasos({});
  };

  const toggleCronometro = () => {
    setCronometroActivo(!cronometroActivo);
  };

  if (algoritmoActivo) {
    const algoritmo = algoritmoActivo;
    const paso = algoritmo.pasos[pasoActual];
    const esUltimoPaso = pasoActual === algoritmo.pasos.length - 1;

    return (
      <div style={{ 
        backgroundColor: colors.background, 
        color: colors.text,
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header con cronómetro */}
          <div style={{
            backgroundColor: colors.surface,
            padding: '15px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <h2 style={{ margin: 0, color: colors.primary, fontSize: 'clamp(18px, 4vw, 24px)' }}>
                  {categorias[algoritmo.categoria].icon} {algoritmo.nombre}
                </h2>
                <p style={{ margin: '5px 0 0 0', color: colors.textSecondary, fontSize: 'clamp(12px, 3vw, 14px)' }}>
                  Paso {pasoActual + 1} de {algoritmo.pasos.length}
                </p>
              </div>

              {/* Cronómetro */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <div style={{
                  backgroundColor: cronometroActivo ? colors.error : colors.textSecondary,
                  color: 'white',
                  padding: 'clamp(10px, 3vw, 15px) clamp(15px, 4vw, 25px)',
                  borderRadius: '10px',
                  fontSize: 'clamp(24px, 6vw, 32px)',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  {formatearTiempo(cronometro)}
                </div>
                <button
                  onClick={toggleCronometro}
                  style={{
                    backgroundColor: cronometroActivo ? colors.warning : colors.success,
                    color: 'white',
                    border: 'none',
                    padding: 'clamp(10px, 2vw, 12px) clamp(15px, 3vw, 20px)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cronometroActivo ? '⏸️ Pausar' : '▶️ Reanudar'}
                </button>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: colors.surfaceVariant,
              borderRadius: '4px',
              marginTop: '15px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((pasoActual + 1) / algoritmo.pasos.length) * 100}%`,
                height: '100%',
                backgroundColor: colors.primary,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Contenido del paso actual */}
          <div style={{
            backgroundColor: colors.surface,
            padding: 'clamp(15px, 4vw, 30px)',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            marginBottom: '20px'
          }}>
            <h3 style={{
              color: colors.primary,
              fontSize: 'clamp(18px, 4vw, 24px)',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {paso.tipo === 'evaluacion' && '🔍'}
              {paso.tipo === 'procedimiento' && '🏥'}
              {paso.tipo === 'tratamiento' && '💊'}
              {paso.tipo === 'compresiones' && '👐'}
              {paso.tipo === 'decision' && '⚡'}
              {paso.tipo === 'clasificacion' && '📊'}
              {paso.titulo}
            </h3>

            {/* Acciones del paso */}
            {paso.acciones && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: colors.text }}>Acciones a realizar:</h4>
                <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  {paso.acciones.map((accion, index) => (
                    <li key={index} style={{ marginBottom: '8px', color: colors.text }}>
                      {accion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Alertas importantes */}
            {paso.alertas && (
              <div style={{
                backgroundColor: '#fff3e0',
                border: `2px solid ${colors.warning}`,
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: colors.warning, margin: '0 0 10px 0' }}>
                  ⚠️ Alertas Importantes:
                </h4>
                {paso.alertas.map((alerta, index) => (
                  <p key={index} style={{ margin: '5px 0', fontWeight: 'bold', color: colors.text }}>
                    {alerta}
                  </p>
                ))}
              </div>
            )}

            {/* Parámetros específicos para RCP */}
            {paso.tipo === 'compresiones' && paso.parametros && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  backgroundColor: colors.surfaceVariant,
                  padding: '20px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`
                }}>
                  <h4 style={{ color: colors.primary }}>👶 Lactante ({'<1 año'})</h4>
                  <p><strong>Frecuencia:</strong> {paso.parametros.lactante.frecuencia}/min</p>
                  <p><strong>Profundidad:</strong> {paso.parametros.lactante.profundidad}</p>
                  <p><strong>Técnica:</strong> {paso.parametros.lactante.tecnica}</p>
                  <p><strong>Ratio:</strong> {paso.parametros.lactante.ratio}</p>
                </div>
                <div style={{
                  backgroundColor: colors.surfaceVariant,
                  padding: '20px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`
                }}>
                  <h4 style={{ color: colors.primary }}>🧒 Niño ({'>1 año'})</h4>
                  <p><strong>Frecuencia:</strong> {paso.parametros.niño.frecuencia}/min</p>
                  <p><strong>Profundidad:</strong> {paso.parametros.niño.profundidad}</p>
                  <p><strong>Técnica:</strong> {paso.parametros.niño.tecnica}</p>
                  <p><strong>Ratio:</strong> {paso.parametros.niño.ratio}</p>
                </div>
              </div>
            )}

            {/* Criterios de clasificación */}
            {paso.criterios && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: colors.text }}>Criterios de clasificación:</h4>
                <div style={{
                  display: 'grid',
                  gap: '15px'
                }}>
                  {Object.entries(paso.criterios).map(([key, criterio]) => (
                    <div
                      key={key}
                      style={{
                        backgroundColor: colors.surfaceVariant,
                        border: `3px solid ${criterio.color}`,
                        padding: '15px',
                        borderRadius: '10px'
                      }}
                    >
                      <h5 style={{ color: criterio.color, margin: '0 0 10px 0' }}>
                        {criterio.titulo}
                      </h5>
                      <ul style={{ margin: 0, color: colors.text }}>
                        {criterio.sintomas?.map((sintoma, index) => (
                          <li key={index} style={{ marginBottom: '5px' }}>
                            {sintoma}
                          </li>
                        ))}
                        {criterio.criterios?.map((criterioItem, index) => (
                          <li key={index} style={{ marginBottom: '5px' }}>
                            {criterioItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medicamentos */}
            {paso.medicamentos && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: colors.text }}>💊 Medicamentos:</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {paso.medicamentos.map((med, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colors.surfaceVariant,
                        padding: '15px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <h5 style={{ color: colors.primary, margin: '0 0 8px 0' }}>
                        {med.nombre}
                      </h5>
                      <p style={{ margin: '3px 0' }}><strong>Dosis:</strong> {med.dosis}</p>
                      <p style={{ margin: '3px 0' }}><strong>Vía:</strong> {med.via}</p>
                      {med.observaciones && (
                        <p style={{ margin: '3px 0', fontSize: '14px', color: colors.textSecondary }}>
                          {med.observaciones}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tiempo recomendado para el paso */}
            {paso.duracion && (
              <div style={{
                backgroundColor: colors.info,
                color: 'white',
                padding: '10px 15px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ⏱️ Tiempo recomendado: {formatearTiempo(paso.duracion)}
              </div>
            )}
          </div>

          {/* Controles de navegación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={retrocederPaso}
                disabled={pasoActual === 0}
                style={{
                  backgroundColor: pasoActual === 0 ? colors.textSecondary : colors.secondary,
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(10px, 2vw, 12px) clamp(15px, 3vw, 20px)',
                  borderRadius: '8px',
                  cursor: pasoActual === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  whiteSpace: 'nowrap'
                }}
              >
                ◀️ Anterior
              </button>

              <button
                onClick={avanzarPaso}
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(10px, 2vw, 12px) clamp(15px, 3vw, 20px)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  whiteSpace: 'nowrap'
                }}
              >
                {esUltimoPaso ? '✅ Finalizar' : '▶️ Siguiente'}
              </button>
            </div>

            <button
              onClick={detenerAlgoritmo}
              style={{
                backgroundColor: colors.error,
                color: 'white',
                border: 'none',
                padding: 'clamp(10px, 2vw, 12px) clamp(15px, 3vw, 20px)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 'clamp(12px, 3vw, 14px)',
                whiteSpace: 'nowrap'
              }}
            >
              ❌ Detener
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal de selección
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
          padding: 'clamp(15px, 4vw, 25px)',
          backgroundColor: colors.surface,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ color: colors.primary, marginBottom: '10px', fontSize: 'clamp(20px, 5vw, 28px)' }}>
            🚨 Algoritmos de Emergencias Pediátricas
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: 'clamp(14px, 3vw, 16px)' }}>
            Protocolos paso a paso con cronómetro integrado para emergencias médicas
          </p>
        </div>

        {/* Input de edad del paciente */}
        <div style={{
          backgroundColor: colors.surface,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginBottom: '30px'
        }}>
          <h3 style={{ color: colors.text, marginBottom: '15px' }}>
            👶 Edad del paciente (opcional)
          </h3>
          <input
            type="number"
            value={edadPaciente}
            onChange={(e) => setEdadPaciente(e.target.value)}
            placeholder="Edad en años (ej: 5)"
            min="0"
            max="18"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: `2px solid ${colors.border}`,
              borderRadius: '8px',
              backgroundColor: colors.surfaceVariant,
              color: colors.text,
              width: '200px'
            }}
          />
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: '14px', 
            marginTop: '8px', 
            marginBottom: 0 
          }}>
            Ayuda a filtrar algoritmos relevantes para la edad
          </p>
        </div>

        {/* Lista de algoritmos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '20px'
        }}>
          {Object.values(algoritmosEmergencia).map((algoritmo) => {
            const categoria = categorias[algoritmo.categoria];
            const edadNum = parseInt(edadPaciente);
            const esAplicable = !edadNum || (edadNum >= algoritmo.edadMinima && edadNum <= algoritmo.edadMaxima);
            
            return (
              <div
                key={algoritmo.id}
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  padding: 'clamp(15px, 4vw, 25px)',
                  cursor: esAplicable ? 'pointer' : 'not-allowed',
                  opacity: esAplicable ? 1 : 0.6,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => esAplicable && iniciarAlgoritmo(algoritmo)}
                onMouseEnter={(e) => {
                  if (esAplicable) {
                    e.currentTarget.style.backgroundColor = colors.surfaceVariant;
                    e.currentTarget.style.borderColor = categoria.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (esAplicable) {
                    e.currentTarget.style.backgroundColor = colors.surface;
                    e.currentTarget.style.borderColor = colors.border;
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  gap: '12px'
                }}>
                  <span style={{
                    fontSize: 'clamp(24px, 6vw, 32px)',
                    flexShrink: 0
                  }}>
                    {categoria.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      margin: 0,
                      color: categoria.color,
                      fontSize: 'clamp(16px, 4vw, 20px)',
                      wordBreak: 'break-word'
                    }}>
                      {algoritmo.nombre}
                    </h3>
                    <p style={{
                      margin: '5px 0 0 0',
                      color: colors.textSecondary,
                      fontSize: 'clamp(12px, 3vw, 14px)'
                    }}>
                      {categoria.nombre} • {algoritmo.edadMinima}-{algoritmo.edadMaxima} años
                    </p>
                  </div>
                </div>

                <p style={{
                  color: colors.text,
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  {algoritmo.pasos.length} pasos •
                  {algoritmo.duracionTotal && ` ~${Math.ceil(algoritmo.duracionTotal / 60)} minutos`}
                </p>

                <div style={{
                  backgroundColor: categoria.color,
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {esAplicable ? '🚀 INICIAR PROTOCOLO' : '❌ NO APLICABLE PARA ESTA EDAD'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlgoritmosEmergencia;