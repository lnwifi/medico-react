import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useHistory } from '../contexts/HistoryContext';
import MedicationAlert from './MedicationAlert';
import { 
  medicamentosDB, 
  obtenerMedicamento, 
  calcularDosisMl, 
  validarDosis 
} from '../data/medicamentos';

const Calculadora = ({ initialSearch, setInitialSearch }) => {
  const { colors } = useTheme();
  const { addToHistory } = useHistory();
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [medicamentoKey, setMedicamentoKey] = useState('');
  const [presentacionKey, setPresentacionKey] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [presentaciones, setPresentaciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

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
    setResultado(null);
    setError('');
  }, [medicamentoKey]);

  // Manejar búsqueda inicial desde historial
  useEffect(() => {
    if (initialSearch) {
      setBusqueda(initialSearch);
      const medicamentoEncontrado = Object.keys(medicamentosDB).find(key => 
        medicamentosDB[key].nombre.toLowerCase().includes(initialSearch.toLowerCase())
      );
      if (medicamentoEncontrado) {
        setMedicamentoKey(medicamentoEncontrado);
      }
      setInitialSearch('');
    }
  }, [initialSearch, setInitialSearch]);

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

    const med = obtenerMedicamento(medicamentoKey);
    const pesoNum = parseFloat(peso);
    
    // No requerir peso para oxígeno o dosis fijas
    if (!med.dosisFija && med.tipo !== 'gas') {
      if (!peso || pesoNum <= 0) {
        setError('Por favor ingrese un peso válido');
        return;
      }
    }

    // Validar dosis
    const validacion = validarDosis(medicamentoKey, pesoNum, edad);
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
      edad,
      medicamento: medicamentoKey,
      presentacion: presentacionKey,
      indicacion,
      resultado: resultadoCalculo,
      validacion,
      fecha: new Date()
    });

    // Agregar al historial
    addToHistory({
      type: 'medicamento',
      name: med.nombre,
      details: `${pesoNum}kg - ${resultadoCalculo.dosisMl}ml`
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
        {!res.dosisFija && res.tipo !== 'gas' && (
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
        
        {validacion.advertencias.length > 0 && (
          <div className="alerta">
            <h4>⚠️ Advertencias Importantes</h4>
            <ul>
              {validacion.advertencias.map((adv, index) => <li key={index}>{adv}</li>)}
            </ul>
          </div>
        )}
        
        {med.contraindicaciones && (
          <div className="alerta peligro">
            <h4>🚫 Contraindicaciones</h4>
            <ul>
              {med.contraindicaciones.map((contra, index) => <li key={index}>{contra}</li>)}
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
            <label htmlFor="edad">Edad (opcional):</label>
            <input 
              type="text" 
              id="edad" 
              placeholder="Ej: 3 años, 6 meses"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
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