import React, { useState } from 'react';

const Diagnosticos = () => {
  const [sintomas, setSintomas] = useState('');
  const [edadDiagnostico, setEdadDiagnostico] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarDiagnosticos = () => {
    // Lógica simplificada de búsqueda
    const diagnosticosMock = [
      {
        nombre: 'Infección Respiratoria Alta',
        prioridad: 'media',
        sintomas: 'fiebre, tos, rinorrea',
        descripcion: 'Proceso infeccioso de las vías respiratorias superiores'
      },
      {
        nombre: 'Gastroenteritis Aguda',
        prioridad: 'alta',
        sintomas: 'vómitos, diarrea, dolor abdominal',
        descripcion: 'Inflamación del tracto gastrointestinal'
      }
    ];

    setResultados(diagnosticosMock);
  };

  return (
    <section className="section active">
      <div className="container">
        <div className="section-header">
          <h2>🔍 Búsqueda de Diagnósticos</h2>
          <p>Buscar diagnósticos por síntomas y signos</p>
        </div>

        <div className="search-form">
          <div className="form-group">
            <label htmlFor="sintomas">Síntomas principales:</label>
            <input 
              type="text" 
              id="sintomas" 
              placeholder="Ej: fiebre, tos, dificultad respiratoria"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad-diagnostico">Grupo etario:</label>
            <select 
              id="edad-diagnostico"
              value={edadDiagnostico}
              onChange={(e) => setEdadDiagnostico(e.target.value)}
            >
              <option value="">Todas las edades</option>
              <option value="recien-nacido">Recién nacido (0-28 días)</option>
              <option value="lactante">Lactante (1-24 meses)</option>
              <option value="preescolar">Preescolar (2-5 años)</option>
              <option value="escolar">Escolar (6-12 años)</option>
              <option value="adolescente">Adolescente (13-18 años)</option>
            </select>
          </div>

          <button type="button" className="btn-primary" onClick={buscarDiagnosticos}>
            Buscar Diagnósticos
          </button>
        </div>

        <div className="resultados-container">
          {resultados.map((diagnostico, index) => (
            <div key={index} className={`diagnostico-item ${diagnostico.prioridad}`}>
              <h4>{diagnostico.nombre}</h4>
              <p>{diagnostico.descripcion}</p>
              <div className="diagnostico-sintomas">
                <strong>Síntomas asociados:</strong> {diagnostico.sintomas}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diagnosticos;