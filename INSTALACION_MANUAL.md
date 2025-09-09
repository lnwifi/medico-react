# 📱 Instalación Manual de PediaEmergencias PWA

Si no aparece automáticamente el prompt de instalación, puedes instalar manualmente:

## 🤖 Android (Chrome/Edge)

### Método 1: Menú de Chrome
1. Abre la app en **Chrome**
2. Toca los **3 puntos** (menú) en la esquina superior derecha
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar aplicación"**
4. Confirma la instalación

### Método 2: Desde configuración
1. Chrome → **Configuración** → **Sitios web avanzados** 
2. Busca tu sitio → **"Agregar a pantalla de inicio"**

### Método 3: Barra de direcciones
1. En la barra de direcciones, busca el **ícono de instalación** (cuadrado con flecha)
2. Tócalo para instalar

## 🍎 iOS (Safari)

### Usando Safari (OBLIGATORIO en iOS)
1. Abre la app en **Safari** (no Chrome)
2. Toca el botón **"Compartir"** (cuadrado con flecha hacia arriba)
3. Desplázate hacia abajo y toca **"Agregar a pantalla de inicio"**
4. Edita el nombre si quieres
5. Toca **"Agregar"**

**⚠️ Nota**: En iOS solo funciona con Safari, no con Chrome

## 💻 Windows (Edge/Chrome)

### Edge:
1. Haz clic en los **3 puntos** (menú)
2. Selecciona **"Aplicaciones"** → **"Instalar este sitio como una aplicación"**
3. Confirma el nombre y ubicación

### Chrome:
1. Busca el **ícono de instalación** en la barra de direcciones (computadora con flecha hacia abajo)
2. O **3 puntos** → **"Más herramientas"** → **"Crear acceso directo..."**
3. Marca **"Abrir como ventana"** para experiencia de app

## 🖥️ macOS (Safari/Chrome)

### Safari:
1. **Safari** → **Archivo** → **"Agregar al Dock"**
2. O usar **Compartir** → **"Agregar al Dock"**

### Chrome:
1. **3 puntos** → **"Más herramientas"** → **"Crear acceso directo"**
2. Marcar **"Abrir como ventana"**

## 🔧 Solución de Problemas

### Si no aparece la opción de instalar:

1. **Verifica HTTPS**: La PWA debe servirse desde HTTPS (o localhost)
2. **Usa el servidor correcto**: 
   ```bash
   npx serve -s build -l 3002
   ```
3. **Limpia caché**: Ctrl+F5 o Cmd+R
4. **Verifica manifest**: Abre DevTools → Application → Manifest

### Para desarrolladores - Forzar prompt:

1. **DevTools** → **Console**
2. Ejecuta:
   ```javascript
   // Simular evento de instalación
   window.dispatchEvent(new Event('beforeinstallprompt'));
   ```

### Verificar PWA:

1. **DevTools** → **Application** → **Manifest**
2. Debería mostrar el manifest.json sin errores
3. **Service Workers** → Debería estar registrado

## ✅ Verificación de Instalación Exitosa

Una vez instalada correctamente:

- **Android**: Aparece como app en el drawer de aplicaciones
- **iOS**: Ícono en pantalla de inicio (como app nativa)
- **Windows**: App en menú inicio y barra de tareas
- **macOS**: App en Dock y Launchpad

### Características después de instalar:
- 🚀 Inicia como app independiente
- 📱 Sin barra de direcciones del navegador
- 📶 Funciona offline
- 🔔 Puede enviar notificaciones (si implementado)
- 🎨 Ícono personalizado en el dispositivo

## 🌐 URLs para probar:

- **Desarrollo**: http://localhost:3000
- **Producción**: http://localhost:51568 (tu servidor actual)

## 🆘 Si nada funciona:

1. **Verifica requisitos PWA**:
   - ✅ HTTPS (o localhost)
   - ✅ Manifest.json válido
   - ✅ Service Worker registrado
   - ✅ Al menos un ícono 192x192

2. **Herramientas de diagnóstico**:
   - Chrome DevTools → Lighthouse → PWA audit
   - Edge DevTools → Application → Progressive Web App

3. **Alternativa manual**:
   - Crear acceso directo del navegador
   - Configurar para abrir como ventana
   - Aunque no sea PWA completa, funcionará similar