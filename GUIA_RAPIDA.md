# 🏥 VerbaDoc Salud - Guía Rápida

## ⚡ Inicio Rápido (5 minutos)

### 1. Sube tu Documento
📤 **Arrastra** tu archivo a la zona de carga (Columna izquierda)
- Formatos: PDF, JPG, PNG, TIFF

### 2. Selecciona una Plantilla
📋 **Panel derecho** → **"▼ Plantillas"** → Escoge tu especialidad
- General, Laboratorio, Cardiología, Traumatología, etc.
- 20+ plantillas médicas predefinidas

### 3. Ejecuta la Extracción
🚀 **Botón azul grande**: "Ejecutar Extracción"
- Espera 5-30 segundos
- Los datos aparecen abajo

### 4. Exporta los Resultados
💾 **Botones de exportación**:
- **Excel** (recomendado) → Análisis en Excel
- **CSV** → Google Sheets, importación
- **JSON** → Integración técnica

---

## 🎯 3 Columnas Principales

```
┌────────────────────────────────────────────┐
│  📄 DOCUMENTOS  │  ✏️ EDITOR  │  ⚙️ CONFIG  │
├────────────────────────────────────────────┤
│  Sube archivos  │  Visualiza  │  Modelos   │
│  Lista docs     │  Configura  │  Plantillas│
│                 │  Extrae     │  Mis Modelos│
└────────────────────────────────────────────┘
```

### Columna 1: Documentos
- ➕ Sube archivos (arrastra o click)
- 👁️ Vista previa
- 🗑️ Eliminar

### Columna 2: Editor
- 📄 Visor de documento
- ✏️ Prompt (instrucciones)
- 📊 Esquema (estructura)
- 🚀 Botón extraer
- 📊 Resultados

### Columna 3: Configuración
- **▼ Modelos IA**: Flash (rápido) o Pro (preciso)
- **▼ Plantillas**: Por especialidad médica
- **▶ Mis Modelos**: Tus plantillas guardadas
- ➕ Crear plantilla
- 💾 Guardar plantilla

---

## 🏥 Especialidades Disponibles

| Especialidad | Plantillas |
|-------------|------------|
| 📋 **General** | Recetas, Certificados, Consultas, Vacunación, Altas |
| 🔬 **Laboratorio** | Resultados analíticas, Hemogramas |
| ❤️ **Cardiología** | ECG, Ecocardiograma, Prueba de esfuerzo |
| 🦴 **Traumatología** | Informes traumatológicos |
| 👁️ **Oftalmología** | Exámenes visuales, Cirugía cataratas, Recetas lentes |
| 👶 **Pediatría** | Historia clínica pediátrica |
| ⚕️ **Cirugía** | Informes quirúrgicos |
| 📡 **Radiología** | TAC, Resonancias, Radiografías |

---

## 🔄 Procesamiento en Lote

¿Tienes 10, 50, 100 documentos del mismo tipo?

### Pasos:
1. ⬆️ **Sube todos los archivos** juntos
2. 🎯 **Configura con el primero** (plantilla + ajustes)
3. ✅ **Prueba con 1** para verificar
4. 🔄 **"Procesar Todos"** → Automatización completa
5. 💾 **Exporta** cada resultado a Excel

**Tiempo estimado**: 50 documentos en 5-10 minutos

---

## 💡 Consejos Rápidos

### ✅ DO (Haz esto)
- **Usa plantillas**: Ahorra tiempo
- **Prueba con 1 primero**: Antes de procesar 100
- **Gemini Flash**: Para documentos estándar (más rápido)
- **Guarda tus plantillas**: Reutiliza configuraciones
- **Exporta a Excel**: Mejor para análisis

### ❌ DON'T (Evita esto)
- No mezcles tipos de documentos en un lote
- No uses prompts vagos ("dame todo")
- No proceses sin probar primero
- No olvides exportar resultados

---

## 🎓 Prompts Efectivos

### ❌ Mal Prompt
```
"Extrae los datos"
"Dame la información"
```

### ✅ Buen Prompt
```
"Extrae el nombre completo del paciente, DNI, fecha de consulta,
diagnóstico principal, tratamiento prescrito con medicamentos,
dosis y duración del tratamiento"
```

**Regla de oro**: Sé específico, menciona nombres exactos de campos

---

## 📊 Tipos de Campos

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| **STRING** | Texto | Nombre, Dirección |
| **NUMBER** | Números | Edad, Peso, Precio |
| **BOOLEAN** | Sí/No | ¿Fumador?, ¿Pagado? |
| **ARRAY_OF_STRINGS** | Lista textos | Alergias |
| **ARRAY_OF_OBJECTS** | Lista grupos | Medicamentos con dosis |
| **OBJECT** | Grupo campos | Dirección completa |

---

## 🚀 Caso de Uso: Recetas Diarias

**Escenario**: 30 recetas al día

### Flujo:
1. 📸 **Escanea** las 30 recetas → PDFs
2. ⬆️ **Sube** todos los archivos
3. 📋 **Plantilla**: "Receta Médica" (General)
4. 🔄 **"Procesar Todos"**
5. 💾 **Exporta** a Excel
6. 📊 **Importa** a tu sistema de gestión

**Tiempo**: 10-15 minutos (vs 2-3 horas manual)
**Ahorro**: 85% del tiempo

---

## 🔐 Seguridad y Privacidad

### ✅ Garantías
- 🇪🇺 **Procesamiento en Europa** (Bélgica)
- 🔒 **RGPD Compliant**
- 🏥 **HIPAA Compatible**
- 🚫 **No almacenamiento permanente**
- 🔐 **Conexión cifrada** (HTTPS)

### 📝 Buenas Prácticas
- Anonimiza datos sensibles cuando sea posible
- Limpia el historial local regularmente
- No compartas resultados sin consentimiento

---

## ❓ Problemas Comunes

### 🔴 "La extracción falló"
**Solución**:
1. Recarga la página (F5)
2. Intenta de nuevo
3. Simplifica el esquema
4. Prueba con otro modelo (Flash ↔ Pro)

### 🔴 "Datos incorrectos"
**Solución**:
1. Mejora el prompt (más específico)
2. Verifica tipos de campo
3. Usa Gemini Pro (más preciso)
4. Mejora calidad del documento

### 🔴 "No puedo abrir el CSV"
**Solución**:
1. Usa botón "Excel" en su lugar
2. O abre Excel → Archivo → Abrir → Selecciona CSV
3. Configura: Delimitador = Coma, UTF-8

---

## 🎯 Personalización

### Crear Plantilla Personalizada

1. **Columna 3** → ➕ **"Crear Plantilla"**
2. **Completa**:
   - Nombre: "Mi plantilla"
   - Prompt: Instrucciones claras
   - Esquema: Campos a extraer
3. **Opcional**: ✨ "Generar desde Prompt" (IA sugiere esquema)
4. 💾 **Guardar**
5. Aparece en **"▶ Mis Modelos"**

### Guardar Plantilla Actual

Si ya configuraste algo que funciona:

1. **Columna 3** → 💾 **"Guardar Plantilla"**
2. Dale un nombre
3. Se guarda en **"▶ Mis Modelos"**
4. Reutilízala cuando quieras

---

## 📱 Compatibilidad

### ✅ Totalmente Compatible
- 💻 **PC/Mac**: Óptimo
- 📱 **Tablets**: Funciona bien
- 🌐 **Navegadores**: Chrome, Edge, Firefox, Safari

### ⚠️ Limitado
- 📱 **Móviles**: Solo lectura/revisión rápida
- 🕰️ **Navegadores viejos**: Actualiza a versión reciente

---

## 🔗 Más Información

### 📚 Documentación Completa
- **Guía Detallada**: 80 páginas, 5 casos de uso, FAQ completo
- **GitHub**: [Ver guía completa](https://github.com/VCNPRO/verbadoc_salud)

### 📞 Soporte
- **Email**: soporte@verbadoc.com
- **Legal**: legal@verbadoc.com
- **Horario**: L-V 9:00-18:00 CET

---

## 📊 Resumen en 30 Segundos

1. ⬆️ **Sube** documento
2. 📋 **Selecciona** plantilla
3. 🚀 **Extrae** datos
4. 💾 **Descarga** Excel

**¡Eso es todo! Simple y efectivo.**

---

## 🎓 Primeros Pasos Recomendados

### Día 1: Familiarización (30 min)
- ✅ Explora la interfaz
- ✅ Prueba con 1 documento
- ✅ Usa plantilla predefinida
- ✅ Exporta a Excel

### Día 2: Práctica (1 hora)
- ✅ Procesa 5-10 documentos
- ✅ Prueba diferentes especialidades
- ✅ Ajusta prompts según necesites

### Día 3: Personalización (1 hora)
- ✅ Crea tu primera plantilla personalizada
- ✅ Guárdala en "Mis Modelos"
- ✅ Procesa un lote completo

### Semana 1: Producción
- ✅ Integra en tu flujo diario
- ✅ Procesa documentos reales
- ✅ Optimiza tus plantillas

---

## 🏆 Mejores Prácticas

### Para Máxima Eficiencia:
1. 🎯 **Plantillas específicas**: Una por tipo de documento
2. ⚡ **Gemini Flash**: Default para velocidad
3. 📦 **Lotes de 20-50**: Tamaño óptimo
4. ✅ **Prueba siempre primero**: 1 antes de 100
5. 💾 **Exporta regularmente**: No pierdas datos

### Para Máxima Precisión:
1. 📝 **Prompts detallados**: Muy específicos
2. 🧠 **Gemini Pro**: Documentos complejos
3. 📄 **Alta calidad**: Escaneos claros, buena resolución
4. 🔍 **Revisa resultados**: Verifica aleatoriamente
5. 🔧 **Ajusta iterativamente**: Mejora continua

---

**Versión**: 1.0 | **Actualizado**: Febrero 2025
**VerbaDoc Salud** - Extracción inteligente de datos médicos 🏥

**100% Procesado en Europa** 🇪🇺
