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

## Páginas de la versión actual (v0.3)

- **Inicio** (`index.html`): presentación de AlquiTech, funcionalidades y roles.
- **Registro** (`registro.html`): alta de propietario o inquilino con validación.
- **Iniciar sesión** (`login.html`): acceso con correo y contraseña.
- **Inmuebles** (`inmuebles.html`): catálogo con filtros por ciudad y precio.
- **Panel del propietario** (`dashboard-propietario.html`).
- **Panel del inquilino** (`dashboard-inquilino.html`).
- **Detalle de inmueble** (`detalle-inmueble.html`), nueva en la v0.2.
- **Publicar inmueble** (`publicar-inmueble.html`), nueva en la v0.3.

---

## Tecnologías

**Frontend (v0.3):** HTML5, CSS3 y JavaScript sin librerías. Tipografías Montserrat (títulos) y Lato (texto) de Google Fonts.

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
- [ ] Resto de páginas (detalle de inmueble, contratos, pagos, incidencias…)
- [ ] Conexión con el backend y la base de datos
- [ ] Despliegue
