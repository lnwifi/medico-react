import React, { useState } from 'react';

const Emergencias = () => {
  const [pesoEmergencia, setPesoEmergencia] = useState('');
  const [dosisEmergencia, setDosisEmergencia] = useState(null);
  const [protocoloActivo, setProtocoloActivo] = useState(null);

  const calcularDosisEmergencia = () => {
    const peso = parseFloat(pesoEmergencia);
    
    if (!peso || peso <= 0 || peso > 100) {
      setDosisEmergencia({ error: 'Por favor ingrese un peso válido (0.5-100 kg)' });
      return;
    }

    const dosis = {
      adrenalina: {
        rcp: (peso * 0.01).toFixed(2),
        anafilaxia: peso < 25 ? 0.15 : (peso < 50 ? 0.3 : 0.5)
      },
      diazepam: (peso * 0.3).toFixed(1),
      fluidos: (peso * 20).toFixed(0),
      paracetamol: (peso * 10).toFixed(0),
      paracetamol_ml: ((peso * 10) / 24).toFixed(1)
    };

    setDosisEmergencia({ peso, dosis });
  };

  const mostrarProtocoloRapido = (tipo) => {
    setProtocoloActivo(tipo);
  };

  const cerrarProtocoloRapido = () => {
    setProtocoloActivo(null);
  };

  return (
    <section className="section active">
      <div className="container">
        <div className="section-header">
          <h2>🚨 Emergencias Pediátricas</h2>
          <p>Protocolos de emergencia para situaciones críticas</p>
        </div>

        {/* Números de Emergencia */}
        <div className="emergency-numbers">
          <h3>📞 Emergencias Argentina</h3>
          <div className="numbers-grid">
            <div className="number-card same">
              <div className="number">107</div>
              <div className="service">SAME</div>
            </div>
            <div className="number-card general">
              <div className="number">911</div>
              <div className="service">Emergencias</div>
            </div>
            <div className="number-card bomberos">
              <div className="number">100</div>
              <div className="service">Bomberos</div>
            </div>
            <div className="number-card violencia">
              <div className="number">144</div>
              <div className="service">Violencia</div>
            </div>
          </div>
        </div>

        {/* Grid de Emergencias */}
        <div className="emergencias-container">
          <div className="emergencia-item critica">
            <div className="emergencia-header">
              <span className="emergencia-icon">💀</span>
              <div className="emergencia-info">
                <h3>Paro Cardiorrespiratorio</h3>
                <p>Sin pulso • Sin respiración • Inconsciente</p>
                <span className="tiempo-critico">Actuar INMEDIATAMENTE</span>
              </div>
            </div>
            <div className="emergencia-actions">
              <div className="quick-steps">
                <div className="step">1. Verificar respuesta</div>
                <div className="step">2. Llamar 107</div>
                <div className="step">3. Iniciar RCP 30:2</div>
                <div className="step">4. No parar hasta SAME</div>
              </div>
              <button 
                className="btn-protocolo" 
                onClick={() => mostrarProtocoloRapido('paro')}
              >
                Ver Protocolo Completo
              </button>
            </div>
          </div>

          <div className="emergencia-item alta">
            <div className="emergencia-header">
              <span className="emergencia-icon">⚠️</span>
              <div className="emergencia-info">
                <h3>Anafilaxia</h3>
                <p>Rash + Dificultad respiratoria + Shock</p>
                <span className="tiempo-critico">Adrenalina en &lt;5 min</span>
              </div>
            </div>
            <div className="emergencia-actions">
              <div className="quick-steps">
                <div className="step">1. Adrenalina IM muslo</div>
                <div className="step">2. Oxígeno al 100%</div>
                <div className="step">3. Acceso venoso</div>
                <div className="step">4. Fluidos 20ml/kg</div>
              </div>
              <button 
                className="btn-protocolo" 
                onClick={() => mostrarProtocoloRapido('anafilaxia')}
              >
                Ver Protocolo Completo
              </button>
            </div>
          </div>
        </div>

        {/* Calculadora rápida de dosis de emergencia */}
        <div className="dosis-emergencia">
          <h3>⚡ Dosis de Emergencia Rápida</h3>
          <div className="calc-rapida">
            <input 
              type="number" 
              placeholder="Peso (kg)" 
              min="1" 
              max="100"
              value={pesoEmergencia}
              onChange={(e) => setPesoEmergencia(e.target.value)}
            />
            <button onClick={calcularDosisEmergencia}>Calcular Dosis</button>
          </div>
          
          <div className="resultado-rapido">
            {dosisEmergencia?.error && (
              <p style={{color: '#ff6b6b'}}>{dosisEmergencia.error}</p>
            )}
            {dosisEmergencia?.dosis && (
              <>
                <h4>⚡ Dosis de Emergencia para {dosisEmergencia.peso} kg</h4>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                  <div style={{background: 'rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                    <strong>💉 Adrenalina RCP</strong><br/>
                    {dosisEmergencia.dosis.adrenalina.rcp} mg IV
                  </div>
                  <div style={{background: 'rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                    <strong>⚠️ Adrenalina Anafilaxia</strong><br/>
                    {dosisEmergencia.dosis.adrenalina.anafilaxia} mg IM
                  </div>
                  <div style={{background: 'rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                    <strong>🧠 Diazepam</strong><br/>
                    {dosisEmergencia.dosis.diazepam} mg IV/rectal
                  </div>
                  <div style={{background: 'rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                    <strong>💧 Fluidos</strong><br/>
                    {dosisEmergencia.dosis.fluidos} ml bolo
                  </div>
                  <div style={{background: 'rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                    <strong>🌡️ Paracetamol</strong><br/>
                    {dosisEmergencia.dosis.paracetamol_ml} ml jarabe
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {protocoloActivo && (
          <div className="protocolo-detalle-nuevo">
            <div className="protocolo-header">
              <h3>🚨 Protocolo de {protocoloActivo === 'paro' ? 'Paro Cardiorrespiratorio' : 'Anafilaxia'}</h3>
              <button className="btn-cerrar" onClick={cerrarProtocoloRapido}>
                ✕ Cerrar
              </button>
            </div>
            
            {protocoloActivo === 'paro' && (
              <div className="protocolo-content">
                <div className="alerta-critica-nueva">
                  <h4>⏱️ TIEMPO CRÍTICO: Cada segundo cuenta</h4>
                </div>
                
                <div className="protocolo-steps">
                  <div className="step-group">
                    <h4>1. Evaluación Inicial (10 segundos)</h4>
                    <ul>
                      <li>✓ Verificar respuesta: "¿Estás bien?" + estímulo táctil</li>
                      <li>✓ Verificar respiración: Ver-Oir-Sentir por 10 seg</li>
                      <li>✓ Verificar pulso (solo personal entrenado)</li>
                    </ul>
                  </div>

                  <div className="step-group">
                    <h4>2. Activar Sistema de Emergencias</h4>
                    <ul>
                      <li>🚨 Llamar 107 (SAME) o 911 inmediatamente</li>
                      <li>📍 Dar ubicación exacta</li>
                      <li>👥 Solicitar DEA si está disponible</li>
                    </ul>
                  </div>

                  <div className="step-group">
                    <h4>3. RCP Pediátrica (Compresiones:Ventilaciones)</h4>
                    <div className="rcp-details">
                      <div className="edad-group">
                        <strong>Lactantes (&lt;1 año):</strong>
                        <ul>
                          <li>2 dedos en esternón, 1/3 inferior</li>
                          <li>Profundidad: 4 cm (1/3 del tórax)</li>
                          <li>Frecuencia: 100-120/min</li>
                          <li>30:2 (1 rescatista) o 15:2 (2 rescatistas)</li>
                        </ul>
                      </div>
                      <div className="edad-group">
                        <strong>Niños (1-8 años):</strong>
                        <ul>
                          <li>1-2 manos en esternón, centro del pecho</li>
                          <li>Profundidad: 5 cm (1/3 del tórax)</li>
                          <li>Frecuencia: 100-120/min</li>
                          <li>30:2 (1 rescatista) o 15:2 (2 rescatistas)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="step-group">
                    <h4>4. Medicaciones de Emergencia</h4>
                    <div className="dosis-table">
                      <div><strong>Adrenalina:</strong> 0.01 mg/kg IV/IO cada 3-5 min</div>
                      <div><strong>Amiodarona:</strong> 5 mg/kg IV/IO</div>
                      <div><strong>Atropina:</strong> 0.02 mg/kg IV/IO (mín 0.1mg)</div>
                    </div>
                  </div>

                  <div className="step-group">
                    <h4>5. Ritmos Desfibrilables (FV/TV sin pulso)</h4>
                    <ul>
                      <li>⚡ Desfibrilar: 2 J/kg → 4 J/kg → 4 J/kg</li>
                      <li>🔄 Continuar RCP 2 minutos entre descargas</li>
                      <li>💉 Adrenalina después de 2ª descarga</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {protocoloActivo === 'anafilaxia' && (
              <div className="protocolo-content">
                <div className="alerta-critica-nueva">
                  <h4>⏱️ ADRENALINA en los primeros 5 minutos</h4>
                </div>
                
                <div className="protocolo-steps">
                  <div className="step-group">
                    <h4>1. Reconocimiento de Anafilaxia</h4>
                    <div className="criterios">
                      <strong>Criterio A:</strong> Inicio agudo + piel/mucosas + respiratorio O cardiovascular
                      <br/>
                      <strong>Criterio B:</strong> 2 o más: piel, respiratorio, cardiovascular, gastrointestinal
                      <br/>
                      <strong>Criterio C:</strong> Hipotensión después de exposición a alérgeno conocido
                    </div>
                  </div>

                  <div className="step-group urgente">
                    <h4>2. Tratamiento Inmediato (primeros 5 min)</h4>
                    <ul>
                      <li>🚨 Llamar 107/911 inmediatamente</li>
                      <li>💉 <strong>ADRENALINA IM</strong> cara anterolateral del muslo:</li>
                      <div className="dosis-adrenalina">
                        <div>&lt; 6 meses: 0.05-0.1 ml (1:1000)</div>
                        <div>6m-6años: 0.15 ml (1:1000)</div>
                        <div>6-12 años: 0.3 ml (1:1000)</div>
                        <div>&gt;12 años/adultos: 0.5 ml (1:1000)</div>
                      </div>
                      <li>🛌 Posición supina con piernas elevadas (si consciente)</li>
                      <li>🫁 Oxígeno 100% con mascarilla</li>
                    </ul>
                  </div>

                  <div className="step-group">
                    <h4>3. Tratamiento Secundario</h4>
                    <ul>
                      <li>🔄 <strong>Repetir adrenalina cada 5-15 min si no mejora</strong></li>
                      <li>💧 <strong>Fluidos IV:</strong> 20 ml/kg bolo (repetir si necesario)</li>
                      <li>💨 Si broncoespasmo: Salbutamol nebulizado</li>
                      <li>💊 Corticoides: Hidrocortisona 4-8 mg/kg IV</li>
                      <li>🚫 Antihistamínicos: Difenhidramina 1 mg/kg IV</li>
                    </ul>
                  </div>

                  <div className="step-group">
                    <h4>4. Monitoreo y Seguimiento</h4>
                    <ul>
                      <li>📊 Signos vitales cada 5 min</li>
                      <li>❤️ Monitor cardíaco y oximetría</li>
                      <li>🏥 Observación mínima 4-6 horas</li>
                      <li>⚠️ Reacción bifásica posible en 8-12 horas</li>
                      <li>📝 Prescribir autoinyector de adrenalina</li>
                    </ul>
                  </div>

                  <div className="warning-box">
                    <h4>🚫 NUNCA usar adrenalina IV en anafilaxia</h4>
                    <p>Solo IM (intramuscular) en cara anterolateral del muslo</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Emergencias;