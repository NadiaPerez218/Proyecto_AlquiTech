# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.5: frontend con las pantallas del inquilino (contrato, pagos, incidencias y mensajes).

## Novedades respecto a la v0.4
- Nueva página `HTML/mi-contrato.html`: resumen, datos y condiciones del contrato, y documentos.
- Nueva página `HTML/pagos-inquilino.html`: historial de pagos con filtro por estado (pagado o pendiente).
- Nueva página `HTML/incidencias-inquilino.html`: listado de incidencias con resumen por estado.
- Nueva página `HTML/nueva-incidencia.html`: formulario para avisar de una avería, con validación.
- Nueva página `HTML/mensajes-inquilino.html`: conversación con el propietario y envío de mensajes.
- El menú del panel del inquilino ya enlaza a todas sus páginas (Mi contrato, Pagos, Incidencias y Mensajes).
- El menú del propietario incluye ahora el enlace "Mensajes", igual que el del inquilino.
- Nuevos bloques en `JS/scripts.js`: 11 (filtro de pagos), 12 (incidencias) y 13 (mensajes).

## Qué falta
- Los mensajes enviados solo se ven en pantalla: al recargar desaparecen, porque no hay backend.
- Los botones de descargar (contrato y documentos) y los enlaces "Ver justificante" y "Subir justificante" todavía no hacen nada: necesitan archivos y backend.
- El enlace "Ver" de cada incidencia no lleva a ninguna página (falta el detalle de la incidencia).
- El enlace "Editar" de "Mis inmuebles" todavía no tiene página.
- Páginas del propietario por hacer: contratos, pagos, incidencias y mensajes (sus enlaces del menú todavía no llevan a ninguna parte).
- Páginas de "Aviso legal", "Privacidad" y "Contacto".
- Todos los datos están escritos a mano en el HTML: cuando haya base de datos vendrán de ella.
- La caja "Vistas de demo" es provisional y se quitará cuando el login lleve a cada panel.

## Cómo verlo
Abrir `HTML/index.html` en el navegador.
