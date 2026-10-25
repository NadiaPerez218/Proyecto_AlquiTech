/* =====================================================================
   ALQUITECH - JAVASCRIPT (scripts.js)

   BLOQUES:
   1. Menú fijo que se encoge al hacer scroll
   2. Funciones para mostrar y quitar errores (las usan registro y login)
   3. Funciones que comprueban los datos (nombre, correo, DNI, teléfono y números)
   4. Formulario de registro
   5. Formulario de login
   6. Paneles (dashboards)
   7. Catálogo de inmuebles (filtros)
   8. Detalle de inmueble
   9. Formulario de publicar inmueble
   10. Mis inmuebles (listado del propietario)
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

// Número mayor que 0 (puede llevar decimales). Ejemplo: 950 o 950.5
function esNumeroPositivo(texto) {
  if (texto === '' || isNaN(texto)) {
    return false;
  }

  return Number(texto) > 0;
}

// Número entero mayor que 0 (sin decimales). Ejemplo: 3
function esEnteroPositivo(texto) {
  if (texto === '') {
    return false;
  }

  // Todos los caracteres tienen que ser cifras (así no vale 2.5 ni -1)
  for (let i = 0; i < texto.length; i++) {
    const cifra = texto.charAt(i);
    if (cifra < '0' || cifra > '9') {
      return false;
    }
  }

  return parseInt(texto) > 0;
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


/* =====================================================================
   8. DETALLE DE INMUEBLE
   ===================================================================== */

const detalleInmueble = document.getElementById('detalle-inmueble');

// Lista de inmuebles (datos de prueba).
// Cuando esté la API, estos datos vendrán de la base de datos.
const listaInmuebles = [
  {
    id: 1,
    titulo: 'Piso en el centro',
    ciudad: 'Madrid',
    imagen: '../IMG/piso-centro-madrid.png',
    textoImagen: 'Salón del piso en el centro de Madrid',
    habitaciones: 3,
    banos: 2,
    superficie: 90,
    precio: '950',
    fianza: '950',
    disponibilidad: 'Inmediata',
    descripcion: 'Piso luminoso en pleno centro de Madrid, con tres habitaciones y dos baños. Está muy bien comunicado y tiene todos los servicios a pocos minutos andando.',
    caracteristicas: ['Amueblado', 'Ascensor', 'Calefacción', 'Aire acondicionado', 'Cerca del metro', 'Cocina equipada']
  },
  {
    id: 2,
    titulo: 'Apartamento luminoso',
    ciudad: 'Barcelona',
    imagen: '../IMG/apartamento-luminoso-barcelona.png',
    textoImagen: 'Salón del apartamento luminoso de Barcelona',
    habitaciones: 2,
    banos: 1,
    superficie: 65,
    precio: '1.100',
    fianza: '1.100',
    disponibilidad: 'Inmediata',
    descripcion: 'Apartamento con mucha luz natural y dos habitaciones, en una zona tranquila de Barcelona. Perfecto para una pareja o para compartir.',
    caracteristicas: ['Amueblado', 'Ascensor', 'Calefacción', 'Balcón', 'Cocina equipada']
  },
  {
    id: 3,
    titulo: 'Estudio reformado',
    ciudad: 'Valencia',
    imagen: '../IMG/estudio-reformado-valencia.png',
    textoImagen: 'Estudio reformado de Valencia',
    habitaciones: 1,
    banos: 1,
    superficie: 40,
    precio: '650',
    fianza: '650',
    disponibilidad: 'Inmediata',
    descripcion: 'Estudio recién reformado en Valencia, con la cocina integrada en el salón. Ideal para una persona que busca comodidad y buen precio.',
    caracteristicas: ['Amueblado', 'Reformado', 'Aire acondicionado', 'Cocina equipada']
  },
  {
    id: 4,
    titulo: 'Piso con terraza',
    ciudad: 'Sevilla',
    imagen: '../IMG/piso-terraza-sevilla.png',
    textoImagen: 'Terraza del piso de Sevilla',
    habitaciones: 2,
    banos: 1,
    superficie: 75,
    precio: '800',
    fianza: '800',
    disponibilidad: 'Inmediata',
    descripcion: 'Piso de dos habitaciones con una gran terraza en Sevilla. Tiene mucho espacio exterior y está cerca del transporte público.',
    caracteristicas: ['Terraza', 'Aire acondicionado', 'Calefacción', 'Cerca del transporte público']
  }
];

// Busca un inmueble por su número. Si no existe, devuelve null.
function buscarInmueble(id) {
  for (let i = 0; i < listaInmuebles.length; i++) {
    if (listaInmuebles[i].id === id) {
      return listaInmuebles[i];
    }
  }
  return null;
}

// Rellena la página con los datos del inmueble que indica la dirección (?id=...)
function mostrarDetalle() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'));
  const inmueble = buscarInmueble(id);

  // Si no existe: se esconde el contenido y se enseña el mensaje
  if (inmueble === null) {
    document.getElementById('detalle-contenido').style.display = 'none';
    document.getElementById('detalle-no-encontrado').style.display = 'block';
    return;
  }

  // Título de la pestaña del navegador
  document.title = 'AlquiTech – ' + inmueble.titulo;

  // Título, ubicación, foto y descripción
  document.getElementById('detalle-titulo').textContent = inmueble.titulo;
  document.getElementById('detalle-ubicacion').textContent = inmueble.ciudad;
  document.getElementById('detalle-imagen').src = inmueble.imagen;
  document.getElementById('detalle-imagen').alt = inmueble.textoImagen;
  document.getElementById('detalle-descripcion').textContent = inmueble.descripcion;

  // Tarjeta de precio
  document.getElementById('detalle-precio').textContent = inmueble.precio + ' € / mes';
  document.getElementById('detalle-habitaciones').textContent = inmueble.habitaciones;
  document.getElementById('detalle-banos').textContent = inmueble.banos;
  document.getElementById('detalle-superficie').textContent = inmueble.superficie + ' m²';
  document.getElementById('detalle-fianza').textContent = inmueble.fianza + ' €';
  document.getElementById('detalle-disponibilidad').textContent = inmueble.disponibilidad;

  // Lista de características: se crea un <li> por cada una
  const lista = document.getElementById('detalle-caracteristicas');
  for (let i = 0; i < inmueble.caracteristicas.length; i++) {
    const elemento = document.createElement('li');
    elemento.textContent = inmueble.caracteristicas[i];
    lista.appendChild(elemento);
  }
}

// Solo se activa si la página actual es el detalle de inmueble
if (detalleInmueble) {
  mostrarDetalle();
}


/* =====================================================================
   9. FORMULARIO DE PUBLICAR INMUEBLE
   ===================================================================== */

const formularioPublicar = document.getElementById('formulario-publicar');

// Cuando la persona escribe o elige algo en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnPublicar(evento) {
  quitarError(evento.target.id);
}

// Se ejecuta al pulsar el botón "Publicar inmueble"
function validarPublicar(evento) {
  evento.preventDefault();

  // Campos del formulario
  const titulo = document.getElementById('titulo');
  const ciudad = document.getElementById('ciudad');
  const direccion = document.getElementById('direccion');
  const precio = document.getElementById('precio');
  const fianza = document.getElementById('fianza');
  const habitaciones = document.getElementById('habitaciones');
  const banos = document.getElementById('banos');
  const superficie = document.getElementById('superficie');
  const descripcion = document.getElementById('descripcion');
  const foto = document.getElementById('foto');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioPublicar);

  // --- Título (mínimo 5 caracteres) ---
  if (titulo.value.trim() === '') {
    mostrarError('titulo', 'error-titulo', 'El título es obligatorio.');
    if (primerError === null) {
      primerError = titulo;
    }
  } else if (titulo.value.trim().length < 5) {
    mostrarError('titulo', 'error-titulo', 'El título debe tener al menos 5 caracteres.');
    if (primerError === null) {
      primerError = titulo;
    }
  }

  // --- Ciudad (hay que elegir una) ---
  if (ciudad.value === '') {
    mostrarError('ciudad', 'error-ciudad', 'Selecciona una ciudad.');
    if (primerError === null) {
      primerError = ciudad;
    }
  }

  // --- Dirección (mínimo 5 caracteres) ---
  if (direccion.value.trim() === '') {
    mostrarError('direccion', 'error-direccion', 'La dirección es obligatoria.');
    if (primerError === null) {
      primerError = direccion;
    }
  } else if (direccion.value.trim().length < 5) {
    mostrarError('direccion', 'error-direccion', 'Escribe la dirección completa.');
    if (primerError === null) {
      primerError = direccion;
    }
  }

  // --- Precio (número mayor que 0) ---
  if (precio.value.trim() === '') {
    mostrarError('precio', 'error-precio', 'El precio es obligatorio.');
    if (primerError === null) {
      primerError = precio;
    }
  } else if (esNumeroPositivo(precio.value.trim()) === false) {
    mostrarError('precio', 'error-precio', 'Introduce un precio mayor que 0.');
    if (primerError === null) {
      primerError = precio;
    }
  }

  // --- Fianza (número mayor que 0) ---
  if (fianza.value.trim() === '') {
    mostrarError('fianza', 'error-fianza', 'La fianza es obligatoria.');
    if (primerError === null) {
      primerError = fianza;
    }
  } else if (esNumeroPositivo(fianza.value.trim()) === false) {
    mostrarError('fianza', 'error-fianza', 'Introduce una fianza mayor que 0.');
    if (primerError === null) {
      primerError = fianza;
    }
  }

  // --- Habitaciones (número entero, mínimo 1) ---
  if (habitaciones.value.trim() === '') {
    mostrarError('habitaciones', 'error-habitaciones', 'Indica las habitaciones.');
    if (primerError === null) {
      primerError = habitaciones;
    }
  } else if (esEnteroPositivo(habitaciones.value.trim()) === false) {
    mostrarError('habitaciones', 'error-habitaciones', 'Escribe un número entero (mínimo 1).');
    if (primerError === null) {
      primerError = habitaciones;
    }
  }

  // --- Baños (número entero, mínimo 1) ---
  if (banos.value.trim() === '') {
    mostrarError('banos', 'error-banos', 'Indica los baños.');
    if (primerError === null) {
      primerError = banos;
    }
  } else if (esEnteroPositivo(banos.value.trim()) === false) {
    mostrarError('banos', 'error-banos', 'Escribe un número entero (mínimo 1).');
    if (primerError === null) {
      primerError = banos;
    }
  }

  // --- Superficie (número mayor que 0) ---
  if (superficie.value.trim() === '') {
    mostrarError('superficie', 'error-superficie', 'Indica la superficie.');
    if (primerError === null) {
      primerError = superficie;
    }
  } else if (esNumeroPositivo(superficie.value.trim()) === false) {
    mostrarError('superficie', 'error-superficie', 'Introduce una superficie mayor que 0.');
    if (primerError === null) {
      primerError = superficie;
    }
  }

  // --- Descripción (mínimo 20 caracteres) ---
  if (descripcion.value.trim() === '') {
    mostrarError('descripcion', 'error-descripcion', 'La descripción es obligatoria.');
    if (primerError === null) {
      primerError = descripcion;
    }
  } else if (descripcion.value.trim().length < 20) {
    mostrarError('descripcion', 'error-descripcion', 'La descripción debe tener al menos 20 caracteres.');
    if (primerError === null) {
      primerError = descripcion;
    }
  }

  // --- Foto (hay que elegir una imagen) ---
  if (foto.files.length === 0) {
    mostrarError('foto', 'error-foto', 'Selecciona una foto del inmueble.');
    if (primerError === null) {
      primerError = foto;
    }
  } else if (foto.files[0].type.indexOf('image/') !== 0) {
    mostrarError('foto', 'error-foto', 'El archivo tiene que ser una imagen.');
    if (primerError === null) {
      primerError = foto;
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien
  alert('Inmueble publicado correctamente. (Pendiente de conexión con la API)');
  formularioPublicar.reset();
}

// Solo se activa si la página actual tiene el formulario de publicar inmueble
if (formularioPublicar) {
  const idsDeLosCamposPublicar = ['titulo', 'ciudad', 'direccion', 'precio', 'fianza', 'habitaciones', 'banos', 'superficie', 'descripcion', 'foto'];
  for (let i = 0; i < idsDeLosCamposPublicar.length; i++) {
    const campo = document.getElementById(idsDeLosCamposPublicar[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnPublicar);
    campo.addEventListener('change', quitarErrorAlEscribirEnPublicar);
  }

  formularioPublicar.addEventListener('submit', validarPublicar);
}


/* =====================================================================
   10. MIS INMUEBLES (LISTADO DEL PROPIETARIO)
   ===================================================================== */

const misInmuebles = document.getElementById('mis-inmuebles');

// Si la tabla no tiene ninguna fila, se esconde y se enseña el mensaje
function comprobarSiHayInmuebles() {
  const filas = document.querySelectorAll('#cuerpo-tabla-inmuebles tr');

  if (filas.length === 0) {
    document.getElementById('seccion-tabla-inmuebles').style.display = 'none';
    document.getElementById('sin-inmuebles').style.display = 'block';
  }
}

// Solo se activa si la página actual es "Mis inmuebles"
if (misInmuebles) {
  comprobarSiHayInmuebles();
}
