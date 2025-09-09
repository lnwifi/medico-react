import React, { useState } from 'react';

const DiagnosticoAvanzado = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    edad: '',
    peso: '',
    motivoConsulta: '',
    sintomas: [],
    signosAlarma: []
  });
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    setError('');
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep1 = () => {
    if (!formData.edad) {
      setError('Por favor seleccione la edad del paciente');
      return false;
    }
    if (!formData.motivoConsulta.trim()) {
      setError('Por favor ingrese el motivo de consulta');
      return false;
    }
    if (formData.motivoConsulta.trim().length < 10) {
      setError('Por favor proporcione más detalles sobre el motivo de consulta (mínimo 10 caracteres)');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.sintomas.length === 0) {
      setError('Por favor seleccione al menos un síntoma');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setError('');
    
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const processDiagnostic = () => {
    // Lógica simplificada de diagnóstico
    let diagnosticoPrincipal = '';
    let confianza = 'media';
    let tratamiento = [];
    let signosAlarmaCriticos = [];

    // Evaluar signos de alarma críticos
    const signosCriticos = ['cianosis', 'palidez extrema', 'tiraje', 'letargo', 'rigidez nuca'];
    signosAlarmaCriticos = formData.signosAlarma.filter(signo => signosCriticos.includes(signo));

    // Diagnósticos basados en patrones de síntomas
    if (formData.sintomas.includes('fiebre') && formData.sintomas.includes('tos') && formData.sintomas.includes('dificultad respiratoria')) {
      if (formData.signosAlarma.includes('tiraje') || formData.signosAlarma.includes('cianosis')) {
        diagnosticoPrincipal = 'Neumonía con signos de dificultad respiratoria';
        confianza = 'alta';
        tratamiento = ['Oxígeno suplementario', 'Antibióticoterapia según protocolo', 'Monitoreo continuo', 'Evaluación por pediatra'];
      } else {
        diagnosticoPrincipal = 'Infección respiratoria aguda';
        confianza = 'media';
        tratamiento = ['Tratamiento sintomático', 'Antitérmicos según peso', 'Control en 24-48 horas'];
      }
    } else if (formData.sintomas.includes('fiebre') && formData.sintomas.includes('vómitos') && formData.sintomas.includes('diarrea')) {
      diagnosticoPrincipal = 'Gastroenteritis aguda';
      confianza = formData.signosAlarma.includes('mucosas secas') || formData.signosAlarma.includes('ojos hundidos') ? 'alta' : 'media';
      tratamiento = ['Rehidratación oral', 'Dieta blanda', 'Probióticos', 'Control de signos de deshidratación'];
    } else {
      const sintomasPrincipales = formData.sintomas.slice(0, 3).join(', ');
      diagnosticoPrincipal = `Síndrome clínico con ${sintomasPrincipales}`;
      confianza = 'baja';
      tratamiento = ['Evaluación clínica completa', 'Tratamiento sintomático', 'Seguimiento estrecho', 'Reevaluación en 24 horas'];
    }

    if (signosAlarmaCriticos.length > 0) {
      confianza = 'muy-alta';
    }

    setResultado({
      diagnosticoPrincipal,
      confianza,
      tratamiento,
      signosAlarmaCriticos
    });
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      edad: '',
      peso: '',
      motivoConsulta: '',
      sintomas: [],
      signosAlarma: []
    });
    setResultado(null);
    setError('');
  };

  if (resultado) {
    return (
      <section className="section active">
        <div className="container">
          <div className="resultado-diagnostico-avanzado">
            <div className={`diagnostico-principal confianza-${resultado.confianza}`}>
              <h3>🎯 Diagnóstico Principal</h3>
              <h4>{resultado.diagnosticoPrincipal}</h4>
              <div className="confianza">
                Nivel de confianza: <strong>{resultado.confianza.toUpperCase()}</strong>
              </div>
            </div>

            {resultado.signosAlarmaCriticos.length > 0 && (
              <div className="alertas-criticas">
                <h4>🚨 Signos de Alarma Detectados</h4>
                <ul>
                  {resultado.signosAlarmaCriticos.map((signo, index) => (
                    <li key={index}>{signo.replace('_', ' ').toUpperCase()}</li>
                  ))}
                </ul>
                <p><strong>⚠️ REQUIERE EVALUACIÓN MÉDICA INMEDIATA</strong></p>
              </div>
            )}

            <div className="plan-tratamiento">
              <h4>💊 Plan de Tratamiento</h4>
              <ul>
                {resultado.tratamiento.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button type="button" className="btn-primary" onClick={resetForm}>
                🔄 Realizar Nuevo Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section active">
      <div className="container">
        <div className="section-header">
          <h2>🧠 Diagnóstico Avanzado</h2>
          <p>Sistema inteligente de diagnóstico basado en síntomas múltiples</p>
        </div>

        <div className="diagnostico-avanzado-form">
          {currentStep === 1 && (
            <div className="paso-diagnostico">
              <h3>📋 Paso 1: Datos del Paciente</h3>
              
              <div className="form-group">
                <label htmlFor="edad-paciente">Edad del paciente:</label>
                <select 
                  id="edad-paciente"
                  value={formData.edad}
                  onChange={(e) => handleInputChange('edad', e.target.value)}
                  required
                >
                  <option value="">Seleccionar edad...</option>
                  <option value="recien-nacido">Recién nacido (0-28 días)</option>
                  <option value="lactante">Lactante (1-24 meses)</option>
                  <option value="preescolar">Preescolar (2-5 años)</option>
                  <option value="escolar">Escolar (6-12 años)</option>
                  <option value="adolescente">Adolescente (13-18 años)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="peso-paciente">Peso aproximado (kg):</label>
                <input 
                  type="number" 
                  id="peso-paciente" 
                  min="1" 
                  max="100" 
                  step="0.5" 
                  placeholder="Ej: 15"
                  value={formData.peso}
                  onChange={(e) => handleInputChange('peso', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="motivo-consulta">Motivo principal de consulta:</label>
                <textarea 
                  id="motivo-consulta" 
                  rows="3" 
                  placeholder="Ej: Fiebre de 2 días de evolución con tos..."
                  value={formData.motivoConsulta}
                  onChange={(e) => handleInputChange('motivoConsulta', e.target.value)}
                ></textarea>
              </div>

              <button type="button" className="btn-primary" onClick={nextStep}>
                Continuar →
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="paso-diagnostico">
              <h3>🌡️ Paso 2: Síntomas Principales</h3>
              
              <div className="sintomas-grid">
                <div className="categoria-sintomas">
                  <h4>🔥 Síntomas Generales</h4>
                  {['fiebre', 'decaimiento', 'irritabilidad', 'somnolencia', 'inapetencia'].map(sintoma => (
                    <label key={sintoma}>
                      <input 
                        type="checkbox" 
                        value={sintoma}
                        checked={formData.sintomas.includes(sintoma)}
                        onChange={() => handleCheckboxChange('sintomas', sintoma)}
                      /> {sintoma.charAt(0).toUpperCase() + sintoma.slice(1)}
                    </label>
                  ))}
                </div>

                <div className="categoria-sintomas">
                  <h4>🫁 Síntomas Respiratorios</h4>
                  {['tos', 'dificultad respiratoria', 'sibilancias', 'rinorrea', 'dolor garganta', 'ronquera', 'estridor'].map(sintoma => (
                    <label key={sintoma}>
                      <input 
                        type="checkbox" 
                        value={sintoma}
                        checked={formData.sintomas.includes(sintoma)}
                        onChange={() => handleCheckboxChange('sintomas', sintoma)}
                      /> {sintoma.charAt(0).toUpperCase() + sintoma.slice(1)}
                    </label>
                  ))}
                </div>

                <div className="categoria-sintomas">
                  <h4>🤢 Síntomas Digestivos</h4>
                  {['vómitos', 'diarrea', 'dolor abdominal', 'náuseas', 'estreñimiento'].map(sintoma => (
                    <label key={sintoma}>
                      <input 
                        type="checkbox" 
                        value={sintoma}
                        checked={formData.sintomas.includes(sintoma)}
                        onChange={() => handleCheckboxChange('sintomas', sintoma)}
                      /> {sintoma.charAt(0).toUpperCase() + sintoma.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-navigation">
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  ← Anterior
                </button>
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="paso-diagnostico">
              <h3>⚠️ Paso 3: Signos de Alarma</h3>
              
              <div className="signos-alarma-grid">
                <div className="signos-categoria">
                  <h4>🚨 Signos Vitales</h4>
                  {['cianosis', 'palidez extrema', 'hipotermia', 'taquipnea severa'].map(signo => (
                    <label key={signo}>
                      <input 
                        type="checkbox" 
                        value={signo}
                        checked={formData.signosAlarma.includes(signo)}
                        onChange={() => handleCheckboxChange('signosAlarma', signo)}
                      /> {signo.charAt(0).toUpperCase() + signo.slice(1)}
                    </label>
                  ))}
                </div>

                <div className="signos-categoria">
                  <h4>🫁 Respiratorios</h4>
                  {['tiraje', 'aleteo nasal', 'quejido respiratorio', 'apneas'].map(signo => (
                    <label key={signo}>
                      <input 
                        type="checkbox" 
                        value={signo}
                        checked={formData.signosAlarma.includes(signo)}
                        onChange={() => handleCheckboxChange('signosAlarma', signo)}
                      /> {signo.charAt(0).toUpperCase() + signo.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-navigation">
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  ← Anterior
                </button>
                <button type="button" className="btn-primary" onClick={processDiagnostic}>
                  🔍 Generar Diagnóstico
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="alerta peligro" style={{ marginTop: '15px' }}>
              <h4>❌ Error</h4>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticoAvanzado;