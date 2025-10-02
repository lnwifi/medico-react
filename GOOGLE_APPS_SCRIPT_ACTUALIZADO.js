// ⚠️ IMPORTANTE: Copia este código completo y pégalo en tu Google Apps Script
// Reemplaza TODO el código anterior

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const pacientes = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
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
      // Agregar nuevo paciente
      const newId = getNextId(sheet);
      sheet.appendRow([
        newId,
        data.nombre || '',
        data.dni || '',
        data.obraSocial || '',
        data.nroAfiliado || '',
        data.domicilio || '',
        data.localidad || '',
        data.telefono || '',
        data.fechaDesde || '',
        data.fechaHasta || '',
        data.gpsLink || '',
        data.visitasMedMensual || '',
        data.intervaloVisitas || '',
        data.observaciones || ''
      ]);
      return ContentService.createTextOutput(JSON.stringify({ success: true, id: newId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'update') {
      // Actualizar paciente existente
      const allData = sheet.getDataRange().getValues();
      const rowIndex = allData.findIndex(row => row[0] == data.id);

      if (rowIndex > 0) {
        sheet.getRange(rowIndex + 1, 1, 1, 14).setValues([[
          data.id,
          data.nombre || '',
          data.dni || '',
          data.obraSocial || '',
          data.nroAfiliado || '',
          data.domicilio || '',
          data.localidad || '',
          data.telefono || '',
          data.fechaDesde || '',
          data.fechaHasta || '',
          data.gpsLink || '',
          data.visitasMedMensual || '',
          data.intervaloVisitas || '',
          data.observaciones || ''
        ]]);
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
