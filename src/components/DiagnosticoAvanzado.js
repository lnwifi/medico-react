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

  // Base de datos de patrones clínicos pediátricos
  const patronesClinicos = {
    // RESPIRATORIAS
    neumonia_grave: {
      nombre: 'Neumonía Grave',
      sintomasRequeridos: ['fiebre', 'tos', 'dificultad respiratoria'],
      sintomasOpcionales: ['decaimiento', 'inapetencia'],
      signosAlarma: ['tiraje', 'cianosis', 'quejido respiratorio', 'taquipnea severa'],
      puntoBase: 85,
      tratamiento: ['🚨 REFERIR URGENTEMENTE', 'Oxígeno suplementario si disponible', 'Antibióticoterapia IV (ampicilina + gentamicina)', 'Monitoreo continuo de signos vitales', 'Evaluación inmediata por pediatra'],
      urgencia: 'critica'
    },
    neumonia: {
      nombre: 'Neumonía',
      sintomasRequeridos: ['fiebre', 'tos'],
      sintomasOpcionales: ['dificultad respiratoria', 'decaimiento', 'inapetencia'],
      signosAlarma: ['taquipnea severa'],
      puntoBase: 75,
      tratamiento: ['Antibióticoterapia oral (amoxicilina 80-90 mg/kg/día)', 'Antitérmicos (paracetamol o ibuprofeno)', 'Hidratación adecuada', 'Control en 48 horas', 'Signos de alarma a padres'],
      urgencia: 'alta'
    },
    bronquiolitis: {
      nombre: 'Bronquiolitis',
      sintomasRequeridos: ['tos', 'dificultad respiratoria'],
      sintomasOpcionales: ['fiebre', 'sibilancias', 'rinorrea', 'inapetencia'],
      signosAlarma: ['tiraje', 'quejido respiratorio', 'apneas'],
      edadMax: 24, // meses
      puntoBase: 70,
      tratamiento: ['Medidas de soporte', 'Hidratación frecuente', 'Lavados nasales con suero fisiológico', 'Posición semisentada', 'Control diario si es leve', 'Hospitalización si dificultad respiratoria moderada-severa'],
      urgencia: 'moderada'
    },
    asma_agudizado: {
      nombre: 'Crisis Asmática / Asma Agudizado',
      sintomasRequeridos: ['dificultad respiratoria', 'sibilancias'],
      sintomasOpcionales: ['tos', 'tiraje'],
      signosAlarma: ['tiraje', 'cianosis', 'taquipnea severa'],
      puntoBase: 70,
      tratamiento: ['Salbutamol inhalado (2-4 puffs cada 20 min x 3 dosis)', 'Corticoide oral (prednisolona 1-2 mg/kg)', 'Oxígeno si saturación <92%', 'Reevaluación frecuente', 'Si no mejora: referir a urgencias'],
      urgencia: 'alta'
    },
    laringitis: {
      nombre: 'Laringitis / Crup',
      sintomasRequeridos: ['tos', 'ronquera'],
      sintomasOpcionales: ['estridor', 'dificultad respiratoria', 'fiebre'],
      signosAlarma: ['estridor', 'tiraje', 'cianosis'],
      puntoBase: 65,
      tratamiento: ['Dexametasona oral 0.6 mg/kg dosis única', 'Ambiente húmedo', 'Hidratación', 'Observación por 2-3 horas', 'Si estridor en reposo: referir'],
      urgencia: 'moderada'
    },
    ira_alta: {
      nombre: 'Infección Respiratoria Aguda Alta (Resfriado)',
      sintomasRequeridos: ['rinorrea'],
      sintomasOpcionales: ['tos', 'fiebre', 'dolor garganta', 'decaimiento'],
      signosAlarma: [],
      puntoBase: 60,
      tratamiento: ['Tratamiento sintomático', 'Lavados nasales frecuentes', 'Antitérmicos si fiebre', 'Hidratación adecuada', 'Control si empeora o persiste >5 días'],
      urgencia: 'leve'
    },
    faringitis: {
      nombre: 'Faringitis Aguda',
      sintomasRequeridos: ['dolor garganta'],
      sintomasOpcionales: ['fiebre', 'decaimiento', 'inapetencia'],
      signosAlarma: [],
      puntoBase: 55,
      tratamiento: ['Analgésicos/antitérmicos', 'Hidratación', 'Alimentos blandos', 'Si >3 años considerar test rápido estreptococo', 'Antibiótico solo si estreptococo confirmado'],
      urgencia: 'leve'
    },

    // DIGESTIVAS
    gastroenteritis_deshidratacion: {
      nombre: 'Gastroenteritis Aguda con Deshidratación',
      sintomasRequeridos: ['vómitos', 'diarrea'],
      sintomasOpcionales: ['fiebre', 'dolor abdominal', 'náuseas', 'decaimiento'],
      signosAlarma: ['palidez extrema', 'letargo'],
      signosEspecificos: ['mucosas secas', 'ojos hundidos'], // Añadiremos estos
      puntoBase: 80,
      tratamiento: ['Sales de rehidratación oral', 'Plan B: 75 ml/kg en 4 horas', 'Reevaluación continua', 'Zinc 10-20 mg/día por 10 días', 'Si vómitos persistentes o deshidratación severa: referir'],
      urgencia: 'alta'
    },
    gastroenteritis: {
      nombre: 'Gastroenteritis Aguda',
      sintomasRequeridos: ['diarrea'],
      sintomasOpcionales: ['vómitos', 'fiebre', 'dolor abdominal', 'náuseas'],
      signosAlarma: [],
      puntoBase: 65,
      tratamiento: ['Sales de rehidratación oral', 'Plan A: 10 ml/kg por deposición', 'Continuar alimentación normal', 'Zinc 10-20 mg/día por 10 días', 'Probióticos', 'Control en 24-48h si no mejora'],
      urgencia: 'moderada'
    },
    apendicitis_sospecha: {
      nombre: 'Abdomen Agudo - Sospecha de Apendicitis',
      sintomasRequeridos: ['dolor abdominal'],
      sintomasOpcionales: ['vómitos', 'fiebre', 'inapetencia', 'náuseas'],
      signosAlarma: ['palidez extrema'],
      puntoBase: 70,
      tratamiento: ['🚨 REFERIR URGENTEMENTE A CIRUGÍA', 'Nada por vía oral', 'Evaluación quirúrgica inmediata', 'NO administrar analgésicos antes de evaluación', 'Monitoreo de signos vitales'],
      urgencia: 'critica'
    },
    estreñimiento: {
      nombre: 'Estreñimiento',
      sintomasRequeridos: ['estreñimiento'],
      sintomasOpcionales: ['dolor abdominal'],
      signosAlarma: [],
      puntoBase: 50,
      tratamiento: ['Aumentar ingesta de agua', 'Dieta rica en fibra', 'Ejercicio regular', 'Laxantes osmóticos si necesario (lactulosa)', 'Evaluación si persiste >2 semanas'],
      urgencia: 'leve'
    },

    // NEUROLOGICAS
    meningitis_sospecha: {
      nombre: 'Sospecha de Meningitis',
      sintomasRequeridos: ['fiebre'],
      sintomasOpcionales: ['vómitos', 'irritabilidad', 'decaimiento', 'somnolencia'],
      signosAlarma: ['rigidez nuca', 'letargo', 'cianosis', 'palidez extrema'],
      puntoBase: 90,
      tratamiento: ['🚨🚨 EMERGENCIA - REFERIR INMEDIATAMENTE', 'Ceftriaxona IV 100 mg/kg si disponible', 'Acceso venoso', 'Monitoreo continuo', 'Punción lumbar en hospital', 'NO RETRASAR EL TRATAMIENTO'],
      urgencia: 'critica'
    },
    convulsion_febril: {
      nombre: 'Convulsión Febril',
      sintomasRequeridos: ['fiebre'],
      sintomasOpcionales: ['somnolencia', 'decaimiento'],
      signosAlarma: ['letargo'],
      puntoBase: 60,
      tratamiento: ['Antitérmicos agresivos', 'Observación', 'Buscar foco infeccioso', 'Educación a padres sobre manejo de crisis', 'Si >15 min o focal: referir para descartar meningitis'],
      urgencia: 'moderada'
    },

    // GENERALES
    sindrome_febril: {
      nombre: 'Síndrome Febril sin Foco',
      sintomasRequeridos: ['fiebre'],
      sintomasOpcionales: ['decaimiento', 'irritabilidad', 'inapetencia'],
      signosAlarma: [],
      puntoBase: 50,
      tratamiento: ['Antitérmicos (paracetamol 15 mg/kg o ibuprofeno 10 mg/kg)', 'Hidratación adecuada', 'Observación', 'Control en 24-48h si persiste', 'Buscar foco infeccioso'],
      urgencia: 'moderada'
    }
  };

  const processDiagnostic = () => {
    const diagnosticosCandidatos = [];

    // Evaluar signos de alarma críticos
    const signosCriticos = ['cianosis', 'palidez extrema', 'tiraje', 'letargo', 'rigidez nuca', 'quejido respiratorio', 'apneas'];
    const signosAlarmaCriticos = formData.signosAlarma.filter(signo => signosCriticos.includes(signo));

    // Convertir edad a meses si está disponible
    let edadMeses = null;
    if (formData.edad) {
      const edadMap = {
        'recien-nacido': 0.5,
        'lactante': 12,
        'preescolar': 36,
        'escolar': 96,
        'adolescente': 156
      };
      edadMeses = edadMap[formData.edad] || null;
    }

    // Evaluar cada patrón clínico
    Object.keys(patronesClinicos).forEach(key => {
      const patron = patronesClinicos[key];
      let puntos = 0;

      // Verificar restricciones de edad
      if (patron.edadMax && edadMeses && edadMeses > patron.edadMax) {
        return; // Saltar este patrón
      }

      // Verificar síntomas requeridos
      const sintomasRequeridosPresentes = patron.sintomasRequeridos.every(sintoma =>
        formData.sintomas.includes(sintoma)
      );

      if (!sintomasRequeridosPresentes) {
        return; // No cumple criterios mínimos
      }

      // Punto base si cumple síntomas requeridos
      puntos = patron.puntoBase;

      // Sumar puntos por síntomas opcionales presentes
      const sintomasOpcionalesPresentes = patron.sintomasOpcionales.filter(sintoma =>
        formData.sintomas.includes(sintoma)
      ).length;
      puntos += sintomasOpcionalesPresentes * 3;

      // Sumar puntos significativos por signos de alarma específicos
      if (patron.signosAlarma && patron.signosAlarma.length > 0) {
        const signosPresentes = patron.signosAlarma.filter(signo =>
          formData.signosAlarma.includes(signo)
        ).length;
        if (signosPresentes > 0) {
          puntos += signosPresentes * 10; // Peso importante a signos de alarma
        }
      }

      // Calcular nivel de confianza basado en completitud
      let confianza = 'baja';
      const totalSintomasPosibles = patron.sintomasRequeridos.length + patron.sintomasOpcionales.length;
      const sintomasTotalesPresentes = patron.sintomasRequeridos.length + sintomasOpcionalesPresentes;
      const porcentajeCompletitud = (sintomasTotalesPresentes / totalSintomasPosibles) * 100;

      if (porcentajeCompletitud >= 80 || (patron.signosAlarma && patron.signosAlarma.some(s => formData.signosAlarma.includes(s)))) {
        confianza = 'alta';
      } else if (porcentajeCompletitud >= 60) {
        confianza = 'media';
      }

      // Si hay signos críticos de esta enfermedad, aumentar urgencia
      if (patron.urgencia === 'critica' || signosAlarmaCriticos.length > 0) {
        confianza = 'muy-alta';
      }

      diagnosticosCandidatos.push({
        nombre: patron.nombre,
        puntos: puntos,
        confianza: confianza,
        tratamiento: patron.tratamiento,
        urgencia: patron.urgencia
      });
    });

    // Ordenar por puntuación
    diagnosticosCandidatos.sort((a, b) => b.puntos - a.puntos);

    // Si no hay diagnósticos candidatos, dar diagnóstico genérico
    if (diagnosticosCandidatos.length === 0) {
      const sintomasPrincipales = formData.sintomas.slice(0, 3).join(', ');
      setResultado({
        diagnosticoPrincipal: `Síndrome clínico con ${sintomasPrincipales}`,
        confianza: 'baja',
        tratamiento: [
          'Evaluación clínica completa presencial',
          'Tratamiento sintomático',
          'Seguimiento estrecho',
          'Reevaluación en 24 horas'
        ],
        signosAlarmaCriticos: signosAlarmaCriticos,
        diagnosticosDiferenciales: []
      });
      return;
    }

    // Tomar el principal y hasta 2 diferenciales
    const principal = diagnosticosCandidatos[0];
    const diferenciales = diagnosticosCandidatos.slice(1, 3).filter(d => d.puntos >= principal.puntos * 0.7);

    setResultado({
      diagnosticoPrincipal: principal.nombre,
      confianza: principal.confianza,
      tratamiento: principal.tratamiento,
      signosAlarmaCriticos: signosAlarmaCriticos,
      urgencia: principal.urgencia,
      diagnosticosDiferenciales: diferenciales
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
    // Determinar color y clase según urgencia
    const urgenciaClase = resultado.urgencia ? `urgencia-${resultado.urgencia}` : '';
    const urgenciaTexto = {
      'critica': '🚨 EMERGENCIA MÉDICA',
      'alta': '⚠️ URGENCIA ALTA',
      'moderada': '⚡ ATENCIÓN PRONTA',
      'leve': 'ℹ️ CONTROL AMBULATORIO'
    };

    return (
      <section className="section active">
        <div className="container">
          <div className="resultado-diagnostico-avanzado">
            {resultado.urgencia && (
              <div className={`nivel-urgencia ${urgenciaClase}`}>
                <h3>{urgenciaTexto[resultado.urgencia]}</h3>
              </div>
            )}

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

            {resultado.diagnosticosDiferenciales && resultado.diagnosticosDiferenciales.length > 0 && (
              <div className="diagnosticos-diferenciales">
                <h4>🔍 Diagnósticos Diferenciales</h4>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>
                  Otros diagnósticos posibles a considerar:
                </p>
                {resultado.diagnosticosDiferenciales.map((diag, index) => (
                  <div key={index} className="diagnostico-diferencial-item">
                    <div className="diagnostico-header">
                      <strong>{index + 2}. {diag.nombre}</strong>
                      <span className={`badge-confianza ${diag.confianza}`}>
                        {diag.confianza}
                      </span>
                    </div>
                    <div className="diagnostico-puntos">
                      Probabilidad: {Math.round((diag.puntos / resultado.diagnosticosDiferenciales[0]?.puntos || diag.puntos) * 100)}%
                    </div>
                  </div>
                ))}
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

            <div className="disclaimer-diagnostico">
              <p>
                <strong>⚠️ Importante:</strong> Este sistema es una herramienta de apoyo diagnóstico.
                La evaluación clínica presencial y el juicio médico son indispensables para un diagnóstico definitivo.
              </p>
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