# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.3: frontend con el formulario de publicar inmueble.

## Novedades respecto a la v0.2
- Nueva página `HTML/publicar-inmueble.html`: formulario del propietario para añadir un inmueble (título, ciudad, dirección, precio, fianza, habitaciones, baños, superficie, descripción, características y foto).
- Validación con JavaScript igual que en registro y login: un mensaje por campo, el cursor va al primer error y el error se quita al escribir.
- Dos funciones nuevas para comprobar números (`esNumeroPositivo` y `esEnteroPositivo`) en `JS/scripts.js`.
- El enlace "+ Añadir inmueble" del panel del propietario ya lleva a esta página.

## Qué falta
- Al publicar solo se muestra un aviso: todavía no se guarda nada (pendiente de la conexión con el backend y la base de datos).
- La lista de ciudades está repetida en el catálogo y en este formulario; habrá que unificarla cuando haya base de datos.
- El resto de páginas (mis inmuebles, contratos, pagos, incidencias...).
- La caja "Vistas de demo" es provisional y se quitará cuando el login lleve a cada panel.

## Cómo verlo
Abrir `HTML/index.html` en el navegador.
