# Secure EJS Web Platform - Sistema de Autenticación & SSR 

Este proyecto es una aplicación web *Full-Stack* desarrollada bajo el entorno de **Node.js**. Su núcleo principal es la implementación de un sistema de autenticación de usuarios completamente nativo, acoplado a un motor de plantillas **EJS** para la renderización de vistas dinámicas directamente desde el servidor (Server-Side Rendering).

---

##  Resumen del Proyecto

* **El Desafío**: Construir un flujo de registro e inicio de sesión (*Login/Register*) seguro desde cero, gestionando la encriptación de credenciales, la persistencia de datos y el enrutamiento protegido sin depender de servicios de autenticación externos (como Firebase o Auth0).
* **Propósito**: Consolidar los conceptos de seguridad en el Backend, el manejo de promesas asíncronas, la inyección de datos en vistas EJS y el patrón de diseño Repositorio (`UserRepository`).

---

##  Características de Seguridad y Lógica

* **Cifrado de Contraseñas (Hashing)**: Integración de la librería `bcrypt` con *Salt Rounds* configurables para garantizar que las contraseñas nunca se almacenen en texto plano en la base de datos.
* **Validación de Credenciales Segura**: Uso de `bcrypt.compare()` durante el flujo de *login* para contrastar el hash almacenado con el input del usuario de forma asíncrona.
* **Generación de Identificadores Únicos**: Implementación del módulo nativo `node:crypto` (`crypto.randomUUID()`) para la asignación de IDs únicos e irrepetibles a cada nuevo registro.
* **Patrón Repositorio (`user-repository.js`)**: Encapsulación total de la lógica de acceso a datos y las reglas de negocio (validación de duplicados, errores de inicio de sesión) separadas de los controladores de ruta.
* **Renderizado del Lado del Servidor (SSR)**: Uso de vistas `.ejs` para generar HTML dinámico basado en el estado de la sesión del usuario antes de enviarlo al cliente.

---

##  Estructura del Proyecto


```

├── 📁 Routes           # Definición de endpoints y controladores (Express.js)
├── 📁 baseDeDatos / db # Simulación de base de datos local (db-local)
├── 📁 public           # Archivos estáticos (CSS, imágenes)
├── 📁 src              # Lógica core de la aplicación
├── 📁 views            # Plantillas EJS para el renderizado SSR
│
├── server.js           # Punto de entrada y configuración del servidor Node
├── user-repository.js  # Lógica de persistencia y encriptación de usuarios
└── config.js           # Variables de entorno y configuración (Salt Rounds)

```

---

##  Core Tecnológico

* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**: Entorno de ejecución para el Backend.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript (ES6+)**: Lenguaje principal de desarrollo.
* ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black) **EJS**: Motor de plantillas para Server-Side Rendering.
* **Librerías Clave**: `bcrypt` (Criptografía), `db-local` (Persistencia en archivos) y `node:crypto`.

---

##  Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mcarolinapc/paginaweb.git

   ```

2. Instala las dependencias de Node:
```bash
npm install
```


3. Inicia el servidor de desarrollo:
```bash
npm start

```
*(Nota: Asegúrate de revisar el puerto configurado en `server.js` para acceder desde tu navegador local, usualmente `http://localhost:3000`).*

---

##  Autores

* **Michelle Carolina Posligua Contreras** (Lógica de Autenticación & Backend)
* **Iván Salamanca** (Colaborador)
* **Institución:** Institut Tecnològic Barcelona (ITB)
