# AlquiTech

Aplicación web para la gestión del alquiler de inmuebles entre **propietarios** e **inquilinos**.

Proyecto intermodular de 2 Aplicaciones Web (DAW) · Grupo 2 – AlquiTech.

Esta rama (`Producción`) es donde se van subiendo los cambios y las diferentes versiones de la web conforme se desarrolla. Cuando una versión está revisada, se une a `main`.

---

## Equipo

| Persona | Rol | Tareas principales |
|---|---|---|
| Nadia Pérez | CEO y Project Manager | Coordinación del proyecto, organización de tareas, integración frontend + backend, testing y control de calidad, documentación |
| Edson Vilchez | Backend Manager | Lógica del servidor, base de datos, APIs REST, seguridad y autenticación |
| Andrea Hernández | Frontend Manager | Diseño de interfaz (HTML, CSS, JS), experiencia de usuario (UX/UI), integración con APIs |

---

## Versiones

Cada versión vive en su propia carpeta, para conservar el historial de cómo ha ido evolucionando la web.

| Carpeta | Descripción |
|---|---|
| [`v0.0`](v0.0) | Prototipado temprano: código de prueba de la fase inicial de desarrollo. |
| [`v0.1`](v0.1) | Frontend con el diseño real de los mockups: 6 páginas, estilos de la guía de estilo definitiva y validación de formularios con JavaScript. |
| [`v0.2`](v0.2) | Añade la página de detalle de inmueble, a la que se llega desde el catálogo. |
| [`v0.3`](v0.3) | Añade el formulario de publicar inmueble del propietario, con validación. |
| [`v0.4`](v0.4) | Añade el listado "Mis inmuebles" del propietario. |
| [`v0.5`](v0.5) | Añade las pantallas del inquilino: mi contrato, pagos, incidencias (listado y formulario) y mensajes. |
| [`v0.6`](v0.6) | Añade las pantallas del propietario: contratos, pagos, incidencias y mensajes. |
| [`v0.7`](v0.7) | Frontend completo: detalles de incidencia y contrato, editar inmueble, solicitudes de alquiler con solvencia en estrellas, ¿Cómo funciona?, páginas legales y contacto, recuperar contraseña, justificantes, confirmar pagos y perfil con menú y foto. |

### Estructura de cada versión

```
vX.X/
├── HTML/    Páginas de la web
├── CSS/     Hoja de estilos
├── JS/      Scripts (menú, validación de formularios, filtros)
├── IMG/     Logo, iconos y fotografías
└── README.md
```

---

## Páginas de la versión actual (v0.7)

**Parte pública**

- **Inicio** (`index.html`): presentación de AlquiTech, funcionalidades y roles.
- **Registro** (`registro.html`): alta de propietario o inquilino con validación.
- **Iniciar sesión** (`login.html`): acceso con correo y contraseña.
- **Inmuebles** (`inmuebles.html`): catálogo con filtros por ciudad y precio.
- **Detalle de inmueble** (`detalle-inmueble.html`), nueva en la v0.2.
- **¿Cómo funciona?** (`como-funciona.html`), nueva en la v0.7.
- **Contacto** (`contacto.html`), nueva en la v0.7.
- **Aviso legal** (`aviso-legal.html`), nueva en la v0.7.
- **Política de privacidad** (`privacidad.html`), nueva en la v0.7.
- **Recuperar contraseña** (`recuperar-contrasena.html`), nueva en la v0.7.

**Propietario**
- **Panel del propietario** (`dashboard-propietario.html`).
- **Mis inmuebles** (`mis-inmuebles.html`), nueva en la v0.4.
- **Publicar inmueble** (`publicar-inmueble.html`), nueva en la v0.3.
- **Editar inmueble** (`editar-inmueble.html`), nueva en la v0.7.
- **Solicitudes de alquiler** (`solicitudes-propietario.html`), nueva en la v0.7.
- **Contratos** (`contratos-propietario.html`), nueva en la v0.6.
- **Detalle de contrato** (`detalle-contrato.html`), nueva en la v0.7.
- **Pagos** (`pagos-propietario.html`), nueva en la v0.6.
- **Incidencias** (`incidencias-propietario.html`), nueva en la v0.6.
- **Detalle de incidencia** (`detalle-incidencia-propietario.html`), nueva en la v0.7.
- **Mensajes** (`mensajes-propietario.html`), nueva en la v0.6.
- **Mi perfil** (`perfil-propietario.html`), nueva en la v0.7.

**Inquilino**
- **Panel del inquilino** (`dashboard-inquilino.html`).
- **Solicitar alquiler** (`solicitar-alquiler.html`), nueva en la v0.7.
- **Mi contrato** (`mi-contrato.html`), nueva en la v0.5.
- **Pagos** (`pagos-inquilino.html`), nueva en la v0.5.
- **Subir justificante** (`subir-justificante.html`), nueva en la v0.7.
- **Incidencias** (`incidencias-inquilino.html`), nueva en la v0.5.
- **Nueva incidencia** (`nueva-incidencia.html`), nueva en la v0.5.
- **Detalle de incidencia** (`detalle-incidencia-inquilino.html`), nueva en la v0.7.
- **Mensajes** (`mensajes-inquilino.html`), nueva en la v0.5.
- **Mi perfil** (`perfil-inquilino.html`), nueva en la v0.7.

---

## Tecnologías

**Frontend (v0.7):** HTML5, CSS3 y JavaScript sin librerías. Tipografías Montserrat (títulos) y Lato (texto) de Google Fonts. La foto de perfil se guarda de momento en el navegador con `localStorage`.

**Previstas para la siguiente fase:** base de datos MySQL, con autenticación segura.

---

## Cómo ver la web

1. Descargar o clonar el repositorio.
2. Abrir en el navegador el archivo `index.html` de la versión que se quiera ver, por ejemplo `v0.1/HTML/index.html`.

No hace falta instalar nada.

---

## Estado del proyecto

- [x] Prototipo inicial (v0.0)
- [x] Diseño de pantallas y frontend con el diseño real (v0.1)
- [x] Detalle de inmueble, publicar inmueble y mis inmuebles (v0.2 a v0.4)
- [x] Pantallas del inquilino: contrato, pagos, incidencias y mensajes (v0.5)
- [x] Pantallas del propietario: contratos, pagos, incidencias y mensajes (v0.6)
- [x] Frontend completo: detalles, solicitudes con solvencia, páginas legales y contacto, perfil de usuario (v0.7)
- [ ] Conexión con el backend y la base de datos
- [ ] Despliegue
