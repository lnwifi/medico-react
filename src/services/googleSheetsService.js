const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVHLSZJhJnQ_0Wv_hVlulscRknIAoDvNoQeW5aKuhcoYdMhTCMq6oLx3Fm3Pd5iNEr/exec';

export const googleSheetsService = {
  // Obtener todos los pacientes
  async obtenerPacientes() {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      return data.pacientes || [];
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      throw error;
    }
  },

  // Agregar nuevo paciente
  async agregarPaciente(paciente) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'add',
          ...paciente
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar paciente:', error);
      throw error;
    }
  },

  // Actualizar paciente existente
  async actualizarPaciente(paciente) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'update',
          ...paciente
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      throw error;
    }
  },

  // Eliminar paciente
  async eliminarPaciente(id) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'delete',
          id: id
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      throw error;
    }
  }
};
