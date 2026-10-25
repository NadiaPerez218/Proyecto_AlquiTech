/* =====================================================================
   ALQUITECH - JAVASCRIPT (scripts.js)

   BLOQUES:
   1. Menú fijo que se encoge al hacer scroll
   2. Funciones para mostrar y quitar errores (las usan registro y login)
   3. Funciones que comprueban los datos (nombre, correo, DNI y teléfono)
   4. Formulario de registro
   5. Formulario de login
   6. Paneles (dashboards)
   7. Catálogo de inmuebles (filtros)
   ===================================================================== */


/* =====================================================================
   1. MENÚ FIJO QUE SE ENCOGE AL HACER SCROLL
   ===================================================================== */

// Cuando bajamos más de 80 px el header se encoge (clase "reducido").
// Cuando volvemos a menos de 20 px recupera su tamaño.
// Se usan dos números distintos para que el header no parpadee en el límite.
function controlarMenu() {
  const cabecera = document.querySelector('header');

  if (window.scrollY > 80) {
    cabecera.classList.add('reducido');
  } else if (window.scrollY < 20) {
    cabecera.classList.remove('reducido');
  }
}

window.addEventListener('scroll', controlarMenu);


/* =====================================================================
   2. FUNCIONES PARA MOSTRAR Y QUITAR ERRORES
   ===================================================================== */

// Escribe el mensaje de error debajo del campo y le pone el borde rojo
function mostrarError(idCampo, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  document.getElementById(idCampo).classList.add('campo-error');
}

// Quita el mensaje y el borde rojo de un solo campo.
// El mensaje de cada campo tiene como id "error-" + el id del campo.
function quitarError(idCampo) {
  document.getElementById('error-' + idCampo).textContent = '';
  document.getElementById(idCampo).classList.remove('campo-error');
}

// Quita todos los mensajes y todos los bordes rojos de un formulario
function limpiarErrores(formulario) {
  const errores = formulario.querySelectorAll('.error');
  for (let i = 0; i < errores.length; i++) {
    errores[i].textContent = '';
  }

  const camposConError = formulario.querySelectorAll('.campo-error');
  for (let i = 0; i < camposConError.length; i++) {
    camposConError[i].classList.remove('campo-error');
  }
}


/* =====================================================================
   3. FUNCIONES QUE COMPRUEBAN LOS DATOS
   Todas devuelven true (correcto) o false (incorrecto)
   ===================================================================== */

// Nombre y apellidos: mínimo 2 letras y sin números
function esNombreValido(texto) {
  if (texto.length < 2) {
    return false;
  }

  for (let i = 0; i < texto.length; i++) {
    const letra = texto.charAt(i);
    if (letra >= '0' && letra <= '9') {
      return false;
    }
  }

  return true;
}

// Correo: algo + @ + algo + punto + al menos 2 letras (ejemplo: ana@correo.es)
function esEmailValido(texto) {
  const posicionArroba = texto.indexOf('@');
  const posicionUltimoPunto = texto.lastIndexOf('.');

  // No puede tener espacios
  if (texto.indexOf(' ') !== -1) {
    return false;
  }

  // Tiene que haber una @ y algo escrito antes
  if (posicionArroba < 1) {
    return false;
  }

  // Solo puede haber una @
  if (texto.indexOf('@', posicionArroba + 1) !== -1) {
    return false;
  }

  // Después de la @ tiene que haber algo, un punto y algo más
  if (posicionUltimoPunto < posicionArroba + 2) {
    return false;
  }

  // Después del último punto tiene que haber al menos 2 letras
  if (texto.length - posicionUltimoPunto - 1 < 2) {
    return false;
  }

  return true;
}

// DNI: 8 números y una letra (ejemplo: 12345678A)
function esDniValido(texto) {
  if (texto.length !== 9) {
    return false;
  }

  // Los 8 primeros caracteres tienen que ser números
  for (let i = 0; i < 8; i++) {
    const numero = texto.charAt(i);
    if (numero < '0' || numero > '9') {
      return false;
    }
  }

  // El último carácter tiene que ser una letra
  const letra = texto.charAt(8).toUpperCase();
  if (letra < 'A' || letra > 'Z') {
    return false;
  }

  return true;
}

// Teléfono: 9 cifras que empiecen por 6, 7, 8 o 9 (puede llevar espacios y el prefijo +34)
function esTelefonoValido(texto) {
  // Quitamos los espacios: "600 00 00 00" pasa a ser "600000000"
  let numero = texto.split(' ').join('');

  // Quitamos el prefijo +34 si lo lleva
  if (numero.indexOf('+34') === 0) {
    numero = numero.substring(3);
  }

  if (numero.length !== 9) {
    return false;
  }

  // Todos los caracteres tienen que ser números
  for (let i = 0; i < 9; i++) {
    const cifra = numero.charAt(i);
    if (cifra < '0' || cifra > '9') {
      return false;
    }
  }

  // La primera cifra tiene que ser 6, 7, 8 o 9
  if (numero.charAt(0) < '6') {
    return false;
  }

  return true;
}


/* =====================================================================
   4. FORMULARIO DE REGISTRO
   ===================================================================== */

const formularioRegistro = document.getElementById('formulario-registro');

// Cuando la persona escribe en un campo, se quita el error de ese campo
function quitarErrorAlEscribir(evento) {
  const campo = evento.target;
  quitarError(campo.id);

  // Si cambia la contraseña, el aviso "no coinciden" ya no vale
  if (campo.id === 'contrasena') {
    quitarError('confirmar-contrasena');
  }
}

// Cuando se elige una opción de tipo de usuario, se quita su error
function quitarErrorDelTipoDeUsuario() {
  document.getElementById('error-rol').textContent = '';
}

// Se ejecuta al pulsar el botón "Crear cuenta"
function validarRegistro(evento) {
  evento.preventDefault();

  // Campos del formulario
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const dni = document.getElementById('dni');
  const contrasena = document.getElementById('contrasena');
  const confirmarContrasena = document.getElementById('confirmar-contrasena');
  const opcionesRol = document.getElementsByName('rol');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioRegistro);

  // --- Nombre ---
  if (nombre.value.trim() === '') {
    mostrarError('nombre', 'error-nombre', 'El nombre es obligatorio.');
    if (primerError === null) {
      primerError = nombre;
    }
  } else if (esNombreValido(nombre.value.trim()) === false) {
    mostrarError('nombre', 'error-nombre', 'Introduce un nombre válido (mínimo 2 letras).');
    if (primerError === null) {
      primerError = nombre;
    }
  }

  // --- Apellidos ---
  if (apellidos.value.trim() === '') {
    mostrarError('apellidos', 'error-apellidos', 'Los apellidos son obligatorios.');
    if (primerError === null) {
      primerError = apellidos;
    }
  } else if (esNombreValido(apellidos.value.trim()) === false) {
    mostrarError('apellidos', 'error-apellidos', 'Introduce unos apellidos válidos (mínimo 2 letras).');
    if (primerError === null) {
      primerError = apellidos;
    }
  }

  // --- Correo electrónico ---
  if (email.value.trim() === '') {
    mostrarError('email', 'error-email', 'El correo electrónico es obligatorio.');
    if (primerError === null) {
      primerError = email;
    }
  } else if (esEmailValido(email.value.trim()) === false) {
    mostrarError('email', 'error-email', 'Introduce un correo válido, por ejemplo correo@ejemplo.com.');
    if (primerError === null) {
      primerError = email;
    }
  }

  // --- Teléfono (es opcional: solo se comprueba si se ha escrito algo) ---
  if (telefono.value.trim() !== '' && esTelefonoValido(telefono.value.trim()) === false) {
    mostrarError('telefono', 'error-telefono', 'Introduce un teléfono válido de 9 cifras.');
    if (primerError === null) {
      primerError = telefono;
    }
  }

  // --- DNI ---
  if (dni.value.trim() === '') {
    mostrarError('dni', 'error-dni', 'El DNI es obligatorio.');
    if (primerError === null) {
      primerError = dni;
    }
  } else if (esDniValido(dni.value.trim()) === false) {
    mostrarError('dni', 'error-dni', 'Escribe 8 números y una letra, por ejemplo 12345678A.');
    if (primerError === null) {
      primerError = dni;
    }
  }

  // --- Contraseña (mínimo 6 caracteres) ---
  if (contrasena.value.length < 6) {
    mostrarError('contrasena', 'error-contrasena', 'La contraseña debe tener al menos 6 caracteres.');
    if (primerError === null) {
      primerError = contrasena;
    }
  }

  // --- Confirmar contraseña (tiene que ser igual que la contraseña) ---
  if (contrasena.value !== confirmarContrasena.value) {
    mostrarError('confirmar-contrasena', 'error-confirmar-contrasena', 'Las contraseñas no coinciden.');
    if (primerError === null) {
      primerError = confirmarContrasena;
    }
  }

  // --- Tipo de usuario (hay que elegir una de las dos opciones) ---
  let hayRolElegido = false;
  for (let i = 0; i < opcionesRol.length; i++) {
    if (opcionesRol[i].checked) {
      hayRolElegido = true;
    }
  }

  if (hayRolElegido === false) {
    document.getElementById('error-rol').textContent = 'Debes seleccionar un tipo de usuario.';
    if (primerError === null) {
      primerError = opcionesRol[0];
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien
  alert('Registro completado correctamente. (Pendiente de conexión con la API)');
  formularioRegistro.reset();
}

// Solo se activa si la página actual tiene el formulario de registro
if (formularioRegistro) {
  const idsDeLosCampos = ['nombre', 'apellidos', 'email', 'telefono', 'dni', 'contrasena', 'confirmar-contrasena'];
  for (let i = 0; i < idsDeLosCampos.length; i++) {
    document.getElementById(idsDeLosCampos[i]).addEventListener('input', quitarErrorAlEscribir);
  }

  const opcionesRolDelRegistro = document.getElementsByName('rol');
  for (let i = 0; i < opcionesRolDelRegistro.length; i++) {
    opcionesRolDelRegistro[i].addEventListener('change', quitarErrorDelTipoDeUsuario);
  }

  formularioRegistro.addEventListener('submit', validarRegistro);
}


/* =====================================================================
   5. FORMULARIO DE LOGIN
   ===================================================================== */

const formularioLogin = document.getElementById('formulario-login');

// Cuando la persona escribe en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnLogin(evento) {
  const campo = evento.target;
  quitarError(campo.id);
}

// Se ejecuta al pulsar el botón "Entrar"
function validarLogin(evento) {
  evento.preventDefault();

  const email = document.getElementById('email-login');
  const contrasena = document.getElementById('contrasena-login');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioLogin);

  // --- Correo electrónico ---
  if (email.value.trim() === '') {
    mostrarError('email-login', 'error-email-login', 'El correo electrónico es obligatorio.');
    if (primerError === null) {
      primerError = email;
    }
  }

  // --- Contraseña ---
  if (contrasena.value.trim() === '') {
    mostrarError('contrasena-login', 'error-contrasena-login', 'La contraseña es obligatoria.');
    if (primerError === null) {
      primerError = contrasena;
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien
  alert('Inicio de sesión correcto. (Pendiente de conexión con la API)');
  formularioLogin.reset();
}

// Solo se activa si la página actual tiene el formulario de login
if (formularioLogin) {
  document.getElementById('email-login').addEventListener('input', quitarErrorAlEscribirEnLogin);
  document.getElementById('contrasena-login').addEventListener('input', quitarErrorAlEscribirEnLogin);

  formularioLogin.addEventListener('submit', validarLogin);
}


/* =====================================================================
   6. PANELES (DASHBOARDS)
   ===================================================================== */

// Panel del propietario
const dashboardPropietario = document.getElementById('dashboard-propietario');

if (dashboardPropietario) {
  // Por implementar
}

// Panel del inquilino
const dashboardInquilino = document.getElementById('dashboard-inquilino');

if (dashboardInquilino) {
  // Por implementar
}


/* =====================================================================
   7. CATÁLOGO DE INMUEBLES (FILTROS)
   ===================================================================== */

const cuadriculaInmuebles = document.getElementById('cuadricula-inmuebles');
const botonFiltrar = document.getElementById('boton-filtrar');
const botonLimpiar = document.getElementById('boton-limpiar');
const filtroCiudad = document.getElementById('filtro-ciudad');
const filtroPrecioMin = document.getElementById('filtro-precio-min');
const filtroPrecioMax = document.getElementById('filtro-precio-max');
const textoResultados = document.getElementById('texto-resultados');
const sinResultados = document.getElementById('sin-resultados');
const tarjetas = document.querySelectorAll('.tarjeta-inmueble');

// Enseña solo las tarjetas que cumplen los filtros
function filtrar() {
  const ciudad = filtroCiudad.value;

  // Si el precio mínimo está vacío vale 0; si el máximo está vacío no hay límite
  let precioMin = 0;
  if (filtroPrecioMin.value !== '') {
    precioMin = parseInt(filtroPrecioMin.value);
  }

  let precioMax = Infinity;
  if (filtroPrecioMax.value !== '') {
    precioMax = parseInt(filtroPrecioMax.value);
  }

  let visibles = 0;

  for (let i = 0; i < tarjetas.length; i++) {
    const tarjeta = tarjetas[i];
    const ciudadTarjeta = tarjeta.getAttribute('data-ciudad');
    const precioTarjeta = parseInt(tarjeta.getAttribute('data-precio'));

    const coincideCiudad = (ciudad === '' || ciudadTarjeta === ciudad);
    const coincidePrecio = (precioTarjeta >= precioMin && precioTarjeta <= precioMax);

    if (coincideCiudad && coincidePrecio) {
      tarjeta.style.display = 'block';
      visibles++;
    } else {
      tarjeta.style.display = 'none';
    }
  }

  // Texto "Mostrando X resultados"
  if (visibles === 1) {
    textoResultados.textContent = 'Mostrando 1 resultado';
  } else {
    textoResultados.textContent = 'Mostrando ' + visibles + ' resultados';
  }

  // Mensaje de "sin resultados"
  if (visibles === 0) {
    sinResultados.style.display = 'block';
  } else {
    sinResultados.style.display = 'none';
  }
}

// Vacía los filtros y vuelve a enseñar todas las tarjetas
function limpiar() {
  filtroCiudad.value = '';
  filtroPrecioMin.value = '';
  filtroPrecioMax.value = '';
  filtrar();
}

// Solo se activa si la página actual es el catálogo
if (cuadriculaInmuebles) {
  botonFiltrar.addEventListener('click', filtrar);
  botonLimpiar.addEventListener('click', limpiar);
}
