# 🏥 Guía de Usuario - VerbaDoc Salud

## 📋 Índice
- [¿Qué es VerbaDoc Salud?](#qué-es-verbadoc-salud)
- [Primeros Pasos](#primeros-pasos)
- [Interfaz de Usuario](#interfaz-de-usuario)
- [Modelos de IA](#modelos-de-ia)
- [Plantillas Médicas](#plantillas-médicas)
- [Gestión de Documentos](#gestión-de-documentos)
- [Extracción de Datos](#extracción-de-datos)
- [Mis Modelos Personalizados](#mis-modelos-personalizados)
- [Exportación de Resultados](#exportación-de-resultados)
- [Casos de Uso](#casos-de-uso)
- [Preguntas Frecuentes](#preguntas-frecuentes)

---

## ¿Qué es VerbaDoc Salud?

**VerbaDoc Salud** es una herramienta especializada de extracción inteligente de datos médicos que utiliza **Inteligencia Artificial** para procesar documentos del sector sanitario.

### 🎯 Características Principales

✅ **Especializado en Salud**: Plantillas específicas para documentos médicos
✅ **IA Avanzada**: Modelos Google Gemini procesados 100% en Europa
✅ **Múltiples Especialidades**: 8 especialidades médicas predefinidas
✅ **Procesamiento en Lote**: Procesa múltiples documentos simultáneamente
✅ **Exportación Flexible**: Excel, CSV y JSON
✅ **100% Cumplimiento**: Compatible con RGPD e HIPAA

### 🔒 Seguridad y Privacidad

- 🇪🇺 **Procesamiento en Europa**: Toda la IA se ejecuta en servidores europeos (Bélgica)
- 🔐 **Sin almacenamiento**: Los documentos no se guardan permanentemente
- 📜 **Cumplimiento RGPD**: Totalmente compatible con regulaciones europeas
- 🏥 **HIPAA Compatible**: Apto para datos de salud protegidos

---

## Primeros Pasos

### 1. Acceder a la Aplicación

1. Abre tu navegador web (Chrome, Firefox, Edge, Safari)
2. Ve a: `https://www.verbadocsalud.eu`
3. La aplicación se carga automáticamente - no requiere instalación

### 2. Configuración Inicial

**Personalizar nombre del cliente:**
1. En el header superior, verás: "verbadoc 🏥 sector salud, trabajando para **[Nombre de Cliente]**"
2. Haz clic en **[Nombre de Cliente]**
3. Ingresa tu nombre o el de tu empresa/clínica
4. Se guardará automáticamente

**Seleccionar tema:**
- **Modo Día** (predeterminado): Fondo claro, ideal para trabajo diurno
- **Modo Noche**: Fondo oscuro, reduce fatiga visual
- Botón de cambio: 🌙/☀️ en la esquina superior derecha

---

## Interfaz de Usuario

VerbaDoc Salud tiene una interfaz organizada en 3 columnas principales:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: verbadoc | 🏥 Sector Salud | [Cliente] | ☀️ ⚙️ 🚪  │
├──────────────┬──────────────────────┬───────────────────────┤
│              │                      │                       │
│  COLUMNA 1   │    COLUMNA 2        │    COLUMNA 3         │
│  Documentos  │    Editor           │    Configuración     │
│              │    Extracción       │    & Plantillas      │
│              │                      │                       │
│  📄 Archivo1 │  ┌─────────────┐    │  ▼ Modelos IA        │
│  📄 Archivo2 │  │   Visor     │    │  ▼ Plantillas        │
│  📄 Archivo3 │  │  Documento  │    │  ▶ Mis Modelos       │
│              │  └─────────────┘    │                       │
│  [+ Subir]   │                      │  [Crear Plantilla]   │
│              │  Prompt: ____       │  [Guardar Plantilla] │
│              │  Esquema: ___       │                       │
│              │                      │                       │
│              │  [🚀 Extraer]       │  📊 Resultados (3)   │
└──────────────┴──────────────────────┴───────────────────────┘
│  FOOTER: Legal | Contacto | © 2025 VerbaDoc Salud          │
└─────────────────────────────────────────────────────────────┘
```

### Columna 1: Lote de Documentos
- **Zona de carga**: Arrastra archivos o haz clic para seleccionar
- **Lista de archivos**: Muestra todos los documentos cargados
- **Botones por archivo**:
  - 👁️ **Ver**: Vista previa del documento
  - ✓ **Seleccionar**: Marcar para procesamiento
  - 🗑️ **Eliminar**: Quitar de la lista

### Columna 2: Editor de Extracción
- **Vista previa**: Visualiza PDFs e imágenes
- **Prompt**: Instrucciones para la IA
- **Esquema**: Define qué datos extraer
- **Botón Extraer**: Ejecuta el procesamiento
- **Panel de Resultados**: Muestra datos extraídos

### Columna 3: Configuración
- **Modelos IA**: Selecciona el modelo a usar
- **Plantillas**: Plantillas predefinidas por especialidad
- **Mis Modelos**: Tus plantillas guardadas
- **Historial**: Resultados de extracciones anteriores

---

## Modelos de IA

### ¿Qué son los Modelos de IA?

Los modelos de IA son los "cerebros" que leen y comprenden tus documentos. VerbaDoc Salud ofrece dos opciones:

### 📊 Modelos Disponibles

#### 1. **Gemini 2.5 Flash** (Recomendado)
- ⚡ **Velocidad**: Muy rápido (5-15 segundos por documento)
- 💰 **Costo**: Económico
- 🎯 **Uso ideal**:
  - Documentos estándar
  - Formatos conocidos
  - Procesamiento en lote
  - Facturas, recetas, certificados simples

#### 2. **Gemini 2.5 Pro**
- 🧠 **Precisión**: Máxima exactitud
- 📊 **Complejidad**: Maneja documentos complejos
- 🎯 **Uso ideal**:
  - Historias clínicas detalladas
  - Informes quirúrgicos complejos
  - Documentos manuscritos
  - Análisis de múltiples páginas

### 🔧 Cómo Seleccionar un Modelo

1. En la **Columna 3**, localiza la sección **"▼ Modelos IA"**
2. Haz clic para expandir (si está colapsada)
3. Selecciona tu modelo del desplegable
4. El modelo seleccionado se usará para todas las extracciones

**💡 Consejo**: Comienza con Flash. Usa Pro solo si necesitas mayor precisión.

---

## Plantillas Médicas

### ¿Qué son las Plantillas?

Las plantillas son configuraciones predefinidas que incluyen:
- **Prompt**: Instrucciones optimizadas para la IA
- **Esquema**: Estructura de datos específica del documento
- **Campos**: Datos a extraer ya configurados

### 🏥 Especialidades Médicas

VerbaDoc Salud organiza las plantillas en 8 especialidades:

| Especialidad | Icono | Plantillas Incluidas |
|-------------|-------|---------------------|
| **General** | 📋 | Consultas, Recetas, Certificados, Vacunación, Altas |
| **Análisis Clínicos** | 🔬 | Resultados de Laboratorio |
| **Cardiología** | ❤️ | ECG, Ecocardiogramas, Pruebas de Esfuerzo |
| **Traumatología** | 🦴 | Informes Traumatológicos, Radiografías |
| **Oftalmología** | 👁️ | Exámenes Visuales, Cirugía Cataratas, Recetas Lentes |
| **Pediatría** | 👶 | Historia Clínica Pediátrica |
| **Cirugía** | ⚕️ | Informes Quirúrgicos |
| **Radiología** | 📡 | Informes Radiológicos, TAC, Resonancias |

### 📚 Plantillas Disponibles

#### GENERAL (5 plantillas)
1. **Receta Médica**: Medicamentos, dosis, duración
2. **Certificado Médico**: Bajas laborales, aptitud física
3. **Consulta Médica**: Motivo, exploración, diagnóstico, tratamiento
4. **Registro de Vacunación**: Vacunas administradas, lote, fecha
5. **Alta Hospitalaria**: Ingreso, estancia, diagnóstico, tratamiento

#### ANÁLISIS CLÍNICOS (1 plantilla)
1. **Resultados de Laboratorio**: Hemograma, bioquímica, valores de referencia

#### CARDIOLOGÍA (3 plantillas)
1. **Electrocardiograma (ECG)**: Ritmo, frecuencia, hallazgos
2. **Ecocardiograma**: Función ventricular, válvulas, hallazgos
3. **Prueba de Esfuerzo**: Protocolo, FC máx., hallazgos

#### TRAUMATOLOGÍA (1 plantilla)
1. **Informe Traumatológico**: Lesión, exploración, diagnóstico, tratamiento

#### OFTALMOLOGÍA (6 plantillas)
1. **Consulta Oftalmológica**: Agudeza visual, refracción, presión intraocular
2. **Cirugía de Cataratas**: Facoemulsificación, implante lente intraocular
3. **Fondo de Ojo / Retinografía**: Retina, mácula, nervio óptico
4. **Tonometría**: Presión intraocular, detección glaucoma
5. **Campo Visual / Perimetría**: Defectos campo visual
6. **Receta de Lentes/Gafas**: Graduación completa para lentes

#### PEDIATRÍA (1 plantilla)
1. **Historia Clínica Pediátrica**: Antecedentes, desarrollo, vacunación

#### CIRUGÍA (1 plantilla)
1. **Informe Quirúrgico**: Cirugía, anestesia, hallazgos, complicaciones

#### RADIOLOGÍA (1 plantilla)
1. **Informe Radiológico**: Técnica, hallazgos, conclusiones

### 🔍 Cómo Usar una Plantilla

#### Método Rápido:
1. En **Columna 3**, sección **"▼ Plantillas"**
2. Selecciona tu **Especialidad médica**
3. Haz clic en la plantilla deseada
4. El prompt y esquema se cargan automáticamente en la **Columna 2**
5. ¡Listo para extraer!

#### Con Documento:
1. **Primero**: Sube tu documento (Columna 1)
2. **Segundo**: Selecciona la plantilla (Columna 3)
3. **Tercero**: Revisa que la plantilla sea adecuada
4. **Cuarto**: Haz clic en **"🚀 Ejecutar Extracción"**
5. **Quinto**: Revisa y exporta los resultados

### 📦 Plantillas Archivadas

Algunas especialidades tienen plantillas archivadas (versiones antiguas o menos usadas):

1. Dentro de **"▼ Plantillas"**
2. Busca **"📦 Archivadas (X)"**
3. Haz clic para expandir
4. Selecciona la plantilla archivada que necesites

---

## Gestión de Documentos

### 📤 Subir Documentos

#### Opción A: Arrastrar y Soltar (Recomendado)
1. Selecciona uno o más archivos en tu computadora
2. Arrástralos hasta la **zona de carga** (Columna 1)
3. Suelta los archivos
4. Aparecerán en la lista automáticamente

#### Opción B: Selector de Archivos
1. Haz clic en la **zona de carga** (Columna 1)
2. Se abre el explorador de archivos
3. Selecciona uno o varios archivos
4. Haz clic en **"Abrir"**

### 📋 Formatos Soportados

✅ **Documentos**:
- PDF (.pdf)
- Texto (.txt)

✅ **Imágenes**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- TIFF (.tif, .tiff)
- WebP (.webp)
- BMP (.bmp)

✅ **Archivos JSON** (para importar extracciones previas):
- JSON (.json)

### 👁️ Vista Previa de Documentos

Para revisar un documento antes de procesarlo:

1. Localiza el documento en la lista (Columna 1)
2. Haz clic en el icono **"👁️ Ver"**
3. Se abre un modal con la vista previa:
   - **PDFs**: Visualización integrada
   - **Imágenes**: Vista de la imagen
   - **Textos**: Contenido del texto
4. Revisa el contenido
5. Cierra haciendo clic en la **"X"** o fuera del modal

### 🗑️ Eliminar Documentos

Para quitar un documento de la lista:

1. Localiza el archivo en la lista
2. Haz clic en el icono **"🗑️"**
3. El archivo se elimina inmediatamente
4. No se puede deshacer (sube de nuevo si fue error)

### 📊 Estado de los Documentos

Cada documento muestra su estado:

| Estado | Indicador | Significado |
|--------|-----------|-------------|
| **Pendiente** | ⏳ | No procesado aún |
| **Procesando** | 🔄 | Extrayendo datos... |
| **Completado** | ✅ | Extracción exitosa |
| **Error** | ❌ | Falló el procesamiento |

---

## Extracción de Datos

### 🎯 Extracción Simple (Un Documento)

#### Paso 1: Preparación
1. Sube tu documento
2. Selecciona una plantilla O configura manualmente

#### Paso 2: Configuración Manual (si no usas plantilla)

**A. Escribir el Prompt:**

El prompt le dice a la IA QUÉ buscar. Debe ser claro y específico.

**Ejemplos de buenos prompts:**

```
✅ "Extrae el nombre completo del paciente, número de DNI, fecha de la consulta,
   diagnóstico principal, y el tratamiento prescrito"

✅ "Del informe de laboratorio, extrae todos los parámetros analíticos con sus
   valores, unidades y rangos de referencia"

✅ "Extrae los datos del ECG: frecuencia cardíaca, ritmo, eje QRS, intervalos
   PR/QRS/QT, y hallazgos principales"
```

**❌ Evita prompts vagos:**
```
❌ "Dame los datos"
❌ "Info del documento"
❌ "Todo lo importante"
```

**B. Definir el Esquema:**

El esquema define CÓMO estructurar los datos extraídos.

**Tipos de campos disponibles:**

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| **STRING** | Texto | Nombre, Dirección, Diagnóstico |
| **NUMBER** | Números | Edad, Presión Arterial, Dosis |
| **BOOLEAN** | Sí/No | ¿Alérgico?, ¿Fumador? |
| **ARRAY_OF_STRINGS** | Lista de textos | Lista de alergias, síntomas |
| **OBJECT** | Grupo de campos | Dirección (calle, ciudad, CP) |
| **ARRAY_OF_OBJECTS** | Lista de grupos | Medicamentos (cada uno con nombre, dosis, frecuencia) |

**Ejemplo de esquema - Receta Médica:**

```
Campo 1:
  Nombre: paciente_nombre
  Tipo: STRING

Campo 2:
  Nombre: fecha_prescripcion
  Tipo: STRING

Campo 3:
  Nombre: medicamentos
  Tipo: ARRAY_OF_OBJECTS
    Sub-campo 1:
      Nombre: nombre_medicamento
      Tipo: STRING
    Sub-campo 2:
      Nombre: dosis
      Tipo: STRING
    Sub-campo 3:
      Nombre: frecuencia
      Tipo: STRING

Campo 4:
  Nombre: diagnostico
  Tipo: STRING
```

**Gestión de campos:**
- ➕ **Agregar campo**: Botón verde "+"
- 🗑️ **Eliminar campo**: Icono de basura rojo
- 📝 **Editar campo**: Haz clic y escribe
- ⬆️⬇️ **Ordenar**: Arrastra los campos (si disponible)

#### Paso 3: Ejecutar Extracción

1. Verifica que todo esté correcto:
   - ✅ Documento seleccionado (resaltado)
   - ✅ Prompt completo
   - ✅ Esquema con al menos un campo
   - ✅ Sin errores en rojo

2. Haz clic en **"🚀 Ejecutar Extracción"** (botón grande azul/verde)

3. Espera mientras procesa (5-30 segundos)
   - Verás "Extrayendo datos..."
   - El botón se desactiva temporalmente

4. Los resultados aparecen en el panel inferior

#### Paso 4: Revisar Resultados

Los datos extraídos se muestran en formato JSON:

```json
{
  "paciente_nombre": "María González López",
  "fecha_prescripcion": "15/01/2025",
  "medicamentos": [
    {
      "nombre_medicamento": "Omeprazol",
      "dosis": "20mg",
      "frecuencia": "Cada 24 horas"
    }
  ],
  "diagnostico": "Gastritis aguda"
}
```

**Verifica**:
- ✅ Todos los campos tienen datos
- ✅ Los datos son correctos
- ✅ No hay errores obvios

Si algo está mal:
1. Ajusta el prompt (más específico)
2. Revisa el esquema (tipos correctos)
3. Vuelve a ejecutar

### 🔄 Procesamiento en Lote (Múltiples Documentos)

Para procesar muchos documentos del mismo tipo:

#### Paso 1: Preparación
1. **Sube todos los documentos** (10, 20, 50...)
2. Asegúrate que todos sean del **mismo formato**

#### Paso 2: Configuración
1. **Selecciona el primer documento**
2. **Configura** prompt y esquema (o usa plantilla)
3. **Procesa solo el primero** para verificar

#### Paso 3: Validación
1. **Revisa** que los datos del primero sean correctos
2. Si hay errores, **ajusta** y prueba de nuevo
3. Solo cuando esté perfecto, continúa

#### Paso 4: Procesamiento Masivo
1. Haz clic en **"Procesar Todos"**
2. La aplicación procesa todos los documentos automáticamente
3. Espera a que termine (puede tardar varios minutos)
4. Cada documento se marca con su estado (✅ o ❌)

#### Paso 5: Revisión de Resultados
1. Haz clic en cada documento de la lista
2. Revisa sus resultados individuales
3. Exporta los que necesites

**⚠️ Importante**: El procesamiento en lote funciona mejor cuando:
- Todos los documentos tienen el **mismo formato**
- La **estructura es similar** (mismas secciones, campos)
- Son del **mismo tipo** (todas recetas, todos laboratorios, etc.)

---

## Mis Modelos Personalizados

### ¿Qué son "Mis Modelos"?

Son plantillas personalizadas que TÚ creas y guardas para reutilizarlas. Ideal para:
- Documentos específicos de tu clínica/hospital
- Formatos únicos que no están en las plantillas predefinidas
- Flujos de trabajo repetitivos

### ➕ Crear una Plantilla Nueva

#### Opción 1: Desde Cero

1. En **Columna 3**, haz clic en **"➕ Crear Plantilla"**

2. Se abre el **Editor de Plantilla**:
   - **Nombre**: Ej: "Informe Urgencias Hospital X"
   - **Descripción**: (Opcional) Ej: "Informes del servicio de urgencias"
   - **Prompt**: Escribe las instrucciones para la IA
   - **Esquema**: Define los campos a extraer

3. **Opcional - Generar desde Prompt**:
   - Escribe primero el prompt
   - Haz clic en **"✨ Generar desde Prompt"**
   - La IA sugiere un esquema automáticamente
   - Revisa y ajusta según necesites

4. Haz clic en **"Guardar"**

5. La plantilla se guarda en **"▶ Mis Modelos"**

#### Opción 2: Guardar Plantilla Actual

Si ya configuraste manualmente un esquema que funciona bien:

1. En **Columna 3**, verás el botón **"💾 Guardar Plantilla"** (solo si hay esquema activo)

2. Haz clic en el botón

3. Se abre un diálogo:
   - **Nombre**: Dale un nombre descriptivo
   - **Descripción**: (Opcional) Explica para qué sirve

4. Haz clic en **"Guardar"**

5. La plantilla se guarda en **"▶ Mis Modelos"**

### 📂 Usar Mis Modelos

1. En **Columna 3**, localiza **"▶ Mis Modelos (X)"**

2. Haz clic para expandir (si está colapsada)

3. Verás tus plantillas guardadas:
   ```
   📄 Informe Urgencias Hospital X
   📄 Analíticas Específicas Clínica
   📄 Recetas Personalizadas
   ```

4. Haz clic en una plantilla

5. Se carga automáticamente en el editor

6. Sube tu documento y extrae

### ✏️ Editar Mis Modelos

1. Expande **"▶ Mis Modelos"**
2. Localiza la plantilla
3. Haz clic en el icono **"✏️ Editar"**
4. Modifica lo que necesites
5. Guarda los cambios

### 🗑️ Eliminar Mis Modelos

1. Expande **"▶ Mis Modelos"**
2. Localiza la plantilla
3. Haz clic en el icono **"🗑️ Eliminar"**
4. Confirma la acción
5. Se elimina permanentemente

### 📦 Archivar Mis Modelos

Para ocultar plantillas que usas poco pero no quieres eliminar:

1. Expande **"▶ Mis Modelos"**
2. Localiza la plantilla
3. Haz clic en el icono **"📦 Archivar"**
4. La plantilla se oculta de la lista principal
5. Para ver archivadas: Botón **"Ver archivadas"**

---

## Exportación de Resultados

### 📊 Formatos Disponibles

VerbaDoc Salud ofrece 3 formatos de exportación:

#### 1. **Excel (.xlsx)** - Recomendado
- 📗 Abre directamente en Microsoft Excel
- ✅ Mejor formato para análisis de datos
- ✅ Mantiene formato y tipos de datos
- ✅ Fácil de compartir

**Cuándo usar**: Siempre que sea posible, especialmente para análisis

#### 2. **CSV (.csv)**
- 📄 Archivo de texto plano con comas
- ✅ Universal - abre en cualquier programa
- ✅ Compatible con Google Sheets
- ✅ Fácil de importar a bases de datos

**Cuándo usar**: Compatibilidad máxima, importación a sistemas

#### 3. **JSON (.json)**
- 🔧 Formato técnico estructurado
- ✅ Para programadores y desarrolladores
- ✅ Integración con APIs y sistemas
- ✅ Mantiene estructura completa

**Cuándo usar**: Integración técnica, desarrollo

### 💾 Cómo Exportar

#### Exportar Un Resultado:

1. **Localiza** el resultado en el panel de resultados (Columna 2 inferior)

2. En la parte superior verás 3 botones:
   - **Excel** (verde esmeralda)
   - **CSV** (verde)
   - **JSON** (azul)

3. Haz clic en el formato deseado

4. El archivo se **descarga automáticamente** a tu carpeta de descargas

5. Abre el archivo:
   - **Excel**: Doble clic → Abre en Excel
   - **CSV**: Botón derecho → Abrir con → Excel/Google Sheets
   - **JSON**: Abre con editor de texto o visor JSON

#### Exportar Todo el Historial:

1. Haz clic en **"📊 Ver Resultados (X)"** (Columna 3 superior)

2. Se abre el **modal de resultados expandido**

3. En la parte superior verás botones:
   - **📥 Exportar Historial JSON**: Todo en un archivo JSON
   - **📊 Exportar a Excel**: Todo en un archivo Excel con múltiples hojas

4. Selecciona la opción deseada

5. El archivo se descarga con nombre:
   - `verbadoc-historial-YYYY-MM-DD.json`
   - `verbadoc-historial-YYYY-MM-DD.xlsx`

### 📈 Trabajar con los Datos Exportados

#### En Excel:
1. Abre el archivo descargado
2. Verás una tabla con todos los campos
3. Puedes:
   - Filtrar datos
   - Crear gráficos
   - Hacer cálculos
   - Formato personalizado
   - Compartir con colegas

#### En Google Sheets:
1. Ve a Google Sheets
2. **Archivo → Importar**
3. Selecciona tu archivo CSV
4. Configura:
   - Separador: Coma
   - Codificación: UTF-8
5. Importa y trabaja con los datos

#### Importar a Base de Datos:
1. Usa formato **CSV** o **JSON**
2. Consulta la documentación de tu base de datos
3. Generalmente:
   - CSV: Importación directa de tabla
   - JSON: Requiere parser específico

---

## Casos de Uso

### 📋 Caso 1: Digitalizar Recetas Médicas

**Escenario**: Una clínica necesita digitalizar 50 recetas manuscritas diarias.

**Proceso**:

1. **Preparación** (1 vez):
   - Escanea una receta de muestra
   - Sube el archivo
   - Selecciona plantilla **"Receta Médica"** (General)
   - Prueba con 1 receta

2. **Producción** (diaria):
   - Escanea las 50 recetas
   - Sube todas las imágenes
   - Selecciona la plantilla guardada
   - **"Procesar Todos"**
   - Exporta a Excel
   - Importa a sistema de gestión

**Tiempo estimado**:
- Configuración: 5 minutos (1 vez)
- Procesamiento diario: 10-15 minutos

**Beneficio**:
- Antes: 2-3 horas manualmente
- Después: 15 minutos automatizado
- **Ahorro: 85% del tiempo**

---

### 🔬 Caso 2: Consolidar Resultados de Laboratorio

**Escenario**: Hospital necesita consolidar analíticas de 100 pacientes para estudio.

**Proceso**:

1. **Preparación**:
   - Recopila todos los PDFs de laboratorio
   - Sube los 100 archivos
   - Usa plantilla **"Resultados de Laboratorio"** (Análisis Clínicos)

2. **Configuración**:
   - Ajusta esquema si tus analíticas tienen campos adicionales
   - Guarda como **"Analíticas Estudio X"** en Mis Modelos

3. **Procesamiento**:
   - **"Procesar Todos"**
   - Revisa algunos resultados al azar
   - Exporta a Excel

4. **Análisis**:
   - Abre el Excel
   - Cada fila = 1 paciente
   - Columnas = Parámetros analíticos
   - Usa tablas dinámicas para análisis estadístico

**Tiempo estimado**: 30-45 minutos para 100 pacientes

**Beneficio**:
- Antes: 6-8 horas de entrada manual
- Después: 45 minutos
- **Ahorro: 90% del tiempo**

---

### 👁️ Caso 3: Gestión de Consultas Oftalmológicas

**Escenario**: Clínica oftalmológica quiere digitalizar historiales de agudeza visual.

**Proceso**:

1. **Configuración Inicial**:
   - Usa plantilla **"Consulta Oftalmológica"** (Oftalmología)
   - Revisa que incluya todos tus campos habituales
   - Si falta algo, agrégalo y guárdalo en Mis Modelos

2. **Flujo de Trabajo Diario**:
   - Cada consulta genera un PDF
   - Al final del día, sube todos los PDFs
   - Aplica tu plantilla personalizada
   - Procesa todos
   - Exporta a Excel

3. **Integración**:
   - Importa el Excel a tu sistema de gestión
   - O mantén el Excel como backup/referencia

**Campos típicos extraídos**:
- Nombre paciente
- Fecha consulta
- Agudeza visual OD/OI
- Refracción
- Presión intraocular
- Diagnóstico
- Tratamiento

**Tiempo estimado**: 5 minutos para 20 consultas

---

### 🏥 Caso 4: Archivo Digital de Altas Hospitalarias

**Escenario**: Hospital quiere digitalizar informes de alta de 2024.

**Proceso**:

1. **Preparación**:
   - Recopila todos los PDFs de altas
   - Organiza por mes (si son muchos)

2. **Configuración**:
   - Usa plantilla **"Alta Hospitalaria"** (General)
   - Si el formato de tu hospital es diferente:
     - Ajusta el esquema
     - Guarda como **"Alta Hospital [Nombre]"**

3. **Procesamiento por Lotes**:
   - Procesa 50-100 altas a la vez
   - Exporta cada lote a Excel
   - Consolida todos los Excel (copiar/pegar)

4. **Resultado Final**:
   - Base de datos completa de altas 2024
   - Buscable, filtrable, analizable
   - Backup digital permanente

**Campos típicos**:
- Paciente
- Fecha ingreso/alta
- Servicio
- Diagnóstico principal
- Diagnósticos secundarios
- Tratamiento realizado
- Tratamiento al alta
- Recomendaciones

---

### ⚕️ Caso 5: Seguimiento Post-Quirúrgico

**Escenario**: Departamento de cirugía quiere hacer seguimiento de complicaciones.

**Proceso**:

1. **Objetivo**: Extraer datos clave de informes quirúrgicos para análisis de calidad

2. **Configuración**:
   - Plantilla: **"Informe Quirúrgico"** (Cirugía)
   - Esquema enfocado en:
     - Tipo de cirugía
     - Duración
     - Complicaciones intraoperatorias
     - Complicaciones postoperatorias
     - Estancia hospitalaria

3. **Procesamiento**:
   - Sube todos los informes del trimestre
   - Procesa en lote
   - Exporta a Excel

4. **Análisis**:
   - Tasa de complicaciones por tipo de cirugía
   - Tiempo promedio de estancia
   - Identificar patrones
   - Mejora continua

**Valor añadido**:
- Análisis de calidad basado en datos reales
- Identificación de mejoras
- Reporting para auditorías

---

## Preguntas Frecuentes

### 🔐 Seguridad y Privacidad

#### ¿Es seguro subir datos médicos?

**Sí**. VerbaDoc Salud está diseñado específicamente para datos de salud:

- ✅ **Procesamiento en Europa**: Toda la IA se ejecuta en servidores europeos (Bélgica)
- ✅ **No almacenamiento**: Los documentos se procesan y descartan inmediatamente
- ✅ **RGPD**: Cumplimiento total con regulación europea
- ✅ **HIPAA Compatible**: Apto para datos de salud protegidos (PHI)
- ✅ **Conexión cifrada**: HTTPS en todas las comunicaciones

#### ¿Dónde se guardan mis documentos?

**No se guardan permanentemente**:
- Los archivos se mantienen en memoria solo durante el procesamiento
- Una vez extraídos los datos, se descartan
- Los resultados JSON se guardan en tu navegador (localStorage) - nunca en servidor
- Puedes limpiar el historial cuando quieras

#### ¿Puedo usar VerbaDoc Salud sin preocuparme por la LOPD?

**Sí**, VerbaDoc Salud cumple con:
- **RGPD** (Reglamento General de Protección de Datos - UE)
- **LOPD** (Ley Orgánica de Protección de Datos - España)
- **HIPAA** (Health Insurance Portability and Accountability Act - EE.UU.)

**Recomendaciones adicionales**:
- Siempre que sea posible, anonimiza datos antes de subir
- No compartas resultados con terceros sin consentimiento
- Borra el historial local periódicamente

---

### 🛠️ Problemas Técnicos

#### No puedo subir un archivo - error

**Causas comunes**:

1. **Formato no soportado**
   - Verifica que sea PDF, imagen o texto
   - Convierte DOCX/DOC a PDF primero

2. **Archivo muy grande**
   - Límite: 10 MB por archivo
   - Comprime imágenes antes de subir
   - Divide PDFs grandes en varios archivos

3. **Conexión lenta**
   - Archivos grandes requieren buena conexión
   - Espera a que cargue completamente

**Solución**:
1. Verifica el formato del archivo
2. Reduce el tamaño si es necesario
3. Intenta con otro navegador

---

#### La extracción falló - error de API

**Causas**:
- Problema temporal con el servicio de IA
- Documento ilegible o corrupto
- Esquema mal configurado

**Solución**:
1. **Reintenta**: Haz clic en "Ejecutar" de nuevo
2. **Verifica el documento**: ¿Se ve bien en vista previa?
3. **Simplifica el esquema**: Menos campos la primera vez
4. **Recarga la página**: F5 para reiniciar
5. **Contacta soporte**: Si persiste después de varios intentos

---

#### Los datos extraídos son incorrectos

**Causas**:
- Prompt no es suficientemente específico
- Esquema no coincide con el documento
- Documento de baja calidad
- Tipo de campo incorrecto

**Solución**:

1. **Mejora el prompt**:
   ```
   ❌ Antes: "Extrae la fecha"
   ✅ Después: "Extrae la fecha de emisión que aparece en la esquina superior derecha del documento, en formato DD/MM/YYYY"
   ```

2. **Verifica los tipos de campo**:
   - Fechas → STRING (no DATE)
   - Dinero → NUMBER (no STRING)
   - Listas → ARRAY_OF_STRINGS o ARRAY_OF_OBJECTS

3. **Prueba con otro modelo**:
   - Si usas Flash, prueba con Pro
   - Pro es más preciso en documentos complejos

4. **Mejora la calidad del documento**:
   - Si es imagen, aumenta la resolución
   - Si es PDF escaneado, mejora el contraste
   - Evita documentos manuscritos difíciles de leer

---

#### No puedo abrir el archivo Excel descargado

**Solución**:

1. **Verifica que tienes Excel instalado**
   - Alternativa: Usa Google Sheets
   - O intenta abrir como CSV

2. **Método alternativo**:
   - Abre Excel primero (vacío)
   - Archivo → Abrir
   - Selecciona "Todos los archivos"
   - Busca tu .xlsx
   - Abre

3. **Si es CSV**:
   - Botón derecho en el archivo
   - Abrir con → Excel
   - Configura importación:
     - Delimitador: Coma
     - Codificación: UTF-8

---

### 💡 Optimización y Mejores Prácticas

#### ¿Cómo puedo hacer las extracciones más rápidas?

1. **Usa Gemini Flash** (no Pro) - 3x más rápido
2. **Esquemas simples**: Menos campos = más rápido
3. **Procesa en lotes**: 10-20 archivos juntos
4. **Buena conexión**: WiFi estable mejora velocidad

#### ¿Cómo mejoro la precisión de las extracciones?

1. **Prompts detallados**: Sé muy específico
2. **Usa Gemini Pro**: Para documentos complejos
3. **Calidad de documentos**: Alta resolución, buen contraste
4. **Esquemas correctos**: Tipos de campo adecuados
5. **Prueba incremental**: Primero 1 documento, ajusta, luego todos

#### ¿Cuántos documentos puedo procesar a la vez?

**Recomendaciones**:
- **Óptimo**: 20-50 documentos por lote
- **Máximo técnico**: Sin límite estricto
- **Práctico**: Divide en grupos de 50

**Razones**:
- Más fácil de verificar
- Si hay error, afecta menos documentos
- Mejor gestión de resultados

#### ¿Cómo organizo mejor mi trabajo?

**Sistema recomendado**:

1. **Por tipo de documento**:
   - Carpeta: Recetas → Plantilla específica
   - Carpeta: Laboratorios → Otra plantilla
   - No mezcles tipos en un mismo lote

2. **Por fecha/período**:
   - Semana actual
   - Mes actual
   - Archivo histórico

3. **Mis Modelos**:
   - Crea una plantilla por cada tipo frecuente
   - Nómbralas claramente: "Lab-Bioquímica-Hospital-X"
   - Revisa y actualiza trimestralmente

---

### 📱 Compatibilidad

#### ¿Funciona en móvil/tablet?

**Sí, pero con limitaciones**:

✅ **Tablet** (iPad, Android tablet):
- Funciona bien
- Pantalla suficientemente grande
- Puedes trabajar cómodamente

⚠️ **Móvil** (iPhone, Android phone):
- Funciona pero es incómodo
- Pantalla pequeña dificulta edición
- Recomendado solo para revisiones rápidas

**Recomendación**: Usa ordenador/laptop para trabajo productivo

#### ¿Qué navegadores soporta?

✅ **Totalmente soportados**:
- Chrome (recomendado)
- Edge
- Firefox
- Safari (Mac/iOS)

⚠️ **No recomendados**:
- Internet Explorer (obsoleto)
- Navegadores antiguos (< 2020)

---

### 🔧 Funcionalidades Avanzadas

#### ¿Puedo personalizar las plantillas predefinidas?

**Sí**:

1. Carga una plantilla predefinida
2. Haz los cambios necesarios:
   - Edita el prompt
   - Agrega/quita campos del esquema
   - Cambia tipos de campos
3. Guárdala en **"Mis Modelos"**
4. Ahora tienes tu versión personalizada

**Ejemplo**:
- Plantilla base: "Receta Médica"
- Personalizas: Agregas campo "Número de póliza"
- Guardas como: "Receta Hospital X"

#### ¿Puedo importar/exportar mis plantillas?

**Actualmente**: No hay función directa de exportar plantillas

**Workaround**:
1. Las plantillas se guardan en localStorage del navegador
2. Si cambias de ordenador:
   - Recrea manualmente las plantillas importantes
   - O usa la función "Guardar Plantilla" cada vez que configures una

**Próximamente**: Exportación/importación de plantillas está en desarrollo

#### ¿Puedo procesar múltiples tipos de documentos a la vez?

**No recomendado**:
- Diferentes formatos requieren diferentes esquemas
- Procesamiento en lote funciona mejor con documentos homogéneos

**Solución**:
1. Agrupa por tipo de documento
2. Procesa cada grupo por separado
3. Exporta individualmente o consolida después en Excel

---

## 📞 Soporte

### Contacto

**Email de Soporte**:
- Soporte técnico: soporte@verbadoc.com
- Asuntos legales/privacidad: legal@verbadoc.com

**Horario de Atención**:
- Lunes a Viernes: 9:00 - 18:00 (CET)
- Respuesta: 24-48 horas laborables

### Reportar Problemas

Si encuentras un error:

1. **Recopila información**:
   - ¿Qué estabas haciendo?
   - ¿Qué esperabas que pasara?
   - ¿Qué pasó en realidad?
   - Captura de pantalla (si es posible)

2. **Envía email a**: soporte@verbadoc.com

3. **Incluye**:
   - Descripción del problema
   - Pasos para reproducir
   - Navegador y versión
   - Capturas de pantalla

### Solicitar Funcionalidades

¿Tienes una idea para mejorar VerbaDoc Salud?

**Envía tu sugerencia a**: soporte@verbadoc.com

**Incluye**:
- Descripción de la funcionalidad
- ¿Cómo te ayudaría?
- ¿Con qué frecuencia la usarías?

---

## 📊 Apéndices

### A. Tabla de Tipos de Campo

| Tipo | Descripción | Ejemplo de Uso | Ejemplo de Valor |
|------|-------------|----------------|------------------|
| STRING | Texto libre | Nombres, direcciones, diagnósticos | "Juan Pérez" |
| NUMBER | Números (enteros o decimales) | Edad, peso, presión arterial | 42, 68.5, 120/80 |
| BOOLEAN | Verdadero/Falso, Sí/No | ¿Fumador?, ¿Alérgico? | true, false |
| ARRAY_OF_STRINGS | Lista de textos | Lista de alergias, síntomas | ["Penicilina", "Polen"] |
| OBJECT | Grupo de campos relacionados | Dirección completa | { "calle": "...", "ciudad": "..." } |
| ARRAY_OF_OBJECTS | Lista de grupos | Medicamentos con detalles | [{ "nombre": "...", "dosis": "..." }] |

### B. Atajos de Teclado

| Acción | Atajo | Función |
|--------|-------|---------|
| Recargar | F5 | Recarga la aplicación |
| Cerrar modal | Esc | Cierra ventanas emergentes |
| Buscar | Ctrl + F | Busca en la página |
| Copiar | Ctrl + C | Copia texto seleccionado |
| Pegar | Ctrl + V | Pega texto |

### C. Glosario de Términos

**IA (Inteligencia Artificial)**: Sistema que procesa y comprende documentos automáticamente

**Prompt**: Instrucciones en lenguaje natural que le das a la IA

**Esquema**: Estructura que define qué datos extraer y cómo organizarlos

**JSON**: Formato de datos estructurado usado por computadoras

**CSV**: Archivo de texto con valores separados por comas, compatible con Excel

**RGPD**: Reglamento General de Protección de Datos (Europa)

**HIPAA**: Ley de protección de datos de salud (EE.UU.)

**Procesamiento en lote**: Procesar múltiples documentos a la vez

**Template/Plantilla**: Configuración guardada de prompt + esquema

**Extracción**: Proceso de obtener datos de un documento

**PHI (Protected Health Information)**: Información de salud protegida

---

## 🎓 Conclusión

VerbaDoc Salud es una herramienta potente que puede **transformar tu flujo de trabajo** con documentos médicos.

### Recuerda:

✅ **Empieza simple**: Usa plantillas predefinidas
✅ **Prueba primero**: 1 documento antes de procesar 100
✅ **Guarda configuraciones**: Crea tus plantillas en "Mis Modelos"
✅ **Mejora iterativamente**: Ajusta prompts y esquemas según necesites
✅ **Mantén seguridad**: Anonimiza datos sensibles cuando sea posible

### Próximos Pasos:

1. 🚀 **Prueba la aplicación**: Empieza con un documento de ejemplo
2. 📚 **Explora plantillas**: Revisa las 20+ plantillas disponibles
3. 🎯 **Define tu caso de uso**: ¿Qué documentos procesas más?
4. ⚙️ **Crea tu plantilla**: Personaliza para tu flujo de trabajo
5. 🔄 **Automatiza**: Incorpora VerbaDoc a tu rutina diaria

---

**¿Necesitas más ayuda?** → soporte@verbadoc.com

**Versión del documento**: 1.0
**Última actualización**: Febrero 2025
**VerbaDoc Salud**: 100% procesado en Europa 🇪🇺

---

*Esta guía se actualiza regularmente. Para la versión más reciente, consulta: https://www.verbadocsalud.eu/guia*
