// Algoritmos de Emergencias Pediátricas
export const algoritmosEmergencia = {
  rcp_pediatrica: {
    id: "rcp_pediatrica",
    nombre: "Reanimación Cardiopulmonar Pediátrica",
    categoria: "cardiovascular",
    edadMinima: 0,
    edadMaxima: 18,
    duracionTotal: 300, // 5 minutos iniciales
    pasos: [
      {
        id: "evaluacion_inicial",
        titulo: "1. Evaluación Inicial",
        duracion: 10,
        tipo: "evaluacion",
        acciones: [
          "Verificar respuesta: ¿Está consciente?",
          "Activar sistema de emergencias (llamar 911)",
          "Pedir DEA si está disponible",
          "Colocar al paciente en superficie firme y plana"
        ],
        alertas: ["⚠️ NO mover si sospecha trauma cervical"],
        siguiente: "apertura_via_aerea"
      },
      {
        id: "apertura_via_aerea",
        titulo: "2. Apertura de Vía Aérea",
        duracion: 5,
        tipo: "procedimiento",
        acciones: [
          "Inclinar cabeza hacia atrás (maniobra frente-mentón)",
          "En lactantes: posición neutra, NO hiperextender",
          "Verificar cuerpos extraños visibles",
          "Aspirar secreciones si es necesario"
        ],
        alertas: ["⚠️ En trauma: usar tracción mandibular"],
        siguiente: "ventilacion"
      },
      {
        id: "ventilacion",
        titulo: "3. Ventilación",
        duracion: 15,
        tipo: "procedimiento",
        acciones: [
          "2 ventilaciones de rescate (1 segundo c/u)",
          "Observar elevación del tórax",
          "Lactantes: boca-boca-nariz",
          "Niños >1 año: boca-boca con nariz pinzada"
        ],
        ciclos: 2,
        alertas: ["⚠️ Evitar ventilación excesiva"],
        siguiente: "compresiones_toracicas"
      },
      {
        id: "compresiones_toracicas",
        titulo: "4. Compresiones Torácicas",
        duracion: 120, // 2 minutos de ciclo
        tipo: "compresiones",
        parametros: {
          lactante: {
            frecuencia: 100,
            profundidad: "1/3 del diámetro torácico",
            tecnica: "2 dedos en esternón o técnica de pulgares",
            ratio: "30:2 (1 reanimador) o 15:2 (2 reanimadores)"
          },
          niño: {
            frecuencia: 100,
            profundidad: "1/3 del diámetro torácico (5-6cm)",
            tecnica: "Talón de una mano o ambas manos",
            ratio: "30:2 (1 reanimador) o 15:2 (2 reanimadores)"
          }
        },
        acciones: [
          "Colocar manos en tercio inferior del esternón",
          "Comprimir fuerte y rápido (100-120/min)",
          "Permitir reexpansión completa",
          "Minimizar interrupciones (<10 seg)"
        ],
        alertas: ["🔄 Cambiar reanimador cada 2 minutos"],
        siguiente: "evaluacion_pulso"
      },
      {
        id: "evaluacion_pulso",
        titulo: "5. Evaluación del Pulso",
        duracion: 10,
        tipo: "evaluacion",
        acciones: [
          "Verificar pulso (máximo 10 segundos)",
          "Lactantes: pulso braquial",
          "Niños: pulso carotídeo",
          "Si NO hay pulso: continuar RCP"
        ],
        decision: {
          con_pulso: "cuidados_post_rcp",
          sin_pulso: "compresiones_toracicas"
        },
        siguiente: "compresiones_toracicas"
      },
      {
        id: "cuidados_post_rcp",
        titulo: "6. Cuidados Post-RCP",
        duracion: null,
        tipo: "cuidados",
        acciones: [
          "Monitorear signos vitales continuamente",
          "Mantener vía aérea permeable",
          "Preparar para transporte",
          "Administrar O2 si está disponible"
        ],
        alertas: ["🚨 Preparar para posible re-paro"]
      }
    ]
  },

  crisis_asmatica: {
    id: "crisis_asmatica",
    nombre: "Manejo de Crisis Asmática",
    categoria: "respiratoria",
    edadMinima: 1,
    edadMaxima: 18,
    pasos: [
      {
        id: "evaluacion_severidad",
        titulo: "1. Evaluación de Severidad",
        tipo: "evaluacion",
        criterios: {
          leve: {
            titulo: "Crisis Leve",
            sintomas: ["Habla frases completas", "Camina normalmente", "Llanto fuerte (lactantes)", "Frecuencia respiratoria normal o levemente aumentada"],
            color: "#4caf50"
          },
          moderada: {
            titulo: "Crisis Moderada", 
            sintomas: ["Habla palabras sueltas", "Prefiere estar sentado", "Llanto alterado (lactantes)", "Frecuencia respiratoria aumentada", "Uso músculos accesorios"],
            color: "#ff9800"
          },
          severa: {
            titulo: "Crisis Severa",
            sintomas: ["No puede hablar", "Se inclina hacia adelante", "Gemido (lactantes)", "FR muy aumentada", "Tiraje marcado", "Cianosis"],
            color: "#f44336"
          }
        },
        siguiente: "tratamiento_inicial"
      },
      {
        id: "tratamiento_inicial",
        titulo: "2. Tratamiento Inicial",
        tipo: "tratamiento",
        medicamentos: [
          {
            nombre: "Salbutamol (β2 agonista)",
            dosis: "2-4 puffs cada 20 minutos x 3 dosis",
            via: "Inhalatoria (MDI + cámara)",
            observaciones: "Primera línea de tratamiento"
          },
          {
            nombre: "Prednisolona/Prednisona",
            dosis: "1-2 mg/kg (máx 40mg)",
            via: "Oral",
            observaciones: "Iniciar en primeras horas"
          }
        ],
        siguiente: "evaluacion_respuesta"
      },
      {
        id: "evaluacion_respuesta",
        titulo: "3. Evaluación de Respuesta",
        tipo: "evaluacion",
        tiempo: "20-60 minutos post-tratamiento",
        criterios: {
          buena_respuesta: {
            sintomas: ["Mejora clínica evidente", "Tolera actividad", "SatO2 >94%"],
            accion: "alta_con_seguimiento"
          },
          respuesta_parcial: {
            sintomas: ["Mejora parcial", "Aún sintomático", "SatO2 90-94%"],
            accion: "tratamiento_adicional"
          },
          mala_respuesta: {
            sintomas: ["Sin mejora o empeora", "Fatiga respiratoria", "SatO2 <90%"],
            accion: "tratamiento_intensivo"
          }
        },
        siguiente: "plan_tratamiento"
      },
      {
        id: "plan_tratamiento",
        titulo: "4. Plan Según Respuesta",
        tipo: "decision",
        opciones: {
          alta: {
            titulo: "Alta con Seguimiento",
            acciones: [
              "Continuar salbutamol c/4-6h por 24-48h",
              "Prednisolona por 3-5 días",
              "Control médico en 24-48h",
              "Educación sobre factores desencadenantes"
            ]
          },
          observacion: {
            titulo: "Observación y Tratamiento Adicional",
            acciones: [
              "Salbutamol c/2-4h",
              "Considerar ipratropio",
              "Corticoides sistémicos",
              "Reevaluación en 2-4h"
            ]
          },
          internacion: {
            titulo: "Internación/UCI",
            acciones: [
              "Oxígeno suplementario",
              "Nebulizaciones continuas",
              "Corticoides IV",
              "Considerar magnesio IV"
            ]
          }
        }
      }
    ]
  },

  manejo_fiebre: {
    id: "manejo_fiebre",
    nombre: "Algoritmo de Manejo de Fiebre",
    categoria: "infecciosa",
    edadMinima: 0,
    edadMaxima: 18,
    pasos: [
      {
        id: "evaluacion_edad",
        titulo: "1. Clasificación por Edad",
        tipo: "clasificacion",
        grupos: {
          neonato: {
            edad: "0-28 días",
            riesgo: "ALTO",
            conducta: "Hospitalización inmediata",
            estudios: "Hemograma, PCR, urocultivo, hemocultivo, punción lumbar",
            color: "#f44336"
          },
          lactante_joven: {
            edad: "29 días - 3 meses", 
            riesgo: "ALTO",
            conducta: "Evaluación minuciosa",
            estudios: "Según criterios de Rochester/Boston",
            color: "#ff5722"
          },
          lactante_mayor: {
            edad: "3-24 meses",
            riesgo: "MODERADO",
            conducta: "Según estado general",
            estudios: "Selectivos según clínica",
            color: "#ff9800"
          },
          preescolar: {
            edad: "2-5 años",
            riesgo: "BAJO",
            conducta: "Manejo sintomático",
            estudios: "Según focalización",
            color: "#4caf50"
          },
          escolar: {
            edad: ">5 años",
            riesgo: "BAJO", 
            conducta: "Manejo sintomático",
            estudios: "Según focalización",
            color: "#4caf50"
          }
        },
        siguiente: "evaluacion_signos_alarma"
      },
      {
        id: "evaluacion_signos_alarma",
        titulo: "2. Signos de Alarma",
        tipo: "evaluacion",
        signos_alarma: [
          "Aspecto tóxico/irritabilidad persistente",
          "Alteración del estado de conciencia",
          "Dificultad respiratoria",
          "Signos de deshidratación",
          "Petequias/púrpura",
          "Rigidez de nuca",
          "Convulsiones"
        ],
        decision: {
          con_signos: "hospitalizacion_inmediata",
          sin_signos: "manejo_sintomatico"
        },
        siguiente: "tratamiento_sintomatico"
      },
      {
        id: "tratamiento_sintomatico",
        titulo: "3. Tratamiento Sintomático",
        tipo: "tratamiento",
        medidas_generales: [
          "Reposo relativo",
          "Vestimenta liviana", 
          "Ambiente fresco",
          "Hidratación abundante",
          "Baños con agua tibia (NO fría)"
        ],
        medicamentos: [
          {
            nombre: "Paracetamol",
            dosis: "10-15 mg/kg c/6h",
            via: "Oral/rectal",
            observaciones: "Primera elección, más seguro"
          },
          {
            nombre: "Ibuprofeno",
            dosis: "5-10 mg/kg c/6-8h",
            via: "Oral",
            observaciones: ">6 meses, evitar en deshidratación"
          }
        ],
        siguiente: "criterios_consulta"
      },
      {
        id: "criterios_consulta",
        titulo: "4. Criterios de Reconsulta",
        tipo: "seguimiento",
        consulta_inmediata: [
          "Fiebre >72h sin foco",
          "Empeoramiento del estado general",
          "Aparición de signos de alarma",
          "Vómitos persistentes",
          "Rechazo alimentario completo"
        ],
        control_24_48h: [
          "Fiebre en <3 meses",
          "Fiebre >39°C",
          "Primer episodio febril",
          "Dudas de los padres"
        ]
      }
    ]
  },

  convulsiones_pediatricas: {
    id: "convulsiones_pediatricas",
    nombre: "Protocolo de Convulsiones Pediátricas",
    categoria: "neurologica",
    edadMinima: 0,
    edadMaxima: 18,
    pasos: [
      {
        id: "evaluacion_inmediata",
        titulo: "1. Evaluación Inmediata",
        tipo: "evaluacion",
        duracion: 60, // 1 minuto
        acciones: [
          "Verificar permeabilidad de vía aérea",
          "Posición de seguridad (decúbito lateral)",
          "Retirar objetos peligrosos del entorno",
          "NO introducir objetos en la boca",
          "Cronometrar duración de la convulsión"
        ],
        alertas: ["⏱️ Cronometrar desde el inicio"],
        siguiente: "clasificacion_convulsion"
      },
      {
        id: "clasificacion_convulsion",
        titulo: "2. Clasificación",
        tipo: "clasificacion",
        tipos: {
          febril_simple: {
            titulo: "Convulsión Febril Simple",
            criterios: ["6 meses - 5 años", "Duración <15 min", "Generalizada", "Sin recurrencia en 24h"],
            riesgo: "BAJO",
            color: "#4caf50"
          },
          febril_compleja: {
            titulo: "Convulsión Febril Compleja", 
            criterios: ["Duración >15 min", "Focal", "Recurrente en 24h", "Déficit post-ictal"],
            riesgo: "MODERADO",
            color: "#ff9800"
          },
          status_epilepticus: {
            titulo: "Status Epilepticus",
            criterios: ["Duración >5 min", "O convulsiones repetidas sin recuperación"],
            riesgo: "ALTO",
            color: "#f44336"
          },
          primera_convulsion: {
            titulo: "Primera Convulsión Afebril",
            criterios: ["Sin fiebre", "Primera vez", "Cualquier edad"],
            riesgo: "MODERADO",
            color: "#ff9800"
          }
        },
        siguiente: "tratamiento_agudo"
      },
      {
        id: "tratamiento_agudo",
        titulo: "3. Tratamiento Agudo",
        tipo: "tratamiento",
        protocolos: {
          convulsion_activa_5min: {
            titulo: "Convulsión Activa >5 minutos",
            medicamentos: [
              {
                nombre: "Diazepam rectal",
                dosis: "0.5 mg/kg (máx 10mg)",
                via: "Rectal",
                tiempo: "Primera línea"
              },
              {
                nombre: "Midazolam bucal",
                dosis: "0.5 mg/kg (máx 10mg)", 
                via: "Bucal",
                tiempo: "Alternativa a diazepam"
              }
            ]
          },
          convulsion_prolongada_10min: {
            titulo: "Convulsión >10 minutos (hospital)",
            medicamentos: [
              {
                nombre: "Diazepam IV",
                dosis: "0.25 mg/kg (máx 5mg)",
                via: "Endovenosa",
                tiempo: "Repetir si es necesario"
              },
              {
                nombre: "Fenitoína",
                dosis: "20 mg/kg IV",
                via: "Endovenosa",
                tiempo: "Si persiste convulsión"
              }
            ]
          }
        },
        siguiente: "evaluacion_post_ictal"
      },
      {
        id: "evaluacion_post_ictal",
        titulo: "4. Evaluación Post-ictal",
        tipo: "evaluacion",
        parametros: [
          "Estado de conciencia",
          "Signos vitales",
          "Déficits neurológicos",
          "Signos de trauma",
          "Temperatura corporal"
        ],
        estudios: {
          convulsion_febril_simple: "Ninguno rutinario",
          convulsion_febril_compleja: "Considerar EEG, neuroimagen",
          primera_convulsion: "EEG, glucemia, electrolitos",
          status_epilepticus: "Laboratorio completo, neuroimagen, EEG"
        },
        siguiente: "plan_seguimiento"
      },
      {
        id: "plan_seguimiento",
        titulo: "5. Plan y Seguimiento",
        tipo: "seguimiento",
        conductas: {
          alta: {
            criterios: ["Convulsión febril simple", "Recuperación completa", "Niño conocido"],
            indicaciones: [
              "Manejo de la fiebre",
              "Educación familiar sobre convulsiones",
              "Control pediatra en 24-48h",
              "Consulta inmediata si nueva convulsión"
            ]
          },
          observacion: {
            criterios: ["Primera convulsión", "Convulsión febril compleja", "Dudas diagnósticas"],
            duración: "6-24 horas según evolución"
          },
          derivacion_neurologia: {
            criterios: ["Convulsión afebril", "Convulsión febril compleja", "Déficits persistentes"],
            urgencia: "24-48 horas"
          }
        }
      }
    ]
  }
};

// Utilidades para los algoritmos
export const getAlgoritmosPorCategoria = (categoria) => {
  return Object.values(algoritmosEmergencia).filter(alg => alg.categoria === categoria);
};

export const getAlgoritmosPorEdad = (edadEnAnos) => {
  return Object.values(algoritmosEmergencia).filter(alg => 
    edadEnAnos >= alg.edadMinima && edadEnAnos <= alg.edadMaxima
  );
};

export const categorias = {
  cardiovascular: { nombre: "Cardiovascular", icon: "❤️", color: "#f44336" },
  respiratoria: { nombre: "Respiratoria", icon: "🫁", color: "#2196f3" },
  neurologica: { nombre: "Neurológica", icon: "🧠", color: "#9c27b0" },
  infecciosa: { nombre: "Infecciosa", icon: "🦠", color: "#ff9800" },
  traumatologica: { nombre: "Trauma", icon: "🏥", color: "#795548" },
  toxicologica: { nombre: "Toxicológica", icon: "☣️", color: "#607d8b" }
};