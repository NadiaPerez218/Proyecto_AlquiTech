# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.4: frontend con el listado "Mis inmuebles" del propietario.

## Novedades respecto a la v0.3
- Nueva página `HTML/mis-inmuebles.html`: tabla con los inmuebles del propietario (foto, título, ciudad, precio y estado) y las acciones "Ver" y "Editar".
- El botón "+ Añadir inmueble" lleva al formulario de publicar inmueble.
- Si la tabla no tiene filas, el JavaScript muestra el mensaje "Todavía no has publicado ningún inmueble" (bloque 10 de `JS/scripts.js`).
- En el panel del propietario, el menú "Mis inmuebles" lleva a la página nueva y los enlaces "Ver" llevan al detalle de cada inmueble.

## Qué falta
- El enlace "Editar" todavía no lleva a ninguna página (pendiente de una versión posterior).
- Los inmuebles de la tabla están escritos a mano en el HTML: cuando haya base de datos vendrán de ella.
- El resto de páginas (contratos, pagos, incidencias...).
- La caja "Vistas de demo" es provisional y se quitará cuando el login lleve a cada panel.

## Cómo verlo
Abrir `HTML/index.html` en el navegador.
