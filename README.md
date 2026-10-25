# AlquiTech

Aplicación web para la gestión del alquiler de inmuebles entre **propietarios** e **inquilinos**.

Proyecto intermodular de 2 Aplicaciones Web (DAW) · Grupo 2 – AlquiTech.

Esta rama (`main`) contiene solo la **última versión revisada** de la web. Las versiones anteriores (`v0.0` a `v0.3`) se conservan en la rama `Producción`, donde se van subiendo los cambios conforme se desarrolla el proyecto.

---

## Equipo

| Persona | Rol | Tareas principales |
|---|---|---|
| Nadia Pérez | CEO y Project Manager | Coordinación del proyecto, organización de tareas, integración frontend + backend, testing y control de calidad, documentación |
| Edson Vilchez | Backend Manager | Lógica del servidor, base de datos, APIs REST, seguridad y autenticación |
| Andrea Hernández | Frontend Manager | Diseño de interfaz (HTML, CSS, JS), experiencia de usuario (UX/UI), integración con APIs |

---

## Versión actual: v0.4

La carpeta [`v0.4`](v0.4) contiene el frontend completo hasta ahora: diseño real de los mockups, formularios con validación, catálogo con filtros y las pantallas del propietario.

### Estructura

```
v0.4/
├── HTML/    Páginas de la web
├── CSS/     Hoja de estilos
├── JS/      Scripts (menú, validación de formularios, filtros)
├── IMG/     Logo, iconos y fotografías
└── README.md
```

### Páginas

- **Inicio** (`index.html`): presentación de AlquiTech, funcionalidades y roles.
- **Registro** (`registro.html`): alta de propietario o inquilino con validación.
- **Iniciar sesión** (`login.html`): acceso con correo y contraseña.
- **Inmuebles** (`inmuebles.html`): catálogo con filtros por ciudad y precio.
- **Detalle de inmueble** (`detalle-inmueble.html`): ficha de cada inmueble.
- **Panel del propietario** (`dashboard-propietario.html`).
- **Publicar inmueble** (`publicar-inmueble.html`): formulario con validación.
- **Mis inmuebles** (`mis-inmuebles.html`): listado del propietario.
- **Panel del inquilino** (`dashboard-inquilino.html`).

---

## Historial de versiones

Cada versión nueva se añade en su propia carpeta en la rama `Producción`. Cuando una versión está revisada, pasa a `main` y esta rama se queda solo con la última.

| Versión | Descripción |
|---|---|
| `v0.0` | Prototipado temprano: código de prueba de la fase inicial de desarrollo. |
| `v0.1` | Frontend con el diseño real de los mockups: 6 páginas, estilos de la guía de estilo definitiva y validación de formularios con JavaScript. |
| `v0.2` | Añade la página de detalle de inmueble, a la que se llega desde el catálogo. |
| `v0.3` | Añade el formulario de publicar inmueble del propietario, con validación. |
| `v0.4` | Añade el listado "Mis inmuebles" del propietario. |

---

## Tecnologías

**Frontend:** HTML5, CSS3 y JavaScript sin librerías. Tipografías Montserrat (títulos) y Lato (texto) de Google Fonts.

**Previstas para la siguiente fase:** base de datos MySQL, con autenticación segura.

---

## Cómo ver la web

1. Descargar o clonar el repositorio.
2. Abrir en el navegador el archivo `v0.4/HTML/index.html`.

No hace falta instalar nada.

---

## Estado del proyecto

- [x] Prototipo inicial (v0.0)
- [x] Diseño de pantallas y frontend con el diseño real (v0.1)
- [x] Detalle de inmueble, publicar inmueble y mis inmuebles (v0.2 a v0.4)
- [ ] Resto de páginas (contratos, pagos, incidencias…)
- [ ] Conexión con el backend y la base de datos
- [ ] Despliegue
