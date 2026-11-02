# AlquiTech

Aplicación web para la gestión del alquiler de inmuebles entre **propietarios** e **inquilinos**.

Proyecto intermodular de 2 Aplicaciones Web (DAW) · Grupo 2 – AlquiTech.

Esta rama (`main`) contiene solo la **última versión revisada** de la web. Las versiones anteriores (`v0.0` a `v0.6`) se conservan en la rama `Producción`, donde se van subiendo los cambios conforme se desarrolla el proyecto.

---

## Equipo

| Persona | Rol | Tareas principales |
|---|---|---|
| Nadia Pérez | CEO y Project Manager | Coordinación del proyecto, organización de tareas, integración frontend + backend, testing y control de calidad, documentación |
| Edson Vilchez | Backend Manager | Lógica del servidor, base de datos, APIs REST, seguridad y autenticación |
| Andrea Hernández | Frontend Manager | Diseño de interfaz (HTML, CSS, JS), experiencia de usuario (UX/UI), integración con APIs |

---

## Versión actual: v0.7

La carpeta [`v0.7`](v0.7) contiene el **frontend completo** de la web: parte pública, pantallas del propietario y del inquilino, solicitudes de alquiler con sistema de solvencia (scoring) en estrellas, páginas legales y de contacto, y perfil de usuario con menú en la cabecera y foto de perfil. Solo falta la conexión con el backend.

### Estructura

```
v0.7/
├── HTML/    Páginas de la web
├── CSS/     Hoja de estilos
├── JS/      Scripts (menú, validación de formularios, filtros)
├── IMG/     Logo, iconos y fotografías
└── README.md
```

### Páginas (32)

**Parte pública**
- **Inicio** (`index.html`): presentación de AlquiTech, funcionalidades y roles.
- **Registro** (`registro.html`) e **Iniciar sesión** (`login.html`), con validación.
- **Recuperar contraseña** (`recuperar-contrasena.html`).
- **Inmuebles** (`inmuebles.html`): catálogo con filtros por ciudad y precio.
- **Detalle de inmueble** (`detalle-inmueble.html`): ficha de cada inmueble.
- **¿Cómo funciona?** (`como-funciona.html`): guía paso a paso y preguntas frecuentes.
- **Contacto** (`contacto.html`), **Aviso legal** (`aviso-legal.html`) y **Política de privacidad** (`privacidad.html`).

**Propietario**
- **Panel** (`dashboard-propietario.html`).
- **Mis inmuebles** (`mis-inmuebles.html`), **Publicar inmueble** (`publicar-inmueble.html`) y **Editar inmueble** (`editar-inmueble.html`).
- **Solicitudes de alquiler** (`solicitudes-propietario.html`): aceptar o rechazar, con la solvencia de cada solicitud.
- **Contratos** (`contratos-propietario.html`) y **Detalle de contrato** (`detalle-contrato.html`).
- **Pagos** (`pagos-propietario.html`): con filtro y opción de confirmar los pagos.
- **Incidencias** (`incidencias-propietario.html`) y **Detalle de incidencia** (`detalle-incidencia-propietario.html`), con cambio de estado.
- **Mensajes** (`mensajes-propietario.html`).
- **Mi perfil** (`perfil-propietario.html`).

**Inquilino**
- **Panel** (`dashboard-inquilino.html`).
- **Solicitar alquiler** (`solicitar-alquiler.html`).
- **Mi contrato** (`mi-contrato.html`).
- **Pagos** (`pagos-inquilino.html`) y **Subir justificante** (`subir-justificante.html`).
- **Incidencias** (`incidencias-inquilino.html`), **Nueva incidencia** (`nueva-incidencia.html`) y **Detalle de incidencia** (`detalle-incidencia-inquilino.html`).
- **Mensajes** (`mensajes-inquilino.html`).
- **Mi perfil** (`perfil-inquilino.html`).

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
| `v0.5` | Añade las pantallas del inquilino: mi contrato, pagos, incidencias (listado y formulario) y mensajes. |
| `v0.6` | Añade las pantallas del propietario: contratos, pagos, incidencias y mensajes. |
| `v0.7` | Frontend completo: detalles de incidencia y contrato, editar inmueble, solicitudes de alquiler con solvencia en estrellas, ¿Cómo funciona?, páginas legales y contacto, recuperar contraseña, justificantes, confirmar pagos y perfil con menú y foto. |

---

## Tecnologías

**Frontend:** HTML5, CSS3 y JavaScript sin librerías. Tipografías Montserrat (títulos) y Lato (texto) de Google Fonts. La foto de perfil se guarda de momento en el navegador con `localStorage`.

**Previstas para la siguiente fase:** base de datos MySQL, con autenticación segura.

---

## Cómo ver la web

1. Descargar o clonar el repositorio.
2. Abrir en el navegador el archivo `v0.7/HTML/index.html`.
3. Para entrar a los paneles sin iniciar sesión, usar la caja "Vistas de demo" (abajo a la derecha).

No hace falta instalar nada.

---

## Estado del proyecto

- [x] Prototipo inicial (v0.0)
- [x] Diseño de pantallas y frontend con el diseño real (v0.1)
- [x] Detalle de inmueble, publicar inmueble y mis inmuebles (v0.2 a v0.4)
- [x] Pantallas del inquilino y del propietario: contratos, pagos, incidencias y mensajes (v0.5 y v0.6)
- [x] Frontend completo: detalles, solicitudes con solvencia, páginas legales y contacto, perfil de usuario (v0.7)
- [ ] Conexión con el backend y la base de datos
- [ ] Despliegue
