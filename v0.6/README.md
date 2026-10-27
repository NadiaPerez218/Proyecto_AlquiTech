# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.6: frontend con las pantallas del propietario (contratos, pagos, incidencias y mensajes).

## Novedades respecto a la v0.5
- Nueva página `HTML/contratos-propietario.html`: resumen y tabla con los contratos de los inmuebles alquilados.
- Nueva página `HTML/pagos-propietario.html`: pagos de los inquilinos, con filtro por estado (pagado o pendiente).
- Nueva página `HTML/incidencias-propietario.html`: incidencias que han avisado los inquilinos, con resumen por estado.
- Nueva página `HTML/mensajes-propietario.html`: conversaciones con cada inquilino, con botones para cambiar de conversación y envío de mensajes.
- El menú del propietario (panel, "Mis inmuebles" y "Publicar inmueble") ya enlaza a todas sus páginas, igual que los enlaces "Ver todos" del panel.
- Los bloques 11, 12 y 13 de `JS/scripts.js` ahora sirven tanto a la vista del inquilino como a la del propietario (pagos, incidencias y mensajes).
- Nuevas clases de CSS: `.pestanas-chat` y `.pestana` (botones para elegir la conversación) y `.cifra-fecha` (cifra más pequeña para fechas).
- El primer mensaje del chat del inquilino se ha cambiado para que sea la misma conversación que ve el propietario con Juan García.

## Qué falta
- Los mensajes enviados solo se ven en pantalla: al recargar desaparecen, porque no hay backend.
- Los enlaces "Ver contrato", "Justificante", "Confirmar", "Ver" y "Actualizar" (cambiar el estado de una incidencia) del propietario todavía no hacen nada: necesitan backend o páginas de detalle.
- Siguen sin hacer nada los botones de descargar y los enlaces de justificantes de la vista del inquilino.
- Faltan los detalles de contrato y de incidencia, y la página para editar un inmueble.
- Páginas de "Aviso legal", "Privacidad" y "Contacto".
- Todos los datos están escritos a mano en el HTML: cuando haya base de datos vendrán de ella.
- Por debajo de 1280 px de ancho, las tablas se desplazan dentro de su caja.
- Entre 1101 y 1279 px, el menú del propietario queda ligeramente corrido a la izquierda (desde 1280 px está centrado).
- La caja "Vistas de demo" es provisional y se quitará cuando el login lleve a cada panel.

## Cómo verlo
Abrir `HTML/index.html` en el navegador.
