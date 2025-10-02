# 📋 Instrucciones de Integración con Google Sheets

## ✅ Configuración Completada

La aplicación ahora está conectada a Google Sheets y todos los datos de pacientes se almacenan en la nube.

**URL del Script:** `https://script.google.com/macros/s/AKfycbxVHLSZJhJnQ_0Wv_hVlulscRknIAoDvNoQeW5aKuhcoYdMhTCMq6oLx3Fm3Pd5iNEr/exec`

---

## 📊 Estructura de Google Sheets

Tu hoja debe tener estas columnas en la **fila 1** (exactamente como se muestra):

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| id | nombre | dni | obraSocial | nroAfiliado | domicilio | localidad | telefono | fechaDesde | fechaHasta | gpsLink | visitasMedMensual | intervaloVisitas | observaciones |

### Descripción de campos:

- **id**: Número único de identificación (se genera automáticamente)
- **nombre**: Nombre completo del paciente
- **dni**: Documento de identidad
- **obraSocial**: Obra social del paciente
- **nroAfiliado**: Número de afiliado
- **domicilio**: Dirección completa
- **localidad**: Ciudad/Barrio
- **telefono**: Número de contacto
- **fechaDesde**: Fecha inicio del tratamiento
- **fechaHasta**: Fecha fin del tratamiento
- **gpsLink**: Link de Google Maps con coordenadas
- **visitasMedMensual**: Cantidad de visitas médicas mensuales
- **intervaloVisitas**: Intervalo de días para recordatorios (ej: 15)
- **observaciones**: Notas adicionales

---

## 🚀 Cómo Funciona

### Agregar Paciente desde la App
1. Haz clic en "➕ Agregar Paciente"
2. Completa el formulario
3. Los datos se guardan automáticamente en Google Sheets

### Editar Paciente
1. Haz clic en el botón "✏️" del paciente
2. Modifica los datos
3. Se actualiza automáticamente en Google Sheets

### Eliminar Paciente
1. Haz clic en el botón "🗑️" del paciente
2. Confirma la eliminación
3. Se borra de Google Sheets

### Agregar Paciente Manualmente en Google Sheets
1. Abre tu Google Sheet
2. Agrega una nueva fila con todos los datos
3. **IMPORTANTE:** Deja el campo `id` vacío o con el siguiente número disponible
4. Recarga la app para ver los cambios

---

## 🔄 Sincronización

- **Lectura**: La app carga los datos de Google Sheets cada vez que se abre
- **Escritura**: Cada cambio (agregar, editar, eliminar) se sincroniza inmediatamente
- **Recargar**: Usa el botón "🔄 Reintentar" si hay errores de conexión

---

## ⚠️ Notas Importantes

1. **No cambies los nombres de las columnas** en la fila 1 de Google Sheets
2. **No elimines la fila 1** (encabezados)
3. El campo `id` debe ser numérico y único
4. Los recordatorios (visitasProgramadas) aún se guardan en localStorage
5. Asegúrate de que la hoja se llame "Hoja 1" (o actualiza el código del script)

---

## 🔧 Actualizar URL del Script

Si necesitas republicar el script de Google Apps:

1. Abre el archivo: `src/services/googleSheetsService.js`
2. Cambia la constante `GOOGLE_SCRIPT_URL` con la nueva URL
3. Guarda el archivo

---

## 🐛 Solución de Problemas

### Error: "Error al cargar pacientes desde Google Sheets"
- Verifica que la URL del script sea correcta
- Revisa que el script esté publicado como "Cualquier persona" puede acceder
- Asegúrate de tener conexión a internet

### Los datos no se actualizan
- Verifica que las columnas en Google Sheets coincidan exactamente con las especificadas
- Revisa la consola del navegador (F12) para ver errores específicos

### Error de permisos
- Vuelve a publicar el script y autoriza los permisos necesarios

---

## 📝 Ejemplo de Datos

```
id | nombre              | dni      | obraSocial | nroAfiliado | domicilio          | localidad | telefono   | fechaDesde | fechaHasta | gpsLink | visitasMedMensual | intervaloVisitas | observaciones
1  | TAPIA ELIRA EMILIA  | 12345678 | OSDE      | 123456      | Calle Falsa 123    | Rawson    | 2645551234 | 2024-01-01 | 2024-12-31 | https://maps.google.com/?q=-31.5375,-68.5364 | 2 | 15 | Paciente con movilidad reducida
2  | PEREZ JUAN CARLOS   | 87654321 | OSPESA    | 789012      | Av. Libertador 456 | Chimbas   | 2645559876 | 2024-02-01 | 2024-11-30 | https://maps.google.com/?q=-31.4691,-68.5317 | 4 | 7  | Requiere asistencia
```

---

✅ **Sistema integrado exitosamente**
