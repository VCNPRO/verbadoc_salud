# Configuración de Firebase para VerbaDoc Salud

Este documento explica cómo configurar Firebase para el sistema de autenticación de VerbaDoc Salud.

## 1. Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto" o "Add project"
3. Nombre del proyecto: `verbadoc-salud` (o el nombre que prefieras)
4. Desactiva Google Analytics si no lo necesitas (opcional)
5. Haz clic en "Crear proyecto"

## 2. Configurar Firebase Authentication

1. En el menú lateral de Firebase Console, ve a **Build > Authentication**
2. Haz clic en "Get started" o "Comenzar"
3. En la pestaña **Sign-in method**, activa el método **Email/Password**:
   - Haz clic en "Email/Password"
   - Activa el primer interruptor (Email/Password)
   - Guarda los cambios
4. (Opcional) En la pestaña **Settings**, configura:
   - Nombre del proyecto visible para los usuarios
   - Dominios autorizados (añade tu dominio de Vercel cuando lo tengas)

## 3. Configurar Firestore Database

1. En el menú lateral, ve a **Build > Firestore Database**
2. Haz clic en "Create database" o "Crear base de datos"
3. Selecciona el modo de inicio:
   - **Producción**: Reglas restrictivas por defecto (recomendado)
   - **Prueba**: Reglas abiertas temporalmente
4. Selecciona la ubicación: **europe-west1 (Belgium)** para cumplir con GDPR
5. Haz clic en "Crear"

## 4. Configurar Reglas de Seguridad de Firestore

Ve a la pestaña **Rules** en Firestore y reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regla para la colección de usuarios
    match /users/{userId} {
      // Los usuarios pueden leer su propio documento
      allow read: if request.auth != null && request.auth.uid == userId;

      // Los usuarios pueden crear su documento solo durante el registro
      allow create: if request.auth != null && request.auth.uid == userId;

      // Los usuarios pueden actualizar solo el campo lastLogin de su documento
      allow update: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['lastLogin']);
    }

    // Regla para plantillas personalizadas (cuando se implementen)
    match /templates/{templateId} {
      // Los usuarios autenticados pueden leer plantillas de su especialidad
      allow read: if request.auth != null;

      // Los usuarios pueden crear plantillas propias
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      // Los usuarios pueden actualizar/eliminar solo sus propias plantillas
      allow update, delete: if request.auth != null
                             && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 5. Obtener las Credenciales de Firebase

1. Ve a **Configuración del proyecto** (ícono de engranaje al lado de "Project Overview")
2. En la sección **General**, desplázate hasta "Tus aplicaciones"
3. Haz clic en el ícono **</>** (Web) para agregar una aplicación web
4. Nombre de la aplicación: `VerbaDoc Salud Web`
5. (Opcional) Marca "Configure Firebase Hosting" si planeas usar Firebase Hosting
6. Haz clic en "Registrar app"
7. **Copia las credenciales** que aparecen. Verás algo como:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "verbadoc-salud.firebaseapp.com",
  projectId: "verbadoc-salud",
  storageBucket: "verbadoc-salud.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## 6. Configurar Variables de Entorno

### Para desarrollo local:

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Añade las siguientes variables con tus credenciales de Firebase:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=verbadoc-salud.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=verbadoc-salud
VITE_FIREBASE_STORAGE_BUCKET=verbadoc-salud.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

3. **IMPORTANTE**: Asegúrate de que `.env.local` está en tu `.gitignore` para no subir las credenciales a GitHub

### Para producción (Vercel):

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings > Environment Variables**
3. Añade cada variable de Firebase una por una:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Marca las tres opciones: Production, Preview, Development
5. Guarda cada variable

## 7. Verificar la Configuración

1. Ejecuta el proyecto localmente: `npm run dev`
2. Abre el navegador en `http://localhost:3000`
3. Deberías ver la pantalla de login/registro
4. Intenta crear una cuenta de prueba
5. Verifica en Firebase Console > Authentication que el usuario se creó
6. Verifica en Firebase Console > Firestore que se creó el documento del usuario en la colección `users`

## 8. Configurar Dominios Autorizados (Producción)

1. Ve a Firebase Console > Authentication > Settings > Authorized domains
2. Añade tu dominio de Vercel: `tu-proyecto.vercel.app`
3. Si tienes un dominio personalizado, añádelo también

## Estructura de Datos en Firestore

### Colección: `users`

```javascript
{
  uid: "firebase-user-id",
  email: "medico@ejemplo.com",
  displayName: "Dr. Juan Pérez",
  specialty: "cardiologia", // general, oftalmologia, cardiologia, etc.
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

## Sistema de Permisos

- **Usuarios con especialidad "general"**: Pueden ver todas las plantillas de todas las especialidades
- **Usuarios con especialidad específica**: Solo pueden ver plantillas de su especialidad + plantillas generales
- **Plantillas personalizadas**: Cada usuario puede crear y guardar sus propias plantillas personalizadas (almacenadas localmente por ahora)

## Solución de Problemas

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Solución**: Añade tu dominio a los dominios autorizados en Firebase Console > Authentication > Settings > Authorized domains

### Error: "Missing or insufficient permissions"

**Solución**: Verifica que las reglas de seguridad de Firestore estén correctamente configuradas (ver paso 4)

### Error: "Firebase: Error (auth/network-request-failed)"

**Solución**: Verifica tu conexión a internet y que las credenciales de Firebase sean correctas

### La autenticación no funciona en Vercel

**Solución**:
1. Verifica que todas las variables de entorno estén configuradas en Vercel
2. Verifica que el dominio de Vercel esté en los dominios autorizados de Firebase
3. Redeploya el proyecto en Vercel después de añadir las variables

## Próximos Pasos (Opcional)

Para implementar almacenamiento de plantillas en Firestore en lugar de localStorage:

1. Crear colección `templates` en Firestore
2. Modificar el código para guardar plantillas personalizadas en Firestore
3. Implementar sincronización entre dispositivos
4. Permitir compartir plantillas entre usuarios de la misma especialidad

## Recursos Adicionales

- [Documentación de Firebase Authentication](https://firebase.google.com/docs/auth)
- [Documentación de Firestore](https://firebase.google.com/docs/firestore)
- [Reglas de Seguridad de Firestore](https://firebase.google.com/docs/firestore/security/get-started)
