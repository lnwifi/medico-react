// ⚠️ IMPORTANTE: Copia este código completo y pégalo en tu Google Apps Script
// Reemplaza TODO el código anterior

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ pacientes: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = data[0];
  const rows = data.slice(1);

  const pacientes = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      // Limpiar espacios en blanco del header
      const cleanHeader = header.toString().trim();
      obj[cleanHeader] = row[index];
    });
    return obj;
  }).filter(p => p.id); // Filtrar filas vacías

  return ContentService.createTextOutput(JSON.stringify({ pacientes }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'add') {
      // Agregar nuevo paciente - ORDEN EXACTO según encabezados
      const newId = getNextId(sheet);
      const newRow = [
        newId,                          // A - id
        data.nombre || '',              // B - nombre
        data.dni || '',                 // C - dni
        data.obraSocial || '',          // D - obraSocial
        data.nroAfiliado || '',         // E - nroAfiliado
        data.domicilio || '',           // F - domicilio
        data.localidad || '',           // G - localidad
        data.telefono || '',            // H - telefono
        data.fechaDesde || '',          // I - fechaDesde
        data.fechaHasta || '',          // J - fechaHasta
        data.gpsLink || '',             // K - gpsLink
        data.visitasMedMensual || '',   // L - visitasMedMensual
        data.intervaloVisitas || '',    // M - intervaloVisitas
        data.observaciones || ''        // N - observaciones
      ];

      sheet.appendRow(newRow);

      return ContentService.createTextOutput(JSON.stringify({ success: true, id: newId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'update') {
      // Actualizar paciente existente
      const allData = sheet.getDataRange().getValues();
      const rowIndex = allData.findIndex(row => row[0] == data.id);

      if (rowIndex > 0) {
        const updatedRow = [
          data.id,                        // A - id
          data.nombre || '',              // B - nombre
          data.dni || '',                 // C - dni
          data.obraSocial || '',          // D - obraSocial
          data.nroAfiliado || '',         // E - nroAfiliado
          data.domicilio || '',           // F - domicilio
          data.localidad || '',           // G - localidad
          data.telefono || '',            // H - telefono
          data.fechaDesde || '',          // I - fechaDesde
          data.fechaHasta || '',          // J - fechaHasta
          data.gpsLink || '',             // K - gpsLink
          data.visitasMedMensual || '',   // L - visitasMedMensual
          data.intervaloVisitas || '',    // M - intervaloVisitas
          data.observaciones || ''        // N - observaciones
        ];

        sheet.getRange(rowIndex + 1, 1, 1, 14).setValues([updatedRow]);

        return ContentService.createTextOutput(JSON.stringify({ success: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    if (data.action === 'delete') {
      // Eliminar paciente
      const allData = sheet.getDataRange().getValues();
      const rowIndex = allData.findIndex(row => row[0] == data.id);

      if (rowIndex > 0) {
        sheet.deleteRow(rowIndex + 1);
        return ContentService.createTextOutput(JSON.stringify({ success: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getNextId(sheet) {
  const data = sheet.getDataRange().getValues();
  const ids = data.slice(1).map(row => row[0]).filter(id => id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}
