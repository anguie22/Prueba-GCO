# Prueba técnica GCO

Este es un proyecto de prueba técnica enfocado en un entorno de desarrollo **fullstack** con:
- **Backend:** Java + Spring Boot + MySQL
- **Frontend:** HTML, CSS y JavaScript puro

## 🚀 Funcionalidad
- Formulario de inscripción para un programa de fidelidad.
- Se registran: tipo de identificación, número, nombres, apellidos, fecha de nacimiento, dirección, país, departamento, ciudad y marca.
- Los catálogos (países, ciudades, marcas, etc.) se cargan desde la base de datos.
- Al seleccionar una marca, el logo aparece como fondo de pantalla.

## ▶️ Cómo ejecutar
1. Levantar la base de datos MySQL con el script proporcionado.
2. Configurar `application.properties` en el backend (usuario, contraseña, BD).
3. Ejecutar el backend con `mvn spring-boot:run`.
4. Abrir el `index.html` del frontend con Live Server u otro servidor estático.


