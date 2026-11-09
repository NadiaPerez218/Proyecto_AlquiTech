# Proyecto_AlquiTech
Repositorio AlquiTech

Versión 0.8: correcciones de la fase de testeo (Entregable 5). Corrige las dos incidencias encontradas al ejecutar el banco de pruebas del frontend v0.7. Las páginas son las mismas que en la v0.7.

## Novedades respecto a la v0.7

### INC-01 · El DNI no comprobaba la letra de control
- **Problema**: la validación del DNI aceptaba cualquier letra detrás de los 8 números (por ejemplo, `12345678A`, cuando a 12345678 le corresponde la Z). Además, el mensaje de error y el ejemplo del campo DNI del registro ponían `12345678A`.
- **Solución** (`JS/scripts.js`, función `esDniValido`): se calcula la letra que corresponde. Se divide el número entre 23 y el resto (de 0 a 22) indica la posición de la letra en la lista oficial `TRWAGMYFPDXBNJZSQVHLCKE`. Si la letra escrita no es esa, el DNI no es válido.
- El mensaje de error pasa a ser "Escribe un DNI válido: 8 números y su letra, por ejemplo 12345678Z." y el ejemplo del campo DNI de `HTML/registro.html` pasa a `12345678Z`.

### INC-02 · La caja "Vistas de demo" tapaba contenido en el móvil
- **Problema**: en pantallas pequeñas, la caja provisional "Vistas de demo" (fija abajo a la derecha) tapaba parte del contenido, por ejemplo el botón "Empezar gratis" de la página de inicio.
- **Solución** (`CSS/style.css`, versión móvil): en pantallas de 800 px o menos, la caja deja de estar fija y se coloca al final de la página, centrada, debajo del pie. En escritorio no cambia.

### Pruebas de regresión
Las dos correcciones se han comprobado repitiendo las pruebas afectadas:
- Pruebas unitarias con Jest: 31 de 31 superadas (antes 28 de 29), con 2 pruebas nuevas del DNI.
- Registro: con `12345678A` sale el error del DNI y con `12345678Z` el registro se completa.
- Móvil (375 px): las 18 páginas revisadas siguen sin desplazamiento horizontal y la caja de demo ya no tapa contenido.

## Archivos cambiados
- `JS/scripts.js` (función `esDniValido` y mensaje de error del DNI)
- `CSS/style.css` (bloque 6 y versión móvil)
- `HTML/registro.html` (ejemplo del campo DNI)

## Qué falta (necesita el backend)
- Iniciar sesión de verdad y llevar a cada usuario a su panel. Entonces se quitará la caja "Vistas de demo".
- Descargar el contrato y los documentos, y ver los justificantes de pago.
- Que los datos vengan de la base de datos y que se guarden los cambios.
- Subir la foto de perfil al servidor (ahora se guarda solo en el navegador).
- Todos estos puntos están marcados con comentarios `Pendiente` en el HTML y el JavaScript.

## Cómo verlo
Abrir `HTML/index.html` en el navegador. Con la caja "Vistas de demo" (abajo a la derecha en escritorio, al final de la página en el móvil) se entra al panel del propietario o del inquilino.
