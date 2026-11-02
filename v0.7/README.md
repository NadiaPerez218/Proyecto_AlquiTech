# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.7: frontend completo. Añade los detalles de incidencia y de contrato, editar inmueble, las solicitudes de alquiler con sistema de solvencia (scoring), la página "¿Cómo funciona?", las páginas legales y de contacto, recuperar contraseña, subir justificante, confirmar pagos y el perfil de usuario con menú en la cabecera y foto de perfil.

## Novedades respecto a la v0.6

### Páginas nuevas (14)
- `HTML/detalle-incidencia-inquilino.html` y `HTML/detalle-incidencia-propietario.html`: datos, descripción y seguimiento de una incidencia. La del propietario tiene un formulario para cambiar el estado (abierta, en curso o resuelta) con un comentario.
- `HTML/detalle-contrato.html`: contrato del propietario con resumen, datos del inquilino, condiciones y documentos.
- `HTML/editar-inmueble.html`: el formulario de publicar inmueble ya relleno con los datos del inmueble. Al editar, la foto no es obligatoria.
- `HTML/solicitar-alquiler.html`: formulario del inquilino para pedir un inmueble (fecha de entrada, duración, personas, ingresos y mensaje). Se llega desde "Solicitar alquiler" del detalle de inmueble.
- `HTML/solicitudes-propietario.html`: solicitudes recibidas, con botones para aceptarlas o rechazarlas y la solvencia de cada una.
- `HTML/como-funciona.html`: guía paso a paso para propietarios e inquilinos (botones para elegir el perfil) y preguntas frecuentes.
- `HTML/aviso-legal.html` y `HTML/privacidad.html`: aviso legal y política de privacidad (RGPD y LOPDGDD), con un aviso de que es un proyecto académico.
- `HTML/contacto.html`: formulario de contacto con casilla para aceptar la política de privacidad.
- `HTML/recuperar-contrasena.html`: pide el correo y enseña un mensaje de "Revisa tu correo".
- `HTML/subir-justificante.html`: el inquilino envía el comprobante de un pago (fecha, forma de pago y archivo de imagen o PDF).
- `HTML/perfil-propietario.html` y `HTML/perfil-inquilino.html`: foto de perfil, datos personales y cambio de contraseña.

### Funciones nuevas
- **Sistema de solvencia (scoring)**: compara los ingresos de cada solicitud con el precio del alquiler y da de 1 a 5 estrellas (junto al nombre) y una palabra (Alta, Media o Baja). El botón "?" explica cómo se ha calculado. Los ingresos son obligatorios al solicitar un alquiler.
- **Confirmar pago** (pagos del propietario): el pago pasa a "Pagado" con la fecha de hoy y las tarjetas de resumen se recalculan.
- **Menú de perfil en la cabecera** del propietario y del inquilino: sustituye al botón "Cerrar sesión". Es un botón redondo con las iniciales (o la foto de perfil) que abre un submenú con los datos de la cuenta, "Mi perfil" y "Cerrar sesión". Se cierra al clicar fuera o con la tecla Esc. El saludo enseña el nombre ("Hola, Carlos").
- **Foto de perfil**: JPG, PNG o WebP de hasta 2 MB. Se guarda en el navegador (`localStorage`) y sale en la cabecera de todas las páginas de esa cuenta. Se puede quitar.
- **Preguntas frecuentes** que se abren y se cierran: al abrir una se cierra la anterior (`name` en `<details>`) y al clicar fuera se cierran todas.
- Panel del propietario: nueva sección "Solicitudes pendientes". En "Mis inmuebles", el inmueble disponible tiene el enlace "Solicitudes".

### Enlaces que ahora funcionan
- "Ver" y "Actualizar" de las incidencias, "Ver contrato", "Editar" de los inmuebles, "Solicitar alquiler", "Recupérala", "Subir justificante" y "Confirmar".
- El menú "¿Cómo funciona?" y "Contacto" de las páginas públicas, y "Aviso legal", "Privacidad" y "Contacto" del pie de todas las páginas.
- El registro avisa de que al crear la cuenta se aceptan el aviso legal y la política de privacidad.

### JavaScript (`JS/scripts.js`)
- Bloques nuevos del 14 al 26: detalle de incidencia, detalle de contrato, editar inmueble, contacto, ¿Cómo funciona?, solicitar alquiler, solicitudes (solvencia, aceptar y rechazar), recuperar contraseña, subir justificante, confirmar pago, mi perfil, menú de perfil y foto de perfil.
- Las comprobaciones de publicar inmueble están ahora en la función `comprobarDatosInmueble`, que también usa editar inmueble.

### CSS (`CSS/style.css`)
- Bloques nuevos: páginas legales y contacto, ¿Cómo funciona?, solicitudes de alquiler, y recuperar contraseña, justificante y perfil. La versión móvil pasa a ser el bloque 16.
- Estilos del menú de perfil en la cabecera (bloque 4).
- Regla general `[hidden] { display: none !important; }` para que los elementos escondidos con `hidden` no se vean aunque tengan una clase con `display`.
- Colores nuevos: dorado `#E8A317` y gris claro `#D9DEDF` (estrellas de la solvencia).

### Arreglos
- El menú del propietario ya queda centrado entre 1101 y 1279 px de ancho (al quitar el botón "Cerrar sesión" hay sitio de sobra).
- En el móvil, los datos largos (por ejemplo, "Estudio reformado, Valencia") ya no se pegan a su etiqueta.

## Qué falta (necesita el backend)
- Iniciar sesión de verdad y llevar a cada usuario a su panel. Entonces se quitará la caja "Vistas de demo".
- Descargar el contrato y los documentos, y ver los justificantes de pago (necesitan los archivos del servidor).
- Que los datos vengan de la base de datos: ahora están escritos en el HTML o en las listas del JavaScript.
- Que se guarden los cambios: mensajes, estados de las incidencias, solicitudes aceptadas o rechazadas, pagos confirmados y datos del perfil. Ahora solo se ven en pantalla y al recargar se pierden.
- Subir la foto de perfil al servidor (ahora se guarda solo en el navegador).
- Al aceptar una solicitud, rechazar las demás del mismo inmueble y preparar el contrato.
- Que el catálogo distinga los inmuebles ya alquilados.
- Todos estos puntos están marcados con comentarios `Pendiente` en el HTML y el JavaScript.

## Cómo verlo
Abrir `HTML/index.html` en el navegador. Con la caja "Vistas de demo" (abajo a la derecha) se entra al panel del propietario o del inquilino.
