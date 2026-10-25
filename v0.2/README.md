# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.2: frontend con la página de detalle de inmueble.

## Novedades respecto a la v0.1
- Nueva página `HTML/detalle-inmueble.html`: foto, descripción, características y tarjeta con el precio y el botón "Solicitar alquiler".
- Una sola página sirve para todos los inmuebles: el número va en la dirección (`detalle-inmueble.html?id=1`) y el JavaScript rellena los datos.
- Si el número no existe, se muestra el mensaje "No se ha encontrado el inmueble que buscas".
- El botón "Ver inmueble" del catálogo ya lleva a esta página.

## Qué falta
- Los datos de los inmuebles son de prueba (están en `JS/scripts.js`, bloque 8). Cuando haya base de datos vendrán de ella.
- Conexión con el backend y la base de datos.
- El resto de páginas (publicar inmueble, contratos, pagos, incidencias...).
- La caja "Vistas de demo" es provisional y se quitará cuando el login lleve a cada panel.

## Cómo verlo
Abrir `HTML/index.html` en el navegador.
