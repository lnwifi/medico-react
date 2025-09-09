// Protocolos de tratamiento escalonado - Pediatría Argentina
const protocolosDB = {
    asma: {
        nombre: "Crisis Asmática",
        descripcion: "Protocolo escalonado para manejo de asma aguda pediátrica",
        icon: "🫁",
        evaluacionInicial: {
            leve: ["Habla frases completas", "Frecuencia respiratoria normal/ligeramente aumentada", "Uso mínimo músculos accesorios", "Saturación >95%"],
            moderada: ["Habla palabras sueltas", "Frecuencia respiratoria aumentada", "Uso moderado músculos accesorios", "Saturación 91-95%"],
            severa: ["No puede hablar", "Frecuencia respiratoria muy aumentada", "Uso intenso músculos accesorios", "Saturación <91%"],
            critica: ["Agotamiento", "Cianosis", "Bradicardia", "Alteración conciencia"]
        },
        tratamiento: {
            nivel1: {
                titulo: "Crisis Leve",
                medicamentos: [
                    {
                        farmaco: "Salbutamol nebulización",
                        dosis: "0.15 mg/kg (máx 5mg) en 2-3ml SSF",
                        frecuencia: "Cada 4-6 horas según necesidad",
                        via: "Nebulización"
                    }
                ],
                medidas: [
                    "Posición semi-sentado",
                    "Tranquilizar al paciente",
                    "Evitar desencadenantes"
                ],
                evaluacion: "Reevaluar a los 60 minutos",
                siguiente: "Si no mejora → Nivel 2"
            },
            nivel2: {
                titulo: "Crisis Moderada",
                medicamentos: [
                    {
                        farmaco: "Salbutamol nebulización",
                        dosis: "0.15 mg/kg cada 20 minutos x 3 dosis",
                        frecuencia: "Cada 20 min por 1 hora",
                        via: "Nebulización"
                    },
                    {
                        farmaco: "Prednisolona",
                        dosis: "1-2 mg/kg (máx 60mg)",
                        frecuencia: "Dosis única, luego 1 vez/día x 3-5 días",
                        via: "Oral"
                    }
                ],
                medidas: [
                    "Oxígeno si saturación <92%",
                    "Hidratación adecuada",
                    "Monitoreo continuo"
                ],
                evaluacion: "Reevaluar cada 20 minutos durante 1 hora",
                siguiente: "Si no mejora → Nivel 3"
            },
            nivel3: {
                titulo: "Crisis Severa",
                medicamentos: [
                    {
                        farmaco: "Salbutamol nebulización continua",
                        dosis: "0.5 mg/kg/hora",
                        frecuencia: "Continua por 1 hora",
                        via: "Nebulización"
                    },
                    {
                        farmaco: "Prednisolona",
                        dosis: "2 mg/kg (máx 80mg)",
                        frecuencia: "Dosis única, continuar oral",
                        via: "IV u oral"
                    },
                    {
                        farmaco: "Bromuro de Ipratropio",
                        dosis: "250-500 mcg",
                        frecuencia: "Cada 20 min x 3 dosis con salbutamol",
                        via: "Nebulización"
                    }
                ],
                medidas: [
                    "Oxígeno para mantener sat >92%",
                    "Acceso venoso",
                    "Considerar sulfato de magnesio",
                    "DERIVAR A CENTRO DE MAYOR COMPLEJIDAD"
                ],
                evaluacion: "Monitoreo continuo",
                siguiente: "Considerar UCI pediátrica"
            }
        },
        criteriosDerivacion: [
            "Crisis severa que no responde",
            "Necesidad de oxígeno continuo",
            "Antecedentes de intubación",
            "Imposibilidad de garantizar seguimiento"
        ]
    },

    convulsiones: {
        nombre: "Convulsiones Febriles",
        descripcion: "Protocolo para manejo de convulsiones en pediatría",
        icon: "⚡",
        evaluacionInicial: {
            simple: ["Duración <15 minutos", "Generalizada", "Sin recurrencia en 24hs", "Edad 6 meses - 5 años"],
            compleja: ["Duración >15 minutos", "Focal", "Recurrente en 24hs", "Déficit neurológico post-ictal"]
        },
        tratamiento: {
            nivel1: {
                titulo: "Manejo Inmediato (0-5 minutos)",
                medidas: [
                    "Posición lateral de seguridad",
                    "Proteger vía aérea",
                    "NO introducir objetos en boca",
                    "Observar tipo y duración de convulsión",
                    "Tomar temperatura"
                ],
                medicamentos: [],
                evaluacion: "Si convulsión >5 minutos → Nivel 2"
            },
            nivel2: {
                titulo: "Convulsión Prolongada (>5 minutos)",
                medicamentos: [
                    {
                        farmaco: "Diazepam rectal",
                        dosis: "0.3 mg/kg (máx 10mg)",
                        frecuencia: "Dosis única",
                        via: "Rectal"
                    }
                ],
                medidas: [
                    "Mantener vía aérea permeable",
                    "Oxígeno si cianosis",
                    "Preparar para derivación",
                    "Controlar glicemia si es posible"
                ],
                evaluacion: "Si no cede en 5 min → Derivar URGENTE",
                siguiente: "Nivel 3 en hospital"
            },
            nivel3: {
                titulo: "Status Epiléptico (>30 minutos)",
                medicamentos: [
                    {
                        farmaco: "Diazepam IV",
                        dosis: "0.2 mg/kg",
                        frecuencia: "Puede repetir en 5 min",
                        via: "Intravenosa"
                    },
                    {
                        farmaco: "Fenitoína IV",
                        dosis: "15-20 mg/kg",
                        frecuencia: "Dosis única",
                        via: "Intravenosa lenta"
                    }
                ],
                medidas: [
                    "MANEJO HOSPITALARIO EXCLUSIVO",
                    "Monitoreo cardiorespiratorio",
                    "Control metabólico",
                    "Considerar intubación"
                ]
            }
        },
        postConvulsion: {
            medidas: [
                "Administrar antipiréticos",
                "Paracetamol 10mg/kg o Ibuprofeno 5-10mg/kg",
                "Medidas físicas de enfriamiento",
                "Hidratación adecuada",
                "Educar a los padres"
            ],
            derivacion: [
                "Primera convulsión febril",
                "Convulsión compleja",
                "Edad <6 meses o >5 años",
                "Signos meníngeos"
            ]
        }
    },

    deshidratacion: {
        nombre: "Deshidratación",
        descripcion: "Protocolo de evaluación y rehidratación pediátrica",
        icon: "💧",
        evaluacionInicial: {
            leve: ["Pérdida 3-5% peso", "Sed aumentada", "Mucosas ligeramente secas", "Diuresis normal"],
            moderada: ["Pérdida 6-9% peso", "Mucosas secas", "Ojos hundidos", "Oliguria", "Piel pastosa"],
            severa: ["Pérdida >10% peso", "Shock", "Anuria", "Alteración conciencia", "Piel en carpa"]
        },
        tratamiento: {
            nivel1: {
                titulo: "Deshidratación Leve (3-5%)",
                solucion: "Sales de Rehidratación Oral (SRO)",
                volumen: "50 ml/kg en 4-6 horas + pérdidas continuas",
                administracion: [
                    "5-10 ml cada 2-3 minutos",
                    "Usar cuchara o jeringa",
                    "Continuar lactancia materna",
                    "Introducir alimentos a las 4-6 horas"
                ],
                evaluacion: "Reevaluar cada 2 horas",
                siguiente: "Si no tolera o empeora → Nivel 2"
            },
            nivel2: {
                titulo: "Deshidratación Moderada (6-9%)",
                solucion: "SRO + evaluación médica",
                volumen: "75 ml/kg en 4-6 horas + pérdidas continuas",
                administracion: [
                    "Intentar SRO inicialmente",
                    "Si vómitos persistentes → SNG",
                    "Considerar ondansetrón 0.15mg/kg",
                    "Monitoreo estricto"
                ],
                evaluacion: "Reevaluar cada hora",
                siguiente: "Si no mejora en 6hs → Nivel 3"
            },
            nivel3: {
                titulo: "Deshidratación Severa (>10%)",
                solucion: "Rehidratación intravenosa",
                volumen: "100 ml/kg + déficit calculado",
                administracion: [
                    "Acceso venoso inmediato",
                    "SSF o Ringer lactato",
                    "50% en primeras 8 horas",
                    "50% en siguientes 16 horas"
                ],
                shock: {
                    volumen: "20 ml/kg SSF en bolo",
                    repetir: "Hasta 60 ml/kg si necesario",
                    derivacion: "UCI pediátrica"
                }
            }
        },
        sro: {
            composicion: "OMS/UNICEF: Na 75, Cl 65, K 20, Glucosa 75 mmol/L",
            preparacion: "1 sobre en 1 litro agua hervida",
            conservacion: "24 horas refrigerado",
            contraindicaciones: ["Vómitos incoercibles", "Íleo", "Shock"]
        }
    },

    fiebre: {
        nombre: "Manejo de Fiebre",
        descripcion: "Protocolo escalonado para el control de fiebre pediátrica",
        icon: "🌡️",
        evaluacionInicial: {
            definicion: "Temperatura axilar ≥37.5°C o rectal ≥38°C",
            medicion: ["Axilar: método recomendado", "Rectal: solo si necesario", "Ótica: >6 meses"],
            edadesRiesgo: ["<3 meses: derivar siempre", "3-36 meses: evaluación cuidadosa"]
        },
        tratamiento: {
            nivel1: {
                titulo: "Fiebre Leve-Moderada (37.5-39°C)",
                medicamentos: [
                    {
                        farmaco: "Paracetamol",
                        dosis: "10 mg/kg/dosis",
                        frecuencia: "Cada 4-6 horas (máx 5 dosis/día)",
                        via: "Oral",
                        presentacion: "Jarabe 120mg/5ml o 160mg/5ml"
                    }
                ],
                medidas: [
                    "Hidratación abundante",
                    "Ropa ligera",
                    "Ambiente fresco",
                    "Reposo relativo"
                ],
                evaluacion: "Reevaluar en 1-2 horas"
            },
            nivel2: {
                titulo: "Fiebre Alta (≥39°C) o No Respuesta",
                medicamentos: [
                    {
                        farmaco: "Ibuprofeno",
                        dosis: "10 mg/kg/dosis (si ≥39°C)",
                        frecuencia: "Cada 6-8 horas",
                        via: "Oral",
                        presentacion: "Jarabe 2% o 4%",
                        restriccion: "Solo >3 meses"
                    },
                    {
                        farmaco: "Paracetamol alternado",
                        dosis: "10 mg/kg/dosis",
                        frecuencia: "Cada 4 horas alternando",
                        nota: "NO combinar simultáneamente"
                    }
                ],
                medidas: [
                    "Medios físicos: paños tibios",
                    "Baño con agua tibia (NO fría)",
                    "Ventilación adecuada"
                ],
                evaluacion: "Reevaluar cada 2-4 horas"
            },
            nivel3: {
                titulo: "Fiebre Refractaria o Signos Alarma",
                criterios: [
                    "Fiebre >40°C",
                    "No respuesta a tratamiento",
                    "Signos de toxicidad",
                    "Alteración del estado general"
                ],
                medidas: [
                    "DERIVAR para evaluación médica",
                    "Considerar causa bacteriana",
                    "Hemocultivos y estudios",
                    "Antibióticos si indicado"
                ]
            }
        },
        signosAlarma: [
            "Fiebre en <3 meses",
            "Aspecto tóxico",
            "Convulsiones",
            "Exantema petequial",
            "Rigidez de nuca",
            "Dificultad respiratoria",
            "Vómitos persistentes",
            "Deshidratación"
        ],
        educacion: [
            "La fiebre es un mecanismo de defensa",
            "Tratar si molesta al niño",
            "Hidratación es fundamental",
            "Consultar si persiste >72hs",
            "NO usar aspirina en niños"
        ]
    }
};

// Función para obtener protocolo específico
function obtenerProtocolo(tipo) {
    return protocolosDB[tipo] || null;
}

// Función actualizada para mostrar protocolos
function mostrarProtocolo(tipo) {
    const protocolo = obtenerProtocolo(tipo);
    const detalle = document.getElementById('protocolo-detalle');
    
    if (!protocolo) {
        detalle.innerHTML = '<p>Protocolo no encontrado</p>';
        return;
    }
    
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>${protocolo.icon} ${protocolo.nombre}</h3>
            <button onclick="cerrarProtocolo()" style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">✕ Cerrar</button>
        </div>
        <p><em>${protocolo.descripcion}</em></p>
        
        <div class="protocolo-evaluacion">
            <h4>📊 Evaluación Inicial</h4>
    `;
    
    // Mostrar evaluación inicial
    Object.entries(protocolo.evaluacionInicial).forEach(([nivel, criterios]) => {
        html += `
            <div class="paso">
                <h5>${nivel.charAt(0).toUpperCase() + nivel.slice(1)}</h5>
                <ul>
                    ${Array.isArray(criterios) ? criterios.map(c => `<li>${c}</li>`).join('') : `<li>${criterios}</li>`}
                </ul>
            </div>
        `;
    });
    
    html += '</div><div class="protocolo-tratamiento"><h4>💊 Tratamiento Escalonado</h4>';
    
    // Mostrar niveles de tratamiento
    Object.entries(protocolo.tratamiento).forEach(([nivel, datos]) => {
        html += `
            <div class="paso">
                <h5>${datos.titulo}</h5>
                
                ${datos.medicamentos && datos.medicamentos.length > 0 ? `
                    <div style="background: #e8f5e8; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                        <strong>Medicamentos:</strong>
                        ${datos.medicamentos.map(med => `
                            <div style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 3px;">
                                <strong>${med.farmaco}:</strong> ${med.dosis}<br>
                                <em>Frecuencia:</em> ${med.frecuencia}<br>
                                <em>Vía:</em> ${med.via}
                                ${med.presentacion ? `<br><em>Presentación:</em> ${med.presentacion}` : ''}
                                ${med.restriccion ? `<br><em>⚠️ ${med.restriccion}</em>` : ''}
                                ${med.nota ? `<br><em>📝 ${med.nota}</em>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${datos.medidas && datos.medidas.length > 0 ? `
                    <div style="background: #e3f2fd; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                        <strong>Medidas generales:</strong>
                        <ul>
                            ${datos.medidas.map(medida => `<li>${medida}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${datos.solucion ? `<p><strong>Solución:</strong> ${datos.solucion}</p>` : ''}
                ${datos.volumen ? `<p><strong>Volumen:</strong> ${datos.volumen}</p>` : ''}
                ${datos.administracion ? `
                    <p><strong>Administración:</strong></p>
                    <ul>
                        ${datos.administracion.map(admin => `<li>${admin}</li>`).join('')}
                    </ul>
                ` : ''}
                
                ${datos.evaluacion ? `<p><strong>⏱️ Evaluación:</strong> ${datos.evaluacion}</p>` : ''}
                ${datos.siguiente ? `<p><strong>➡️ Si no mejora:</strong> ${datos.siguiente}</p>` : ''}
                
                ${datos.shock ? `
                    <div style="background: #ffebee; padding: 0.5rem; border-radius: 5px; border-left: 4px solid #f44336;">
                        <strong>🚨 En caso de shock:</strong><br>
                        Volumen: ${datos.shock.volumen}<br>
                        ${datos.shock.repetir ? `Repetir: ${datos.shock.repetir}<br>` : ''}
                        Derivación: ${datos.shock.derivacion}
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    
    // Información adicional específica por protocolo
    if (protocolo.criteriosDerivacion) {
        html += `
            <div class="alerta peligro">
                <h4>🚨 Criterios de Derivación</h4>
                <ul>
                    ${protocolo.criteriosDerivacion.map(criterio => `<li>${criterio}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (protocolo.signosAlarma) {
        html += `
            <div class="alerta">
                <h4>⚠️ Signos de Alarma</h4>
                <ul>
                    ${protocolo.signosAlarma.map(signo => `<li>${signo}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (protocolo.postConvulsion) {
        html += `
            <div class="paso">
                <h4>🔄 Manejo Post-Convulsión</h4>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px;">
                    <strong>Medidas:</strong>
                    <ul>
                        ${protocolo.postConvulsion.medidas.map(medida => `<li>${medida}</li>`).join('')}
                    </ul>
                    <strong>Derivar si:</strong>
                    <ul>
                        ${protocolo.postConvulsion.derivacion.map(criterio => `<li>${criterio}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    if (protocolo.sro) {
        html += `
            <div class="paso">
                <h4>🧪 Sales de Rehidratación Oral (SRO)</h4>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px;">
                    <p><strong>Composición:</strong> ${protocolo.sro.composicion}</p>
                    <p><strong>Preparación:</strong> ${protocolo.sro.preparacion}</p>
                    <p><strong>Conservación:</strong> ${protocolo.sro.conservacion}</p>
                    <p><strong>Contraindicaciones:</strong> ${protocolo.sro.contraindicaciones.join(', ')}</p>
                </div>
            </div>
        `;
    }
    
    if (protocolo.educacion) {
        html += `
            <div class="paso">
                <h4>📚 Educación a Padres/Cuidadores</h4>
                <ul>
                    ${protocolo.educacion.map(punto => `<li>${punto}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    detalle.innerHTML = html;
    detalle.style.display = 'block';
    detalle.scrollIntoView({ behavior: 'smooth' });
}

function cerrarProtocolo() {
    const detalle = document.getElementById('protocolo-detalle');
    detalle.style.display = 'none';
}

// Función para obtener protocolo por diagnóstico
function obtenerProtocoloPorDiagnostico(diagnosticoId) {
    // Mapeo de diagnósticos a protocolos
    const mapeo = {
        'asma_crisis': 'asma',
        'convulsion_febril': 'convulsiones',
        'deshidratacion': 'deshidratacion',
        'fiebre_sin_foco': 'fiebre'
    };
    
    return mapeo[diagnosticoId] ? obtenerProtocolo(mapeo[diagnosticoId]) : null;
}