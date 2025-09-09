// Base de datos de diagnósticos pediátricos - Argentina
const diagnosticosDB = {
    // Emergencias respiratorias
    asma_crisis: {
        nombre: "Crisis Asmática",
        sintomas: ["dificultad respiratoria", "sibilancias", "tos", "disnea", "tiraje"],
        signosAlarma: ["cianosis", "uso músculos accesorios", "imposibilidad hablar", "alteración conciencia"],
        edades: ["lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "alta",
        categoria: "respiratorio",
        tratamiento: {
            inmediato: [
                "Salbutamol nebulización 0.15mg/kg",
                "Oxígeno si sat <92%",
                "Posición semi-sentado"
            ],
            escalon2: [
                "Repetir salbutamol cada 20min x3",
                "Prednisolona 1mg/kg",
                "Considerar derivación"
            ]
        }
    },

    bronquiolitis: {
        nombre: "Bronquiolitis",
        sintomas: ["tos", "dificultad respiratoria", "rinorrea", "fiebre", "rechazo alimentario", "sibilancias", "tiraje"],
        signosAlarma: ["apneas", "cianosis", "deshidratación", "letargo", "saturación <92%", "taquipnea severa"],
        edades: ["recien-nacido", "lactante"],
        urgencia: "media",
        categoria: "respiratorio",
        tratamiento: {
            leve: [
                "Aspiración nasal suave con pera de goma",
                "Posición semi-sentado 30-45°",
                "Hidratación fraccionada frecuente",
                "Paracetamol si fiebre >38.5°C",
                "Ambiente húmedo",
                "Control cada 24-48hs"
            ],
            moderada: [
                "Oxígeno si saturación <92%",
                "Hidratación IV si rechazo oral",
                "Salbutamol prueba terapéutica",
                "Monitoreo saturación",
                "Reevaluación cada 6-12hs"
            ],
            severa: [
                "DERIVAR URGENTE",
                "Oxígeno de alto flujo",
                "Hidratación parenteral",
                "Considerar VNI o ARM"
            ]
        },
        criteriosDerivacion: [
            "Edad <3 meses",
            "Prematurez <37 semanas",
            "Cardiopatía congénita",
            "Inmunodeficiencia",
            "Apneas",
            "Dificultad alimentaria severa",
            "Deshidratación"
        ],
        causas: ["Virus Sincicial Respiratorio (VSR)", "Rinovirus", "Metapneumovirus", "Parainfluenza"],
        prevencion: ["Lavado de manos", "Evitar contacto con enfermos", "No exposición al humo", "Lactancia materna"],
        noUsar: ["Antibióticos (salvo sobreinfección)", "Corticoides", "Mucolíticos", "Antitusivos"]
    },

    laringitis: {
        nombre: "Laringitis (Crup)",
        sintomas: ["tos perruna", "ronquera", "estridor inspiratorio", "fiebre", "dificultad respiratoria"],
        signosAlarma: ["estridor en reposo", "cianosis", "tiraje severo", "babeo", "posición de trípode"],
        edades: ["lactante", "preescolar", "escolar"],
        urgencia: "media",
        categoria: "respiratorio",
        tratamiento: {
            leve: [
                "Vapor de agua caliente (baño con vapor)",
                "Aire fresco nocturno",
                "Hidratación abundante",
                "Paracetamol para fiebre",
                "Posición erguida",
                "Tranquilizar al niño (el llanto empeora)"
            ],
            moderada: [
                "Dexametasona 0.6mg/kg VO/IM dosis única",
                "Adrenalina nebulizada si estridor en reposo",
                "Oxígeno si saturación <92%",
                "Observación 4-6 horas post-adrenalina"
            ],
            severa: [
                "DERIVAR URGENTE",
                "Dexametasona 0.6mg/kg IM",
                "Adrenalina nebulizada: 0.5ml/kg (máx 5ml) de sol 1:1000",
                "Oxígeno",
                "Considerar intubación si no respuesta"
            ]
        },
        clasificacion: {
            "Grado 1": "Tos perruna, sin estridor en reposo",
            "Grado 2": "Tos perruna + estridor en reposo + tiraje leve",
            "Grado 3": "Estridor + tiraje moderado + agitación",
            "Grado 4": "Estridor + tiraje severo + letargo/cianosis"
        },
        causas: ["Parainfluenza", "VSR", "Rinovirus", "Influenza A y B"],
        diferencial: ["Epiglotitis (emergencia)", "Cuerpo extraño", "Angioedema"],
        educacion: [
            "Mantener calma - el llanto empeora",
            "Vapor en baño cerrado 15-20 min",
            "Aire fresco del exterior",
            "Consultar si empeora o no mejora en 24hs"
        ]
    },

    neumonia: {
        nombre: "Neumonía",
        sintomas: ["fiebre", "tos", "dificultad respiratoria", "dolor pecho", "decaimiento", "taquipnea", "escalofríos"],
        signosAlarma: ["tiraje", "cianosis", "taquipnea severa", "hipoxemia", "quejido respiratorio", "aleteo nasal"],
        edades: ["recien-nacido", "lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "alta",
        categoria: "respiratorio",
        tratamiento: {
            ambulatorio: [
                "Amoxicilina 80-90mg/kg/día x 7-10 días",
                "Paracetamol 10mg/kg c/6hs para fiebre",
                "Hidratación abundante",
                "Reposo relativo",
                "Control a las 48-72hs"
            ],
            hospitalario: [
                "Si <2 años con signos de alarma",
                "Ampicilina IV + gentamicina",
                "Oxígeno si saturación <92%",
                "Hidratación IV si necesario"
            ],
            atipica: [
                "Azitromicina 10mg/kg/día x 3-5 días",
                "Claritromicina 15mg/kg/día x 7-10 días"
            ]
        },
        criteriosHospitalizacion: [
            "Edad <2 meses",
            "Saturación O2 <92%",
            "Dificultad respiratoria severa",
            "Vómitos persistentes",
            "Deshidratación",
            "Falta de respuesta al tratamiento ambulatorio"
        ],
        causas: ["Streptococcus pneumoniae", "Virus respiratorios", "Mycoplasma", "Chlamydia"],
        prevencion: ["Vacuna neumocócica", "Lavado de manos", "Evitar humo de tabaco", "Lactancia materna"]
    },

    // Emergencias febriles
    fiebre_sin_foco: {
        nombre: "Fiebre sin Foco",
        sintomas: ["fiebre", "irritabilidad", "decaimiento"],
        signosAlarma: ["fiebre >39°C en <3 meses", "aspecto séptico", "convulsiones"],
        edades: ["recien-nacido", "lactante", "preescolar"],
        urgencia: "media",
        categoria: "infeccioso",
        evaluacion: {
            "0-3meses": "Derivar siempre - riesgo bacteriemia",
            "3-36meses": "Evaluar según aspecto y temperatura"
        }
    },

    convulsion_febril: {
        nombre: "Convulsión Febril",
        sintomas: ["convulsión", "fiebre", "alteración conciencia"],
        signosAlarma: ["duración >15min", "focal", "recurrente en 24hs"],
        edades: ["lactante", "preescolar"],
        urgencia: "alta",
        categoria: "neurologico",
        tratamiento: {
            inmediato: [
                "Posición lateral segura",
                "Diazepam rectal si >5min",
                "Antitérmicos post-crisis"
            ]
        }
    },

    // Emergencias gastrointestinales
    gastritis: {
        nombre: "Gastritis",
        sintomas: ["dolor abdominal", "náuseas", "vómitos", "ardor estómago", "inapetencia"],
        signosAlarma: ["vómitos con sangre", "dolor severo", "melena", "palidez extrema"],
        edades: ["preescolar", "escolar", "adolescente"],
        urgencia: "media",
        categoria: "digestivo",
        tratamiento: {
            leve: [
                "Dieta blanda sin irritantes",
                "Evitar AINEs y aspirina",
                "Omeprazol si >1 año: 1mg/kg/día",
                "Fraccionamiento de comidas"
            ],
            moderada: [
                "Omeprazol 1-2mg/kg/día",
                "Dieta estricta",
                "Sucralfato 40-80mg/kg/día",
                "Control médico en 48-72hs"
            ],
            severa: "Derivar por hemorragia digestiva"
        },
        causas: ["Infección por H. pylori", "Medicamentos (AINEs)", "Estrés", "Alimentos irritantes"],
        prevencion: ["Evitar comidas picantes", "No automedicación", "Comidas regulares"]
    },

    gastroenteritis: {
        nombre: "Gastroenteritis Aguda",
        sintomas: ["diarrea", "vómitos", "dolor abdominal", "fiebre", "cólicos", "flatulencias"],
        signosAlarma: ["deshidratación", "sangre en heces", "dolor abdominal severo", "fiebre alta", "letargo"],
        edades: ["recien-nacido", "lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "media",
        categoria: "digestivo",
        tratamiento: {
            leve: [
                "Sales de rehidratación oral (SRO)",
                "Dieta BRAT (banana, arroz, manzana, tostada)",
                "Continuar lactancia materna",
                "Zinc: 10mg/día <6m, 20mg/día >6m x 10-14 días"
            ],
            moderada: [
                "SRO: 50-100ml/kg en 4-6 horas",
                "Ondansetrón 0.15mg/kg si vómitos",
                "Probióticos (Lactobacillus)",
                "Reevaluación cada 6-12 horas"
            ],
            severa: [
                "Derivar para rehidratación IV",
                "Coprocultivo si sangre/moco",
                "Antibióticos solo si bacteriano confirmado"
            ]
        },
        causas: ["Rotavirus", "Norovirus", "Salmonella", "E. coli", "Intoxicación alimentaria"],
        prevencion: ["Lavado de manos", "Agua segura", "Alimentos bien cocidos", "Vacuna rotavirus"]
    },

    deshidratacion: {
        nombre: "Deshidratación",
        sintomas: ["sed", "mucosas secas", "ojos hundidos", "oliguria", "letargo"],
        signosAlarma: ["shock", "alteración conciencia", "anuria"],
        edades: ["recien-nacido", "lactante", "preescolar", "escolar"],
        urgencia: "alta",
        categoria: "digestivo",
        clasificacion: {
            leve: "3-5% peso - SRO",
            moderada: "6-9% peso - SRO + evaluación",
            severa: ">10% peso - IV inmediato"
        }
    },

    // Emergencias dermatológicas/alérgicas
    anafilaxia: {
        nombre: "Anafilaxia",
        sintomas: ["rash", "dificultad respiratoria", "vómitos", "diarrea", "hipotensión"],
        signosAlarma: ["broncoespasmo", "shock", "angioedema", "alteración conciencia"],
        edades: ["lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "critica",
        categoria: "alergico",
        tratamiento: {
            inmediato: [
                "Adrenalina IM 0.01mg/kg",
                "Oxígeno",
                "Acceso venoso",
                "Derivación inmediata"
            ]
        }
    },

    urticaria: {
        nombre: "Urticaria",
        sintomas: ["rash", "prurito", "habones"],
        signosAlarma: ["angioedema", "dificultad respiratoria", "disfagia"],
        edades: ["lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "baja",
        categoria: "alergico",
        tratamiento: {
            leve: "Antihistamínicos + evitar alérgeno",
            severa: "Corticoides + derivación"
        }
    },

    // Emergencias traumatológicas
    traumatismo_craneal: {
        nombre: "Traumatismo Craneal",
        sintomas: ["dolor cabeza", "vómitos", "alteración conciencia", "convulsiones"],
        signosAlarma: ["pérdida conciencia", "amnesia", "convulsiones", "déficit focal"],
        edades: ["lactante", "preescolar", "escolar", "adolescente"],
        urgencia: "alta",
        categoria: "trauma",
        derivacion: "Siempre evaluar en emergencias"
    },

    // Emergencias otorrinolaringológicas
    otitis_media: {
        nombre: "Otitis Media Aguda",
        sintomas: ["otalgia", "fiebre", "irritabilidad", "otorrea"],
        signosAlarma: ["mastoiditis", "signos meníngeos", "parálisis facial"],
        edades: ["lactante", "preescolar", "escolar"],
        urgencia: "media",
        categoria: "otorrino",
        tratamiento: {
            primera_linea: "Amoxicilina 80mg/kg/día x 7 días",
            alergia_penicilina: "Azitromicina"
        }
    },

    faringitis: {
        nombre: "Faringitis",
        sintomas: ["dolor garganta", "fiebre", "odinofagia", "adenopatías"],
        signosAlarma: ["estridor", "disfagia severa", "sialorrea"],
        edades: ["preescolar", "escolar", "adolescente"],
        urgencia: "baja",
        categoria: "otorrino",
        evaluacion: {
            viral: "Sintomático",
            estreptocócica: "Amoxicilina si >3 años"
        }
    }
};

// Función para buscar diagnósticos por síntomas
function buscarDiagnosticosPorSintomas(sintomas, edad = null) {
    const sintomasArray = sintomas.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);
    const resultados = [];

    Object.keys(diagnosticosDB).forEach(key => {
        const diagnostico = diagnosticosDB[key];
        let puntuacion = 0;

        // Verificar coincidencias de síntomas
        sintomasArray.forEach(sintoma => {
            diagnostico.sintomas.forEach(sintomaDB => {
                if (sintomaDB.toLowerCase().includes(sintoma) || sintoma.includes(sintomaDB.toLowerCase())) {
                    puntuacion += 2;
                }
            });

            // Verificar signos de alarma (mayor puntuación)
            if (diagnostico.signosAlarma) {
                diagnostico.signosAlarma.forEach(signo => {
                    if (signo.toLowerCase().includes(sintoma) || sintoma.includes(signo.toLowerCase())) {
                        puntuacion += 5;
                    }
                });
            }
        });

        // Filtrar por edad si se especifica
        if (edad && !diagnostico.edades.includes(edad)) {
            puntuacion = 0;
        }

        if (puntuacion > 0) {
            resultados.push({
                ...diagnostico,
                id: key,
                puntuacion: puntuacion
            });
        }
    });

    // Ordenar por puntuación descendente
    return resultados.sort((a, b) => b.puntuacion - a.puntuacion);
}

// Función para obtener diagnósticos por categoría
function obtenerDiagnosticosPorCategoria(categoria) {
    return Object.keys(diagnosticosDB)
        .filter(key => diagnosticosDB[key].categoria === categoria)
        .map(key => ({ ...diagnosticosDB[key], id: key }));
}

// Función para obtener diagnósticos críticos
function obtenerDiagnosticosCriticos() {
    return Object.keys(diagnosticosDB)
        .filter(key => diagnosticosDB[key].urgencia === 'critica' || diagnosticosDB[key].urgencia === 'alta')
        .map(key => ({ ...diagnosticosDB[key], id: key }));
}

// Función para evaluar signos de alarma
function evaluarSignosAlarma(sintomas) {
    const sintomasArray = sintomas.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);
    const signosEncontrados = [];

    Object.keys(diagnosticosDB).forEach(key => {
        const diagnostico = diagnosticosDB[key];
        
        if (diagnostico.signosAlarma) {
            diagnostico.signosAlarma.forEach(signo => {
                sintomasArray.forEach(sintoma => {
                    if (signo.toLowerCase().includes(sintoma) || sintoma.includes(signo.toLowerCase())) {
                        signosEncontrados.push({
                            signo: signo,
                            diagnostico: diagnostico.nombre,
                            urgencia: diagnostico.urgencia
                        });
                    }
                });
            });
        }
    });

    return signosEncontrados;
}

// Actualizar función de búsqueda en app.js
function buscarDiagnosticos() {
    const sintomas = document.getElementById('sintomas').value;
    const edad = document.getElementById('edad-diagnostico').value;
    
    if (!sintomas.trim()) {
        mostrarErrorDiagnostico('Por favor ingrese al menos un síntoma');
        return;
    }

    // Buscar diagnósticos
    const resultados = buscarDiagnosticosPorSintomas(sintomas, edad);
    
    // Evaluar signos de alarma
    const signosAlarma = evaluarSignosAlarma(sintomas);
    
    mostrarResultadosDiagnostico(resultados, signosAlarma);
}

function mostrarResultadosDiagnostico(resultados, signosAlarma = []) {
    const container = document.getElementById('resultado-diagnosticos');
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div class="diagnostico-item">
                <h4>❌ No se encontraron coincidencias</h4>
                <p>Intente con otros síntomas o consulte directamente con un profesional médico.</p>
            </div>
        `;
        return;
    }

    let html = '';

    // Mostrar alertas de signos de alarma
    if (signosAlarma.length > 0) {
        html += `
            <div class="diagnostico-item urgente">
                <h4>🚨 SIGNOS DE ALARMA DETECTADOS</h4>
                <p><strong>Se requiere evaluación médica inmediata:</strong></p>
                <ul>
                    ${signosAlarma.map(signo => `<li>${signo.signo} (${signo.diagnostico})</li>`).join('')}
                </ul>
                <p><strong>📞 Contactar emergencias: 107 (SAME)</strong></p>
            </div>
        `;
    }

    // Mostrar resultados ordenados por relevancia
    resultados.slice(0, 6).forEach(diagnostico => {
        const urgenciaClass = diagnostico.urgencia === 'critica' ? 'urgente' : 
                            diagnostico.urgencia === 'alta' ? 'urgente' :
                            diagnostico.urgencia === 'media' ? 'medio' : 'bajo';

        html += `
            <div class="diagnostico-item ${urgenciaClass}">
                <h4>${getUrgenciaIcon(diagnostico.urgencia)} ${diagnostico.nombre}</h4>
                <p><strong>Categoría:</strong> ${diagnostico.categoria} | <strong>Urgencia:</strong> ${diagnostico.urgencia}</p>
                
                <div class="diagnostico-sintomas">
                    <strong>Síntomas:</strong> ${diagnostico.sintomas.join(', ')}
                </div>
                
                ${diagnostico.signosAlarma ? `
                    <div class="diagnostico-sintomas" style="background: #fff3cd; border-left: 4px solid #ffc107;">
                        <strong>⚠️ Signos de alarma:</strong> ${diagnostico.signosAlarma.join(', ')}
                    </div>
                ` : ''}
                
                ${diagnostico.tratamiento ? `
                    <div class="diagnostico-sintomas" style="background: #d4edda; border-left: 4px solid #28a745;">
                        <strong>💊 Tratamiento inicial:</strong> 
                        ${typeof diagnostico.tratamiento === 'object' ? 
                            Object.entries(diagnostico.tratamiento).map(([key, value]) => 
                                `<br><em>${key}:</em> ${Array.isArray(value) ? '<ul>' + value.map(v => `<li>${convertirTratamientoAerosol(v)}</li>`).join('') + '</ul>' : convertirTratamientoAerosol(value)}`
                            ).join('') : 
                            convertirTratamientoAerosol(diagnostico.tratamiento)
                        }
                    </div>
                ` : ''}
                
                ${diagnostico.criteriosDerivacion ? `
                    <div class="diagnostico-sintomas" style="background: #fff3cd; border-left: 4px solid #ffc107;">
                        <strong>🚨 Criterios de derivación:</strong>
                        <ul>
                            ${diagnostico.criteriosDerivacion.map(criterio => `<li>${criterio}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${diagnostico.causas ? `
                    <div class="diagnostico-sintomas" style="background: #e3f2fd; border-left: 4px solid #2196f3;">
                        <strong>🦠 Causas frecuentes:</strong> ${diagnostico.causas.join(', ')}
                    </div>
                ` : ''}
                
                ${diagnostico.clasificacion ? `
                    <div class="diagnostico-sintomas" style="background: #f3e5f5; border-left: 4px solid #9c27b0;">
                        <strong>📊 Clasificación:</strong>
                        ${Object.entries(diagnostico.clasificacion).map(([grado, desc]) => 
                            `<br><em>${grado}:</em> ${desc}`
                        ).join('')}
                    </div>
                ` : ''}
                
                ${diagnostico.prevencion ? `
                    <div class="diagnostico-sintomas" style="background: #e8f5e8; border-left: 4px solid #4caf50;">
                        <strong>🛡️ Prevención:</strong> ${diagnostico.prevencion.join(', ')}
                    </div>
                ` : ''}
                
                ${diagnostico.noUsar ? `
                    <div class="diagnostico-sintomas" style="background: #ffebee; border-left: 4px solid #f44336;">
                        <strong>❌ NO usar:</strong> ${diagnostico.noUsar.join(', ')}
                    </div>
                ` : ''}
                
                ${diagnostico.educacion ? `
                    <div class="diagnostico-sintomas" style="background: #e1f5fe; border-left: 4px solid #00bcd4;">
                        <strong>📚 Educación a padres:</strong>
                        <ul>
                            ${diagnostico.educacion.map(punto => `<li>${punto}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <p><strong>Edades:</strong> ${diagnostico.edades.join(', ')}</p>
                <p><small>Relevancia: ${diagnostico.puntuacion} puntos</small></p>
            </div>
        `;
    });

    if (resultados.length > 6) {
        html += `
            <div class="diagnostico-item">
                <p><em>Se encontraron ${resultados.length} posibles diagnósticos. Mostrando los 6 más relevantes.</em></p>
            </div>
        `;
    }

    container.innerHTML = html;
}

function getUrgenciaIcon(urgencia) {
    switch(urgencia) {
        case 'critica': return '🆘';
        case 'alta': return '🚨';
        case 'media': return '⚠️';
        case 'baja': return 'ℹ️';
        default: return '📋';
    }
}

// Función para obtener protocolos de un diagnóstico específico
function obtenerProtocoloDiagnostico(diagnosticoId) {
    return diagnosticosDB[diagnosticoId] || null;
}

// Función para convertir tratamientos con aerosoles a disparos
function convertirTratamientoAerosol(tratamiento) {
    if (typeof tratamiento !== 'string') return tratamiento;
    
    // Detectar menciones de salbutamol
    if (tratamiento.toLowerCase().includes('salbutamol') && !tratamiento.includes('disparos') && !tratamiento.includes('puffs')) {
        // Si menciona nebulización, mantener como está
        if (tratamiento.toLowerCase().includes('nebulizaci')) {
            return tratamiento;
        }
        
        // Si no especifica vía, asumir que puede ser inhalador y agregar información de disparos
        if (tratamiento.toLowerCase().includes('salbutamol')) {
            return tratamiento + ' (si inhalador: 2 disparos por dosis con cámara espaciadora)';
        }
    }
    
    return tratamiento;
}