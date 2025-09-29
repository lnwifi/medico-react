// Base de datos de medicamentos pediátricos - Argentina
export const medicamentosDB = {
    paracetamol: {
        nombre: "Paracetamol (Acetaminofén)",
        indicaciones: ["Fiebre", "Dolor leve a moderado"],
        dosisKg: 15, // mg/kg/dosis (rango 10-15)
        dosisDiaria: 60, // mg/kg/día máximo
        intervalo: 6, // horas
        maxDosis: 4, // dosis máximas por día
        alertas: {
            contraindicaciones: ["Insuficiencia hepática severa", "Hipersensibilidad al paracetamol"],
            precauciones: ["Uso prolongado: vigilar función hepática", "No exceder dosis máxima diaria", "Revisar otros medicamentos que contengan paracetamol"],
            alergias: ["Reacciones cutáneas raras pero graves: síndrome de Stevens-Johnson"]
        },
        presentaciones: {
            "jarabe_120mg": {
                nombre: "Jarabe 120mg/5ml (2.4%)",
                concentracion: 24, // mg/ml
                marcas: ["Tafirol", "Termofren", "Paracetamol Genérico"],
                volumenFrasco: "60ml, 90ml, 120ml",
                tipo: "liquido"
            },
            "jarabe_160mg": {
                nombre: "Jarabe 160mg/5ml (3.2%)",
                concentracion: 32, // mg/ml
                marcas: ["Tafirol Forte"],
                volumenFrasco: "120ml",
                tipo: "liquido"
            },
            "gotas_100mg": {
                nombre: "Gotas 100mg/ml (10%)",
                concentracion: 100, // mg/ml
                marcas: ["Tafirol Gotas", "Termofren Gotas"],
                volumenFrasco: "15ml, 20ml, 30ml",
                tipo: "liquido"
            },
            "comprimidos_500mg": {
                nombre: "Comprimidos 500mg",
                concentracion: 500, // mg por unidad
                marcas: ["Tafirol", "Termofren", "Geniol"],
                tipo: "solido"
            },
            "comprimidos_650mg": {
                nombre: "Comprimidos 650mg",
                concentracion: 650, // mg por unidad
                marcas: ["Tafirol Forte", "Kitadol"],
                tipo: "solido"
            },
            "comprimidos_1g": {
                nombre: "Comprimidos 1g",
                concentracion: 1000, // mg por unidad
                marcas: ["Tafirol 1g"],
                tipo: "solido"
            },
            "supositorios_150mg": {
                nombre: "Supositorios Pediátricos 150mg",
                concentracion: 150, // mg por unidad
                marcas: ["Febrectal Pediátrico"],
                tipo: "solido",
                uso: "Vía rectal"
            },
            "supositorios_300mg": {
                nombre: "Supositorios Infantiles 300mg",
                concentracion: 300, // mg por unidad
                marcas: ["Febrectal Infantil"],
                tipo: "solido",
                uso: "Vía rectal"
            },
            "inyectable_1g": {
                nombre: "Solución Inyectable 1g/100ml",
                concentracion: 10, // mg/ml
                marcas: ["Paracetamol Kabi", "Paracetamol B. Braun", "Imitimol"],
                uso: "Exclusivo uso hospitalario IV",
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad al paracetamol",
            "Insuficiencia hepática grave",
            "Uso crónico de alcohol (adolescentes)"
        ],
        advertencias: [
            "No superar la dosis máxima diaria (4g en adultos, 60mg/kg en niños)",
            "Consultar si fiebre persiste >3 días o dolor >5 días",
            "Vigilar función hepática en uso prolongado",
            "No administrar junto a otros productos que contengan paracetamol"
        ],
        edadMinima: "0 meses"
    },

    ibuprofeno: {
        nombre: "Ibuprofeno",
        indicaciones: ["Fiebre", "Dolor", "Inflamación"],
        dosisKg: {
            fiebre_baja: 7.5, // mg/kg/dosis (rango 5-10)
            fiebre_alta: 10 // mg/kg/dosis si T° ≥39°C
        },
        dosisDiaria: 40, // mg/kg/día máximo
        intervalo: 8, // horas
        maxDosis: 3, // dosis máximas por día
        presentaciones: {
            "jarabe_2porciento": {
                nombre: "Suspensión 2% (20mg/ml)",
                concentracion: 20, // mg/ml
                marcas: ["Ibupirac", "Actron Pediátrico", "Ibulgia"],
                tipo: "liquido"
            },
            "jarabe_4porciento": {
                nombre: "Suspensión 4% (40mg/ml)",
                concentracion: 40, // mg/ml
                marcas: ["Actron Pediátrico 4%", "Ibupirac 4%"],
                tipo: "liquido"
            },
            "gotas_5porciento": {
                nombre: "Gotas 5% (50mg/ml)",
                concentracion: 50, // mg/ml
                marcas: ["Ibupirac Gotas"],
                tipo: "liquido"
            },
            "comprimidos_200mg": {
                nombre: "Comprimidos 200mg",
                concentracion: 200,
                marcas: ["Ibupirac", "Actron", "Ibulgia"],
                tipo: "solido"
            },
            "comprimidos_400mg": {
                nombre: "Comprimidos 400mg",
                concentracion: 400,
                marcas: ["Ibupirac 400", "Actron 400", "Ibulgia 400"],
                tipo: "solido"
            },
            "capsulas_blandas_400mg": {
                nombre: "Cápsulas Blandas 400mg",
                concentracion: 400,
                marcas: ["Actron Rápida Acción", "Ibuevanol Forte"],
                tipo: "solido"
            },
            "comprimidos_600mg": {
                nombre: "Comprimidos 600mg",
                concentracion: 600,
                marcas: ["Ibupirac 600", "Actron 600"],
                tipo: "solido"
            },
            "comprimidos_masticables_200mg": {
                nombre: "Comprimidos Masticables 200mg",
                concentracion: 200,
                marcas: ["Afebril 200 VL", "Ibupiretas Junior"],
                tipo: "solido"
            }
        },
        contraindicaciones: [
            "Menores de 3 meses",
            "Úlcera péptica activa",
            "Insuficiencia renal grave",
            "Deshidratación severa",
            "Asma grave inducida por AINEs"
        ],
        advertencias: [
            "Solo en mayores de 3 meses",
            "Administrar con alimentos para reducir malestar gástrico",
            "Vigilar signos de deshidratación, puede afectar la función renal",
            "No combinar con otros AINEs (aspirina, diclofenac, etc.)",
            "Usar con precaución en pacientes con antecedentes de enfermedad cardíaca"
        ],
        edadMinima: "3 meses"
    },

    salbutamol: {
        nombre: "Salbutamol",
        indicaciones: ["Broncoespasmo", "Crisis asmática", "Bronquiolitis"],
        dosisKg: 0.15, // mg/kg/dosis para nebulización
        intervalo: 4, // horas para mantenimiento
        presentaciones: {
            "inhalador_100mcg": {
                nombre: "Inhalador 100mcg/dosis",
                concentracion: 0.1, // mg por puff
                marcas: ["Ventolin HFA", "Salbutral", "Salbuden"],
                tipo: "aerosol",
                dosisDisparo: 0.1, // mg por disparo
                disparosPorEdad: {
                    "lactante": 2,
                    "preescolar": 2,
                    "escolar": 2,
                    "adolescente": 2
                },
                usoConCamara: "Siempre usar cámara espaciadora en <8 años"
            },
            "nebulizacion_0_5_porciento": {
                nombre: "Solución para nebulización 0.5% (5mg/ml)",
                concentracion: 5, // mg/ml
                marcas: ["Ventolin Solución", "Salbutamol Denver Farma"],
                tipo: "liquido"
            },
            "jarabe_2mg": {
                nombre: "Jarabe 2mg/5ml (0.4mg/ml)",
                concentracion: 0.4, // mg/ml
                marcas: ["Ventolin Jarabe", "Salbutamol Fabra"],
                tipo: "liquido"
            },
            "inyectable_0_5mg": {
                nombre: "Solución Inyectable 0.5mg/ml",
                concentracion: 0.5, // mg/ml
                marcas: ["Salbutamol Inyectable Genérico"],
                uso: "Exclusivo uso hospitalario IV/IM/SC",
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad a salbutamol",
            "Taquicardia severa no controlada",
            "Amenaza de aborto"
        ],
        advertencias: [
            "Vigilar frecuencia cardíaca y posible aparición de temblores",
            "Puede causar nerviosismo o mareos",
            "En crisis severa: nebulización c/20min por 3 dosis, luego reevaluar",
            "Usar con precaución en pacientes con hipertiroidismo, enfermedad cardiovascular o diabetes"
        ],
        edadMinima: "0 meses"
    },

    prednisolona: {
        nombre: "Prednisolona",
        indicaciones: ["Crisis asmática", "Procesos inflamatorios", "Alergias severas", "Laringitis"],
        dosisKg: {
            asma: 1.5, // mg/kg/día en crisis asmática (rango 1-2)
            inflamacion: 0.5 // mg/kg/día en otros procesos
        },
        dosisMaximaDiaria: 60, // mg/día
        duracion: "3-5 días en crisis asmática, luego reevaluar",
        intervalo: 24, // Se administra una vez al día
        presentaciones: {
            "gotas_1mg_ml": {
                nombre: "Solución oral 1mg/ml",
                concentracion: 1, // mg/ml
                marcas: ["Prelone", "Prednisolona Genérico"],
                tipo: "liquido"
            },
            "gotas_3mg_ml": {
                nombre: "Solución oral 3mg/ml",
                concentracion: 3, // mg/ml
                marcas: ["Prelone Forte"],
                tipo: "liquido"
            },
            "gotas_7mg_ml": {
                nombre: "Solución oral 7mg/ml",
                concentracion: 7, // mg/ml
                marcas: ["Deltisona B"],
                tipo: "liquido"
            },
            "comprimidos_5mg": {
                nombre: "Comprimidos 5mg",
                concentracion: 5,
                marcas: ["Deltisona B", "Meticorten"],
                tipo: "solido"
            }
        },
        contraindicaciones: [
            "Infecciones fúngicas sistémicas",
            "Tuberculosis activa no tratada",
            "Varicela o sarampión activos",
            "Hipersensibilidad"
        ],
        advertencias: [
            "Administrar con alimentos para disminuir malestar gástrico",
            "No suspender bruscamente si el tratamiento es prolongado",
            "Vigilar signos de infección, ya que puede enmascararlos",
            "Uso prolongado puede afectar el crecimiento en niños",
            "Precaución en pacientes con diabetes, hipertensión o úlcera péptica"
        ],
        edadMinima: "0 meses"
    },

    diazepam: {
        nombre: "Diazepam",
        indicaciones: ["Status epiléptico", "Convulsiones febriles prolongadas", "Sedación", "Ansiedad"],
        dosisKg: {
            convulsion_rectal: 0.5, // mg/kg/dosis
            convulsion_iv: 0.2, // mg/kg/dosis
            sedacion_vo: 0.1 // mg/kg/dosis
        },
        dosisMaxima: {
            convulsion_rectal: 10, // mg
            convulsion_iv: 5 // mg
        },
        intervalo: "Dosis única en emergencia, reevaluar",
        presentaciones: {
            "ampolla_10mg": {
                nombre: "Ampolla 10mg/2ml (5mg/ml)",
                concentracion: 5, // mg/ml
                marcas: ["Valium", "Plidán", "Diazepam Fabra"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            },
            "gotas_2mg_ml": {
                nombre: "Gotas 2mg/ml",
                concentracion: 2, // mg/ml
                marcas: ["Plidán Gotas"],
                tipo: "liquido"
            },
            "comprimidos_5mg": {
                nombre: "Comprimidos 5mg",
                concentracion: 5,
                marcas: ["Valium", "Plidán"],
                tipo: "solido"
            },
            "comprimidos_10mg": {
                nombre: "Comprimidos 10mg",
                concentracion: 10,
                marcas: ["Valium", "Plidán"],
                tipo: "solido"
            },
            "microenema_rectal_5mg": {
                nombre: "Microenema rectal 5mg",
                concentracion: 5, // mg por unidad
                marcas: ["Stesolid"],
                tipo: "solido", // Se trata como unidad
                uso: "Vía rectal"
            },
            "microenema_rectal_10mg": {
                nombre: "Microenema rectal 10mg",
                concentracion: 10, // mg por unidad
                marcas: ["Stesolid"],
                tipo: "solido", // Se trata como unidad
                uso: "Vía rectal"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad a benzodiazepinas",
            "Depresión respiratoria severa",
            "Síndrome de apnea del sueño",
            "Insuficiencia hepática severa",
            "Miastenia gravis"
        ],
        advertencias: [
            "SOLO para convulsiones >5 minutos o según indicación médica",
            "Vigilar depresión respiratoria y cardiovascular",
            "El uso rectal es de una sola dosis en ámbito prehospitalario",
            "Derivar inmediatamente al hospital tras su uso en emergencia",
            "Puede producir somnolencia y dependencia con el uso prolongado"
        ],
        edadMinima: "6 meses"
    },

    amoxicilina: {
        nombre: "Amoxicilina",
        indicaciones: ["Otitis media aguda", "Neumonía adquirida en la comunidad", "Faringitis estreptocócica", "Infección urinaria"],
        dosisKg: {
            estandar: 50, // mg/kg/día
            alta: 90 // mg/kg/día para otitis media o neumonía
        },
        intervalo: 12, // horas (2 veces por día) para dosis estándar, 8-12 para alta
        duracion: "7-10 días según la infección",
        presentaciones: {
            "suspension_250mg": {
                nombre: "Suspensión 250mg/5ml (50mg/ml)",
                concentracion: 50, // mg/ml
                marcas: ["Amoxidal", "Trifamox", "Amoxicilina Genérico"],
                tipo: "liquido"
            },
            "suspension_500mg": {
                nombre: "Suspensión 500mg/5ml (100mg/ml)",
                concentracion: 100, // mg/ml
                marcas: ["Amoxidal Forte", "Trifamox Forte"],
                tipo: "liquido"
            },
            "suspension_750mg": {
                nombre: "Suspensión 750mg/5ml (150mg/ml)",
                concentracion: 150, // mg/ml
                marcas: ["Amoxidal 750", "Trifamox 750"],
                tipo: "liquido"
            },
            "comprimidos_500mg": {
                nombre: "Comprimidos 500mg",
                concentracion: 500,
                marcas: ["Amoxidal 500", "Trifamox 500"],
                tipo: "solido"
            },
            "comprimidos_875mg": {
                nombre: "Comprimidos 875mg",
                concentracion: 875,
                marcas: ["Amoxidal Dúo", "Trifamox Dúo"],
                tipo: "solido"
            },
            "comprimidos_1g": {
                nombre: "Comprimidos 1g",
                concentracion: 1000,
                marcas: ["Amoxidal 1g", "Trifamox 1g"],
                tipo: "solido"
            },
            "comprimidos_masticables_250mg": {
                nombre: "Comprimidos Masticables 250mg",
                concentracion: 250,
                marcas: ["Trifamox Masticable"],
                tipo: "solido"
            },
            "comprimidos_masticables_500mg": {
                nombre: "Comprimidos Masticables 500mg",
                concentracion: 500,
                marcas: ["Trifamox Masticable"],
                tipo: "solido"
            },
            "inyectable_1g": {
                nombre: "Polvo para inyectable 1g",
                concentracion: 1000, // Se reconstituye, pero la base es 1g
                marcas: ["Amoxicilina Inyectable Genérico"],
                uso: "Exclusivo uso hospitalario IV/IM",
                tipo: "solido" // Se trata como unidad para la selección
            }
        },
        contraindicaciones: [
            "Alergia a penicilinas o cefalosporinas",
            "Mononucleosis infecciosa (riesgo de rash)",
            "Fenilcetonuria (algunas presentaciones masticables)"
        ],
        advertencias: [
            "Completar el tratamiento indicado para evitar resistencias",
            "La dosis se ajusta según la severidad de la infección",
            "Refrigerar la suspensión una vez reconstituida y desechar a los 14 días",
            "Vigilar la aparición de reacciones alérgicas (rash, urticaria)",
            "Puede causar diarrea, si es severa o persistente, consultar"
        ],
        edadMinima: "0 meses"
    },

    difenhidramina: {
        nombre: "Difenhidramina",
        indicaciones: ["Reacciones alérgicas", "Urticaria", "Insomnio ocasional", "Cinetosis"],
        dosisKg: 1.25, // mg/kg/dosis
        dosisDiaria: 5, // mg/kg/día máximo
        intervalo: 6, // horas
        presentaciones: {
            "jarabe_2_5mg": {
                nombre: "Jarabe 12.5mg/5ml (2.5mg/ml)",
                concentracion: 2.5, // mg/ml
                marcas: ["Benadryl", "Difenhidramina Denver Farma"],
                tipo: "liquido"
            },
            "ampolla_10mg": {
                nombre: "Ampolla 10mg/ml",
                concentracion: 10, // mg/ml
                marcas: ["Benadryl IV", "Difenhidramina Denver Farma"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            },
            "comprimidos_50mg": {
                nombre: "Comprimidos 50mg",
                concentracion: 50,
                marcas: ["Benadryl Antialérgico"],
                tipo: "solido"
            },
            "capsulas_50mg": {
                nombre: "Cápsulas 50mg",
                concentracion: 50,
                marcas: ["Benadryl Antialérgico"],
                tipo: "solido"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad", 
            "Menores de 2 años (riesgo de depresión respiratoria)", 
            "Crisis asmática aguda",
            "Glaucoma de ángulo estrecho"
        ],
        advertencias: [
            "Puede causar somnolencia marcada o excitación paradójica en niños", 
            "Usar con precaución en pacientes con asma o EPOC", 
            "No administrar con otros depresores del SNC (alcohol, sedantes)",
            "Puede espesar las secreciones bronquiales"
        ],
        edadMinima: "2 años"
    },

    dipirona: {
        nombre: "Dipirona (Metamizol)",
        indicaciones: ["Fiebre alta refractaria", "Dolor agudo postoperatorio o postraumático", "Dolor de tipo cólico"],
        dosisKg: 15, // mg/kg/dosis (rango 10-17)
        dosisDiaria: 60, // mg/kg/día
        intervalo: 6, // horas
        presentaciones: {
            "jarabe_250mg": {
                nombre: "Jarabe 250mg/5ml (50mg/ml)",
                concentracion: 50, // mg/ml
                marcas: ["Novalcina", "Algiopiret", "Dipirona Genérico"],
                tipo: "liquido"
            },
            "gotas_500mg": {
                nombre: "Gotas 500mg/ml",
                concentracion: 500, // mg/ml
                marcas: ["Novalcina Gotas", "Algiopiret Gotas"],
                tipo: "liquido"
            },
            "comprimidos_500mg": {
                nombre: "Comprimidos 500mg",
                concentracion: 500,
                marcas: ["Novalcina", "Algiopiret"],
                tipo: "solido"
            },
            "ampolla_1g": {
                nombre: "Ampolla 1g/2ml (500mg/ml)",
                concentracion: 500, // mg/ml
                marcas: ["Novalcina IM/IV", "Algiopiret Inyectable"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad a pirazolonas (riesgo de shock anafiláctico)",
            "Menores de 3 meses o <5kg (riesgo de insuficiencia renal)",
            "Deficiencia de G6PD (riesgo de hemólisis)",
            "Agranulocitosis previa por metamizol"
        ],
        advertencias: [
            "Riesgo de agranulocitosis y shock anafiláctico. Suspender ante fiebre, odinofagia, úlceras bucales o hipotensión.",
            "La administración IV debe ser lenta (no más de 1ml/min) por riesgo de hipotensión.",
            "Usar con extrema precaución en pacientes con asma, urticaria crónica o hipotensión preexistente.",
            "No se recomienda su uso como antipirético de primera línea."
        ],
        edadMinima: "3 meses"
    },

    betametasona: {
        nombre: "Betametasona",
        indicaciones: ["Reacciones alérgicas severas", "Crisis asmática", "Laringitis", "Procesos inflamatorios"],
        dosisKg: 0.2, // mg/kg/día (rango 0.1-0.3)
        dosisDiaria: 12, // mg/día máximo en niños
        intervalo: 8, // horas (dividido en 3 tomas)
        presentaciones: {
            "gotas_0_6mg": {
                nombre: "Gotas 0.6mg/ml",
                concentracion: 0.6, // mg/ml
                marcas: ["Celestone Gotas"],
                tipo: "liquido"
            },
            "comprimidos_0_6mg": {
                nombre: "Comprimidos 0.6mg",
                concentracion: 0.6,
                marcas: ["Celestone"],
                tipo: "solido"
            },
            "ampolla_4mg": {
                nombre: "Ampolla 4mg/ml",
                concentracion: 4, // mg/ml
                marcas: ["Celestone Inyectable", "Cronodicasone"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Infecciones fúngicas sistémicas",
            "Tuberculosis activa no tratada",
            "Varicela o sarampión activos",
            "Hipersensibilidad"
        ],
        advertencias: [
            "Administrar con alimentos para disminuir malestar gástrico",
            "No suspender bruscamente si el tratamiento es prolongado",
            "Vigilar signos de infección, ya que puede enmascararlos",
            "Uso prolongado puede afectar el crecimiento en niños",
            "Precaución en pacientes con diabetes, hipertensión o úlcera péptica"
        ],
        edadMinima: "0 meses"
    },

    fenitoina: {
        nombre: "Fenitoína",
        indicaciones: ["Status epiléptico", "Crisis convulsivas tónico-clónicas", "Prevención de convulsiones en neurocirugía"],
        dosisKg: {
            carga: 20, // mg/kg dosis de carga IV
            mantenimiento: 5 // mg/kg/día VO o IV
        },
        intervalo: 12, // horas para mantenimiento
        presentaciones: {
            "ampolla_250mg": {
                nombre: "Ampolla 250mg/5ml (50mg/ml)",
                concentracion: 50, // mg/ml
                marcas: ["Epamin", "Fenitoína Denver Farma"],
                uso: "Exclusivo uso hospitalario IV",
                tipo: "liquido"
            },
            "comprimidos_100mg": {
                nombre: "Comprimidos 100mg",
                concentracion: 100,
                marcas: ["Epamin", "Fenitoína Denver Farma"],
                tipo: "solido"
            },
            "suspension_125mg": {
                nombre: "Suspensión 125mg/5ml (25mg/ml)",
                concentracion: 25, // mg/ml
                marcas: ["Epamin Suspensión"],
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Hipersensibilidad a hidantoínas",
            "Bradicardia sinusal, bloqueo sinoauricular, bloqueo A-V de segundo y tercer grado",
            "Síndrome de Adams-Stokes"
        ],
        advertencias: [
            "Uso exclusivo hospitalario para la vía IV",
            "La administración IV debe ser lenta (no >1-3 mg/kg/min) con monitorización cardíaca",
            "Diluir solo en solución salina normal y administrar inmediatamente",
            "Riesgo de extravasación y daño tisular severo (síndrome del guante púrpura)",
            "Requiere monitoreo de niveles plasmáticos para ajuste de dosis oral"
        ],
        edadMinima: "0 meses"
    },

    "ciriax-otic-l": {
        nombre: "Ciriax Otic L",
        indicaciones: ["Otitis externa aguda"],
        dosisFija: "3 gotas en oído afectado",
        intervalo: 12, // horas
        duracion: "7 días",
        presentaciones: {
            "gotas_oticas": {
                nombre: "Gotas óticas (Ciprofloxacina, Hidrocortisona, Lidocaína)",
                concentracion: null, // No aplica
                marcas: ["Ciriax Otic L"]
            }
        },
        contraindicaciones: ["Perforación timpánica", "Infecciones virales del oído (herpes, varicela)", "Hipersensibilidad"],
        advertencias: ["Suspender si aparece erupción cutánea", "Entibiar el frasco antes de usar", "No usar en menores de 1 año"],
        edadMinima: "1 año"
    },

    cefalexina: {
        nombre: "Cefalexina",
        indicaciones: ["Infecciones del tracto respiratorio", "Infecciones de piel y tejidos blandos", "Infecciones del tracto urinario", "Otitis media"],
        dosisKg: 50, // mg/kg/día (rango 25-100 mg/kg/día)
        dosisDiaria: 100, // mg/kg/día máximo
        intervalo: 6, // horas (4 dosis diarias)
        maxDosis: 4, // dosis máximas por día
        presentaciones: {
            "suspension_125mg": {
                nombre: "Suspensión 125mg/5ml",
                concentracion: 25, // mg/ml
                marcas: ["Cefalexina Normon", "Keflex", "Cefalexina Genérico"],
                volumenFrasco: "60ml, 100ml, 150ml",
                tipo: "liquido"
            },
            "suspension_250mg": {
                nombre: "Suspensión 250mg/5ml",
                concentracion: 50, // mg/ml
                marcas: ["Cefalexina Forte", "Keflex Forte"],
                volumenFrasco: "100ml, 150ml",
                tipo: "liquido"
            },
            "capsulas_250mg": {
                nombre: "Cápsulas 250mg",
                concentracion: 250, // mg por unidad
                marcas: ["Keflex", "Cefalexina Genérico"],
                tipo: "solido"
            },
            "capsulas_500mg": {
                nombre: "Cápsulas 500mg",
                concentracion: 500, // mg por unidad
                marcas: ["Keflex", "Cefalexina Normon"],
                tipo: "solido"
            },
            "comprimidos_1g": {
                nombre: "Comprimidos 1g",
                concentracion: 1000, // mg por unidad
                marcas: ["Cefalexina 1g"],
                tipo: "solido"
            }
        },
        alertas: {
            contraindicaciones: [
                "Hipersensibilidad a cefalosporinas",
                "Alergia grave a penicilinas (reacción cruzada 1-10%)",
                "Colitis pseudomembranosa previa por antibióticos"
            ],
            precauciones: [
                "Usar con precaución en pacientes con alergia a penicilinas",
                "Ajustar dosis en insuficiencia renal",
                "Puede causar diarrea asociada a Clostridium difficile",
                "Tomar con alimentos para reducir molestias gastrointestinales"
            ],
            alergias: [
                "Reacciones de hipersensibilidad: urticaria, broncoespasmo",
                "Reacciones cruzadas con penicilinas (1-10% de pacientes)",
                "Reacciones anafilácticas raras pero posibles"
            ]
        },
        contraindicaciones: ["Hipersensibilidad a cefalosporinas", "Alergia grave a penicilinas"],
        advertencias: [
            "Completar el curso completo de tratamiento (7-10 días)",
            "Administrar con alimentos si causa molestias gástricas",
            "Vigilar signos de diarrea severa o colitis",
            "En caso de reacciones alérgicas, suspender inmediatamente"
        ],
        edadMinima: "1 mes",
        duracion: "7-10 días"
    },

    oxigeno: {
        nombre: "Oxígeno Medicinal",
        indicaciones: ["Hipoxemia", "Dificultad respiratoria", "Reanimación"],
        tipo: "gas",
        dispositivos: {
            "canula_nasal": {
                nombre: "Cánula Nasal (Bajo Flujo)",
                flujo: "1-4 L/min",
                fio2: "24-36%",
                estimacion: "FiO2 aumenta ~4% por cada L/min de flujo."
            },
            "mascara_simple": {
                nombre: "Máscara Simple (Bajo Flujo)",
                flujo: "5-10 L/min",
                fio2: "30-60%",
                advertencia: "Flujo mínimo de 5 L/min para evitar reinhalación de CO2."
            },
            "mascara_reservorio_parcial": {
                nombre: "Máscara con Reservorio (Reinhalación Parcial)",
                flujo: "6-10 L/min",
                fio2: "40-70%",
                advertencia: "Mantener bolsa reservorio parcialmente inflada."
            },
            "mascara_reservorio_no_reinh": {
                nombre: "Máscara con Reservorio (No Reinhalación)",
                flujo: "10-15 L/min",
                fio2: "60-90%",
                advertencia: "Mantener bolsa reservorio inflada. Aporta la FiO2 más alta sin intubación."
            },
            "mascara_venturi": {
                nombre: "Máscara con Sistema Venturi (Alto Flujo)",
                flujo: "Variable según conector",
                fio2: "24%, 28%, 31%, 35%, 40%, 50%",
                advertencia: "Aporta FiO2 exacta. Seleccionar conector de color para FiO2 deseada y ajustar flujo según indicación del dispositivo."
            }
        },
        advertencias: ["El oxígeno es un medicamento, administrar bajo indicación médica", "Peligro de incendio. No fumar ni exponer a fuentes de calor", "Humidificar el oxígeno en flujos >2 L/min o uso prolongado"]
    },

    lactulon: {
        nombre: "Lactulosa (Lactulon)",
        indicaciones: ["Estreñimiento", "Encefalopatía hepática", "Constipación crónica"],
        dosisKg: 1, // ml/kg/día (rango 0.5-2 ml/kg/día)
        dosisDiaria: 40, // ml/día máximo en niños
        intervalo: 12, // horas (2 veces por día)
        maxDosis: 2, // dosis máximas por día
        alertas: {
            contraindicaciones: [
                "Obstrucción intestinal",
                "Galactosemia",
                "Hipersensibilidad a lactulosa"
            ],
            precauciones: [
                "Ajustar dosis según respuesta intestinal",
                "Puede causar distensión abdominal inicial",
                "Mantener hidratación adecuada",
                "En diabetes: vigilar niveles de glucosa"
            ],
            alergias: [
                "Reacciones gastrointestinales: náuseas, vómitos",
                "Hipersensibilidad rara: urticaria, broncoespasmo"
            ]
        },
        presentaciones: {
            "jarabe_667mg": {
                nombre: "Jarabe 667mg/ml (66.7%)",
                concentracion: 667, // mg/ml
                marcas: ["Lactulon", "Duphalac", "Lactulosa Genérico"],
                volumenFrasco: "200ml, 500ml",
                tipo: "liquido"
            },
            "jarabe_3340mg": {
                nombre: "Jarabe 3.34g/5ml",
                concentracion: 668, // mg/ml (equivalente)
                marcas: ["Lactulon Forte", "Duphalac Forte"],
                volumenFrasco: "300ml",
                tipo: "liquido"
            },
            "sobres_10g": {
                nombre: "Sobres 10g/15ml",
                concentracion: 667, // mg/ml una vez disuelto
                marcas: ["Lactulon Sobres", "Duphalac Sobres"],
                tipo: "liquido"
            }
        },
        contraindicaciones: [
            "Obstrucción intestinal o sospecha de la misma",
            "Galactosemia hereditaria",
            "Hipersensibilidad a lactulosa o galactosa"
        ],
        advertencias: [
            "Iniciar con dosis baja y ajustar según respuesta",
            "Puede causar flatulencia, distensión abdominal inicial",
            "Efecto laxante se observa en 24-48 horas",
            "En diabéticos: puede contener pequeñas cantidades de azúcares",
            "Suspender si aparece dolor abdominal severo o diarrea intensa"
        ],
        edadMinima: "0 meses",
        duracion: "Ajustar según respuesta, puede ser uso prolongado"
    },

    metoclopramida: {
        nombre: "Metoclopramida",
        indicaciones: ["Náuseas y vómitos", "Gastroparesia", "Reflujo gastroesofágico", "Vómitos postoperatorios"],
        dosisKg: 0.5, // mg/kg/dosis (rango 0.1-0.5)
        dosisDiaria: 2, // mg/kg/día máximo
        intervalo: 8, // horas
        maxDosis: 3, // dosis máximas por día
        alertas: {
            contraindicaciones: [
                "Obstrucción intestinal o perforación gastrointestinal",
                "Feocromocitoma",
                "Epilepsia no controlada",
                "Hemorragia gastrointestinal",
                "Hipersensibilidad a metoclopramida"
            ],
            precauciones: [
                "Riesgo de efectos extrapiramidales, especialmente en niños",
                "Usar por períodos cortos (máximo 5 días)",
                "Vigilar aparición de discinesias tardías",
                "Precaución en insuficiencia renal o hepática"
            ],
            alergias: [
                "Reacciones extrapiramidales: distonía, discinesia, acatisia",
                "Reacciones neurológicas: somnolencia, inquietud, depresión",
                "Hiperprolactinemia: ginecomastia, galactorrea"
            ]
        },
        presentaciones: {
            "gotas_1mg_ml": {
                nombre: "Gotas 1mg/ml",
                concentracion: 1, // mg/ml
                marcas: ["Reliveran Gotas", "Metoclopramida Genérico"],
                volumenFrasco: "15ml, 20ml",
                tipo: "liquido"
            },
            "gotas_4mg_ml": {
                nombre: "Gotas 4mg/ml",
                concentracion: 4, // mg/ml
                marcas: ["Reliveran Forte"],
                volumenFrasco: "10ml, 15ml",
                tipo: "liquido"
            },
            "jarabe_1mg_ml": {
                nombre: "Jarabe 1mg/ml",
                concentracion: 1, // mg/ml
                marcas: ["Metoclopramida Jarabe"],
                volumenFrasco: "120ml",
                tipo: "liquido"
            },
            "ampolla_5mg": {
                nombre: "Ampolla 5mg/ml (10mg/2ml)",
                concentracion: 5, // mg/ml
                marcas: ["Reliveran Inyectable", "Metoclopramida IV"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            },
            "ampolla_10mg": {
                nombre: "Ampolla 10mg/2ml (5mg/ml)",
                concentracion: 5, // mg/ml
                marcas: ["Primperan", "Metoclopramida Inyectable"],
                uso: "Uso hospitalario IV/IM",
                tipo: "liquido"
            },
            "comprimidos_10mg": {
                nombre: "Comprimidos 10mg",
                concentracion: 10, // mg por unidad
                marcas: ["Primperan", "Reliveran"],
                tipo: "solido"
            }
        },
        contraindicaciones: [
            "Obstrucción o perforación gastrointestinal",
            "Epilepsia no controlada",
            "Feocromocitoma",
            "Hemorragia gastrointestinal",
            "Hipersensibilidad a metoclopramida"
        ],
        advertencias: [
            "Uso máximo de 5 días para evitar efectos extrapiramidales",
            "Vigilar aparición de movimientos involuntarios o rigidez",
            "Suspender inmediatamente si aparecen síntomas neurológicos",
            "No usar de forma rutinaria en vómitos simples autolimitados",
            "Riesgo aumentado de efectos adversos en menores de 1 año"
        ],
        edadMinima: "1 mes"
    },

    "sales-rehidratacion": {
        nombre: "Sales de Rehidratación Oral (SRO)",
        indicaciones: ["Deshidratación leve a moderada", "Diarrea aguda", "Vómitos", "Prevención de deshidratación"],
        dosisFija: "Variable según peso y grado de deshidratación",
        intervalo: "Continuo según tolerancia",
        duracion: "Hasta corrección de la deshidratación",
        presentaciones: {
            "sobre_oms_reducido": {
                nombre: "Sobres SRO Fórmula OMS (Osmolaridad Reducida)",
                concentracion: null, // No aplica
                marcas: ["Suero Casero Pharma", "SRO OMS", "Electrolit Pediátrico"],
                composicion: "Na+ 75 mEq/L, Cl- 65 mEq/L, K+ 20 mEq/L, Glucosa 75 mmol/L",
                preparacion: "1 sobre en 250ml de agua hervida fría",
                tipo: "liquido"
            },
            "sobre_oms_original": {
                nombre: "Sobres SRO Fórmula OMS Original",
                concentracion: null, // No aplica
                marcas: ["Suero Oral", "SRO Clásico"],
                composicion: "Na+ 90 mEq/L, Cl- 80 mEq/L, K+ 20 mEq/L, Glucosa 111 mmol/L",
                preparacion: "1 sobre en 1 litro de agua hervida fría",
                tipo: "liquido"
            },
            "polvo_farmacia": {
                nombre: "Polvo para SRO (Preparación Magistral)",
                concentracion: null, // No aplica
                marcas: ["Preparación Farmacia"],
                composicion: "Según fórmula OMS",
                preparacion: "Según indicación farmacéutica",
                tipo: "liquido"
            }
        },
        // Cálculos especiales para SRO
        calculoEspecial: {
            deficit_leve: "50 ml/kg en 4 horas", // 3-5% deshidratación
            deficit_moderado: "100 ml/kg en 4 horas", // 6-9% deshidratación
            mantenimiento: "100-150 ml/kg/día",
            perdidas_continuas: "10-20 ml/kg por cada episodio de diarrea/vómito"
        },
        contraindicaciones: [
            "Deshidratación severa (>10%) - requiere vía IV",
            "Vómitos incoercibles que impiden la vía oral",
            "Íleo paralítico u obstrucción intestinal",
            "Shock hipovolémico",
            "Alteración severa del estado de conciencia"
        ],
        advertencias: [
            "Administrar en pequeños volúmenes frecuentes (5-10ml cada 2-3 min)",
            "Si vomita, esperar 10 minutos y reiniciar más lentamente",
            "Preparar fresco cada 24 horas y refrigerar",
            "Usar agua hervida fría para la preparación",
            "No agregar azúcar, miel ni otros endulzantes",
            "Derivar si no mejora en 4-6 horas o empeora"
        ],
        edadMinima: "0 meses"
    }
};

// Funciones para obtener información de medicamentos
function obtenerMedicamento(nombre) {
    return medicamentosDB[nombre] || null;
}

function obtenerPresentaciones(medicamento) {
    const med = medicamentosDB[medicamento];
    if (!med) return [];
    if (med.tipo === 'gas') {
        return med.dispositivos ? Object.keys(med.dispositivos) : [];
    }
    return med.presentaciones ? Object.keys(med.presentaciones) : [];
}

function calcularDosisMl(medicamento, peso, presentacion, indicacion = null) {
    const med = medicamentosDB[medicamento];
    if (!med) return null;

    // Manejar dosis fijas
    if (med.dosisFija) {
        return {
            dosisFija: med.dosisFija,
            intervalo: med.intervalo,
            duracion: med.duracion || null,
            presentacion: med.presentaciones[presentacion]
        };
    }
    
    // Manejar Oxígeno
    if (med.tipo === 'gas') {
        return obtenerInfoOxigeno(presentacion); // 'presentacion' aquí es el 'dispositivo'
    }

    let dosisMg;
    let volumenMl;

    // Calcular dosis según el medicamento
    if (medicamento === 'lactulon') {
        // Para lactulon, la dosis se calcula directamente en ml/kg
        volumenMl = peso * med.dosisKg; // ml/kg
        dosisMg = null; // No aplica para lactulon
    } else if (medicamento === 'sales-rehidratacion') {
        // Para sales de rehidratación oral, retornar información especial
        return {
            tipo: 'sro',
            peso: peso,
            calculoEspecial: med.calculoEspecial,
            presentacion: med.presentaciones[presentacion],
            intervalo: med.intervalo,
            duracion: med.duracion
        };
    } else if (medicamento === 'ibuprofeno' && indicacion) {
        dosisMg = peso * med.dosisKg[indicacion];
    } else if (medicamento === 'prednisolona' && indicacion) {
        dosisMg = peso * med.dosisKg[indicacion];
    } else if (medicamento === 'fenitoina' && indicacion) {
        dosisMg = peso * med.dosisKg[indicacion];
    } else if (typeof med.dosisKg === 'object') {
        // Default a la primera dosis si no hay indicación específica
        dosisMg = peso * med.dosisKg[Object.keys(med.dosisKg)[0]];
    } else {
        dosisMg = peso * med.dosisKg;
    }

    // Obtener concentración de la presentación
    const pres = med.presentaciones[presentacion];
    if (!pres || pres.concentracion === null) return null;

    // Si es aerosol, calcular número de disparos
    if (pres.tipo === 'aerosol') {
        const edadCategoria = obtenerCategoriaEdad(peso);
        const disparos = pres.disparosPorEdad[edadCategoria];
        
        return {
            dosisMg: disparos * pres.dosisDisparo,
            disparos: disparos,
            tipo: 'aerosol',
            concentracion: pres.concentracion,
            intervalo: med.intervalo,
            maxDosis: med.maxDosis || null,
            presentacion: pres,
            usoConCamara: pres.usoConCamara || null
        };
    }

    // Si es sólido, calcular número de unidades
    if (pres.tipo === 'solido') {
        const unidades = dosisMg / pres.concentracion;
        return {
            dosisMg: Math.round(dosisMg * 10) / 10,
            unidades: Math.round(unidades * 100) / 100, // Ej: 0.5 comprimidos
            tipo: 'solido',
            concentracion: pres.concentracion, // mg/unidad
            intervalo: med.intervalo,
            maxDosis: med.maxDosis || null,
            presentacion: pres
        };
    }

    // Para medicamentos líquidos regulares
    if (medicamento === 'lactulon') {
        // Para lactulon, el volumen ya está calculado directamente
        return {
            dosisMg: null, // No aplica para lactulon
            volumenMl: Math.round(volumenMl * 100) / 100,
            concentracion: pres.concentracion, // mg/ml (informativo)
            intervalo: med.intervalo,
            maxDosis: med.maxDosis || null,
            presentacion: pres,
            tipo: 'liquido_directo' // Identificador especial para lactulon
        };
    }

    const concentracion = pres.concentracion; // mg/ml
    if (!volumenMl) {
        volumenMl = dosisMg / concentracion;
    }

    return {
        dosisMg: Math.round(dosisMg * 10) / 10,
        volumenMl: Math.round(volumenMl * 100) / 100,
        concentracion: concentracion,
        intervalo: med.intervalo,
        maxDosis: med.maxDosis || null,
        presentacion: pres
    };
}

// Nueva función para obtener información de oxígeno
function obtenerInfoOxigeno(dispositivo) {
    const oxigeno = medicamentosDB.oxigeno;
    if (!oxigeno || !oxigeno.dispositivos[dispositivo]) return null;
    
    const info = oxigeno.dispositivos[dispositivo];
    
    return {
        tipo: 'gas',
        nombre: info.nombre,
        flujo: info.flujo,
        fio2: info.fio2,
        advertencia: info.advertencia || null,
        estimacion: info.estimacion || null
    };
}


// Validaciones de seguridad
function validarDosis(medicamento, peso, edad = null) {
    const med = medicamentosDB[medicamento];
    if (!med) return { valida: false, errores: ["Medicamento no encontrado"] };

    const errores = [];
    const advertencias = [];

    // No validar peso para oxígeno o medicamentos de dosis fija
    if (med.tipo !== 'gas' && !med.dosisFija) {
        if (peso < 0.5 || peso > 100) {
            errores.push("Peso fuera del rango pediátrico (0.5-100kg)");
        }
    }

    // Validar edad mínima
    if (edad && med.edadMinima) {
        const edadMeses = convertirEdadAMeses(edad);
        const edadMinimaMeses = convertirEdadAMeses(med.edadMinima);
        
        if (edadMeses < edadMinimaMeses) {
            errores.push(`No recomendado en menores de ${med.edadMinima}`);
        }
    }

    // Validaciones específicas por medicamento
    if (medicamento === 'ibuprofeno') {
        if (peso < 5) { // Aproximadamente 3 meses
            errores.push("Ibuprofeno no recomendado en menores de 3 meses");
        }
    }

    if (medicamento === 'diazepam') {
        advertencias.push("SOLO para convulsiones >5 minutos");
        advertencias.push("Derivar inmediatamente al hospital");
    }
    
    if (medicamento === 'fenitoina') {
        advertencias.push("Uso exclusivo hospitalario. Requiere monitorización.");
    }

    return {
        valida: errores.length === 0,
        errores: errores,
        advertencias: advertencias.concat(med.advertencias || [])
    };
}

function convertirEdadAMeses(edad) {
    if (typeof edad === 'string') {
        // Convertir string de edad a meses
        if (edad.includes('año')) {
            return parseInt(edad) * 12;
        } else if (edad.includes('mes')) {
            return parseInt(edad);
        }
    }
    return 0;
}

function obtenerCategoriaEdad(peso) {
    // Determinar categoría de edad basada en peso aproximado
    if (peso <= 10) return "lactante";  // 0-12 meses
    if (peso <= 20) return "preescolar"; // 1-5 años
    if (peso <= 40) return "escolar";    // 6-12 años
    return "adolescente";                // 13+ años
}

// Exportar todas las funciones
export { 
    obtenerMedicamento, 
    calcularDosisMl, 
    validarDosis, 
    convertirEdadAMeses, 
    obtenerCategoriaEdad 
};
