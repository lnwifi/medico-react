// Base de datos de emergencias críticas pediátricas - Argentina
const emergenciasDB = {
    paro: {
        nombre: "Paro Cardiorrespiratorio Pediátrico",
        descripcion: "Protocolo de RCP pediátrico según guías internacionales",
        icon: "🆘",
        urgencia: "critica",
        tiempoLimite: "Iniciar inmediatamente",
        
        reconocimiento: {
            titulo: "Reconocimiento del Paro",
            signos: [
                "Pérdida de conciencia",
                "Ausencia de respiración o gasping",
                "Ausencia de pulso central (>10 segundos)",
                "Cianosis o palidez extrema"
            ]
        },
        
        protocolo: {
            secuencia: [
                {
                    paso: 1,
                    titulo: "Verificar Respuesta",
                    acciones: [
                        "Estimular al niño (palmadas en los hombros)",
                        "Gritar: '¿Estás bien?'",
                        "Si no responde → activar emergencias"
                    ],
                    tiempo: "5-10 segundos"
                },
                {
                    paso: 2,
                    titulo: "Activar Sistema de Emergencias",
                    acciones: [
                        "Llamar al 107 (SAME)",
                        "Solicitar DEA si disponible",
                        "Si hay 2 rescatistas: uno llama, otro inicia RCP"
                    ],
                    tiempo: "Inmediato"
                },
                {
                    paso: 3,
                    titulo: "Posicionamiento",
                    acciones: [
                        "Superficie firme y plana",
                        "Hiperextensión leve del cuello",
                        "Posición de manos según edad"
                    ],
                    detalles: {
                        "Lactantes (<1 año)": "2 dedos en esternón inferior",
                        "Niños (1-8 años)": "Talón de una mano",
                        "Adolescentes (>8 años)": "Ambas manos entrelazadas"
                    }
                },
                {
                    paso: 4,
                    titulo: "Compresiones Torácicas",
                    acciones: [
                        "Frecuencia: 100-120 por minuto",
                        "Profundidad: 1/3 del diámetro torácico",
                        "Permitir reexpansión completa",
                        "Minimizar interrupciones"
                    ],
                    profundidad: {
                        "Lactantes": "4 cm",
                        "Niños": "5 cm",
                        "Adolescentes": "5-6 cm"
                    }
                },
                {
                    paso: 5,
                    titulo: "Ventilación",
                    acciones: [
                        "Relación: 30 compresiones : 2 ventilaciones",
                        "Si no entrenado: solo compresiones",
                        "Bolsa-válvula-máscara si disponible",
                        "Ventilaciones de 1 segundo c/u"
                    ]
                },
                {
                    paso: 6,
                    titulo: "Ciclos de RCP",
                    acciones: [
                        "Continuar 30:2 por 2 minutos",
                        "Reevaluar pulso cada 2 minutos",
                        "Cambiar reanimador cada 2 minutos",
                        "No interrumpir hasta llegada del SAME"
                    ]
                }
            ]
        },
        
        medicamentos: {
            adrenalina: {
                dosis: "0.01 mg/kg (0.1 ml/kg de sol 1:10.000)",
                via: "Intravenosa o intraósea",
                repetir: "Cada 3-5 minutos",
                maxima: "1 mg por dosis"
            },
            amiodarona: {
                dosis: "5 mg/kg",
                via: "IV/IO",
                indicacion: "Fibrilación ventricular/Taquicardia ventricular"
            }
        },
        
        causasReversibles: [
            "Hipovolemia → Fluidos IV",
            "Hipoxia → Ventilación/Oxígeno", 
            "Acidosis → Bicarbonato si pH <7.1",
            "Hipotermia → Recalentamiento",
            "Hipoglucemia → Dextrosa 25% 2ml/kg",
            "Hiperkaliemia → Calcio + Insulina",
            "Toxinas → Antídotos específicos",
            "Neumotórax → Descompresión",
            "Taponamiento → Pericardiocentesis",
            "Trombosis → Trombolíticos"
        ]
    },

    anafilaxia: {
        nombre: "Anafilaxia",
        descripcion: "Reacción alérgica severa que amenaza la vida",
        icon: "⚠️",
        urgencia: "critica",
        tiempoLimite: "Tratar en <5 minutos",
        
        reconocimiento: {
            titulo: "Criterios Diagnósticos",
            criterios: [
                "Inicio agudo (minutos-horas) con compromiso de ≥2 sistemas",
                "Compromiso respiratorio + cutáneo + cardiovascular",
                "Hipotensión tras exposición a alérgeno conocido"
            ],
            sintomas: {
                cutaneos: ["Urticaria generalizada", "Angioedema", "Prurito", "Eritema"],
                respiratorios: ["Broncoespasmo", "Estridor", "Disfonia", "Disnea"],
                cardiovasculares: ["Hipotensión", "Taquicardia", "Shock", "Mareos"],
                gastrointestinales: ["Vómitos", "Diarrea", "Calambres abdominales"]
            }
        },
        
        protocolo: {
            inmediato: [
                {
                    paso: 1,
                    titulo: "Evaluación Rápida",
                    acciones: [
                        "ABC: Vía aérea, respiración, circulación",
                        "Retirar alérgeno si es posible",
                        "Posición: acostado con piernas elevadas",
                        "Monitoreo continuo"
                    ]
                },
                {
                    paso: 2,
                    titulo: "Adrenalina INMEDIATA",
                    acciones: [
                        "Adrenalina 1:1000 intramuscular",
                        "Dosis: 0.01 mg/kg (máx 0.5mg)",
                        "Sitio: cara anterolateral del muslo",
                        "Repetir cada 5-15 min si necesario"
                    ],
                    dosis_edad: {
                        "6m-6años": "0.15 mg (0.15 ml)",
                        "6-12años": "0.3 mg (0.3 ml)", 
                        ">12años": "0.5 mg (0.5 ml)"
                    }
                },
                {
                    paso: 3,
                    titulo: "Oxígeno y Acceso Venoso",
                    acciones: [
                        "Oxígeno al 100%",
                        "Acceso venoso (2 vías si shock)",
                        "Solución salina 20ml/kg bolo",
                        "Repetir fluidos según respuesta"
                    ]
                },
                {
                    paso: 4,
                    titulo: "Medicación Adjunta",
                    acciones: [
                        "Hidrocortisona 5mg/kg IV (máx 200mg)",
                        "Difenhidramina 1mg/kg IV (máx 50mg)",
                        "Si broncoespasmo: Salbutamol nebulizado",
                        "Ranitidina 1mg/kg IV (máx 50mg)"
                    ]
                }
            ]
        },
        
        tratamiento_refractario: {
            titulo: "Anafilaxia Refractaria",
            criterios: ["No respuesta a 2-3 dosis de adrenalina", "Shock persistente"],
            medidas: [
                "Infusión de adrenalina: 0.1-1 mcg/kg/min",
                "Vasopresina: 0.0003 U/kg IV",
                "Glucagón: 1-5 mg IV (si toma betabloqueantes)",
                "Soporte inotrópico",
                "Intubación si compromiso severo"
            ]
        },
        
        alta_observacion: {
            criterios_alta: [
                "Estabilidad hemodinámica >4-6 horas",
                "Síntomas resueltos completamente",
                "Acceso garantizado a adrenalina autoinyectable"
            ],
            plan_alta: [
                "Adrenalina autoinyectable (EpiPen)",
                "Prednisona 1mg/kg/día x 3 días",
                "Antihistamínicos H1 y H2",
                "Plan de acción por escrito",
                "Derivación a alergología"
            ]
        }
    },

    status_epilepticus: {
        nombre: "Status Epiléptico",
        descripcion: "Convulsión >5 minutos o convulsiones recurrentes sin recuperación",
        icon: "🧠",
        urgencia: "critica",
        tiempoLimite: "Tratar en <5 minutos",
        
        definicion: {
            operacional: "Convulsión >5 minutos",
            establecido: "Convulsión >30 minutos",
            refractario: "Continúa después de 2 antiepilépticos"
        },
        
        protocolo: {
            timeline: [
                {
                    tiempo: "0-5 minutos",
                    titulo: "Estabilización Inicial",
                    acciones: [
                        "ABC: asegurar vía aérea",
                        "Posición lateral de seguridad",
                        "Oxígeno suplementario",
                        "Monitoreo saturación",
                        "Acceso venoso (no retrasar tratamiento)",
                        "Glicemia capilar"
                    ]
                },
                {
                    tiempo: "5-10 minutos",
                    titulo: "Primera Línea",
                    medicamentos: [
                        {
                            farmaco: "Diazepam IV",
                            dosis: "0.2-0.3 mg/kg (máx 10mg)",
                            alternativa: "Diazepam rectal 0.5 mg/kg"
                        },
                        {
                            farmaco: "Lorazepam IV",
                            dosis: "0.1 mg/kg (máx 4mg)",
                            preferido: "Más efectivo que diazepam"
                        },
                        {
                            farmaco: "Midazolam IM",
                            dosis: "0.2 mg/kg (máx 10mg)",
                            indicacion: "Si no hay acceso IV"
                        }
                    ]
                },
                {
                    tiempo: "10-20 minutos",
                    titulo: "Segunda Línea",
                    medicamentos: [
                        {
                            farmaco: "Fenitoína IV",
                            dosis: "20 mg/kg en 20 minutos",
                            concentracion: "≤1 mg/kg/min",
                            monitoreo: "ECG continuo"
                        },
                        {
                            farmaco: "Valproato IV",
                            dosis: "20-40 mg/kg en 10 minutos",
                            alternativa: "Si contraindicación a fenitoína"
                        },
                        {
                            farmaco: "Levetiracetam IV",
                            dosis: "20-60 mg/kg en 15 minutos",
                            ventaja: "Menos efectos adversos"
                        }
                    ]
                },
                {
                    tiempo: ">20 minutos",
                    titulo: "Status Refractario",
                    medidas: [
                        "Considerar intubación",
                        "Traslado a UCI pediátrica",
                        "Midazolam infusión 0.2 mg/kg + 0.05-2 mg/kg/h",
                        "Propofol infusión 1-2 mg/kg + 2-10 mg/kg/h",
                        "EEG continuo",
                        "Investigar causa subyacente"
                    ]
                }
            ]
        },
        
        causas_investigar: [
            "Infecciones (meningitis, encefalitis)",
            "Metabólicas (hipoglucemia, hiponatremia)",
            "Tóxicas (intoxicaciones)",
            "Traumáticas (hematoma intracraneal)",
            "Vasculares (ACV pediátrico)",
            "Epilepsia conocida (no adherencia)"
        ],
        
        complicaciones: [
            "Hipertermia → Medidas de enfriamiento",
            "Acidosis → Bicarbonato si pH <7.1",
            "Hipotensión → Fluidos, vasopresores",
            "Hipoxemia → Intubación",
            "Rabdomiólisis → Hidratación, vigilar función renal"
        ]
    },

    trauma: {
        nombre: "Trauma Mayor Pediátrico",
        descripcion: "Evaluación inicial sistemática del trauma pediátrico",
        icon: "🩹",
        urgencia: "alta",
        tiempoLimite: "Evaluación en <10 minutos",
        
        evaluacion_primaria: {
            titulo: "ABCDE del Trauma Pediátrico",
            secuencia: [
                {
                    letra: "A",
                    area: "Vía Aérea con Control Cervical",
                    evaluacion: [
                        "Permeabilidad de vía aérea",
                        "Inmovilización cervical",
                        "Buscar cuerpos extraños",
                        "Evaluar lesiones faciales"
                    ],
                    acciones: [
                        "Collarín cervical adecuado para la edad",
                        "Aspiración suave si necesario",
                        "Intubación si GCS <8 o compromiso severo",
                        "Cricotiroidotomía contraindicada <12 años"
                    ]
                },
                {
                    letra: "B",
                    area: "Respiración y Ventilación",
                    evaluacion: [
                        "Frecuencia respiratoria",
                        "Movimientos torácicos simétricos",
                        "Saturación de oxígeno",
                        "Auscultación bilateral"
                    ],
                    acciones: [
                        "Oxígeno suplementario",
                        "Ventilación asistida si necesario",
                        "Descompresión de neumotórax",
                        "Toracostomía si indicada"
                    ]
                },
                {
                    letra: "C",
                    area: "Circulación con Control de Hemorragias",
                    evaluacion: [
                        "Pulso central y periférico",
                        "Presión arterial",
                        "Tiempo de llenado capilar",
                        "Hemorragias externas"
                    ],
                    acciones: [
                        "Control directo de hemorragias",
                        "2 accesos venosos de grueso calibre",
                        "Solución salina 20ml/kg bolo",
                        "Considerar sangre si no respuesta"
                    ]
                },
                {
                    letra: "D",
                    area: "Déficit Neurológico",
                    evaluacion: [
                        "Escala de Coma de Glasgow",
                        "Pupilas (tamaño, reactividad)",
                        "Movimientos de extremidades",
                        "Nivel de conciencia"
                    ],
                    acciones: [
                        "Mantener PPC >40 mmHg",
                        "Manitol 0.25-1 g/kg si herniación",
                        "Solución salina hipertónica",
                        "TC cerebral urgente"
                    ]
                },
                {
                    letra: "E",
                    area: "Exposición y Control Térmico",
                    evaluacion: [
                        "Examen corporal completo",
                        "Buscar lesiones ocultas",
                        "Evaluar temperatura corporal"
                    ],
                    acciones: [
                        "Desnudar completamente",
                        "Prevenir hipotermia",
                        "Mantas térmicas",
                        "Soluciones tibias"
                    ]
                }
            ]
        },
        
        escalas_pediatricas: {
            glasgow_pediatrico: {
                "Apertura ocular": {
                    "4": "Espontánea",
                    "3": "Al comando verbal",
                    "2": "Al dolor",
                    "1": "Sin respuesta"
                },
                "Respuesta verbal (>2 años)": {
                    "5": "Orientado, apropiado",
                    "4": "Confuso",
                    "3": "Palabras inapropiadas",
                    "2": "Sonidos incomprensibles",
                    "1": "Sin respuesta"
                },
                "Respuesta verbal (<2 años)": {
                    "5": "Sonríe, balbucea",
                    "4": "Llora, se consuela",
                    "3": "Llora inadecuadamente",
                    "2": "Gruñidos",
                    "1": "Sin respuesta"
                },
                "Respuesta motora": {
                    "6": "Obedece comandos",
                    "5": "Localiza dolor",
                    "4": "Retira al dolor",
                    "3": "Flexión anormal",
                    "2": "Extensión anormal",
                    "1": "Sin respuesta"
                }
            }
        },
        
        signos_alarma: [
            "GCS <8 o deterioro progresivo",
            "Shock que no responde a fluidos",
            "Distensión abdominal progresiva",
            "Hematuria macroscópica",
            "Fracturas femorales bilaterales",
            "Lesiones por mecanismo de alta energía"
        ],
        
        consideraciones_pediatricas: [
            "Mayor superficie corporal → pérdida calórica",
            "Menor volumen sanguíneo → shock rápido",
            "Cartílagos flexibles → lesiones internas sin fractura",
            "Cabeza proporcionalmente grande → TCE frecuente",
            "Esqueleto inmaduro → fracturas en tallo verde"
        ]
    }
};

// Función para obtener emergencia específica
function obtenerEmergencia(tipo) {
    return emergenciasDB[tipo] || null;
}

// Función actualizada para mostrar emergencias
function mostrarEmergencia(tipo) {
    const emergencia = obtenerEmergencia(tipo);
    const detalle = document.getElementById('emergencia-detalle');
    
    if (!emergencia) {
        detalle.innerHTML = '<p>Emergencia no encontrada</p>';
        detalle.style.display = 'block';
        return;
    }
    
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${emergencia.icon} ${emergencia.nombre}</h3>
            <button onclick="cerrarEmergencia()" style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">✕ Cerrar</button>
        </div>
        <p><em>${emergencia.descripcion}</em></p>
        <div class="alerta peligro">
            <p><strong>⏰ Tiempo límite:</strong> ${emergencia.tiempoLimite}</p>
            <p><strong>🚨 Urgencia:</strong> ${emergencia.urgencia.toUpperCase()}</p>
        </div>
    `;
    
    // Reconocimiento/Definición
    if (emergencia.reconocimiento) {
        html += `
            <div class="paso">
                <h4>🔍 ${emergencia.reconocimiento.titulo}</h4>
                ${emergencia.reconocimiento.signos ? `
                    <ul>
                        ${emergencia.reconocimiento.signos.map(signo => `<li>${signo}</li>`).join('')}
                    </ul>
                ` : ''}
                ${emergencia.reconocimiento.criterios ? `
                    <ul>
                        ${emergencia.reconocimiento.criterios.map(criterio => `<li>${criterio}</li>`).join('')}
                    </ul>
                ` : ''}
                ${emergencia.reconocimiento.sintomas ? `
                    ${Object.entries(emergencia.reconocimiento.sintomas).map(([sistema, sintomas]) => `
                        <div style="margin: 0.5rem 0;">
                            <strong>${sistema}:</strong> ${sintomas.join(', ')}
                        </div>
                    `).join('')}
                ` : ''}
            </div>
        `;
    }
    
    if (emergencia.definicion) {
        html += `
            <div class="paso">
                <h4>📚 Definiciones</h4>
                ${Object.entries(emergencia.definicion).map(([tipo, def]) => `
                    <p><strong>${tipo}:</strong> ${def}</p>
                `).join('')}
            </div>
        `;
    }
    
    // Protocolo principal
    if (emergencia.protocolo) {
        html += '<div class="protocolo-emergencia"><h4>🚑 Protocolo de Actuación</h4>';
        
        if (emergencia.protocolo.secuencia) {
            emergencia.protocolo.secuencia.forEach(paso => {
                html += `
                    <div class="paso-emergencia">
                        <h5>Paso ${paso.paso}: ${paso.titulo}</h5>
                        ${paso.tiempo ? `<p><strong>⏱️ Tiempo:</strong> ${paso.tiempo}</p>` : ''}
                        <ul>
                            ${paso.acciones.map(accion => `<li>${accion}</li>`).join('')}
                        </ul>
                        ${paso.detalles ? `
                            <div style="background: #f0f8ff; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                                <strong>Detalles por edad:</strong>
                                ${Object.entries(paso.detalles).map(([edad, detalle]) => `
                                    <br><em>${edad}:</em> ${detalle}
                                `).join('')}
                            </div>
                        ` : ''}
                        ${paso.profundidad ? `
                            <div style="background: #fff3e0; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                                <strong>Profundidad de compresión:</strong>
                                ${Object.entries(paso.profundidad).map(([edad, prof]) => `
                                    <br><em>${edad}:</em> ${prof}
                                `).join('')}
                            </div>
                        ` : ''}
                        ${paso.dosis_edad ? `
                            <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                                <strong>Dosis por edad:</strong>
                                ${Object.entries(paso.dosis_edad).map(([edad, dosis]) => `
                                    <br><em>${edad}:</em> ${dosis}
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        }
        
        if (emergencia.protocolo.timeline) {
            emergencia.protocolo.timeline.forEach(fase => {
                html += `
                    <div class="paso-emergencia">
                        <h5>⏰ ${fase.tiempo}: ${fase.titulo}</h5>
                        ${fase.acciones ? `
                            <ul>
                                ${fase.acciones.map(accion => `<li>${accion}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${fase.medicamentos ? `
                            <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px; margin: 0.5rem 0;">
                                <strong>💊 Medicamentos:</strong>
                                ${fase.medicamentos.map(med => `
                                    <div style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 5px;">
                                        <strong>${med.farmaco}:</strong> ${med.dosis}<br>
                                        ${med.via ? `<em>Vía:</em> ${med.via}<br>` : ''}
                                        ${med.alternativa ? `<em>Alternativa:</em> ${med.alternativa}<br>` : ''}
                                        ${med.preferido ? `<em>💡 ${med.preferido}</em><br>` : ''}
                                        ${med.indicacion ? `<em>Indicación:</em> ${med.indicacion}` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${fase.medidas ? `
                            <ul>
                                ${fase.medidas.map(medida => `<li>${medida}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `;
            });
        }
        
        if (emergencia.protocolo.inmediato) {
            emergencia.protocolo.inmediato.forEach(fase => {
                html += `
                    <div class="paso-emergencia">
                        <h5>Paso ${fase.paso}: ${fase.titulo}</h5>
                        <ul>
                            ${fase.acciones.map(accion => `<li>${accion}</li>`).join('')}
                        </ul>
                        ${fase.dosis_edad ? `
                            <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                                <strong>Dosis por edad:</strong>
                                ${Object.entries(fase.dosis_edad).map(([edad, dosis]) => `
                                    <br><em>${edad}:</em> ${dosis}
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        }
        
        html += '</div>';
    }
    
    // Evaluación primaria (para trauma)
    if (emergencia.evaluacion_primaria) {
        html += `
            <div class="paso">
                <h4>🔍 ${emergencia.evaluacion_primaria.titulo}</h4>
                ${emergencia.evaluacion_primaria.secuencia.map(item => `
                    <div style="background: #f8f9fa; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 4px solid #2196f3;">
                        <h6>${item.letra}. ${item.area}</h6>
                        <div style="margin: 0.5rem 0;">
                            <strong>Evaluación:</strong>
                            <ul>
                                ${item.evaluacion.map(eval => `<li>${eval}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin: 0.5rem 0;">
                            <strong>Acciones:</strong>
                            <ul>
                                ${item.acciones.map(accion => `<li>${accion}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Medicamentos
    if (emergencia.medicamentos) {
        html += `
            <div class="paso">
                <h4>💊 Medicamentos de Emergencia</h4>
                ${Object.entries(emergencia.medicamentos).map(([med, info]) => `
                    <div style="background: #e8f5e8; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
                        <strong>${med.charAt(0).toUpperCase() + med.slice(1)}:</strong><br>
                        <em>Dosis:</em> ${info.dosis}<br>
                        <em>Vía:</em> ${info.via}<br>
                        ${info.repetir ? `<em>Repetir:</em> ${info.repetir}<br>` : ''}
                        ${info.maxima ? `<em>Dosis máxima:</em> ${info.maxima}<br>` : ''}
                        ${info.indicacion ? `<em>Indicación:</em> ${info.indicacion}` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Información adicional
    if (emergencia.causasReversibles) {
        html += `
            <div class="alerta">
                <h4>🔄 Causas Reversibles (4H + 4T)</h4>
                <ul>
                    ${emergencia.causasReversibles.map(causa => `<li>${causa}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (emergencia.tratamiento_refractario) {
        html += `
            <div class="alerta peligro">
                <h4>⚠️ ${emergencia.tratamiento_refractario.titulo}</h4>
                <p><strong>Criterios:</strong> ${emergencia.tratamiento_refractario.criterios.join(', ')}</p>
                <ul>
                    ${emergencia.tratamiento_refractario.medidas.map(medida => `<li>${medida}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (emergencia.signos_alarma) {
        html += `
            <div class="alerta peligro">
                <h4>🚨 Signos de Alarma</h4>
                <ul>
                    ${emergencia.signos_alarma.map(signo => `<li>${signo}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (emergencia.consideraciones_pediatricas) {
        html += `
            <div class="paso">
                <h4>👶 Consideraciones Pediátricas</h4>
                <ul>
                    ${emergencia.consideraciones_pediatricas.map(consideracion => `<li>${consideracion}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    detalle.innerHTML = html;
    detalle.style.display = 'block';
    detalle.scrollIntoView({ behavior: 'smooth' });
}

function cerrarEmergencia() {
    const detalle = document.getElementById('emergencia-detalle');
    detalle.style.display = 'none';
}

// Función para búsqueda rápida de emergencias
function busquedaRapidaEmergencia(sintomas) {
    const sintomasLower = sintomas.toLowerCase();
    const emergenciasEncontradas = [];
    
    Object.keys(emergenciasDB).forEach(key => {
        const emergencia = emergenciasDB[key];
        
        // Buscar en nombre y descripción
        if (emergencia.nombre.toLowerCase().includes(sintomasLower) || 
            emergencia.descripcion.toLowerCase().includes(sintomasLower)) {
            emergenciasEncontradas.push({ ...emergencia, id: key });
        }
        
        // Buscar en signos de reconocimiento
        if (emergencia.reconocimiento && emergencia.reconocimiento.signos) {
            const signosCoincidentes = emergencia.reconocimiento.signos.filter(signo => 
                signo.toLowerCase().includes(sintomasLower) || 
                sintomasLower.includes(signo.toLowerCase())
            );
            
            if (signosCoincidentes.length > 0) {
                emergenciasEncontradas.push({ ...emergencia, id: key, signosCoincidentes });
            }
        }
    });
    
    return emergenciasEncontradas;
}