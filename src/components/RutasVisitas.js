import React, { useState, useEffect } from 'react';
import { googleSheetsService } from '../services/googleSheetsService';

function RutasVisitas() {
  console.log('RutasVisitas renderizando...');
  const [pacientes, setPacientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    obraSocial: '',
    nroAfiliado: '',
    domicilio: '',
    localidad: '',
    telefono: '',
    fechaDesde: '',
    fechaHasta: '',
    gpsLink: '',
    visitasMedMensual: '',
    intervaloVisitas: '',
    observaciones: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [rutaOptimizada, setRutaOptimizada] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [vistaAgrupada, setVistaAgrupada] = useState(true);
  const [visitasRealizadas, setVisitasRealizadas] = useState({});
  const [pacientesSeleccionados, setPacientesSeleccionados] = useState([]);
  const [ubicacionActual, setUbicacionActual] = useState(null);
  const [obteniendoUbicacion, setObteniendoUbicacion] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [visitasProgramadas, setVisitasProgramadas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar pacientes desde Google Sheets al inicio
  useEffect(() => {
    cargarPacientes();
    const visitasGuardadas = localStorage.getItem('visitasRealizadas');
    if (visitasGuardadas) {
      setVisitasRealizadas(JSON.parse(visitasGuardadas));
    }
    const programadasGuardadas = localStorage.getItem('visitasProgramadas');
    if (programadasGuardadas) {
      setVisitasProgramadas(JSON.parse(programadasGuardadas));
    }
  }, []);

  const cargarPacientes = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await googleSheetsService.obtenerPacientes();
      setPacientes(data);
      // Verificar recordatorios con los datos recién cargados
      verificarRecordatoriosConDatos(data);
    } catch (err) {
      setError('Error al cargar pacientes desde Google Sheets');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('visitasRealizadas', JSON.stringify(visitasRealizadas));
  }, [visitasRealizadas]);

  useEffect(() => {
    localStorage.setItem('visitasProgramadas', JSON.stringify(visitasProgramadas));
  }, [visitasProgramadas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const agregarPaciente = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (editingId !== null) {
        // Actualizar paciente existente
        await googleSheetsService.actualizarPaciente({ ...formData, id: editingId });
        setEditingId(null);
      } else {
        // Agregar nuevo paciente
        const result = await googleSheetsService.agregarPaciente(formData);

        // Programar próxima visita si tiene intervalo
        if (formData.intervaloVisitas && result.id) {
          programarProximaVisita(result.id, formData.intervaloVisitas);
        }
      }

      // Recargar lista de pacientes
      await cargarPacientes();

      setFormData({
        nombre: '', dni: '', obraSocial: '', nroAfiliado: '', domicilio: '',
        localidad: '', telefono: '', fechaDesde: '', fechaHasta: '', gpsLink: '',
        visitasMedMensual: '', intervaloVisitas: '', observaciones: ''
      });
      setShowForm(false);
    } catch (err) {
      alert('Error al guardar paciente: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const editarPaciente = (paciente) => {
    setFormData(paciente);
    setEditingId(paciente.id);
    setShowForm(true);
  };

  const eliminarPaciente = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      setCargando(true);
      try {
        await googleSheetsService.eliminarPaciente(id);
        await cargarPacientes();
      } catch (err) {
        alert('Error al eliminar paciente: ' + err.message);
      } finally {
        setCargando(false);
      }
    }
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const extraerCoordenadas = (gpsLink) => {
    try {
      if (!gpsLink) return null;

      // Verificar si es un enlace acortado (goo.gl o maps.app.goo.gl)
      if (gpsLink.includes('goo.gl') || gpsLink.includes('maps.app.goo.gl')) {
        alert('⚠️ Por favor, usa el enlace completo de Google Maps en lugar del enlace acortado.\n\n1. Abre el enlace en el navegador\n2. Copia la URL completa de la barra de direcciones\n3. Pégala en el campo GPS');
        return null;
      }

      // Patrones para diferentes formatos de Google Maps
      const patterns = [
        /q=(-?\d+\.?\d*),(-?\d+\.?\d*)/,           // ?q=lat,lng
        /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,            // @lat,lng
        /ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/,          // ll=lat,lng
        /3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/,         // 3dlat!4dlng
        /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/,        // !3dlat!4dlng
        /8m2!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/      // 8m2!3dlat!4dlng
      ];

      for (let pattern of patterns) {
        const match = gpsLink.match(pattern);
        if (match) {
          return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2])
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error extrayendo coordenadas:', error);
      return null;
    }
  };

  const toggleSeleccionPaciente = (pacienteId) => {
    setPacientesSeleccionados(prev => {
      if (prev.includes(pacienteId)) {
        return prev.filter(id => id !== pacienteId);
      } else {
        return [...prev, pacienteId];
      }
    });
  };

  const seleccionarTodos = () => {
    setPacientesSeleccionados(pacientes.map(p => p.id));
  };

  const deseleccionarTodos = () => {
    setPacientesSeleccionados([]);
  };

  const calcularRutaConUbicacion = (ubicacion) => {
    const pacientesAVisitar = pacientes.filter(p => pacientesSeleccionados.includes(p.id));
    const pacientesConGPS = pacientesAVisitar.map(p => ({ ...p, coords: extraerCoordenadas(p.gpsLink) })).filter(p => p.coords !== null);

    if (pacientesConGPS.length === 0) {
      alert('❌ Ninguno de los pacientes seleccionados tiene ubicación GPS válida');
      return;
    }

    const noVisitados = [...pacientesConGPS];
    const rutaOrdenada = [];
    let actual = ubicacion;
    let distanciaTotal = 0;

    while (noVisitados.length > 0) {
      let indiceMasCercano = 0;
      let distanciaMinima = Infinity;
      for (let i = 0; i < noVisitados.length; i++) {
        const distancia = calcularDistancia(actual.lat, actual.lng, noVisitados[i].coords.lat, noVisitados[i].coords.lng);
        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          indiceMasCercano = i;
        }
      }
      const pacienteMasCercano = noVisitados[indiceMasCercano];
      rutaOrdenada.push({ ...pacienteMasCercano, distanciaDesdeAnterior: distanciaMinima });
      distanciaTotal += distanciaMinima;
      actual = pacienteMasCercano.coords;
      noVisitados.splice(indiceMasCercano, 1);
    }

    setRutaOptimizada({
      pacientes: rutaOrdenada,
      distanciaTotal: distanciaTotal.toFixed(2),
      combustibleEstimado: (distanciaTotal / 12).toFixed(2),
      puntoInicio: ubicacion
    });
  };

  const optimizarRuta = () => {
    if (pacientesSeleccionados.length === 0) {
      alert('⚠️ Selecciona al menos un paciente para optimizar la ruta');
      return;
    }

    setObteniendoUbicacion(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const ubicacion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUbicacionActual(ubicacion);
          setObteniendoUbicacion(false);
          calcularRutaConUbicacion(ubicacion);
        },
        (error) => {
          setObteniendoUbicacion(false);
          const ubicacionPorDefecto = { lat: -31.4691, lng: -68.5317 };
          setUbicacionActual(ubicacionPorDefecto);
          alert('⚠️ No se pudo obtener tu ubicación GPS. Usando ubicación por defecto (Villa Observatorio, Chimbas).');
          calcularRutaConUbicacion(ubicacionPorDefecto);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setObteniendoUbicacion(false);
      const ubicacionPorDefecto = { lat: -31.4691, lng: -68.5317 };
      setUbicacionActual(ubicacionPorDefecto);
      alert('⚠️ Tu navegador no soporta geolocalización. Usando ubicación por defecto (Villa Observatorio, Chimbas).');
      calcularRutaConUbicacion(ubicacionPorDefecto);
    }
  };

  const abrirEnGoogleMaps = (gpsLink) => {
    if (gpsLink) window.open(gpsLink, '_blank');
  };

  const generarRutaCompleta = () => {
    if (rutaOptimizada && rutaOptimizada.pacientes && rutaOptimizada.pacientes.length > 0) {
      const inicio = rutaOptimizada.puntoInicio;
      const puntos = [inicio, ...rutaOptimizada.pacientes.map(p => p.coords)];
      const waypoints = puntos.map(p => `${p.lat},${p.lng}`).join('/');
      window.open(`https://www.google.com/maps/dir/${waypoints}`, '_blank');
    }
  };

  const calcularVisitasPorSemana = (paciente) => {
    const visitas = [];
    if (paciente.visitasMedMensual) visitas.push(`Médico: ${paciente.visitasMedMensual} visitas/mes`);
    return visitas.join(' | ');
  };

  const agruparPorLocalidad = () => {
    const grupos = {};
    const pacientesFiltrados = filtrarPacientes();
    pacientesFiltrados.forEach(paciente => {
      const localidad = paciente.localidad.toUpperCase();
      if (!grupos[localidad]) {
        grupos[localidad] = [];
      }
      grupos[localidad].push(paciente);
    });
    return grupos;
  };

  const toggleVisitaRealizada = (pacienteId) => {
    const hoy = new Date().toISOString().split('T')[0];
    const key = `${pacienteId}-${hoy}`;
    setVisitasRealizadas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const estaVisitado = (pacienteId) => {
    const hoy = new Date().toISOString().split('T')[0];
    const key = `${pacienteId}-${hoy}`;
    return visitasRealizadas[key] || false;
  };

  const programarProximaVisita = (pacienteId, diasIntervalo) => {
    const hoy = new Date();
    const proximaVisita = new Date(hoy);
    proximaVisita.setDate(proximaVisita.getDate() + parseInt(diasIntervalo));

    setVisitasProgramadas(prev => ({
      ...prev,
      [pacienteId]: {
        fecha: proximaVisita.toISOString().split('T')[0],
        diasIntervalo: parseInt(diasIntervalo)
      }
    }));
  };

  // Función auxiliar que recibe los pacientes como parámetro
  const verificarRecordatoriosConDatos = (pacientesData) => {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    const mananaStr = manana.toISOString().split('T')[0];

    const programadas = JSON.parse(localStorage.getItem('visitasProgramadas') || '{}');

    const recordatoriosHoy = [];
    const recordatoriosManana = [];

    Object.keys(programadas).forEach(pacienteId => {
      const visita = programadas[pacienteId];
      const paciente = pacientesData.find(p => p.id === parseInt(pacienteId));

      if (paciente) {
        if (visita.fecha === hoyStr) {
          recordatoriosHoy.push(paciente.nombre);
        } else if (visita.fecha === mananaStr) {
          recordatoriosManana.push(paciente.nombre);
        }
      }
    });

    let mensaje = '';

    if (recordatoriosHoy.length > 0) {
      mensaje += `🔔 VISITAS PROGRAMADAS PARA HOY:\n\n${recordatoriosHoy.join('\n')}`;
    }

    if (recordatoriosManana.length > 0) {
      if (mensaje) mensaje += '\n\n';
      mensaje += `⏰ RECORDATORIO - Visitas para MAÑANA:\n\n${recordatoriosManana.join('\n')}`;
    }

    if (mensaje) {
      alert(mensaje);
    }
  };

  // Función que usa el estado actual de pacientes
  const verificarRecordatorios = () => {
    verificarRecordatoriosConDatos(pacientes);
  };

  const filtrarPacientes = () => {
    if (!busqueda.trim()) return pacientes;

    const busquedaLower = busqueda.toLowerCase();
    return pacientes.filter(p =>
      p.nombre.toLowerCase().includes(busquedaLower) ||
      p.dni.includes(busqueda) ||
      p.domicilio.toLowerCase().includes(busquedaLower) ||
      p.localidad.toLowerCase().includes(busquedaLower) ||
      p.telefono.includes(busqueda)
    );
  };

  const necesitaVisitaHoy = (pacienteId) => {
    const hoy = new Date().toISOString().split('T')[0];
    const visita = visitasProgramadas[pacienteId];
    return visita && visita.fecha === hoy;
  };

  const necesitaVisitaManana = (pacienteId) => {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    const mananaStr = manana.toISOString().split('T')[0];
    const visita = visitasProgramadas[pacienteId];
    return visita && visita.fecha === mananaStr;
  };

  return (
    <div className="section" style={{ backgroundColor: 'white', padding: '20px', minHeight: '500px', color: 'black' }}>
      <h2 style={{ color: 'black', fontSize: '24px' }}>🗺️ Rutas de Visitas Médicas a Domicilio</h2>

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #ef5350'
        }}>
          ⚠️ {error}
          <button
            onClick={cargarPacientes}
            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
          >
            🔄 Reintentar
          </button>
        </div>
      )}

      {cargando && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          fontSize: '18px',
          color: '#666'
        }}>
          ⏳ Cargando datos desde Google Sheets...
        </div>
      )}

      <div className="rutas-container">
        <div className="rutas-header">
          <button className="btn-primary" onClick={() => setShowForm(!showForm)} disabled={cargando}>
            {showForm ? '❌ Cancelar' : '➕ Agregar Paciente'}
          </button>
          {pacientes.length > 0 && (
            <button
              className="btn-secondary"
              onClick={optimizarRuta}
              disabled={pacientesSeleccionados.length === 0 || obteniendoUbicacion || cargando}
            >
              {obteniendoUbicacion ? '⏳ Obteniendo ubicación...' : `🎯 Optimizar Ruta (${pacientesSeleccionados.length})`}
            </button>
          )}
        </div>

        {pacientes.length > 0 && (
          <>
            <div className="buscador-container">
              <input
                type="text"
                placeholder="🔍 Buscar paciente por nombre, DNI, domicilio, localidad o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-buscador"
              />
              {busqueda && (
                <button className="btn-limpiar-busqueda" onClick={() => setBusqueda('')}>
                  ✖️
                </button>
              )}
            </div>

            <div className="seleccion-controles">
              <button className="btn-seleccion" onClick={seleccionarTodos}>
                ✅ Seleccionar Todos
              </button>
              <button className="btn-seleccion" onClick={deseleccionarTodos}>
                ❌ Deseleccionar Todos
              </button>
              <span className="contador-seleccion">
                {pacientesSeleccionados.length} de {filtrarPacientes().length} seleccionados
              </span>
            </div>
          </>
        )}

        {showForm && (
          <div className="form-paciente">
            <h3>{editingId ? 'Editar Paciente' : 'Nuevo Paciente'}</h3>
            <form onSubmit={agregarPaciente}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="TAPIA ELIRA EMILIA" />
                </div>
                <div className="form-group">
                  <label>DNI *</label>
                  <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} required placeholder="3331085" />
                </div>
                <div className="form-group">
                  <label>Obra Social *</label>
                  <input type="text" name="obraSocial" value={formData.obraSocial} onChange={handleInputChange} required placeholder="PAMI" />
                </div>
                <div className="form-group">
                  <label>N° Afiliado</label>
                  <input type="text" name="nroAfiliado" value={formData.nroAfiliado} onChange={handleInputChange} placeholder="150203797600/00" />
                </div>
                <div className="form-group">
                  <label>Domicilio *</label>
                  <input type="text" name="domicilio" value={formData.domicilio} onChange={handleInputChange} required placeholder="RICARDO GUIRALDES SUR 1817" />
                </div>
                <div className="form-group">
                  <label>Localidad *</label>
                  <input type="text" name="localidad" value={formData.localidad} onChange={handleInputChange} required placeholder="RAWSON" />
                </div>
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="2644567630" />
                </div>
                <div className="form-group">
                  <label>Link GPS *</label>
                  <input type="text" name="gpsLink" value={formData.gpsLink} onChange={handleInputChange} required placeholder="https://maps.google.com/?q=-31.5375,-68.5364" />
                </div>
                <div className="form-group">
                  <label>Desde</label>
                  <input type="date" name="fechaDesde" value={formData.fechaDesde} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Hasta</label>
                  <input type="date" name="fechaHasta" value={formData.fechaHasta} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Visitas Médico (mensual)</label>
                  <input type="number" name="visitasMedMensual" value={formData.visitasMedMensual} onChange={handleInputChange} placeholder="2" />
                </div>
                <div className="form-group">
                  <label>🔔 Recordatorio cada (días)</label>
                  <input type="number" name="intervaloVisitas" value={formData.intervaloVisitas} onChange={handleInputChange} placeholder="15" title="Ejemplo: 15 días para visitas quincenales" />
                  <small style={{fontSize: '0.85em', color: '#666', marginTop: '4px'}}>Ej: 7 (semanal), 15 (quincenal), 30 (mensual)</small>
                </div>
                <div className="form-group full-width">
                  <label>Observaciones</label>
                  <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} rows="3" placeholder="Notas adicionales..." />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingId ? '✅ Guardar Cambios' : '➕ Agregar Paciente'}</button>
                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ nombre: '', dni: '', obraSocial: '', nroAfiliado: '', domicilio: '', localidad: '', telefono: '', fechaDesde: '', fechaHasta: '', gpsLink: '', visitasMedMensual: '', intervaloVisitas: '', observaciones: '' }); }}>Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {rutaOptimizada && rutaOptimizada.pacientes && rutaOptimizada.pacientes.length > 0 && (
          <div className="ruta-optimizada">
            <h3>🎯 Ruta Optimizada desde tu Ubicación</h3>
            <div className="punto-inicio">
              <strong>📍 Punto de inicio:</strong>
              <span> {rutaOptimizada.puntoInicio.lat.toFixed(4)}, {rutaOptimizada.puntoInicio.lng.toFixed(4)}</span>
            </div>
            <div className="resumen-ruta">
              <div className="stat-item">
                <span className="stat-label">Distancia Total:</span>
                <span className="stat-value">{rutaOptimizada.distanciaTotal} km</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Combustible Estimado:</span>
                <span className="stat-value">{rutaOptimizada.combustibleEstimado} litros</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pacientes:</span>
                <span className="stat-value">{rutaOptimizada.pacientes.length}</span>
              </div>
            </div>
            <button className="btn-primary btn-mapa" onClick={generarRutaCompleta}>🗺️ Abrir Ruta Completa en Google Maps</button>
            <div className="lista-ruta">
              {rutaOptimizada.pacientes.map((paciente, index) => (
                <div key={paciente.id} className="item-ruta">
                  <div className="numero-orden">{index + 1}</div>
                  <div className="info-ruta">
                    <h4>{paciente.nombre}</h4>
                    <p className="domicilio-ruta">📍 {paciente.domicilio}, {paciente.localidad}</p>
                    <p className="distancia-ruta">🚗 {paciente.distanciaDesdeAnterior.toFixed(2)} km desde el punto anterior</p>
                    <p className="visitas-info">{calcularVisitasPorSemana(paciente)}</p>
                  </div>
                  <button className="btn-gps" onClick={() => abrirEnGoogleMaps(paciente.gpsLink)}>📍 GPS</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="lista-pacientes">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3>📋 Pacientes Registrados ({pacientes.length})</h3>
            <button
              className="btn-secondary"
              onClick={() => setVistaAgrupada(!vistaAgrupada)}
              style={{ padding: '10px 20px' }}
            >
              {vistaAgrupada ? '📋 Ver Lista' : '🏘️ Agrupar por Localidad'}
            </button>
          </div>

          {pacientes.length === 0 ? (
            <p className="empty-state">No hay pacientes registrados. Agregue el primero usando el botón de arriba.</p>
          ) : vistaAgrupada ? (
            // Vista agrupada por localidad
            <div>
              {Object.entries(agruparPorLocalidad()).map(([localidad, pacientesLocalidad]) => (
                <div key={localidad} className="grupo-localidad">
                  <h3 className="titulo-localidad">
                    🏘️ {localidad} ({pacientesLocalidad.length} paciente{pacientesLocalidad.length !== 1 ? 's' : ''})
                  </h3>
                  <div className="pacientes-grid">
                    {pacientesLocalidad.map(paciente => (
                      <div
                        key={paciente.id}
                        className={`paciente-card ${estaVisitado(paciente.id) ? 'visitado' : ''} ${pacientesSeleccionados.includes(paciente.id) ? 'seleccionado' : ''} ${necesitaVisitaHoy(paciente.id) ? 'necesita-visita' : ''} ${necesitaVisitaManana(paciente.id) ? 'necesita-visita-manana' : ''}`}
                        onClick={() => toggleSeleccionPaciente(paciente.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="paciente-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="checkbox"
                              checked={pacientesSeleccionados.includes(paciente.id)}
                              onChange={() => toggleSeleccionPaciente(paciente.id)}
                              onClick={(e) => e.stopPropagation()}
                              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            />
                            <h4>
                              {paciente.nombre}
                              {necesitaVisitaHoy(paciente.id) && <span className="badge-visita-hoy">🔔 Visita Hoy</span>}
                              {necesitaVisitaManana(paciente.id) && <span className="badge-visita-manana">⏰ Mañana</span>}
                            </h4>
                          </div>
                          <div className="paciente-actions">
                            <button
                              className="btn-icon"
                              onClick={(e) => { e.stopPropagation(); toggleVisitaRealizada(paciente.id); }}
                              title={estaVisitado(paciente.id) ? "Marcar como pendiente" : "Marcar como visitado"}
                            >
                              {estaVisitado(paciente.id) ? '✅' : '⬜'}
                            </button>
                            <button className="btn-icon" onClick={(e) => { e.stopPropagation(); editarPaciente(paciente); }} title="Editar">✏️</button>
                            <button className="btn-icon" onClick={(e) => { e.stopPropagation(); eliminarPaciente(paciente.id); }} title="Eliminar">🗑️</button>
                          </div>
                        </div>
                        <div className="paciente-info">
                          <p><strong>DNI:</strong> {paciente.dni}</p>
                          <p><strong>OS:</strong> {paciente.obraSocial} {paciente.nroAfiliado && `- ${paciente.nroAfiliado}`}</p>
                          <p><strong>📍 Domicilio:</strong> {paciente.domicilio}</p>
                          <p><strong>📞 Teléfono:</strong> {paciente.telefono}</p>
                          {(paciente.fechaDesde || paciente.fechaHasta) && (
                            <p><strong>Período:</strong> {paciente.fechaDesde} al {paciente.fechaHasta}</p>
                          )}
                          {calcularVisitasPorSemana(paciente) && (
                            <p className="visitas-programadas"><strong>Visitas:</strong> {calcularVisitasPorSemana(paciente)}</p>
                          )}
                          {paciente.observaciones && (
                            <p className="observaciones"><strong>Obs:</strong> {paciente.observaciones}</p>
                          )}
                        </div>
                        {paciente.gpsLink && (
                          <button className="btn-gps-card" onClick={() => abrirEnGoogleMaps(paciente.gpsLink)}>📍 Ver en Mapa</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Vista de lista normal
            <div className="pacientes-grid">
              {filtrarPacientes().map(paciente => (
                <div
                  key={paciente.id}
                  className={`paciente-card ${estaVisitado(paciente.id) ? 'visitado' : ''} ${pacientesSeleccionados.includes(paciente.id) ? 'seleccionado' : ''} ${necesitaVisitaHoy(paciente.id) ? 'necesita-visita' : ''} ${necesitaVisitaManana(paciente.id) ? 'necesita-visita-manana' : ''}`}
                  onClick={() => toggleSeleccionPaciente(paciente.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="paciente-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        checked={pacientesSeleccionados.includes(paciente.id)}
                        onChange={() => toggleSeleccionPaciente(paciente.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <h4>
                        {paciente.nombre}
                        {necesitaVisitaHoy(paciente.id) && <span className="badge-visita-hoy">🔔 Visita Hoy</span>}
                        {necesitaVisitaManana(paciente.id) && <span className="badge-visita-manana">⏰ Mañana</span>}
                      </h4>
                    </div>
                    <div className="paciente-actions">
                      <button
                        className="btn-icon"
                        onClick={(e) => { e.stopPropagation(); toggleVisitaRealizada(paciente.id); }}
                        title={estaVisitado(paciente.id) ? "Marcar como pendiente" : "Marcar como visitado"}
                      >
                        {estaVisitado(paciente.id) ? '✅' : '⬜'}
                      </button>
                      <button className="btn-icon" onClick={(e) => { e.stopPropagation(); editarPaciente(paciente); }} title="Editar">✏️</button>
                      <button className="btn-icon" onClick={(e) => { e.stopPropagation(); eliminarPaciente(paciente.id); }} title="Eliminar">🗑️</button>
                    </div>
                  </div>
                  <div className="paciente-info">
                    <p><strong>DNI:</strong> {paciente.dni}</p>
                    <p><strong>OS:</strong> {paciente.obraSocial} {paciente.nroAfiliado && `- ${paciente.nroAfiliado}`}</p>
                    <p><strong>📍 Domicilio:</strong> {paciente.domicilio}</p>
                    <p><strong>Localidad:</strong> {paciente.localidad}</p>
                    <p><strong>📞 Teléfono:</strong> {paciente.telefono}</p>
                    {(paciente.fechaDesde || paciente.fechaHasta) && (
                      <p><strong>Período:</strong> {paciente.fechaDesde} al {paciente.fechaHasta}</p>
                    )}
                    {calcularVisitasPorSemana(paciente) && (
                      <p className="visitas-programadas"><strong>Visitas:</strong> {calcularVisitasPorSemana(paciente)}</p>
                    )}
                    {paciente.observaciones && (
                      <p className="observaciones"><strong>Obs:</strong> {paciente.observaciones}</p>
                    )}
                  </div>
                  {paciente.gpsLink && (
                    <button className="btn-gps-card" onClick={() => abrirEnGoogleMaps(paciente.gpsLink)}>📍 Ver en Mapa</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RutasVisitas;
