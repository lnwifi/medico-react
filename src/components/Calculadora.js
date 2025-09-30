import React, { useState, useEffect } from 'react';
import { useHistory } from '../contexts/HistoryContext';
import MedicationAlert from './MedicationAlert';
import { 
  medicamentosDB, 
  obtenerMedicamento, 
  calcularDosisMl, 
  validarDosis 
} from '../data/medicamentos';

const Calculadora = ({ initialSearch, setInitialSearch }) => {
  const { addToHistory } = useHistory();
  const [peso, setPeso] = useState('');
  const [edadAnios, setEdadAnios] = useState('');
  const [edadMeses, setEdadMeses] = useState('');
  const [edadDias, setEdadDias] = useState('');
  const [medicamentoKey, setMedicamentoKey] = useState('');
  const [presentacionKey, setPresentacionKey] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [presentaciones, setPresentaciones] = useState([]);
  const [gradoDeshidratacion, setGradoDeshidratacion] = useState('');

  // Actualizar presentaciones cuando cambia el medicamento
  useEffect(() => {
    if (medicamentoKey) {
      const med = obtenerMedicamento(medicamentoKey);
      if (med) {
        if (med.tipo === 'gas') {
          const dispositivos = med.dispositivos || {};
          setPresentaciones(Object.entries(dispositivos));
        } else {
          const presen = med.presentaciones || {};
          setPresentaciones(Object.entries(presen));
        }
      }
    } else {
      setPresentaciones([]);
    }
    setPresentacionKey('');
    setGradoDeshidratacion('');
    setResultado(null);
    setError('');
  }, [medicamentoKey]);

  // Manejar búsqueda inicial desde historial
  useEffect(() => {
    if (initialSearch) {
      const medicamentoEncontrado = Object.keys(medicamentosDB).find(key =>
        medicamentosDB[key].nombre.toLowerCase().includes(initialSearch.toLowerCase())
      );
      if (medicamentoEncontrado) {
        setMedicamentoKey(medicamentoEncontrado);
      }
      setInitialSearch('');
    }
  }, [initialSearch, setInitialSearch]);

  // Función para construir el string de edad
  const construirEdadString = () => {
    const partes = [];
    const anios = parseInt(edadAnios) || 0;
    const meses = parseInt(edadMeses) || 0;
    const dias = parseInt(edadDias) || 0;

    if (anios > 0) {
      partes.push(`${anios} año${anios !== 1 ? 's' : ''}`);
    }
    if (meses > 0) {
      partes.push(`${meses} mes${meses !== 1 ? 'es' : ''}`);
    }
    if (dias > 0) {
      partes.push(`${dias} día${dias !== 1 ? 's' : ''}`);
    }

    return partes.length > 0 ? partes.join(' y ') : null;
  };

  const handleCalcular = () => {
    setError('');
    setResultado(null);

    // Validaciones básicas
    if (!medicamentoKey) {
      setError('Por favor seleccione un medicamento');
      return;
    }
    if (!presentacionKey) {
      const med = obtenerMedicamento(medicamentoKey);
      const label = med?.tipo === 'gas' ? 'dispositivo' : 'presentación';
      setError(`Por favor seleccione un ${label}`);
      return;
    }
    if (medicamentoKey === 'sales-rehidratacion' && !gradoDeshidratacion) {
      setError('Por favor seleccione el grado de deshidratación');
      return;
    }

    const med = obtenerMedicamento(medicamentoKey);
    const pesoNum = parseFloat(peso);
    const edadString = construirEdadString();

    // No requerir peso para oxígeno o dosis fijas
    if (!med.dosisFija && med.tipo !== 'gas') {
      if (!peso || pesoNum <= 0) {
        setError('Por favor ingrese un peso válido');
        return;
      }
    }

    // Validar dosis
    const validacion = validarDosis(medicamentoKey, pesoNum, edadString);
    if (!validacion.valida) {
      setError(validacion.errores.join('. '));
      return;
    }

    // Calcular dosis
    let indicacion = null;

    // Lógica para medicamentos con indicaciones específicas
    if (medicamentoKey === 'ibuprofeno') {
      indicacion = window.confirm('¿La temperatura del paciente es ≥ 39°C?\n\nOK = Sí | Cancelar = No') ? 'fiebre_alta' : 'fiebre_baja';
    } else if (medicamentoKey === 'prednisolona') {
      indicacion = window.confirm('¿La indicación es para crisis asmática?\n\nOK = Sí (Asma) | Cancelar = No (Otra inflamación)') ? 'asma' : 'inflamacion';
    } else if (medicamentoKey === 'fenitoina') {
      indicacion = window.confirm('¿Desea calcular la DOSIS DE CARGA?\n\nOK = Sí (Carga) | Cancelar = No (Mantenimiento)') ? 'carga' : 'mantenimiento';
    }

    const resultadoCalculo = calcularDosisMl(medicamentoKey, pesoNum, presentacionKey, indicacion);
    
    if (!resultadoCalculo) {
      setError('Error en el cálculo de dosis. Verifique los datos.');
      return;
    }

    setResultado({
      peso: pesoNum,
      edad: edadString,
      medicamento: medicamentoKey,
      presentacion: presentacionKey,
      indicacion,
      gradoDeshidratacion,
      resultado: resultadoCalculo,
      validacion,
      fecha: new Date()
    });

    // Agregar al historial con información completa
    const presentacionData = med.presentaciones?.[presentacionKey] || med.dispositivos?.[presentacionKey];
    const dosisDetails = resultadoCalculo.tipo === 'liquido_directo' ?
      `${pesoNum}kg - ${resultadoCalculo.volumenMl}ml` :
      `${pesoNum}kg - ${resultadoCalculo.dosisMl || resultadoCalculo.volumenMl}ml`;

    addToHistory({
      type: 'medicamento',
      name: med.nombre,
      details: dosisDetails,
      fullData: {
        peso: pesoNum,
        edad: edadString,
        medicamento: med.nombre,
        medicamentoKey: medicamentoKey,
        presentacion: presentacionData?.nombre || 'N/A',
        presentacionKey: presentacionKey,
        dosis: {
          dosisMg: resultadoCalculo.dosisMg,
          dosisMl: resultadoCalculo.dosisMl,
          volumenMl: resultadoCalculo.volumenMl,
          concentracion: resultadoCalculo.concentracion,
          intervalo: resultadoCalculo.intervalo,
          maxDosis: resultadoCalculo.maxDosis,
          tipo: resultadoCalculo.tipo
        },
        indicaciones: med.indicaciones,
        validacion: validacion,
        indicacion: indicacion
      }
    });
  };

  const renderResultado = () => {
    if (!resultado) return null;

    const { peso: pesoRes, edad: edadRes, medicamento, presentacion, resultado: res, validacion } = resultado;
    const med = obtenerMedicamento(medicamento);

    return (
      <div className="resultado-card">
        <h3>📋 Resultado del Cálculo</h3>
        
        {/* HTML para Oxígeno */}
        {res.tipo === 'gas' && (
          <>
            <div className="dosis-info">
              <h4>💨 Oxigenoterapia</h4>
              <p><strong>Dispositivo:</strong> {res.nombre}</p>
            </div>
            <div className="dosis-info">
              <h4>📊 Parámetros</h4>
              <p className="dosis-valor">Flujo: {res.flujo}</p>
              <p className="dosis-valor">FiO2 Estimada: {res.fio2}</p>
              {res.estimacion && <p><strong>Nota:</strong> {res.estimacion}</p>}
            </div>
          </>
        )}

        {/* HTML para Sales de Rehidratación Oral */}
        {res.tipo === 'sro' && (
          <>
            <div className="dosis-info">
              <h4>📋 Datos del Paciente</h4>
              <p><strong>Peso:</strong> {res.peso} kg</p>
              {edadRes && <p><strong>Edad:</strong> {edadRes}</p>}
              <p><strong>Medicamento:</strong> {med.nombre}</p>
              <p><strong>Presentación:</strong> {res.presentacion.nombre}</p>
            </div>

            {resultado.gradoDeshidratacion && res.esquemasTratamiento && res.esquemasTratamiento[resultado.gradoDeshidratacion] && (
              <>
                {(() => {
                  const esquema = res.esquemasTratamiento[resultado.gradoDeshidratacion];
                  const volumenTotal = resultado.gradoDeshidratacion === 'sin_deshidratacion'
                    ? `${Math.round(res.peso * 10)} ml`
                    : resultado.gradoDeshidratacion === 'leve'
                    ? `${Math.round(res.peso * 50)} - ${Math.round(res.peso * 100)} ml`
                    : resultado.gradoDeshidratacion === 'moderada'
                    ? `${Math.round(res.peso * 100)} ml`
                    : 'Vía IV';

                  return (
                    <>
                      <div className="dosis-info" style={{backgroundColor: resultado.gradoDeshidratacion === 'severa' ? '#fff3cd' : 'transparent', border: resultado.gradoDeshidratacion === 'severa' ? '2px solid #ff6b6b' : 'none'}}>
                        <h4>📊 {esquema.nombre}</h4>
                        <p className="dosis-valor"><strong>Volumen Total:</strong> {volumenTotal}</p>
                        <p><strong>Duración:</strong> {esquema.duracion}</p>
                        <p><strong>Vía:</strong> {esquema.via}</p>
                        <p><strong>Administración:</strong> {esquema.administracion}</p>
                      </div>

                      <div className="dosis-info">
                        <h4>🔍 Signos Clínicos</h4>
                        <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                          {esquema.signos.map((signo, idx) => (
                            <li key={idx} style={{marginBottom: '5px'}}>{signo}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="dosis-info">
                        <h4>📝 Instrucciones de Tratamiento</h4>
                        <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                          {esquema.instrucciones.map((inst, idx) => (
                            <li key={idx} style={{marginBottom: '8px'}}>{inst}</li>
                          ))}
                        </ul>
                        {esquema.perdidasContinuas && (
                          <p style={{marginTop: '10px'}}><strong>Pérdidas continuas:</strong> {esquema.perdidasContinuas}</p>
                        )}
                        {esquema.alimentacion && (
                          <p style={{marginTop: '10px'}}><strong>Alimentación:</strong> {esquema.alimentacion}</p>
                        )}
                      </div>

                      {esquema.signosAlarma && (
                        <div className="alerta peligro">
                          <h4>🚨 Signos de Alarma - Derivar Inmediatamente</h4>
                          <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                            {esquema.signosAlarma.map((signo, idx) => (
                              <li key={idx} style={{marginBottom: '5px'}}>{signo}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {esquema.criteriosDerivacion && (
                        <div className="alerta">
                          <h4>⚠️ Criterios de Derivación</h4>
                          <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                            {esquema.criteriosDerivacion.map((criterio, idx) => (
                              <li key={idx} style={{marginBottom: '5px'}}>{criterio}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {esquema.tratamientoInicial && (
                        <div className="alerta">
                          <h4>💉 Tratamiento IV Inicial</h4>
                          <p><strong>Lactantes (&lt;12 meses):</strong> {esquema.tratamientoInicial.lactantes}</p>
                          <p><strong>Niños (≥12 meses):</strong> {esquema.tratamientoInicial.ninos}</p>
                        </div>
                      )}

                      {esquema.noIndicadoSRO && (
                        <div className="alerta peligro">
                          <h4>⛔ Importante</h4>
                          <p>{esquema.noIndicadoSRO}</p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </>
            )}

            <div className="dosis-info">
              <h4>🧪 Composición y Preparación</h4>
              <p><strong>Composición:</strong> {res.presentacion.composicion}</p>
              <p><strong>Preparación:</strong> {res.presentacion.preparacion}</p>
            </div>
          </>
        )}

        {/* HTML para Dosis Fija */}
        {res.dosisFija && (
          <>
            <div className="dosis-info">
              <h4>📋 Datos</h4>
              <p><strong>Medicamento:</strong> {med.nombre}</p>
              <p><strong>Presentación:</strong> {med.presentaciones[presentacion].nombre}</p>
            </div>
            <div className="dosis-info">
              <h4>💊 Dosis Indicada</h4>
              <p className="dosis-valor">Dosis: {res.dosisFija}</p>
              <p><strong>Intervalo:</strong> Cada {res.intervalo} horas</p>
              {res.duracion && <p><strong>Duración:</strong> {res.duracion}</p>}
            </div>
          </>
        )}

        {/* HTML para Dosis Calculada */}
        {!res.dosisFija && res.tipo !== 'gas' && res.tipo !== 'sro' && (
          <>
            <div className="dosis-info">
              <h4>📊 Datos del Paciente</h4>
              <p><strong>Peso:</strong> {pesoRes} kg</p>
              {edadRes && <p><strong>Edad:</strong> {edadRes}</p>}
              <p><strong>Medicamento:</strong> {med.nombre}</p>
              <p><strong>Presentación:</strong> {med.presentaciones[presentacion].nombre}</p>
            </div>

            <div className="dosis-info">
              <h4>💊 Dosis Calculada</h4>
              {res.tipo === 'aerosol' ? (
                <>
                  <p className="dosis-valor">Dosis: {res.dosisMg} mg = {res.disparos} disparos</p>
                  <p><strong>Administración:</strong> {res.disparos} puffs con cámara espaciadora</p>
                  {res.usoConCamara && <p><strong>⚠️ Importante:</strong> {res.usoConCamara}</p>}
                </>
              ) : res.tipo === 'solido' ? (
                <>
                  <p className="dosis-valor">Dosis: {res.dosisMg} mg = {res.unidades} {med.presentaciones[presentacion].nombre.split(' ')[0].toLowerCase()}(s)</p>
                  <p><strong>Concentración:</strong> {res.concentracion} mg/unidad</p>
                </>
              ) : res.tipo === 'liquido_directo' ? (
                <>
                  <p className="dosis-valor">Dosis: {res.volumenMl} ml</p>
                  <p><strong>Cálculo:</strong> {(res.volumenMl / pesoRes).toFixed(1)} ml/kg</p>
                  <p><strong>Presentación:</strong> {res.concentracion} mg/ml</p>
                </>
              ) : (
                <>
                  <p className="dosis-valor">Dosis: {res.dosisMg} mg = {res.volumenMl} ml</p>
                  <p><strong>Concentración:</strong> {res.concentracion} mg/ml</p>
                </>
              )}
              <p><strong>Intervalo:</strong> Cada {res.intervalo} horas</p>
              {res.maxDosis && <p><strong>Máximo:</strong> {res.maxDosis} dosis por día</p>}
            </div>
            
            <div className="dosis-info">
              <h4>🏷️ Marca Comercial</h4>
              <p><strong>Marcas disponibles:</strong> {med.presentaciones[presentacion].marcas ? med.presentaciones[presentacion].marcas.join(', ') : 'N/A'}</p>
              {med.presentaciones[presentacion].volumenFrasco && 
                <p><strong>Presentaciones:</strong> {med.presentaciones[presentacion].volumenFrasco}</p>
              }
            </div>
          </>
        )}

        {/* Indicaciones, advertencias y contraindicaciones */}
        {med.indicaciones && (
          <div className="dosis-info">
            <h4>🎯 Indicaciones</h4>
            <p>{med.indicaciones.join(', ')}</p>
          </div>
        )}

        {/* Contraindicaciones activas - Mostrar de forma muy prominente */}
        {validacion.contraindicacionesActivas && validacion.contraindicacionesActivas.length > 0 && (
          <div className="alerta peligro" style={{
            border: '3px solid #dc3545',
            backgroundColor: '#fff5f5',
            fontSize: '1.05em',
            fontWeight: 'bold'
          }}>
            <h4>🚫 CONTRAINDICACIONES ACTIVAS EN ESTE PACIENTE</h4>
            <ul>
              {validacion.contraindicacionesActivas.map((contra, index) => (
                <li key={index} style={{color: '#dc3545', fontWeight: 'bold'}}>{contra}</li>
              ))}
            </ul>
            <p style={{marginTop: '15px', color: '#721c24', fontWeight: 'bold'}}>
              ⚠️ NO ADMINISTRAR ESTE MEDICAMENTO. Elegir alternativa terapéutica adecuada.
            </p>
          </div>
        )}

        {validacion.advertencias.length > 0 && (
          <div className="alerta">
            <h4>⚠️ Advertencias Importantes</h4>
            <ul>
              {validacion.advertencias.map((adv, index) => <li key={index}>{adv}</li>)}
            </ul>
          </div>
        )}

        {validacion.contraindicacionesGenerales && validacion.contraindicacionesGenerales.length > 0 && (
          <div className="alerta peligro">
            <h4>🚫 Contraindicaciones Generales</h4>
            <ul>
              {validacion.contraindicacionesGenerales.map((contra, index) => <li key={index}>{contra}</li>)}
            </ul>
          </div>
        )}
        
        {/* Alertas médicas avanzadas */}
        {med.alertas && (
          <MedicationAlert 
            medicamento={med.nombre} 
            alertas={med.alertas} 
          />
        )}
      </div>
    );
  };

  return (
    <section className="section active">
      <div className="container">
        <div className="section-header">
          <h2>💊 Calculadora de Dosis Pediátricas</h2>
          <p>Cálculo automático de dosis según peso del paciente</p>
        </div>

        <div className="calculator-form">
          <div className="form-group">
            <label htmlFor="peso">Peso del paciente (kg):</label>
            <input 
              type="number" 
              id="peso" 
              min="0.5" 
              max="100" 
              step="0.1" 
              placeholder="Ej: 15.5"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label style={{marginBottom: '10px', display: 'block'}}>
              Edad del paciente (recomendado para validar contraindicaciones):
            </label>
            <div className="edad-inputs-grid">
              <div className="edad-input-wrapper">
                <label htmlFor="edadAnios" className="edad-label">
                  📅 Años
                </label>
                <input
                  type="number"
                  id="edadAnios"
                  className="edad-input edad-input-anios"
                  min="0"
                  max="18"
                  placeholder="0"
                  value={edadAnios}
                  onChange={(e) => setEdadAnios(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                />
              </div>
              <div className="edad-input-wrapper">
                <label htmlFor="edadMeses" className="edad-label">
                  🗓️ Meses
                </label>
                <input
                  type="number"
                  id="edadMeses"
                  className="edad-input edad-input-meses"
                  min="0"
                  max="11"
                  placeholder="0"
                  value={edadMeses}
                  onChange={(e) => setEdadMeses(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2196F3';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                />
              </div>
              <div className="edad-input-wrapper">
                <label htmlFor="edadDias" className="edad-label">
                  ☀️ Días
                </label>
                <input
                  type="number"
                  id="edadDias"
                  className="edad-input edad-input-dias"
                  min="0"
                  max="30"
                  placeholder="0"
                  value={edadDias}
                  onChange={(e) => setEdadDias(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF9800';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                />
              </div>
            </div>
            <small className="edad-info-message" style={{
              color: '#6c757d',
              fontSize: '0.85em',
              display: 'block',
              marginTop: '10px',
              fontStyle: 'italic',
              padding: '8px 12px',
              backgroundColor: '#e8f5e9',
              borderLeft: '3px solid #4CAF50',
              borderRadius: '4px',
              lineHeight: '1.5'
            }}>
              💡 La edad ayuda a validar contraindicaciones específicas del medicamento
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="medicamento">Medicamento:</label>
            <select 
              id="medicamento"
              value={medicamentoKey}
              onChange={(e) => setMedicamentoKey(e.target.value)}
            >
              <option value="">Seleccionar medicamento...</option>
              {Object.entries(medicamentosDB).map(([key, med]) => (
                <option key={key} value={key}>{med.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="presentacion">Presentación:</label>
            <select
              id="presentacion"
              value={presentacionKey}
              onChange={(e) => setPresentacionKey(e.target.value)}
            >
              <option value="">
                {medicamentoKey ? 'Seleccione presentación...' : 'Primero seleccione un medicamento'}
              </option>
              {presentaciones.map(([key, pres]) => (
                <option key={key} value={key}>
                  {pres.nombre}{pres.marcas ? ` - ${pres.marcas[0]}` : ''}
                </option>
              ))}
            </select>
          </div>

          {medicamentoKey === 'sales-rehidratacion' && (
            <div className="form-group">
              <label htmlFor="gradoDeshidratacion">Grado de Deshidratación:</label>
              <select
                id="gradoDeshidratacion"
                value={gradoDeshidratacion}
                onChange={(e) => setGradoDeshidratacion(e.target.value)}
              >
                <option value="">Seleccione el grado de deshidratación...</option>
                <option value="sin_deshidratacion">Plan A - Sin Deshidratación (Prevención)</option>
                <option value="leve">Plan B - Deshidratación Leve (3-5%)</option>
                <option value="moderada">Plan B - Deshidratación Moderada (6-9%)</option>
                <option value="severa">Plan C - Deshidratación Severa (≥10%) - EMERGENCIA</option>
              </select>
            </div>
          )}

          <button type="button" className="btn-primary" onClick={handleCalcular}>
            Calcular Dosis
          </button>
        </div>

        {error && (
          <div className="alerta peligro" style={{ marginTop: '20px' }}>
            <h4>❌ Error</h4>
            <p>{error}</p>
          </div>
        )}

        {renderResultado()}
      </div>
    </section>
  );
};

export default Calculadora;