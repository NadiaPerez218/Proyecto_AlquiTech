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
   11. Pagos (filtro por estado, del inquilino y del propietario)
   12. Incidencias (listado del inquilino y del propietario, y formulario de nueva incidencia)
   13. Mensajes (enviar un mensaje y elegir la conversación)
   14. Detalle de incidencia (del inquilino y del propietario, y cambiar el estado)
   15. Detalle de contrato (del propietario)
   16. Editar inmueble
   17. Formulario de contacto
   18. ¿Cómo funciona? (elegir el perfil y cerrar las preguntas)
   19. Solicitar alquiler (formulario del inquilino)
   20. Solicitudes de alquiler (solvencia, aceptar o rechazar, del propietario)
   21. Recuperar contraseña
   22. Subir justificante (inquilino)
   23. Confirmar pago (propietario)
   24. Mi perfil (datos personales y cambiar contraseña)
   25. Menú de perfil de la cabecera (propietario e inquilino)
   26. Foto de perfil (guardarla en el navegador y enseñarla en la cabecera)
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
// "direccion" y "casillas" solo los usa la página de editar inmueble:
// "casillas" son los valores de las casillas de características del formulario.
const listaInmuebles = [
  {
    id: 1,
    titulo: 'Piso en el centro',
    ciudad: 'Madrid',
    direccion: 'Calle Mayor 12, 3.º B',
    imagen: '../IMG/piso-centro-madrid.png',
    textoImagen: 'Salón del piso en el centro de Madrid',
    habitaciones: 3,
    banos: 2,
    superficie: 90,
    precio: '950',
    fianza: '950',
    disponibilidad: 'Inmediata',
    descripcion: 'Piso luminoso en pleno centro de Madrid, con tres habitaciones y dos baños. Está muy bien comunicado y tiene todos los servicios a pocos minutos andando.',
    caracteristicas: ['Amueblado', 'Ascensor', 'Calefacción', 'Aire acondicionado', 'Cerca del metro', 'Cocina equipada'],
    casillas: ['amueblado', 'ascensor', 'calefaccion', 'aire', 'transporte']
  },
  {
    id: 2,
    titulo: 'Apartamento luminoso',
    ciudad: 'Barcelona',
    direccion: 'Carrer de Provença 85, 2.º 1.ª',
    imagen: '../IMG/apartamento-luminoso-barcelona.png',
    textoImagen: 'Salón del apartamento luminoso de Barcelona',
    habitaciones: 2,
    banos: 1,
    superficie: 65,
    precio: '1.100',
    fianza: '1.100',
    disponibilidad: 'Inmediata',
    descripcion: 'Apartamento con mucha luz natural y dos habitaciones, en una zona tranquila de Barcelona. Perfecto para una pareja o para compartir.',
    caracteristicas: ['Amueblado', 'Ascensor', 'Calefacción', 'Balcón', 'Cocina equipada'],
    casillas: ['amueblado', 'ascensor', 'calefaccion', 'terraza']
  },
  {
    id: 3,
    titulo: 'Estudio reformado',
    ciudad: 'Valencia',
    direccion: 'Calle de Colón 40, 5.º',
    imagen: '../IMG/estudio-reformado-valencia.png',
    textoImagen: 'Estudio reformado de Valencia',
    habitaciones: 1,
    banos: 1,
    superficie: 40,
    precio: '650',
    fianza: '650',
    disponibilidad: 'Inmediata',
    descripcion: 'Estudio recién reformado en Valencia, con la cocina integrada en el salón. Ideal para una persona que busca comodidad y buen precio.',
    caracteristicas: ['Amueblado', 'Reformado', 'Aire acondicionado', 'Cocina equipada'],
    casillas: ['amueblado', 'aire']
  },
  {
    id: 4,
    titulo: 'Piso con terraza',
    ciudad: 'Sevilla',
    direccion: 'Calle Feria 23, 1.º A',
    imagen: '../IMG/piso-terraza-sevilla.png',
    textoImagen: 'Terraza del piso de Sevilla',
    habitaciones: 2,
    banos: 1,
    superficie: 75,
    precio: '800',
    fianza: '800',
    disponibilidad: 'Inmediata',
    descripcion: 'Piso de dos habitaciones con una gran terraza en Sevilla. Tiene mucho espacio exterior y está cerca del transporte público.',
    caracteristicas: ['Terraza', 'Aire acondicionado', 'Calefacción', 'Cerca del transporte público'],
    casillas: ['terraza', 'aire', 'calefaccion', 'transporte']
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

  // El botón "Solicitar alquiler" lleva al formulario de este inmueble
  document.getElementById('detalle-solicitar').href = 'solicitar-alquiler.html?id=' + inmueble.id;

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
// (también lo usa el formulario de editar inmueble, que tiene los mismos campos)
function quitarErrorAlEscribirEnPublicar(evento) {
  quitarError(evento.target.id);
}

// Comprueba los campos del formulario de un inmueble.
// La usan "Publicar inmueble" y "Editar inmueble", que tienen los mismos campos.
// fotoObligatoria: true al publicar (hay que subir una foto) y false al editar (ya tiene una).
// Devuelve el primer campo con error, o null si todo está bien.
function comprobarDatosInmueble(formulario, fotoObligatoria) {
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

  limpiarErrores(formulario);

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

  // --- Foto ---
  if (foto.files.length === 0) {
    // No se ha elegido ningún archivo: solo es un error si la foto es obligatoria
    if (fotoObligatoria) {
      mostrarError('foto', 'error-foto', 'Selecciona una foto del inmueble.');
      if (primerError === null) {
        primerError = foto;
      }
    }
  } else if (foto.files[0].type.indexOf('image/') !== 0) {
    mostrarError('foto', 'error-foto', 'El archivo tiene que ser una imagen.');
    if (primerError === null) {
      primerError = foto;
    }
  }

  return primerError;
}

// Se ejecuta al pulsar el botón "Publicar inmueble"
function validarPublicar(evento) {
  evento.preventDefault();

  const primerError = comprobarDatosInmueble(formularioPublicar, true);

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


/* =====================================================================
   11. PAGOS (FILTRO POR ESTADO, DEL INQUILINO Y DEL PROPIETARIO)
   ===================================================================== */

// Las dos páginas de pagos (inquilino y propietario) usan los mismos ids
const botonFiltrarPagos = document.getElementById('boton-filtrar-pagos');

// Enseña solo las filas que tienen el estado elegido ("pagado" o "pendiente")
function filtrarPagos() {
  const estadoElegido = document.getElementById('filtro-estado-pago').value;
  const filas = document.querySelectorAll('#cuerpo-tabla-pagos tr');

  let visibles = 0;

  for (let i = 0; i < filas.length; i++) {
    const estadoFila = filas[i].getAttribute('data-estado');

    if (estadoElegido === '' || estadoFila === estadoElegido) {
      filas[i].style.display = '';
      visibles++;
    } else {
      filas[i].style.display = 'none';
    }
  }

  // Texto "Mostrando X pagos"
  const textoResultados = document.getElementById('texto-resultados-pagos');
  if (visibles === 1) {
    textoResultados.textContent = 'Mostrando 1 pago';
  } else {
    textoResultados.textContent = 'Mostrando ' + visibles + ' pagos';
  }

  // Si no hay ninguna fila: se esconde la tabla y se enseña el mensaje
  if (visibles === 0) {
    document.getElementById('seccion-tabla-pagos').style.display = 'none';
    document.getElementById('sin-pagos').style.display = 'block';
  } else {
    document.getElementById('seccion-tabla-pagos').style.display = 'block';
    document.getElementById('sin-pagos').style.display = 'none';
  }
}

// Vacía el filtro y vuelve a enseñar todos los pagos
function limpiarFiltroPagos() {
  document.getElementById('filtro-estado-pago').value = '';
  filtrarPagos();
}

// Solo se activa si la página actual es una de las de pagos
if (botonFiltrarPagos) {
  botonFiltrarPagos.addEventListener('click', filtrarPagos);
  document.getElementById('boton-limpiar-pagos').addEventListener('click', limpiarFiltroPagos);
}


/* =====================================================================
   12. INCIDENCIAS (LISTADO DEL INQUILINO Y DEL PROPIETARIO, Y FORMULARIO)
   ===================================================================== */

// --- Listado de incidencias (las dos páginas de listado usan los mismos ids) ---

const cuerpoTablaIncidencias = document.getElementById('cuerpo-tabla-incidencias');

// Si la tabla no tiene ninguna fila, se esconde y se enseña el mensaje
function comprobarSiHayIncidencias() {
  const filas = document.querySelectorAll('#cuerpo-tabla-incidencias tr');

  if (filas.length === 0) {
    document.getElementById('seccion-tabla-incidencias').style.display = 'none';
    document.getElementById('sin-incidencias').style.display = 'block';
  }
}

// Solo se activa si la página actual es un listado de incidencias
if (cuerpoTablaIncidencias) {
  comprobarSiHayIncidencias();
}

// --- Formulario de nueva incidencia ---

const formularioIncidencia = document.getElementById('formulario-incidencia');

// Cuando la persona escribe o elige algo en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnIncidencia(evento) {
  quitarError(evento.target.id);
}

// Cuando se elige una prioridad, se quita su error
function quitarErrorDeLaPrioridad() {
  document.getElementById('error-prioridad').textContent = '';
}

// Se ejecuta al pulsar el botón "Enviar incidencia"
function validarIncidencia(evento) {
  evento.preventDefault();

  // Campos del formulario
  const titulo = document.getElementById('titulo-incidencia');
  const categoria = document.getElementById('categoria-incidencia');
  const opcionesPrioridad = document.getElementsByName('prioridad');
  const descripcion = document.getElementById('descripcion-incidencia');
  const foto = document.getElementById('foto-incidencia');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioIncidencia);

  // --- Título (mínimo 5 caracteres) ---
  if (titulo.value.trim() === '') {
    mostrarError('titulo-incidencia', 'error-titulo-incidencia', 'El título es obligatorio.');
    if (primerError === null) {
      primerError = titulo;
    }
  } else if (titulo.value.trim().length < 5) {
    mostrarError('titulo-incidencia', 'error-titulo-incidencia', 'El título debe tener al menos 5 caracteres.');
    if (primerError === null) {
      primerError = titulo;
    }
  }

  // --- Categoría (hay que elegir una) ---
  if (categoria.value === '') {
    mostrarError('categoria-incidencia', 'error-categoria-incidencia', 'Selecciona una categoría.');
    if (primerError === null) {
      primerError = categoria;
    }
  }

  // --- Prioridad (hay que elegir una de las tres opciones) ---
  let hayPrioridadElegida = false;
  for (let i = 0; i < opcionesPrioridad.length; i++) {
    if (opcionesPrioridad[i].checked) {
      hayPrioridadElegida = true;
    }
  }

  if (hayPrioridadElegida === false) {
    document.getElementById('error-prioridad').textContent = 'Selecciona una prioridad.';
    if (primerError === null) {
      primerError = opcionesPrioridad[0];
    }
  }

  // --- Descripción (mínimo 20 caracteres) ---
  if (descripcion.value.trim() === '') {
    mostrarError('descripcion-incidencia', 'error-descripcion-incidencia', 'La descripción es obligatoria.');
    if (primerError === null) {
      primerError = descripcion;
    }
  } else if (descripcion.value.trim().length < 20) {
    mostrarError('descripcion-incidencia', 'error-descripcion-incidencia', 'La descripción debe tener al menos 20 caracteres.');
    if (primerError === null) {
      primerError = descripcion;
    }
  }

  // --- Foto (es opcional: solo se comprueba si se ha elegido un archivo) ---
  if (foto.files.length > 0 && foto.files[0].type.indexOf('image/') !== 0) {
    mostrarError('foto-incidencia', 'error-foto-incidencia', 'El archivo tiene que ser una imagen.');
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
  alert('Incidencia enviada correctamente. (Pendiente de conexión con la API)');
  formularioIncidencia.reset();
}

// Solo se activa si la página actual tiene el formulario de nueva incidencia
if (formularioIncidencia) {
  const idsDeLosCamposIncidencia = ['titulo-incidencia', 'categoria-incidencia', 'descripcion-incidencia', 'foto-incidencia'];
  for (let i = 0; i < idsDeLosCamposIncidencia.length; i++) {
    const campo = document.getElementById(idsDeLosCamposIncidencia[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnIncidencia);
    campo.addEventListener('change', quitarErrorAlEscribirEnIncidencia);
  }

  const opcionesPrioridadDelFormulario = document.getElementsByName('prioridad');
  for (let i = 0; i < opcionesPrioridadDelFormulario.length; i++) {
    opcionesPrioridadDelFormulario[i].addEventListener('change', quitarErrorDeLaPrioridad);
  }

  formularioIncidencia.addEventListener('submit', validarIncidencia);
}


/* =====================================================================
   13. MENSAJES (ENVIAR UN MENSAJE Y ELEGIR LA CONVERSACIÓN)
   ===================================================================== */

const formularioMensaje = document.getElementById('formulario-mensaje');

// Cuando la persona escribe, se quita el error
function quitarErrorAlEscribirMensaje(evento) {
  quitarError(evento.target.id);
}

// Devuelve un número con dos cifras (5 pasa a "05")
function conDosCifras(numero) {
  if (numero < 10) {
    return '0' + numero;
  }
  return '' + numero;
}

// Devuelve la zona de mensajes que se está viendo.
// (El propietario tiene una zona por inquilino y solo una está visible;
// el inquilino tiene una sola.)
function buscarZonaDeMensajes() {
  const zonas = document.querySelectorAll('.chat-mensajes');

  for (let i = 0; i < zonas.length; i++) {
    if (zonas[i].style.display !== 'none') {
      return zonas[i];
    }
  }
}

// Se ejecuta al pulsar el botón "Enviar mensaje"
function enviarMensaje(evento) {
  evento.preventDefault();

  const texto = document.getElementById('texto-mensaje');
  const zonaMensajes = buscarZonaDeMensajes();

  limpiarErrores(formularioMensaje);

  // El mensaje no puede estar vacío
  if (texto.value.trim() === '') {
    mostrarError('texto-mensaje', 'error-texto-mensaje', 'Escribe un mensaje antes de enviar.');
    texto.focus();
    return;
  }

  // Se crea la burbuja nueva: un párrafo con el texto y un span con la hora
  const burbuja = document.createElement('div');
  burbuja.className = 'burbuja burbuja-enviada';

  const parrafo = document.createElement('p');
  parrafo.textContent = texto.value.trim();

  const ahora = new Date();
  const hora = document.createElement('span');
  hora.className = 'fecha-mensaje';
  hora.textContent = 'Hoy, ' + conDosCifras(ahora.getHours()) + ':' + conDosCifras(ahora.getMinutes());

  burbuja.appendChild(parrafo);
  burbuja.appendChild(hora);
  zonaMensajes.appendChild(burbuja);

  // Se baja hasta el último mensaje y se vacía el campo
  zonaMensajes.scrollTop = zonaMensajes.scrollHeight;
  formularioMensaje.reset();
  texto.focus();
}

// Se ejecuta al pulsar uno de los botones de inquilino (solo en la página del propietario)
function cambiarConversacion(evento) {
  const botonElegido = evento.currentTarget;
  const conversacionElegida = botonElegido.getAttribute('data-conversacion');

  // Se enseña la zona de mensajes elegida y se esconden las demás
  const zonas = document.querySelectorAll('.chat-mensajes');
  for (let i = 0; i < zonas.length; i++) {
    if (zonas[i].getAttribute('data-conversacion') === conversacionElegida) {
      zonas[i].style.display = 'flex';
    } else {
      zonas[i].style.display = 'none';
    }
  }

  // Solo el botón elegido queda marcado
  const botones = document.querySelectorAll('.pestana');
  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activa');
  }
  botonElegido.classList.add('activa');

  // Se cambian el nombre y el detalle de la cabecera
  document.getElementById('chat-nombre').textContent = botonElegido.getAttribute('data-nombre');
  document.getElementById('chat-detalle').textContent = botonElegido.getAttribute('data-detalle');

  // Se quita el error y se baja hasta el último mensaje
  limpiarErrores(formularioMensaje);
  const zonaElegida = buscarZonaDeMensajes();
  zonaElegida.scrollTop = zonaElegida.scrollHeight;
}

// Solo se activa si la página actual tiene el formulario de mensajes
if (formularioMensaje) {
  document.getElementById('texto-mensaje').addEventListener('input', quitarErrorAlEscribirMensaje);
  formularioMensaje.addEventListener('submit', enviarMensaje);

  // Botones para elegir la conversación (solo existen en la página del propietario)
  const botonesDeConversacion = document.querySelectorAll('.pestana');
  for (let i = 0; i < botonesDeConversacion.length; i++) {
    botonesDeConversacion[i].addEventListener('click', cambiarConversacion);
  }
}


/* =====================================================================
   14. DETALLE DE INCIDENCIA (DEL INQUILINO Y DEL PROPIETARIO, Y CAMBIAR EL ESTADO)
   ===================================================================== */

// Las dos páginas de detalle (inquilino y propietario) usan los mismos ids.
// La del propietario tiene además el formulario para cambiar el estado.
const detalleIncidencia = document.getElementById('detalle-incidencia');

// Lista de incidencias (datos de prueba).
// Cuando esté la API, estos datos vendrán de la base de datos.
const listaIncidencias = [
  {
    id: 1,
    referencia: 'INC-001',
    titulo: 'Gotera en el baño',
    inmueble: 'Piso en el centro, Madrid',
    inquilino: 'Juan García',
    propietario: 'Carlos Martínez',
    categoria: 'Fontanería',
    prioridad: 'Alta',
    estado: 'Abierta',
    fecha: '02/05/2026',
    descripcion: 'Desde hace dos días cae agua del techo del baño, justo encima de la ducha. Parece que viene del piso de arriba. He puesto un cubo para que no se moje el suelo.',
    seguimiento: [
      { autor: 'Juan García', fecha: '02/05/2026', texto: 'He enviado la incidencia.' }
    ]
  },
  {
    id: 2,
    referencia: 'INC-002',
    titulo: 'Persiana del salón atascada',
    inmueble: 'Piso en el centro, Madrid',
    inquilino: 'Juan García',
    propietario: 'Carlos Martínez',
    categoria: 'Carpintería',
    prioridad: 'Media',
    estado: 'En curso',
    fecha: '18/03/2026',
    descripcion: 'La persiana del salón se ha quedado atascada a media altura y no sube ni baja. Creo que se ha roto la cinta.',
    seguimiento: [
      { autor: 'Juan García', fecha: '18/03/2026', texto: 'He enviado la incidencia.' },
      { autor: 'Carlos Martínez', fecha: '19/03/2026', texto: 'Ha cambiado el estado a "En curso". He llamado a un técnico y pasará la semana que viene.' }
    ]
  },
  {
    id: 3,
    referencia: 'INC-003',
    titulo: 'Bombilla del pasillo fundida',
    inmueble: 'Piso en el centro, Madrid',
    inquilino: 'Juan García',
    propietario: 'Carlos Martínez',
    categoria: 'Electricidad',
    prioridad: 'Baja',
    estado: 'Resuelta',
    fecha: '10/02/2026',
    descripcion: 'La lámpara del pasillo no se enciende. He cambiado la bombilla y sigue sin funcionar, así que puede que sea el interruptor.',
    seguimiento: [
      { autor: 'Juan García', fecha: '10/02/2026', texto: 'He enviado la incidencia.' },
      { autor: 'Carlos Martínez', fecha: '12/02/2026', texto: 'Ha cambiado el estado a "Resuelta". El electricista ha cambiado el interruptor y ya funciona.' }
    ]
  },
  {
    id: 4,
    referencia: 'INC-004',
    titulo: 'Calefacción averiada',
    inmueble: 'Estudio reformado, Valencia',
    inquilino: 'María López',
    propietario: 'Carlos Martínez',
    categoria: 'Calefacción y aire acondicionado',
    prioridad: 'Media',
    estado: 'Abierta',
    fecha: '04/05/2026',
    descripcion: 'La calefacción no arranca desde ayer por la mañana. La caldera tiene encendida una luz roja.',
    seguimiento: [
      { autor: 'María López', fecha: '04/05/2026', texto: 'He enviado la incidencia.' }
    ]
  }
];

// Busca una incidencia por su número. Si no existe, devuelve null.
function buscarIncidencia(id) {
  for (let i = 0; i < listaIncidencias.length; i++) {
    if (listaIncidencias[i].id === id) {
      return listaIncidencias[i];
    }
  }
  return null;
}

// Devuelve las clases de una insignia según su texto (rojo, verde o con borde).
// También la usan el detalle de contrato y las solicitudes de alquiler.
function clasesDeInsignia(texto) {
  if (texto === 'Alta' || texto === 'Rechazada') {
    return 'insignia insignia-alta';
  }
  if (texto === 'Resuelta' || texto === 'Activo' || texto === 'Aceptada' || texto === 'Pagado') {
    return 'insignia insignia-ok';
  }
  return 'insignia insignia-contorno';
}

// Añade una entrada al final de la lista de seguimiento:
// un <li> con el autor y la fecha arriba y el texto debajo
function anadirSeguimiento(entrada) {
  const elemento = document.createElement('li');
  elemento.className = 'mensaje';

  const cabecera = document.createElement('div');
  cabecera.className = 'mensaje-cabecera';

  const autor = document.createElement('strong');
  autor.textContent = entrada.autor;

  const fecha = document.createElement('span');
  fecha.className = 'fecha-mensaje';
  fecha.textContent = entrada.fecha;

  const texto = document.createElement('p');
  texto.textContent = entrada.texto;

  cabecera.appendChild(autor);
  cabecera.appendChild(fecha);
  elemento.appendChild(cabecera);
  elemento.appendChild(texto);
  document.getElementById('incidencia-seguimiento').appendChild(elemento);
}

// Incidencia que se está viendo (la usa también el formulario de cambiar el estado)
let incidenciaActual = null;

// Rellena la página con los datos de la incidencia que indica la dirección (?id=...)
function mostrarIncidencia() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'));
  incidenciaActual = buscarIncidencia(id);

  // Si no existe: se esconde el contenido y se enseña el mensaje
  if (incidenciaActual === null) {
    document.getElementById('detalle-contenido').style.display = 'none';
    document.getElementById('detalle-no-encontrado').style.display = 'block';
    return;
  }

  // Título de la pestaña del navegador
  document.title = 'AlquiTech – ' + incidenciaActual.titulo;

  // Título y datos
  document.getElementById('incidencia-titulo').textContent = incidenciaActual.titulo;
  document.getElementById('incidencia-referencia').textContent = incidenciaActual.referencia;
  document.getElementById('incidencia-fecha').textContent = incidenciaActual.fecha;
  document.getElementById('incidencia-inmueble').textContent = incidenciaActual.inmueble;
  document.getElementById('incidencia-categoria').textContent = incidenciaActual.categoria;
  document.getElementById('incidencia-inquilino').textContent = incidenciaActual.inquilino;
  document.getElementById('incidencia-propietario').textContent = incidenciaActual.propietario;
  document.getElementById('incidencia-descripcion').textContent = incidenciaActual.descripcion;

  // Prioridad y estado: el texto y el color de la insignia
  const prioridad = document.getElementById('incidencia-prioridad');
  prioridad.textContent = incidenciaActual.prioridad;
  prioridad.className = clasesDeInsignia(incidenciaActual.prioridad);

  const estado = document.getElementById('incidencia-estado');
  estado.textContent = incidenciaActual.estado;
  estado.className = clasesDeInsignia(incidenciaActual.estado);

  // Lista de seguimiento: se añade una entrada por cada paso
  for (let i = 0; i < incidenciaActual.seguimiento.length; i++) {
    anadirSeguimiento(incidenciaActual.seguimiento[i]);
  }
}

// Solo se activa si la página actual es un detalle de incidencia
if (detalleIncidencia) {
  mostrarIncidencia();
}

// --- Formulario para cambiar el estado (solo en la página del propietario) ---

const formularioEstado = document.getElementById('formulario-estado');

// Cuando se elige un estado, se quita el error
function quitarErrorAlElegirEstado(evento) {
  quitarError(evento.target.id);
}

// Devuelve la fecha de hoy con el formato 31/10/2026
function fechaDeHoy() {
  const hoy = new Date();
  return conDosCifras(hoy.getDate()) + '/' + conDosCifras(hoy.getMonth() + 1) + '/' + hoy.getFullYear();
}

// Se ejecuta al pulsar el botón "Guardar estado".
// El cambio solo se ve en pantalla: al recargar se pierde, porque no hay backend.
function cambiarEstado(evento) {
  evento.preventDefault();

  const nuevoEstado = document.getElementById('nuevo-estado');
  const comentario = document.getElementById('comentario-estado');

  limpiarErrores(formularioEstado);

  // Hay que elegir un estado
  if (nuevoEstado.value === '') {
    mostrarError('nuevo-estado', 'error-nuevo-estado', 'Selecciona el nuevo estado.');
    nuevoEstado.focus();
    return;
  }

  // Tiene que ser distinto del que ya tiene
  if (nuevoEstado.value === incidenciaActual.estado) {
    mostrarError('nuevo-estado', 'error-nuevo-estado', 'La incidencia ya está en ese estado.');
    nuevoEstado.focus();
    return;
  }

  // Se cambia el estado y la insignia de los datos
  incidenciaActual.estado = nuevoEstado.value;

  const estado = document.getElementById('incidencia-estado');
  estado.textContent = incidenciaActual.estado;
  estado.className = clasesDeInsignia(incidenciaActual.estado);

  // Se añade el cambio al seguimiento (con el comentario, si se ha escrito)
  let texto = 'Ha cambiado el estado a "' + incidenciaActual.estado + '".';
  if (comentario.value.trim() !== '') {
    texto = texto + ' ' + comentario.value.trim();
  }

  anadirSeguimiento({ autor: incidenciaActual.propietario, fecha: fechaDeHoy(), texto: texto });

  formularioEstado.reset();
}

// Solo se activa si la página tiene el formulario y la incidencia existe
if (formularioEstado && incidenciaActual !== null) {
  document.getElementById('nuevo-estado').addEventListener('change', quitarErrorAlElegirEstado);
  formularioEstado.addEventListener('submit', cambiarEstado);
}


/* =====================================================================
   15. DETALLE DE CONTRATO (DEL PROPIETARIO)
   ===================================================================== */

const detalleContrato = document.getElementById('detalle-contrato');

// Lista de contratos (datos de prueba).
// Cuando esté la API, estos datos vendrán de la base de datos.
// "idInmueble" sirve para el enlace "Ver inmueble".
const listaContratos = [
  {
    id: 1,
    idInmueble: 1,
    inmueble: 'Piso en el centro',
    ciudad: 'Madrid',
    inquilino: 'Juan García',
    emailInquilino: 'juan.garcia@correo.es',
    telefonoInquilino: '600 123 456',
    estado: 'Activo',
    inicio: '01/01/2026',
    fin: '31/12/2026',
    duracion: 12,
    cuota: '950',
    fianza: '950',
    documentos: [
      { nombre: 'Contrato de alquiler firmado', fecha: '01/01/2026' },
      { nombre: 'Justificante de la fianza', fecha: '28/12/2025' }
    ]
  },
  {
    id: 2,
    idInmueble: 3,
    inmueble: 'Estudio reformado',
    ciudad: 'Valencia',
    inquilino: 'María López',
    emailInquilino: 'maria.lopez@correo.es',
    telefonoInquilino: '611 987 654',
    estado: 'Activo',
    inicio: '01/03/2026',
    fin: '28/02/2027',
    duracion: 12,
    cuota: '650',
    fianza: '650',
    documentos: [
      { nombre: 'Contrato de alquiler firmado', fecha: '01/03/2026' },
      { nombre: 'Justificante de la fianza', fecha: '25/02/2026' }
    ]
  }
];

// Busca un contrato por su número. Si no existe, devuelve null.
function buscarContrato(id) {
  for (let i = 0; i < listaContratos.length; i++) {
    if (listaContratos[i].id === id) {
      return listaContratos[i];
    }
  }
  return null;
}

// Rellena la página con los datos del contrato que indica la dirección (?id=...)
function mostrarContrato() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'));
  const contrato = buscarContrato(id);

  // Si no existe: se esconde el contenido y se enseña el mensaje
  if (contrato === null) {
    document.getElementById('detalle-contenido').style.display = 'none';
    document.getElementById('detalle-no-encontrado').style.display = 'block';
    return;
  }

  // Título de la pestaña del navegador y de la página
  document.title = 'AlquiTech – Contrato de ' + contrato.inquilino;
  document.getElementById('contrato-titulo').textContent = 'Contrato: ' + contrato.inmueble;

  // Tarjetas de resumen
  document.getElementById('resumen-estado').textContent = contrato.estado;
  document.getElementById('resumen-fin').textContent = 'hasta ' + contrato.fin;
  document.getElementById('resumen-cuota').textContent = contrato.cuota + ' €';
  document.getElementById('resumen-fianza').textContent = contrato.fianza + ' €';
  document.getElementById('resumen-duracion').textContent = contrato.duracion;

  // Datos del contrato y enlace al inmueble
  document.getElementById('contrato-ver-inmueble').href = 'detalle-inmueble.html?id=' + contrato.idInmueble;
  document.getElementById('contrato-inmueble').textContent = contrato.inmueble;
  document.getElementById('contrato-ciudad').textContent = contrato.ciudad;
  document.getElementById('contrato-inquilino').textContent = contrato.inquilino;
  document.getElementById('contrato-inicio').textContent = contrato.inicio;
  document.getElementById('contrato-fin').textContent = contrato.fin;
  document.getElementById('contrato-cuota').textContent = contrato.cuota + ' €';
  document.getElementById('contrato-fianza').textContent = contrato.fianza + ' €';
  document.getElementById('contrato-email').textContent = contrato.emailInquilino;
  document.getElementById('contrato-telefono').textContent = contrato.telefonoInquilino;

  const estado = document.getElementById('contrato-estado');
  estado.textContent = contrato.estado;
  estado.className = clasesDeInsignia(contrato.estado);

  // Condiciones que dependen del contrato
  document.getElementById('condicion-duracion').textContent = contrato.duracion + ' meses, desde el ' + contrato.inicio + ' hasta el ' + contrato.fin + '.';
  document.getElementById('condicion-pago').textContent = contrato.cuota + ' € al mes, que se pagan antes del día 1 de cada mes.';

  // Tabla de documentos: se crea una fila por cada documento
  const cuerpoTabla = document.getElementById('cuerpo-tabla-documentos');
  for (let i = 0; i < contrato.documentos.length; i++) {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = contrato.documentos[i].nombre;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = contrato.documentos[i].fecha;

    // Pendiente: las descargas vendrán del backend
    const celdaAcciones = document.createElement('td');
    const enlace = document.createElement('a');
    enlace.href = '#';
    enlace.textContent = 'Descargar';
    celdaAcciones.appendChild(enlace);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaAcciones);
    cuerpoTabla.appendChild(fila);
  }
}

// Solo se activa si la página actual es el detalle de contrato
if (detalleContrato) {
  mostrarContrato();
}


/* =====================================================================
   16. EDITAR INMUEBLE
   ===================================================================== */

// Usa los mismos campos que "Publicar inmueble" (bloque 9) y los datos de
// la lista de inmuebles del bloque 8
const formularioEditar = document.getElementById('formulario-editar');

// Rellena el formulario con los datos del inmueble que indica la dirección (?id=...)
function rellenarFormularioEditar() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'));
  const inmueble = buscarInmueble(id);

  // Si no existe: se esconde el formulario y se enseña el mensaje
  if (inmueble === null) {
    document.getElementById('editar-contenido').style.display = 'none';
    document.getElementById('editar-no-encontrado').style.display = 'block';
    return;
  }

  // Título de la pestaña del navegador
  document.title = 'AlquiTech – Editar ' + inmueble.titulo;

  // Campos de texto. La ciudad del desplegable va en minúsculas ("madrid").
  document.getElementById('titulo').value = inmueble.titulo;
  document.getElementById('ciudad').value = inmueble.ciudad.toLowerCase();
  document.getElementById('direccion').value = inmueble.direccion;
  document.getElementById('descripcion').value = inmueble.descripcion;

  // El precio y la fianza están guardados con punto de miles ("1.100"):
  // se quita el punto para que la caja de número lo acepte ("1100")
  document.getElementById('precio').value = inmueble.precio.split('.').join('');
  document.getElementById('fianza').value = inmueble.fianza.split('.').join('');

  document.getElementById('habitaciones').value = inmueble.habitaciones;
  document.getElementById('banos').value = inmueble.banos;
  document.getElementById('superficie').value = inmueble.superficie;

  // Se marcan las casillas de características que tiene el inmueble
  const casillas = document.getElementsByName('caracteristicas');
  for (let i = 0; i < casillas.length; i++) {
    if (inmueble.casillas.indexOf(casillas[i].value) !== -1) {
      casillas[i].checked = true;
    }
  }

  // Foto actual
  document.getElementById('foto-actual').src = inmueble.imagen;
  document.getElementById('foto-actual').alt = inmueble.textoImagen;
}

// Se ejecuta al pulsar el botón "Guardar cambios"
function validarEditar(evento) {
  evento.preventDefault();

  // Al editar, la foto no es obligatoria (si no se elige otra, se queda la actual)
  const primerError = comprobarDatosInmueble(formularioEditar, false);

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien: aviso y vuelta al listado
  alert('Cambios guardados correctamente. (Pendiente de conexión con la API)');
  window.location.href = 'mis-inmuebles.html';
}

// Solo se activa si la página actual tiene el formulario de editar inmueble
if (formularioEditar) {
  rellenarFormularioEditar();

  const idsDeLosCamposEditar = ['titulo', 'ciudad', 'direccion', 'precio', 'fianza', 'habitaciones', 'banos', 'superficie', 'descripcion', 'foto'];
  for (let i = 0; i < idsDeLosCamposEditar.length; i++) {
    const campo = document.getElementById(idsDeLosCamposEditar[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnPublicar);
    campo.addEventListener('change', quitarErrorAlEscribirEnPublicar);
  }

  formularioEditar.addEventListener('submit', validarEditar);
}


/* =====================================================================
   17. FORMULARIO DE CONTACTO
   ===================================================================== */

const formularioContacto = document.getElementById('formulario-contacto');

// Cuando la persona escribe o elige algo en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnContacto(evento) {
  quitarError(evento.target.id);
}

// Cuando se marca la casilla de la privacidad, se quita su error
function quitarErrorDeLaPrivacidad() {
  document.getElementById('error-acepto-privacidad').textContent = '';
}

// Se ejecuta al pulsar el botón "Enviar mensaje"
function validarContacto(evento) {
  evento.preventDefault();

  // Campos del formulario
  const nombre = document.getElementById('nombre-contacto');
  const email = document.getElementById('email-contacto');
  const asunto = document.getElementById('asunto-contacto');
  const mensaje = document.getElementById('mensaje-contacto');
  const privacidad = document.getElementById('acepto-privacidad');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioContacto);

  // --- Nombre ---
  if (nombre.value.trim() === '') {
    mostrarError('nombre-contacto', 'error-nombre-contacto', 'El nombre es obligatorio.');
    if (primerError === null) {
      primerError = nombre;
    }
  } else if (esNombreValido(nombre.value.trim()) === false) {
    mostrarError('nombre-contacto', 'error-nombre-contacto', 'Introduce un nombre válido (mínimo 2 letras).');
    if (primerError === null) {
      primerError = nombre;
    }
  }

  // --- Correo electrónico ---
  if (email.value.trim() === '') {
    mostrarError('email-contacto', 'error-email-contacto', 'El correo electrónico es obligatorio.');
    if (primerError === null) {
      primerError = email;
    }
  } else if (esEmailValido(email.value.trim()) === false) {
    mostrarError('email-contacto', 'error-email-contacto', 'Introduce un correo válido, por ejemplo correo@ejemplo.com.');
    if (primerError === null) {
      primerError = email;
    }
  }

  // --- Asunto (hay que elegir uno) ---
  if (asunto.value === '') {
    mostrarError('asunto-contacto', 'error-asunto-contacto', 'Selecciona un asunto.');
    if (primerError === null) {
      primerError = asunto;
    }
  }

  // --- Mensaje (mínimo 20 caracteres) ---
  if (mensaje.value.trim() === '') {
    mostrarError('mensaje-contacto', 'error-mensaje-contacto', 'El mensaje es obligatorio.');
    if (primerError === null) {
      primerError = mensaje;
    }
  } else if (mensaje.value.trim().length < 20) {
    mostrarError('mensaje-contacto', 'error-mensaje-contacto', 'El mensaje debe tener al menos 20 caracteres.');
    if (primerError === null) {
      primerError = mensaje;
    }
  }

  // --- Privacidad (hay que aceptarla para poder enviar) ---
  if (privacidad.checked === false) {
    document.getElementById('error-acepto-privacidad').textContent = 'Debes aceptar la política de privacidad.';
    if (primerError === null) {
      primerError = privacidad;
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien
  alert('Mensaje enviado correctamente. Te responderemos lo antes posible. (Pendiente de conexión con la API)');
  formularioContacto.reset();
}

// Solo se activa si la página actual tiene el formulario de contacto
if (formularioContacto) {
  const idsDeLosCamposContacto = ['nombre-contacto', 'email-contacto', 'asunto-contacto', 'mensaje-contacto'];
  for (let i = 0; i < idsDeLosCamposContacto.length; i++) {
    const campo = document.getElementById(idsDeLosCamposContacto[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnContacto);
    campo.addEventListener('change', quitarErrorAlEscribirEnContacto);
  }

  document.getElementById('acepto-privacidad').addEventListener('change', quitarErrorDeLaPrivacidad);

  formularioContacto.addEventListener('submit', validarContacto);
}


/* =====================================================================
   18. ¿CÓMO FUNCIONA? (ELEGIR EL PERFIL Y CERRAR LAS PREGUNTAS)
   ===================================================================== */

const comoFunciona = document.getElementById('como-funciona');

// Se ejecuta al pulsar "Soy propietario" o "Soy inquilino"
function cambiarPerfil(evento) {
  const botonElegido = evento.currentTarget;
  const rolElegido = botonElegido.getAttribute('data-rol');

  // Se enseña la lista de pasos del perfil elegido y se esconde la otra
  const listas = document.querySelectorAll('.lista-pasos');
  for (let i = 0; i < listas.length; i++) {
    if (listas[i].getAttribute('data-rol') === rolElegido) {
      listas[i].style.display = 'block';
    } else {
      listas[i].style.display = 'none';
    }
  }

  // Solo el botón elegido queda marcado
  const botones = document.querySelectorAll('.selector-rol .pestana');
  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activa');
  }
  botonElegido.classList.add('activa');
}

// Se ejecuta con cualquier clic en la página.
// Si el clic no ha sido dentro de una pregunta, se cierra la que esté abierta.
// (Que al abrir una se cierre la otra lo hace el HTML con name="preguntas".)
function cerrarPreguntasAlClicarFuera(evento) {
  const preguntas = document.querySelectorAll('.pregunta');

  for (let i = 0; i < preguntas.length; i++) {
    // contains: true si el elemento clicado está dentro de esta pregunta
    if (preguntas[i].contains(evento.target) === false) {
      preguntas[i].open = false;
    }
  }
}

// Solo se activa si la página actual es "¿Cómo funciona?"
if (comoFunciona) {
  const botonesDePerfil = document.querySelectorAll('.selector-rol .pestana');
  for (let i = 0; i < botonesDePerfil.length; i++) {
    botonesDePerfil[i].addEventListener('click', cambiarPerfil);
  }

  document.addEventListener('click', cerrarPreguntasAlClicarFuera);
}


/* =====================================================================
   19. SOLICITAR ALQUILER (FORMULARIO DEL INQUILINO)
   ===================================================================== */

// Usa la lista de inmuebles del bloque 8
const formularioSolicitud = document.getElementById('formulario-solicitud');

// Devuelve la fecha de hoy con el formato de las cajas de fecha: 2026-10-31
function fechaDeHoyParaCaja() {
  const hoy = new Date();
  return hoy.getFullYear() + '-' + conDosCifras(hoy.getMonth() + 1) + '-' + conDosCifras(hoy.getDate());
}

// Enseña el resumen del inmueble que indica la dirección (?id=...)
function mostrarResumenSolicitud() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'));
  const inmueble = buscarInmueble(id);

  // Si no existe: se esconde el formulario y se enseña el mensaje
  if (inmueble === null) {
    document.getElementById('solicitud-contenido').style.display = 'none';
    document.getElementById('solicitud-no-encontrado').style.display = 'block';
    return;
  }

  document.title = 'AlquiTech – Solicitar ' + inmueble.titulo;

  document.getElementById('solicitud-imagen').src = inmueble.imagen;
  document.getElementById('solicitud-imagen').alt = inmueble.textoImagen;
  document.getElementById('solicitud-titulo').textContent = inmueble.titulo;
  document.getElementById('solicitud-ciudad').textContent = inmueble.ciudad;
  document.getElementById('solicitud-precio').textContent = inmueble.precio + ' € / mes';

  // "Ver el anuncio" y "Cancelar" vuelven al detalle de este inmueble
  document.getElementById('solicitud-ver-inmueble').href = 'detalle-inmueble.html?id=' + inmueble.id;
  document.getElementById('solicitud-cancelar').href = 'detalle-inmueble.html?id=' + inmueble.id;

  // En el calendario no se pueden elegir días anteriores a hoy
  document.getElementById('fecha-entrada').min = fechaDeHoyParaCaja();
}

// Cuando la persona escribe o elige algo en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnSolicitud(evento) {
  quitarError(evento.target.id);
}

// Se ejecuta al pulsar el botón "Enviar solicitud"
function validarSolicitud(evento) {
  evento.preventDefault();

  // Campos del formulario
  const fechaEntrada = document.getElementById('fecha-entrada');
  const duracion = document.getElementById('duracion-solicitud');
  const personas = document.getElementById('personas');
  const ingresos = document.getElementById('ingresos');
  const mensaje = document.getElementById('mensaje-solicitud');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioSolicitud);

  // --- Fecha de entrada (obligatoria y no puede ser anterior a hoy) ---
  // Las fechas de las cajas tienen el formato 2026-10-31, así que se pueden
  // comparar como texto: la que va antes en el calendario es la "menor"
  if (fechaEntrada.value === '') {
    mostrarError('fecha-entrada', 'error-fecha-entrada', 'Elige la fecha en la que quieres entrar.');
    if (primerError === null) {
      primerError = fechaEntrada;
    }
  } else if (fechaEntrada.value < fechaDeHoyParaCaja()) {
    mostrarError('fecha-entrada', 'error-fecha-entrada', 'La fecha no puede ser anterior a hoy.');
    if (primerError === null) {
      primerError = fechaEntrada;
    }
  }

  // --- Duración (hay que elegir una) ---
  if (duracion.value === '') {
    mostrarError('duracion-solicitud', 'error-duracion-solicitud', 'Selecciona la duración.');
    if (primerError === null) {
      primerError = duracion;
    }
  }

  // --- Personas (número entero, mínimo 1) ---
  if (personas.value.trim() === '') {
    mostrarError('personas', 'error-personas', 'Indica cuántas personas vivirán.');
    if (primerError === null) {
      primerError = personas;
    }
  } else if (esEnteroPositivo(personas.value.trim()) === false) {
    mostrarError('personas', 'error-personas', 'Escribe un número entero (mínimo 1).');
    if (primerError === null) {
      primerError = personas;
    }
  }

  // --- Ingresos (obligatorios: con ellos el propietario ve la solvencia en estrellas) ---
  if (ingresos.value.trim() === '') {
    mostrarError('ingresos', 'error-ingresos', 'Indica tus ingresos al mes.');
    if (primerError === null) {
      primerError = ingresos;
    }
  } else if (esNumeroPositivo(ingresos.value.trim()) === false) {
    mostrarError('ingresos', 'error-ingresos', 'Introduce una cantidad mayor que 0.');
    if (primerError === null) {
      primerError = ingresos;
    }
  }

  // --- Mensaje (mínimo 20 caracteres) ---
  if (mensaje.value.trim() === '') {
    mostrarError('mensaje-solicitud', 'error-mensaje-solicitud', 'Escribe un mensaje para el propietario.');
    if (primerError === null) {
      primerError = mensaje;
    }
  } else if (mensaje.value.trim().length < 20) {
    mostrarError('mensaje-solicitud', 'error-mensaje-solicitud', 'El mensaje debe tener al menos 20 caracteres.');
    if (primerError === null) {
      primerError = mensaje;
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien: aviso y vuelta al panel
  alert('Solicitud enviada. El propietario te contestará lo antes posible. (Pendiente de conexión con la API)');
  window.location.href = 'dashboard-inquilino.html';
}

// Solo se activa si la página actual tiene el formulario de solicitar alquiler
if (formularioSolicitud) {
  mostrarResumenSolicitud();

  const idsDeLosCamposSolicitud = ['fecha-entrada', 'duracion-solicitud', 'personas', 'ingresos', 'mensaje-solicitud'];
  for (let i = 0; i < idsDeLosCamposSolicitud.length; i++) {
    const campo = document.getElementById(idsDeLosCamposSolicitud[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnSolicitud);
    campo.addEventListener('change', quitarErrorAlEscribirEnSolicitud);
  }

  formularioSolicitud.addEventListener('submit', validarSolicitud);
}


/* =====================================================================
   20. SOLICITUDES DE ALQUILER (SOLVENCIA, ACEPTAR O RECHAZAR, DEL PROPIETARIO)
   ===================================================================== */

// Cada solicitud es una tarjeta con data-estado ("pendiente", "aceptada" o "rechazada").
// Los cambios solo se ven en pantalla: al recargar se pierden, porque no hay backend.
const listaSolicitudes = document.getElementById('lista-solicitudes');

// --- Solvencia (el "sistema de scoring") ---

// Devuelve las estrellas (de 1 a 5) según cuántas veces cubren los ingresos el alquiler
function estrellasDeSolvencia(veces) {
  if (veces >= 4) {
    return 5;
  }
  if (veces >= 3) {
    return 4;
  }
  if (veces >= 2.5) {
    return 3;
  }
  if (veces >= 2) {
    return 2;
  }
  return 1;
}

// Devuelve la palabra de la solvencia: alta (4 o 5 estrellas), media (3) o baja (1 o 2)
function palabraDeSolvencia(estrellas) {
  if (estrellas >= 4) {
    return 'Alta';
  }
  if (estrellas === 3) {
    return 'Media';
  }
  return 'Baja';
}

// Escribe en una caja las estrellas: primero las llenas (doradas) y luego las vacías (grises)
function pintarEstrellas(caja, estrellas) {
  caja.innerHTML = '';

  const llenas = document.createElement('span');
  llenas.className = 'estrellas-llenas';
  llenas.textContent = '★'.repeat(estrellas);

  const vacias = document.createElement('span');
  vacias.className = 'estrellas-vacias';
  vacias.textContent = '★'.repeat(5 - estrellas);

  caja.appendChild(llenas);
  caja.appendChild(vacias);

  // Al pasar el ratón sale "4 de 5 estrellas".
  // Para los lectores de pantalla la caja entera es una "imagen" con ese mismo texto
  // (así no leen "estrella, estrella, estrella...")
  caja.setAttribute('title', estrellas + ' de 5 estrellas');
  caja.setAttribute('role', 'img');
  caja.setAttribute('aria-label', 'Solvencia: ' + estrellas + ' de 5 estrellas');
}

// Rellena la solvencia de cada tarjeta: las estrellas junto al nombre, la palabra en la fila
// "Solvencia" y el texto que enseña el botón "?".
// Los ingresos y el alquiler están en data-ingresos y data-alquiler de cada tarjeta
// (los ingresos siempre están: en "Solicitar alquiler" son obligatorios).
function calcularSolvencia() {
  const tarjetas = document.querySelectorAll('.tarjeta-solicitud');

  for (let i = 0; i < tarjetas.length; i++) {
    const ingresos = Number(tarjetas[i].getAttribute('data-ingresos'));
    const alquiler = Number(tarjetas[i].getAttribute('data-alquiler'));

    // Ejemplo: 3400 / 1100 = 3,09... Se redondea a un decimal y se cambia el punto por una coma
    const veces = ingresos / alquiler;
    const vecesConComa = veces.toFixed(1).replace('.', ',');

    const estrellas = estrellasDeSolvencia(veces);
    const palabra = palabraDeSolvencia(estrellas);

    // Estrellas junto al nombre y palabra en la fila
    pintarEstrellas(tarjetas[i].querySelector('.solvencia'), estrellas);
    tarjetas[i].querySelector('.nivel-solvencia').textContent = palabra;

    // Explicación del botón "?" (conPuntoDeMiles está en el bloque 23).
    // Se usa solo el nombre de pila: "Laura Sánchez" pasa a "Laura"
    const nombre = tarjetas[i].getAttribute('data-nombre').split(' ')[0];
    const frase = nombre + ' gana ' + conPuntoDeMiles(ingresos) + ' € al mes y el alquiler cuesta ' +
      conPuntoDeMiles(alquiler) + ' €. Es decir, gana ' + vecesConComa + ' veces lo que cuesta el alquiler.';

    escribirExplicacionSolvencia(tarjetas[i].querySelector('.explicacion-solvencia'), frase, estrellas, nombre);

    // Al pasar el ratón por el "?" se ve la primera frase
    tarjetas[i].querySelector('.ayuda-solvencia').setAttribute('title', frase);
  }
}

// Escribe la explicación que enseña el botón "?":
// 1. lo que pasa con esta persona, 2. por qué importa y 3. la lista de estrellas con su fila marcada
function escribirExplicacionSolvencia(caja, frase, estrellas, nombre) {
  caja.innerHTML = '';

  const parrafo1 = document.createElement('p');
  parrafo1.textContent = frase;

  const parrafo2 = document.createElement('p');
  parrafo2.textContent = 'Cuanto más gana una persona en comparación con el alquiler, más fácil le resulta pagarlo cada mes. Así se reparten las estrellas:';

  caja.appendChild(parrafo1);
  caja.appendChild(parrafo2);

  // Una fila por cada número de estrellas, de 5 a 1
  // (la posición 0 no se usa; los tramos no se pisan entre sí)
  const textos = ['', 'Gana menos de 2 veces el alquiler', 'Gana entre 2 y 2,5 veces el alquiler',
    'Gana entre 2,5 y 3 veces el alquiler', 'Gana entre 3 y 4 veces el alquiler', 'Gana 4 veces el alquiler o más'];

  const lista = document.createElement('ul');
  lista.className = 'escala-solvencia';

  for (let n = 5; n >= 1; n--) {
    const fila = document.createElement('li');

    const dibujo = document.createElement('span');
    dibujo.className = 'estrellas';
    pintarEstrellas(dibujo, n);

    const texto = document.createElement('span');
    texto.textContent = textos[n];

    fila.appendChild(dibujo);
    fila.appendChild(texto);

    // La fila que le toca a esta persona se marca y lleva su nombre
    if (n === estrellas) {
      fila.className = 'nivel-actual';
      const marca = document.createElement('strong');
      marca.textContent = '← ' + nombre;
      fila.appendChild(marca);
    }

    lista.appendChild(fila);
  }

  caja.appendChild(lista);
}

// Se ejecuta al pulsar el botón "?": enseña o esconde la explicación de esa tarjeta
function mostrarExplicacionSolvencia(evento) {
  const boton = evento.currentTarget;
  const explicacion = boton.closest('.tarjeta-solicitud').querySelector('.explicacion-solvencia');

  // hidden es true cuando está escondida: se cambia al contrario
  explicacion.hidden = !explicacion.hidden;

  // aria-expanded le dice a los lectores de pantalla si está abierta o cerrada
  boton.setAttribute('aria-expanded', explicacion.hidden === false);
}

// Se ejecuta con cualquier clic en la página (como en las preguntas de "¿Cómo funciona?").
// Cierra las explicaciones abiertas, salvo si el clic ha sido dentro de la explicación
// o en su propio botón "?" (de ese ya se encarga mostrarExplicacionSolvencia).
function cerrarExplicacionesAlClicarFuera(evento) {
  const tarjetas = document.querySelectorAll('.tarjeta-solicitud');

  for (let i = 0; i < tarjetas.length; i++) {
    const boton = tarjetas[i].querySelector('.ayuda-solvencia');
    const explicacion = tarjetas[i].querySelector('.explicacion-solvencia');

    // contains: true si el elemento clicado está dentro
    const clicEnLaExplicacion = explicacion.contains(evento.target);
    const clicEnSuBoton = boton.contains(evento.target);

    if (clicEnLaExplicacion === false && clicEnSuBoton === false) {
      explicacion.hidden = true;
      boton.setAttribute('aria-expanded', 'false');
    }
  }
}

// --- Contadores y botones ---

// Cuenta las tarjetas de cada estado y escribe las cifras del resumen
function actualizarContadoresSolicitudes() {
  const tarjetas = document.querySelectorAll('.tarjeta-solicitud');

  let pendientes = 0;
  let aceptadas = 0;
  let rechazadas = 0;

  for (let i = 0; i < tarjetas.length; i++) {
    const estado = tarjetas[i].getAttribute('data-estado');

    if (estado === 'pendiente') {
      pendientes++;
    } else if (estado === 'aceptada') {
      aceptadas++;
    } else if (estado === 'rechazada') {
      rechazadas++;
    }
  }

  document.getElementById('contador-pendientes').textContent = pendientes;
  document.getElementById('contador-aceptadas').textContent = aceptadas;
  document.getElementById('contador-rechazadas').textContent = rechazadas;
  document.getElementById('contador-total').textContent = tarjetas.length;

  // Si no hay ninguna tarjeta, se enseña el mensaje
  if (tarjetas.length === 0) {
    document.getElementById('sin-solicitudes').style.display = 'block';
  }
}

// Cambia una tarjeta a "Aceptada" o "Rechazada":
// la insignia, el data-estado y los botones (que se cambian por una frase)
function responderSolicitud(tarjeta, nuevoEstado, textoEstado, frase) {
  tarjeta.setAttribute('data-estado', nuevoEstado);

  const insignia = tarjeta.querySelector('.estado-solicitud');
  insignia.textContent = textoEstado;
  insignia.className = clasesDeInsignia(textoEstado) + ' estado-solicitud';

  // Se quitan los botones y se pone la frase en su lugar
  const acciones = tarjeta.querySelector('.acciones-solicitud');
  acciones.innerHTML = '';

  const nota = document.createElement('p');
  nota.className = 'nota-solicitud';
  nota.textContent = frase + ' el ' + fechaDeHoy() + '.';
  acciones.appendChild(nota);

  actualizarContadoresSolicitudes();
}

// Se ejecuta al pulsar "Aceptar"
function aceptarSolicitud(evento) {
  // closest: busca hacia arriba la tarjeta en la que está el botón
  const tarjeta = evento.currentTarget.closest('.tarjeta-solicitud');
  const nombre = tarjeta.getAttribute('data-nombre');

  if (confirm('¿Quieres aceptar la solicitud de ' + nombre + '?')) {
    responderSolicitud(tarjeta, 'aceptada', 'Aceptada', 'Aceptaste esta solicitud');
  }
}

// Se ejecuta al pulsar "Rechazar"
function rechazarSolicitud(evento) {
  const tarjeta = evento.currentTarget.closest('.tarjeta-solicitud');
  const nombre = tarjeta.getAttribute('data-nombre');

  if (confirm('¿Quieres rechazar la solicitud de ' + nombre + '?')) {
    responderSolicitud(tarjeta, 'rechazada', 'Rechazada', 'Rechazaste esta solicitud');
  }
}

// Solo se activa si la página actual es la de solicitudes del propietario
if (listaSolicitudes) {
  calcularSolvencia();
  actualizarContadoresSolicitudes();

  const botonesAyuda = document.querySelectorAll('.ayuda-solvencia');
  for (let i = 0; i < botonesAyuda.length; i++) {
    botonesAyuda[i].addEventListener('click', mostrarExplicacionSolvencia);
  }

  document.addEventListener('click', cerrarExplicacionesAlClicarFuera);

  const botonesAceptar = document.querySelectorAll('.boton-aceptar');
  for (let i = 0; i < botonesAceptar.length; i++) {
    botonesAceptar[i].addEventListener('click', aceptarSolicitud);
  }

  const botonesRechazar = document.querySelectorAll('.boton-rechazar');
  for (let i = 0; i < botonesRechazar.length; i++) {
    botonesRechazar[i].addEventListener('click', rechazarSolicitud);
  }
}


/* =====================================================================
   21. RECUPERAR CONTRASEÑA
   ===================================================================== */

const formularioRecuperar = document.getElementById('formulario-recuperar');

// Cuando la persona escribe, se quita el error
function quitarErrorAlEscribirEnRecuperar(evento) {
  quitarError(evento.target.id);
}

// Se ejecuta al pulsar "Enviar enlace"
function validarRecuperar(evento) {
  evento.preventDefault();

  const email = document.getElementById('email-recuperar');

  limpiarErrores(formularioRecuperar);

  if (email.value.trim() === '') {
    mostrarError('email-recuperar', 'error-email-recuperar', 'El correo electrónico es obligatorio.');
    email.focus();
    return;
  }

  if (esEmailValido(email.value.trim()) === false) {
    mostrarError('email-recuperar', 'error-email-recuperar', 'Introduce un correo válido, por ejemplo correo@ejemplo.com.');
    email.focus();
    return;
  }

  // Si todo está bien: se esconde el formulario y se enseña el mensaje con el correo.
  // Pendiente: el backend enviará el correo con el enlace.
  document.getElementById('recuperar-correo').textContent = email.value.trim();
  formularioRecuperar.style.display = 'none';
  document.getElementById('recuperar-enviado').style.display = 'block';
}

// Solo se activa si la página actual tiene el formulario de recuperar contraseña
if (formularioRecuperar) {
  document.getElementById('email-recuperar').addEventListener('input', quitarErrorAlEscribirEnRecuperar);
  formularioRecuperar.addEventListener('submit', validarRecuperar);
}


/* =====================================================================
   22. SUBIR JUSTIFICANTE (INQUILINO)
   ===================================================================== */

const formularioJustificante = document.getElementById('formulario-justificante');

// Cuando la persona escribe o elige algo en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnJustificante(evento) {
  quitarError(evento.target.id);
}

// Se ejecuta al pulsar "Enviar justificante"
function validarJustificante(evento) {
  evento.preventDefault();

  // Campos del formulario
  const fechaPago = document.getElementById('fecha-pago');
  const metodo = document.getElementById('metodo-pago');
  const archivo = document.getElementById('archivo-justificante');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioJustificante);

  // --- Fecha del pago (obligatoria y no puede ser posterior a hoy) ---
  // Se comparan como texto, igual que en "Solicitar alquiler" (bloque 19)
  if (fechaPago.value === '') {
    mostrarError('fecha-pago', 'error-fecha-pago', 'Indica la fecha en la que pagaste.');
    if (primerError === null) {
      primerError = fechaPago;
    }
  } else if (fechaPago.value > fechaDeHoyParaCaja()) {
    mostrarError('fecha-pago', 'error-fecha-pago', 'La fecha del pago no puede ser posterior a hoy.');
    if (primerError === null) {
      primerError = fechaPago;
    }
  }

  // --- Forma de pago (hay que elegir una) ---
  if (metodo.value === '') {
    mostrarError('metodo-pago', 'error-metodo-pago', 'Selecciona cómo has pagado.');
    if (primerError === null) {
      primerError = metodo;
    }
  }

  // --- Archivo (obligatorio, y tiene que ser una imagen o un PDF) ---
  if (archivo.files.length === 0) {
    mostrarError('archivo-justificante', 'error-archivo-justificante', 'Selecciona el archivo del justificante.');
    if (primerError === null) {
      primerError = archivo;
    }
  } else {
    const tipo = archivo.files[0].type;
    if (tipo.indexOf('image/') !== 0 && tipo !== 'application/pdf') {
      mostrarError('archivo-justificante', 'error-archivo-justificante', 'El archivo tiene que ser una imagen o un PDF.');
      if (primerError === null) {
        primerError = archivo;
      }
    }
  }

  // Si hay algún error: el cursor va al primero y no se envía el formulario
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien: aviso y vuelta a los pagos
  alert('Justificante enviado. El propietario confirmará el pago. (Pendiente de conexión con la API)');
  window.location.href = 'pagos-inquilino.html';
}

// Solo se activa si la página actual tiene el formulario de subir justificante
if (formularioJustificante) {
  // En el calendario no se pueden elegir días posteriores a hoy
  document.getElementById('fecha-pago').max = fechaDeHoyParaCaja();

  const idsDeLosCamposJustificante = ['fecha-pago', 'metodo-pago', 'archivo-justificante'];
  for (let i = 0; i < idsDeLosCamposJustificante.length; i++) {
    const campo = document.getElementById(idsDeLosCamposJustificante[i]);
    campo.addEventListener('input', quitarErrorAlEscribirEnJustificante);
    campo.addEventListener('change', quitarErrorAlEscribirEnJustificante);
  }

  formularioJustificante.addEventListener('submit', validarJustificante);
}


/* =====================================================================
   23. CONFIRMAR PAGO (PROPIETARIO)
   ===================================================================== */

// Los cambios solo se ven en pantalla: al recargar se pierden, porque no hay backend.
const enlacesConfirmarPago = document.querySelectorAll('.confirmar-pago');

// Pone el punto de los miles: 2550 pasa a ser "2.550" (vale hasta 999.999)
function conPuntoDeMiles(numero) {
  const texto = '' + numero;
  if (texto.length <= 3) {
    return texto;
  }
  return texto.substring(0, texto.length - 3) + '.' + texto.substring(texto.length - 3);
}

// Recalcula las tarjetas de resumen a partir de las filas de la tabla
// (cada fila lleva data-estado y data-importe)
function actualizarResumenPagos() {
  const filas = document.querySelectorAll('#cuerpo-tabla-pagos tr');

  let pendientes = 0;
  let importePendiente = 0;
  let cobrados = 0;
  let totalCobrado = 0;

  for (let i = 0; i < filas.length; i++) {
    const importe = Number(filas[i].getAttribute('data-importe'));

    if (filas[i].getAttribute('data-estado') === 'pendiente') {
      pendientes++;
      importePendiente = importePendiente + importe;
    } else {
      cobrados++;
      totalCobrado = totalCobrado + importe;
    }
  }

  document.getElementById('pagos-pendientes').textContent = pendientes;
  document.getElementById('importe-pendiente').textContent = conPuntoDeMiles(importePendiente) + ' € sin confirmar';
  document.getElementById('pagos-cobrados').textContent = cobrados;
  document.getElementById('total-cobrado').textContent = conPuntoDeMiles(totalCobrado) + ' €';
}

// Se ejecuta al pulsar "Confirmar" en un pago pendiente
function confirmarPago(evento) {
  // Es un enlace: se evita que suba al principio de la página
  evento.preventDefault();

  const enlace = evento.currentTarget;
  const fila = enlace.closest('tr');
  const inquilino = enlace.getAttribute('data-inquilino');

  if (confirm('¿Confirmas que has recibido el pago de ' + inquilino + '?') === false) {
    return;
  }

  // La fila pasa a "pagado" (así el filtro también la trata como pagada)
  fila.setAttribute('data-estado', 'pagado');

  // Fecha de cobro: hoy
  const celdaFecha = fila.querySelector('.fecha-cobro');
  celdaFecha.textContent = fechaDeHoy();
  celdaFecha.classList.remove('vacio');

  // Insignia en verde
  const insignia = fila.querySelector('.insignia');
  insignia.textContent = 'Pagado';
  insignia.className = clasesDeInsignia('Pagado');

  // El enlace "Confirmar" pasa a ser "Justificante", como en los demás pagos cobrados
  enlace.textContent = 'Justificante';
  enlace.classList.remove('confirmar-pago');
  enlace.removeEventListener('click', confirmarPago);

  actualizarResumenPagos();
}

// Solo se activa si la página tiene pagos para confirmar (pagos del propietario)
if (enlacesConfirmarPago.length > 0) {
  for (let i = 0; i < enlacesConfirmarPago.length; i++) {
    enlacesConfirmarPago[i].addEventListener('click', confirmarPago);
  }
}


/* =====================================================================
   24. MI PERFIL (DATOS PERSONALES Y CAMBIAR CONTRASEÑA)
   ===================================================================== */

// Las páginas de perfil del propietario y del inquilino usan los mismos ids
const formularioPerfil = document.getElementById('formulario-perfil');
const formularioContrasena = document.getElementById('formulario-contrasena');

// Cuando la persona escribe en un campo, se quita el error de ese campo
function quitarErrorAlEscribirEnPerfil(evento) {
  quitarError(evento.target.id);
}

// Se ejecuta al pulsar "Guardar cambios" (datos personales)
function validarPerfil(evento) {
  evento.preventDefault();

  // Campos del formulario
  const nombre = document.getElementById('nombre-perfil');
  const apellidos = document.getElementById('apellidos-perfil');
  const email = document.getElementById('email-perfil');
  const telefono = document.getElementById('telefono-perfil');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioPerfil);

  // --- Nombre ---
  if (nombre.value.trim() === '') {
    mostrarError('nombre-perfil', 'error-nombre-perfil', 'El nombre es obligatorio.');
    if (primerError === null) {
      primerError = nombre;
    }
  } else if (esNombreValido(nombre.value.trim()) === false) {
    mostrarError('nombre-perfil', 'error-nombre-perfil', 'Introduce un nombre válido (mínimo 2 letras).');
    if (primerError === null) {
      primerError = nombre;
    }
  }

  // --- Apellidos ---
  if (apellidos.value.trim() === '') {
    mostrarError('apellidos-perfil', 'error-apellidos-perfil', 'Los apellidos son obligatorios.');
    if (primerError === null) {
      primerError = apellidos;
    }
  } else if (esNombreValido(apellidos.value.trim()) === false) {
    mostrarError('apellidos-perfil', 'error-apellidos-perfil', 'Introduce unos apellidos válidos (mínimo 2 letras).');
    if (primerError === null) {
      primerError = apellidos;
    }
  }

  // --- Correo electrónico ---
  if (email.value.trim() === '') {
    mostrarError('email-perfil', 'error-email-perfil', 'El correo electrónico es obligatorio.');
    if (primerError === null) {
      primerError = email;
    }
  } else if (esEmailValido(email.value.trim()) === false) {
    mostrarError('email-perfil', 'error-email-perfil', 'Introduce un correo válido, por ejemplo correo@ejemplo.com.');
    if (primerError === null) {
      primerError = email;
    }
  }

  // --- Teléfono (es opcional: solo se comprueba si se ha escrito algo) ---
  if (telefono.value.trim() !== '' && esTelefonoValido(telefono.value.trim()) === false) {
    mostrarError('telefono-perfil', 'error-telefono-perfil', 'Introduce un teléfono válido de 9 cifras.');
    if (primerError === null) {
      primerError = telefono;
    }
  }

  // Si hay algún error: el cursor va al primero y no se guarda
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien: la cabecera muestra los datos nuevos
  // (el saludo, las iniciales del botón y el nombre y el correo del submenú)
  const nombreNuevo = nombre.value.trim();
  const apellidosNuevos = apellidos.value.trim();

  document.getElementById('nombre-usuario').textContent = nombreNuevo;
  document.getElementById('submenu-nombre').textContent = nombreNuevo + ' ' + apellidosNuevos;

  // Iniciales nuevas: se guardan en data-iniciales y se vuelven a pintar el botón
  // y la vista previa (si hay foto de perfil, se sigue viendo la foto; bloque 26)
  const inicialesNuevas = (nombreNuevo.charAt(0) + apellidosNuevos.charAt(0)).toUpperCase();
  document.getElementById('boton-perfil').setAttribute('data-iniciales', inicialesNuevas);
  pintarFotoDePerfil();
  document.getElementById('submenu-email').textContent = email.value.trim();

  alert('Datos guardados correctamente. (Pendiente de conexión con la API)');
}

// Se ejecuta al pulsar "Cambiar contraseña"
function validarCambioContrasena(evento) {
  evento.preventDefault();

  const actual = document.getElementById('contrasena-actual');
  const nueva = document.getElementById('contrasena-nueva');
  const repetida = document.getElementById('confirmar-contrasena-nueva');

  // Primer campo con error (para llevar el cursor hasta él). Al principio no hay ninguno.
  let primerError = null;

  limpiarErrores(formularioContrasena);

  // --- Contraseña actual (obligatoria; el backend comprobará que es la buena) ---
  if (actual.value === '') {
    mostrarError('contrasena-actual', 'error-contrasena-actual', 'Escribe tu contraseña actual.');
    if (primerError === null) {
      primerError = actual;
    }
  }

  // --- Contraseña nueva (mínimo 6 caracteres y distinta de la actual) ---
  if (nueva.value.length < 6) {
    mostrarError('contrasena-nueva', 'error-contrasena-nueva', 'La contraseña nueva debe tener al menos 6 caracteres.');
    if (primerError === null) {
      primerError = nueva;
    }
  } else if (nueva.value === actual.value) {
    mostrarError('contrasena-nueva', 'error-contrasena-nueva', 'La contraseña nueva tiene que ser distinta de la actual.');
    if (primerError === null) {
      primerError = nueva;
    }
  }

  // --- Repetir la contraseña nueva (tiene que ser igual) ---
  if (repetida.value !== nueva.value) {
    mostrarError('confirmar-contrasena-nueva', 'error-confirmar-contrasena-nueva', 'Las contraseñas no coinciden.');
    if (primerError === null) {
      primerError = repetida;
    }
  }

  // Si hay algún error: el cursor va al primero y no se cambia
  if (primerError !== null) {
    primerError.focus();
    return;
  }

  // Si todo está bien
  alert('Contraseña cambiada correctamente. (Pendiente de conexión con la API)');
  formularioContrasena.reset();
}

// Solo se activa si la página actual es "Mi perfil"
if (formularioPerfil) {
  const idsDeLosCamposPerfil = ['nombre-perfil', 'apellidos-perfil', 'email-perfil', 'telefono-perfil', 'contrasena-actual', 'contrasena-nueva', 'confirmar-contrasena-nueva'];
  for (let i = 0; i < idsDeLosCamposPerfil.length; i++) {
    document.getElementById(idsDeLosCamposPerfil[i]).addEventListener('input', quitarErrorAlEscribirEnPerfil);
  }

  formularioPerfil.addEventListener('submit', validarPerfil);
  formularioContrasena.addEventListener('submit', validarCambioContrasena);
}


/* =====================================================================
   25. MENÚ DE PERFIL DE LA CABECERA (PROPIETARIO E INQUILINO)
   ===================================================================== */

// El botón con las iniciales abre y cierra el submenú (datos de la cuenta,
// "Mi perfil" y "Cerrar sesión"). Se cierra también al clicar fuera o con la tecla Esc.
const botonPerfil = document.getElementById('boton-perfil');
const submenuPerfil = document.getElementById('submenu-perfil');

// Abre el submenú si está cerrado y lo cierra si está abierto
function abrirOCerrarSubmenu() {
  submenuPerfil.hidden = !submenuPerfil.hidden;

  // aria-expanded le dice a los lectores de pantalla si está abierto o cerrado
  botonPerfil.setAttribute('aria-expanded', submenuPerfil.hidden === false);
}

// Cierra el submenú
function cerrarSubmenu() {
  submenuPerfil.hidden = true;
  botonPerfil.setAttribute('aria-expanded', 'false');
}

// Se ejecuta con cualquier clic en la página:
// si no ha sido en el botón ni dentro del submenú, se cierra
function cerrarSubmenuAlClicarFuera(evento) {
  if (botonPerfil.contains(evento.target) === false && submenuPerfil.contains(evento.target) === false) {
    cerrarSubmenu();
  }
}

// Se ejecuta al pulsar una tecla: con Esc se cierra y el cursor vuelve al botón
function cerrarSubmenuConEscape(evento) {
  if (evento.key === 'Escape' && submenuPerfil.hidden === false) {
    cerrarSubmenu();
    botonPerfil.focus();
  }
}

// Solo se activa en las páginas del propietario y del inquilino (las que tienen el botón)
if (botonPerfil) {
  botonPerfil.addEventListener('click', abrirOCerrarSubmenu);
  document.addEventListener('click', cerrarSubmenuAlClicarFuera);
  document.addEventListener('keydown', cerrarSubmenuConEscape);
}


/* =====================================================================
   26. FOTO DE PERFIL (GUARDARLA EN EL NAVEGADOR Y ENSEÑARLA EN LA CABECERA)
   ===================================================================== */

// Sin backend, la foto se guarda en el navegador con localStorage: es un pequeño
// almacén de textos (clave -> valor) que no se borra al cambiar de página ni al recargar.
// La foto se guarda como texto ("data URL", empieza por "data:image/...").
// Hay una clave para cada tipo de cuenta, así el propietario y el inquilino de la demo
// tienen cada uno la suya: "alquitech-foto-propietario" y "alquitech-foto-inquilino".
// Pendiente: con el backend, la foto se subirá al servidor y vendrá de la base de datos.

// Tamaño máximo de la foto: 2 MB (1 MB = 1024 * 1024 bytes).
// localStorage solo deja guardar unos 5 MB por web, y la foto ocupa más al pasarla a texto.
const TAMANO_MAXIMO_FOTO = 2 * 1024 * 1024;

// Devuelve la clave de localStorage según la cuenta de la página (data-rol del menú de perfil)
function claveFotoDePerfil() {
  const rol = document.querySelector('.menu-perfil').getAttribute('data-rol');
  return 'alquitech-foto-' + rol;
}

// Devuelve la foto guardada, o null si no hay.
// try/catch: en algunos navegadores (por ejemplo, en modo incógnito) localStorage
// puede dar error; entonces se hace como si no hubiera foto.
function leerFotoDePerfil() {
  try {
    return localStorage.getItem(claveFotoDePerfil());
  } catch (error) {
    return null;
  }
}

// Escribe dentro de una caja la foto (como <img>) o, si no hay foto, las iniciales
function pintarFotoOIniciales(caja, foto, iniciales) {
  caja.innerHTML = '';

  if (foto === null) {
    caja.textContent = iniciales;
    caja.classList.remove('con-foto');
    return;
  }

  const imagen = document.createElement('img');
  imagen.src = foto;
  // alt vacío: es decorativa (el botón ya tiene su nombre "Menú de perfil")
  imagen.alt = '';
  caja.appendChild(imagen);
  caja.classList.add('con-foto');
}

// Pinta la foto (o las iniciales) en el botón de la cabecera y, en "Mi perfil",
// también en la vista previa grande y enseña o esconde el botón "Quitar foto"
function pintarFotoDePerfil() {
  const foto = leerFotoDePerfil();
  const iniciales = botonPerfil.getAttribute('data-iniciales');

  pintarFotoOIniciales(botonPerfil, foto, iniciales);

  const vistaPrevia = document.getElementById('vista-foto-perfil');
  if (vistaPrevia) {
    pintarFotoOIniciales(vistaPrevia, foto, iniciales);
    document.getElementById('quitar-foto-perfil').hidden = (foto === null);
  }
}

// Se ejecuta al pulsar "Cambiar foto": abre el selector de archivos (el campo está escondido)
function abrirSelectorDeFoto() {
  document.getElementById('archivo-foto-perfil').click();
}

// Se ejecuta cuando se elige un archivo: se comprueba, se lee y se guarda
function cambiarFotoDePerfil(evento) {
  const campo = evento.target;
  quitarError('archivo-foto-perfil');

  // Si se ha cerrado el selector sin elegir nada, no se hace nada
  if (campo.files.length === 0) {
    return;
  }

  const archivo = campo.files[0];

  // Solo JPG, PNG o WebP
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
  if (tiposPermitidos.indexOf(archivo.type) === -1) {
    mostrarError('archivo-foto-perfil', 'error-archivo-foto-perfil', 'La foto tiene que ser JPG, PNG o WebP.');
    campo.value = '';
    return;
  }

  // Como máximo 2 MB
  if (archivo.size > TAMANO_MAXIMO_FOTO) {
    mostrarError('archivo-foto-perfil', 'error-archivo-foto-perfil', 'La foto pesa demasiado: como máximo 2 MB.');
    campo.value = '';
    return;
  }

  // FileReader lee el archivo y lo convierte en texto ("data URL").
  // Tarda un momento: cuando termina, se ejecuta la función de onload.
  const lector = new FileReader();

  lector.onload = function () {
    try {
      localStorage.setItem(claveFotoDePerfil(), lector.result);
    } catch (error) {
      // Por ejemplo, si el almacén del navegador está lleno
      mostrarError('archivo-foto-perfil', 'error-archivo-foto-perfil', 'No se ha podido guardar la foto en este navegador. Prueba con una más pequeña.');
      return;
    }
    pintarFotoDePerfil();
  };

  lector.readAsDataURL(archivo);

  // Se vacía el campo para poder volver a elegir el mismo archivo si se quiere
  campo.value = '';
}

// Se ejecuta al pulsar "Quitar foto": se borra y vuelven las iniciales
function quitarFotoDePerfil() {
  try {
    localStorage.removeItem(claveFotoDePerfil());
  } catch (error) {
    // Si localStorage no funciona, tampoco había foto guardada
  }
  quitarError('archivo-foto-perfil');
  pintarFotoDePerfil();
}

// En todas las páginas del propietario y del inquilino: la cabecera enseña la foto si la hay
if (botonPerfil) {
  pintarFotoDePerfil();
}

// Solo en "Mi perfil": los botones de cambiar y quitar la foto
const botonCambiarFoto = document.getElementById('cambiar-foto-perfil');

if (botonCambiarFoto) {
  botonCambiarFoto.addEventListener('click', abrirSelectorDeFoto);
  document.getElementById('archivo-foto-perfil').addEventListener('change', cambiarFotoDePerfil);
  document.getElementById('quitar-foto-perfil').addEventListener('click', quitarFotoDePerfil);
}
