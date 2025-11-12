# Sistema Mock de Autenticación - Guía de Prueba

Este documento explica cómo probar el sistema de autenticación y acceso condicional usando el modo mock temporal (sin Firebase).

## 🎯 ¿Qué es el modo mock?

El modo mock es un sistema de autenticación temporal que **NO requiere configuración de Firebase**. Almacena usuarios en localStorage del navegador, permitiéndote probar todas las funcionalidades de autenticación y acceso condicional inmediatamente.

## ⚠️ IMPORTANTE: Solo para desarrollo/pruebas

- **NO usar en producción**
- Las contraseñas se almacenan en texto plano en localStorage
- Los datos se pierden si limpias el localStorage del navegador
- Mañana configuraremos Firebase real para producción

## 🚀 Cómo probar el sistema

### 1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en `http://localhost:3002` (o el puerto que muestre Vite)

### 2. Crear usuarios de prueba con diferentes especialidades

Te recomiendo crear al menos 3 usuarios para probar el acceso condicional:

#### Usuario 1: Médico General (ve TODO)
- **Email**: `general@test.com`
- **Contraseña**: `123456`
- **Nombre**: `Dr. General`
- **Especialidad**: `Medicina General`

**Este usuario verá TODAS las plantillas de todas las especialidades**

#### Usuario 2: Oftalmólogo (solo oftalmología)
- **Email**: `oftalmo@test.com`
- **Contraseña**: `123456`
- **Nombre**: `Dr. Oftalmólogo`
- **Especialidad**: `Oftalmología`

**Este usuario solo verá plantillas de Oftalmología + plantillas generales**

#### Usuario 3: Cardiólogo (solo cardiología)
- **Email**: `cardio@test.com`
- **Contraseña**: `123456`
- **Nombre**: `Dr. Cardiólogo`
- **Especialidad**: `Cardiología`

**Este usuario solo verá plantillas de Cardiología + plantillas generales**

### 3. Probar el acceso condicional

#### Paso 1: Login como Médico General
1. Inicia sesión con `general@test.com`
2. Ve a **Plantillas** en el panel derecho
3. Selecciona diferentes especialidades del dropdown
4. **Resultado esperado**: Debes ver plantillas de TODAS las especialidades

#### Paso 2: Login como Oftalmólogo
1. Cierra sesión (botón rojo en el header)
2. Inicia sesión con `oftalmo@test.com`
3. Ve a **Plantillas** en el panel derecho
4. **Resultado esperado**:
   - Al seleccionar "Oftalmología": Ves plantillas de oftalmología
   - Al seleccionar "General": Ves plantillas generales
   - Al seleccionar "Cardiología": NO ves plantillas de cardiología (acceso denegado)

#### Paso 3: Login como Cardiólogo
1. Cierra sesión
2. Inicia sesión con `cardio@test.com`
3. Ve a **Plantillas** en el panel derecho
4. **Resultado esperado**:
   - Al seleccionar "Cardiología": Ves plantillas de cardiología
   - Al seleccionar "General": Ves plantillas generales
   - Al seleccionar "Oftalmología": NO ves plantillas de oftalmología (acceso denegado)

### 4. Verificar "Mis Modelos"

1. Con cualquier usuario autenticado
2. Ve a **Plantillas > Mis Modelos**
3. Crea una plantilla personalizada
4. La plantilla se guarda en localStorage y es **privada para ese usuario**
5. Cierra sesión y entra con otro usuario
6. **Resultado esperado**: Las plantillas personalizadas NO se comparten entre usuarios

## 🔍 Cómo funciona el sistema mock

### Almacenamiento
- **Usuarios**: `localStorage['mock_auth_users']`
- **Sesión actual**: `localStorage['mock_auth_current_user']`
- **Plantillas personalizadas**: `localStorage['verbadoc-health-custom-templates']`

### Verificar datos en localStorage

Abre las DevTools del navegador (F12) y ve a:
- **Application** (Chrome) / **Storage** (Firefox)
- **Local Storage** > `http://localhost:3002`
- Verás las claves `mock_auth_users` y `mock_auth_current_user`

### Limpiar todos los datos de prueba

Si quieres empezar de cero:

```javascript
// Ejecuta esto en la consola del navegador (F12)
localStorage.removeItem('mock_auth_users');
localStorage.removeItem('mock_auth_current_user');
localStorage.removeItem('verbadoc-health-custom-templates');
location.reload();
```

## 🧪 Casos de prueba sugeridos

### Caso 1: Control de acceso funciona
1. Crear usuario de Oftalmología
2. Verificar que NO puede ver plantillas de Cardiología
3. ✅ Esperado: Solo ve Oftalmología + General

### Caso 2: Usuario General tiene acceso total
1. Crear usuario con especialidad "Medicina General"
2. Verificar que puede ver todas las especialidades
3. ✅ Esperado: Ve todas las plantillas

### Caso 3: Plantillas personalizadas son privadas
1. Usuario A crea una plantilla personalizada
2. Cerrar sesión
3. Usuario B inicia sesión
4. ✅ Esperado: Usuario B NO ve la plantilla de Usuario A

### Caso 4: Sesión persiste al recargar
1. Iniciar sesión
2. Recargar la página (F5)
3. ✅ Esperado: Usuario sigue autenticado

### Caso 5: Logout funciona correctamente
1. Iniciar sesión
2. Hacer clic en el botón de cerrar sesión
3. ✅ Esperado: Vuelves a la pantalla de login

## 📝 Mensajes de error en español

El sistema mock simula los mismos errores que Firebase:

- `auth/email-already-in-use`: "Este email ya está registrado"
- `auth/user-not-found`: "Usuario no encontrado"
- `auth/wrong-password`: "Contraseña incorrecta"
- `auth/invalid-email`: "Email inválido"
- `auth/weak-password`: "La contraseña debe tener al menos 6 caracteres"

## 🔄 Cambiar a Firebase Real (Mañana)

Cuando configures Firebase mañana, solo necesitas cambiar 3 imports:

### En `App.tsx` (línea 23):
```typescript
// CAMBIAR ESTO:
import { AuthProvider, useAuth } from './contexts/AuthContext.mock.tsx';

// POR ESTO:
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
```

### En `components/TemplatesPanel.tsx` (línea 9):
```typescript
// CAMBIAR ESTO:
import { useAuth } from '../contexts/AuthContext.mock.tsx';

// POR ESTO:
import { useAuth } from '../contexts/AuthContext.tsx';
```

### En `src/components/AuthModal.tsx` (línea 3):
```typescript
// CAMBIAR ESTO:
import { useAuth, MedicalSpecialty } from '../contexts/AuthContext.mock';

// POR ESTO:
import { useAuth, MedicalSpecialty } from '../contexts/AuthContext';
```

**Sigue las instrucciones de `FIREBASE_SETUP.md`** para configurar Firebase.

## 🐛 Solución de problemas

### "La pantalla queda en blanco"
- Abre la consola del navegador (F12)
- Verifica si hay errores
- Intenta limpiar localStorage (ver arriba)

### "No puedo iniciar sesión"
- Verifica que el email y contraseña sean correctos
- La contraseña debe tener mínimo 6 caracteres
- Intenta crear un usuario nuevo

### "Las plantillas no se filtran"
- Verifica que iniciaste sesión correctamente
- El nombre del usuario debe aparecer en el header
- Intenta cerrar sesión y volver a entrar

## 📊 Estado de la implementación

- ✅ Registro de usuarios
- ✅ Login con email/contraseña
- ✅ Logout
- ✅ Sesión persistente (recarga página)
- ✅ Control de acceso por especialidad
- ✅ Filtrado de plantillas según permisos
- ✅ UI de usuario autenticado en header
- ✅ Plantillas personalizadas privadas
- ✅ Mensajes de error en español

## 🎉 ¡Listo para probar!

Todo está configurado. Simplemente abre `http://localhost:3002` y comienza a crear usuarios con diferentes especialidades para ver cómo funciona el acceso condicional.
