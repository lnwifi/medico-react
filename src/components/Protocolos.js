import React, { useState } from 'react';

const Protocolos = () => {
  const [protocoloActivo, setProtocoloActivo] = useState(null);

  const protocolos = {
    asma: {
      titulo: '🫁 Crisis Asmática',
      descripcion: 'Protocolo escalonado para manejo de asma aguda',
      pasos: [
        {
          titulo: 'Evaluación Inicial',
          contenido: ['Evaluar severidad', 'Saturación de oxígeno', 'Estado general']
        },
        {
          titulo: 'Tratamiento Primera Línea',
          contenido: ['Salbutamol nebulizado', 'Prednisolona oral', 'Oxígeno si sat <92%']
        },
        {
          titulo: 'Segunda Línea',
          contenido: ['Bromuro de ipratropio', 'Considerar aminofilina', 'Derivar si no mejora']
        }
      ]
    },
    convulsiones: {
      titulo: '⚡ Convulsiones Febriles',
      descripcion: 'Manejo inmediato de convulsiones en pediatría',
      pasos: [
        {
          titulo: 'Medidas Inmediatas',
          contenido: ['Posición lateral de seguridad', 'No introducir objetos', 'Cronometrar duración']
        },
        {
          titulo: 'Tratamiento >5 minutos',
          contenido: ['Diazepam 0.3mg/kg IV/rectal', 'Control temperatura', 'Oxígeno']
        }
      ]
    },
    deshidratacion: {
      titulo: '💧 Deshidratación',
      descripcion: 'Evaluación y tratamiento de deshidratación',
      pasos: [
        {
          titulo: 'Evaluación',
          contenido: ['Signos clínicos', 'Grado de deshidratación', 'Estado general']
        },
        {
          titulo: 'Tratamiento',
          contenido: ['SRO según grado', 'Fluidos IV si severa', 'Monitoreo estrecho']
        }
      ]
    },
    fiebre: {
      titulo: '🌡️ Manejo de Fiebre',
      descripción: 'Protocolo según edad y temperatura',
      pasos: [
        {
          titulo: 'Evaluación',
          contenido: ['Temperatura', 'Edad del paciente', 'Estado general']
        },
        {
          titulo: 'Tratamiento',
          contenido: ['Paracetamol/Ibuprofeno', 'Medidas físicas', 'Hidratación']
        }
      ]
    }
  };

  const mostrarProtocolo = (tipo) => {
    setProtocoloActivo(tipo);
  };

  const cerrarProtocolo = () => {
    setProtocoloActivo(null);
  };

  return (
    <section className="section active">
      <div className="container">
        <div className="section-header">
          <h2>📋 Protocolos de Tratamiento</h2>
          <p>Protocolos escalonados para emergencias comunes</p>
        </div>

        {!protocoloActivo ? (
          <div className="protocolos-grid">
            {Object.entries(protocolos).map(([key, protocolo]) => (
              <div 
                key={key} 
                className="protocolo-card" 
                onClick={() => mostrarProtocolo(key)}
              >
                <h3>{protocolo.titulo}</h3>
                <p>{protocolo.descripcion}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="protocolo-detalle">
            <h3>
              {protocolos[protocoloActivo].titulo}
              <button className="btn-cerrar" onClick={cerrarProtocolo}>
                ✕ Cerrar
              </button>
            </h3>
            
            {protocolos[protocoloActivo].pasos.map((paso, index) => (
              <div key={index} className="paso">
                <h4>{paso.titulo}</h4>
                <ul>
                  {paso.contenido.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Protocolos;