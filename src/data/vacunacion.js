// Calendario Nacional de Vacunación Argentina 2024
export const calendarioNinos = {
  "recien_nacido": {
    nombre: "Recién Nacido",
    edad: "Recién nacido (primeras 12 horas)",
    vacunas: [
      {
        nombre: "BCG",
        enfermedad: "Tuberculosis",
        dosis: "Única",
        via: "Intradérmica",
        sitio: "Brazo izquierdo",
        observaciones: "Obligatoria. Una sola aplicación al nacer"
      },
      {
        nombre: "Hepatitis B",
        enfermedad: "Hepatitis B",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Dentro de las primeras 12 horas de vida"
      }
    ]
  },
  "2_meses": {
    nombre: "2 meses",
    edad: "2 meses",
    vacunas: [
      {
        nombre: "Pentavalente (DPT-HB-Hib)",
        enfermedad: "Difteria, Tétanos, Pertussis, Hepatitis B, Haemophilus influenzae tipo b",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "IPV (Polio inactivada)",
        enfermedad: "Poliomielitis",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Rotavirus",
        enfermedad: "Gastroenteritis por rotavirus",
        dosis: "1ra dosis",
        via: "Oral",
        sitio: "Oral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Neumocócica conjugada",
        enfermedad: "Infecciones por neumococo",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      }
    ]
  },
  "4_meses": {
    nombre: "4 meses",
    edad: "4 meses",
    vacunas: [
      {
        nombre: "Pentavalente (DPT-HB-Hib)",
        enfermedad: "Difteria, Tétanos, Pertussis, Hepatitis B, Haemophilus influenzae tipo b",
        dosis: "2da dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "IPV (Polio inactivada)",
        enfermedad: "Poliomielitis",
        dosis: "2da dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Rotavirus",
        enfermedad: "Gastroenteritis por rotavirus",
        dosis: "2da dosis",
        via: "Oral",
        sitio: "Oral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Neumocócica conjugada",
        enfermedad: "Infecciones por neumococo",
        dosis: "2da dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      }
    ]
  },
  "6_meses": {
    nombre: "6 meses",
    edad: "6 meses",
    vacunas: [
      {
        nombre: "Pentavalente (DPT-HB-Hib)",
        enfermedad: "Difteria, Tétanos, Pertussis, Hepatitis B, Haemophilus influenzae tipo b",
        dosis: "3ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "IPV (Polio inactivada)",
        enfermedad: "Poliomielitis",
        dosis: "3ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Rotavirus",
        enfermedad: "Gastroenteritis por rotavirus",
        dosis: "3ra dosis",
        via: "Oral",
        sitio: "Oral",
        observaciones: "Solo si se usa vacuna pentavalente"
      },
      {
        nombre: "Gripe",
        enfermedad: "Influenza",
        dosis: "1ra dosis anual",
        via: "Intramuscular",
        sitio: "Muslo anterolateral",
        observaciones: "Anual. 2 dosis separadas por 4 semanas la primera vez"
      }
    ]
  },
  "12_meses": {
    nombre: "12 meses",
    edad: "12 meses (1 año)",
    vacunas: [
      {
        nombre: "Triple viral (SRP)",
        enfermedad: "Sarampión, Rubéola, Parotiditis",
        dosis: "1ra dosis",
        via: "Subcutánea",
        sitio: "Brazo",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Neumocócica conjugada",
        enfermedad: "Infecciones por neumococo",
        dosis: "Refuerzo",
        via: "Intramuscular",
        sitio: "Muslo anterolateral o brazo",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Hepatitis A",
        enfermedad: "Hepatitis A",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Varicela",
        enfermedad: "Varicela",
        dosis: "1ra dosis",
        via: "Subcutánea",
        sitio: "Brazo",
        observaciones: "Obligatoria"
      }
    ]
  },
  "15_meses": {
    nombre: "15 meses",
    edad: "15 meses",
    vacunas: [
      {
        nombre: "Meningocócica tetravalente (ACWY)",
        enfermedad: "Meningitis y sepsis meningocócica",
        dosis: "1ra dosis",
        via: "Intramuscular",
        sitio: "Muslo anterolateral o brazo",
        observaciones: "Obligatoria"
      }
    ]
  },
  "15_18_meses": {
    nombre: "15-18 meses",
    edad: "15 a 18 meses",
    vacunas: [
      {
        nombre: "DPT (Triple bacteriana)",
        enfermedad: "Difteria, Tétanos, Pertussis",
        dosis: "1er refuerzo",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria"
      },
      {
        nombre: "Polio oral (bOPV)",
        enfermedad: "Poliomielitis",
        dosis: "1er refuerzo",
        via: "Oral",
        sitio: "Oral",
        observaciones: "Obligatoria"
      }
    ]
  },
  "18_meses": {
    nombre: "18 meses",
    edad: "18 meses",
    vacunas: [
      {
        nombre: "Hepatitis A",
        enfermedad: "Hepatitis A",
        dosis: "2da dosis",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria. Completar esquema"
      }
    ]
  },
  "5_6_anos": {
    nombre: "5-6 años (Ingreso escolar)",
    edad: "5 a 6 años",
    vacunas: [
      {
        nombre: "DPT (Triple bacteriana)",
        enfermedad: "Difteria, Tétanos, Pertussis",
        dosis: "2do refuerzo",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria para ingreso escolar"
      },
      {
        nombre: "Polio oral (bOPV)",
        enfermedad: "Poliomielitis",
        dosis: "2do refuerzo",
        via: "Oral",
        sitio: "Oral",
        observaciones: "Obligatoria para ingreso escolar"
      },
      {
        nombre: "Triple viral (SRP)",
        enfermedad: "Sarampión, Rubéola, Parotiditis",
        dosis: "2da dosis",
        via: "Subcutánea",
        sitio: "Brazo",
        observaciones: "Obligatoria para ingreso escolar"
      },
      {
        nombre: "Varicela",
        enfermedad: "Varicela",
        dosis: "2da dosis",
        via: "Subcutánea",
        sitio: "Brazo",
        observaciones: "Obligatoria para ingreso escolar"
      }
    ]
  },
  "11_anos": {
    nombre: "11 años",
    edad: "11 años",
    vacunas: [
      {
        nombre: "Meningocócica tetravalente (ACWY)",
        enfermedad: "Meningitis y sepsis meningocócica",
        dosis: "Refuerzo",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria"
      },
      {
        nombre: "VPH (Virus del Papiloma Humano)",
        enfermedad: "Cáncer de cuello uterino y verrugas genitales",
        dosis: "Esquema completo (2 dosis)",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Para todos los géneros. 2 dosis separadas por 6 meses"
      }
    ]
  },
  "adolescentes": {
    nombre: "Adolescentes y adultos",
    edad: "Desde los 16 años",
    vacunas: [
      {
        nombre: "dT (Doble adultos)",
        enfermedad: "Difteria y Tétanos",
        dosis: "Refuerzo cada 10 años",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria. Refuerzo cada 10 años de por vida"
      },
      {
        nombre: "Gripe",
        enfermedad: "Influenza",
        dosis: "Anual",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Anual para grupos de riesgo y mayores de 65 años"
      }
    ]
  }
};

export const calendarioAdultos = {
  "16_64_anos": {
    nombre: "16-64 años",
    edad: "16 a 64 años",
    vacunas: [
      {
        id: "dt_adulto",
        nombre: "dT (Doble adultos)",
        enfermedad: "Difteria y Tétanos",
        dosis: "Refuerzo cada 10 años",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria. Refuerzo cada 10 años de por vida",
        esquemaCompleto: "1 dosis cada 10 años",
        prioridad: "alta"
      },
      {
        id: "gripe_adulto",
        nombre: "Gripe",
        enfermedad: "Influenza",
        dosis: "Anual",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Anual para grupos de riesgo",
        esquemaCompleto: "1 dosis anual",
        prioridad: "media"
      },
      {
        id: "hepatitis_b_adulto",
        nombre: "Hepatitis B",
        enfermedad: "Hepatitis B",
        dosis: "3 dosis (0-1-6 meses)",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Para adultos no vacunados",
        esquemaCompleto: "3 dosis",
        prioridad: "alta"
      }
    ]
  },
  "65_mas": {
    nombre: "65+ años",
    edad: "65 años o más",
    vacunas: [
      {
        id: "dt_adulto_mayor",
        nombre: "dT (Doble adultos)",
        enfermedad: "Difteria y Tétanos",
        dosis: "Refuerzo cada 10 años",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria cada 10 años",
        esquemaCompleto: "1 dosis cada 10 años",
        prioridad: "alta"
      },
      {
        id: "gripe_adulto_mayor",
        nombre: "Gripe",
        enfermedad: "Influenza",
        dosis: "Anual",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Obligatoria anual",
        esquemaCompleto: "1 dosis anual",
        prioridad: "alta"
      },
      {
        id: "neumococica_adulto",
        nombre: "Neumocócica",
        enfermedad: "Infecciones por neumococo",
        dosis: "1-2 dosis según esquema",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "VCN13 seguida de VPN23",
        esquemaCompleto: "2 dosis",
        prioridad: "alta"
      },
      {
        id: "herpes_zoster",
        nombre: "Herpes Zóster",
        enfermedad: "Herpes Zóster",
        dosis: "2 dosis",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "2 dosis separadas por 2-6 meses",
        esquemaCompleto: "2 dosis",
        prioridad: "media"
      }
    ]
  }
};

export const calendarioEmbarazadas = {
  "embarazo": {
    nombre: "Embarazadas",
    edad: "Durante el embarazo",
    vacunas: [
      {
        id: "dtpa_embarazo",
        nombre: "dTpa (Triple acelular del adulto)",
        enfermedad: "Difteria, Tétanos, Pertussis",
        dosis: "1 dosis por embarazo",
        momento: "Semanas 20-36 de cada embarazo",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Protege al recién nacido en sus primeros meses",
        esquemaCompleto: "1 dosis por embarazo",
        prioridad: "alta"
      },
      {
        id: "gripe_embarazo",
        nombre: "Gripe",
        enfermedad: "Influenza",
        dosis: "1 dosis anual",
        momento: "En cualquier trimestre del embarazo",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Durante la campaña de vacunación anual",
        esquemaCompleto: "1 dosis anual",
        prioridad: "alta"
      },
      {
        id: "covid_embarazo",
        nombre: "COVID-19",
        enfermedad: "COVID-19",
        dosis: "Según esquema vigente",
        momento: "En cualquier trimestre",
        via: "Intramuscular",
        sitio: "Brazo",
        observaciones: "Esquema completo + refuerzos según normativa",
        esquemaCompleto: "Según esquema vigente",
        prioridad: "alta"
      }
    ]
  }
};

export const gruposEspeciales = {
  prematuros: {
    nombre: "Prematuros",
    observaciones: [
      "Seguir calendario según edad cronológica (no corregida)",
      "BCG: aplazar hasta peso ≥2000g y estabilidad clínica",
      "Considerar Palivizumab para VSR en casos específicos"
    ]
  },
  inmunocomprometidos: {
    nombre: "Pacientes inmunocomprometidos",
    observaciones: [
      "Contraindicadas las vacunas vivas atenuadas",
      "Evaluar respuesta inmune individualmente",
      "Considerar vacunación de contactos cercanos"
    ]
  },
  gruposRiesgo: {
    nombre: "Grupos de riesgo",
    observaciones: [
      "Personal de salud: esquemas completos y refuerzos",
      "Viajeros: vacunas según destino",
      "Contacto con pacientes inmunocomprometidos"
    ]
  }
};

// Agregar IDs únicos a las vacunas de niños
export const calendarioNinosCompleto = Object.fromEntries(
  Object.entries(calendarioNinos).map(([key, value]) => [
    key,
    {
      ...value,
      vacunas: value.vacunas.map((vacuna, index) => ({
        ...vacuna,
        id: `${key}_${index}`,
        esquemaCompleto: vacuna.dosis,
        prioridad: "alta"
      }))
    }
  ])
);

// Función para obtener todas las vacunas esperadas hasta cierta edad
export const getVacunasEsperadasHastaEdad = (edadEnMeses) => {
  const vacunasEsperadas = [];
  
  const edades = [
    { key: 'recien_nacido', meses: 0 },
    { key: '2_meses', meses: 2 },
    { key: '4_meses', meses: 4 },
    { key: '6_meses', meses: 6 },
    { key: '12_meses', meses: 12 },
    { key: '15_meses', meses: 15 },
    { key: '15_18_meses', meses: 18 },
    { key: '18_meses', meses: 18 },
    { key: '5_6_anos', meses: 60 }, // 5 años
    { key: '11_anos', meses: 132 }, // 11 años
  ];

  edades.forEach(edad => {
    if (edad.meses <= edadEnMeses && calendarioNinosCompleto[edad.key]) {
      calendarioNinosCompleto[edad.key].vacunas.forEach(vacuna => {
        vacunasEsperadas.push({
          ...vacuna,
          edadAplicacion: edad.key,
          edadNombre: calendarioNinosCompleto[edad.key].nombre
        });
      });
    }
  });

  return vacunasEsperadas;
};

// Función para calcular vacunas faltantes
export const calcularVacunasFaltantes = (edadEnMeses, vacunasAplicadas = []) => {
  const vacunasEsperadas = getVacunasEsperadasHastaEdad(edadEnMeses);
  const idsAplicadas = new Set(vacunasAplicadas);
  
  return vacunasEsperadas.filter(vacuna => !idsAplicadas.has(vacuna.id));
};