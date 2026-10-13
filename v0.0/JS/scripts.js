// ── NAVBAR SCROLL ──
window.addEventListener('scroll', function() {
  const cabecera = document.querySelector('header');
  if (window.scrollY > 50) {
    cabecera.classList.add('reducido');
  } else {
    cabecera.classList.remove('reducido');
  }
});

// VALIDACIÓN DATOS DEL FORMULARIO DE REGISTRO

const formularioRegistro = document.getElementById('formulario-registro');

if (formularioRegistro) {
  formularioRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault();

    let valido = true;

    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const dni = document.getElementById('dni');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmar-contrasena');
    const rol = document.querySelector('input[name="rol"]:checked');

    // Limpiar errores
    document.querySelectorAll('.error').forEach(e => e.textContent = '');

    // Validar nombre
    if (nombre.value.trim() === '') {
      document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
      valido = false;
    }

    // Validar apellidos
    if (apellidos.value.trim() === '') {
      document.getElementById('error-apellidos').textContent = 'Los apellidos son obligatorios.';
      valido = false;
    }

    // Validar email
    if (email.value.trim() === '') {
      document.getElementById('error-email').textContent = 'El correo electrónico es obligatorio.';
      valido = false;
    }

    // Validar DNI
    if (dni.value.trim() === '') {
      document.getElementById('error-dni').textContent = 'El DNI es obligatorio.';
      valido = false;
    }

    // Validar contraseña
    if (contrasena.value.length < 6) {
      document.getElementById('error-contrasena').textContent = 'La contraseña debe tener al menos 6 caracteres.';
      valido = false;
    }

    // Validar confirmación de contraseña
    if (contrasena.value !== confirmarContrasena.value) {
      document.getElementById('error-confirmar-contrasena').textContent = 'Las contraseñas no coinciden.';
      valido = false;
    }

    // Validar rol
    if (!rol) {
      document.getElementById('error-rol').textContent = 'Debes seleccionar un tipo de usuario.';
      valido = false;
    }

    // Si todo es válido
    if (valido) {
      alert('Registro completado correctamente. (Pendiente de conexión con la API)');
      formularioRegistro.reset();
    }
  });
}

// ── LOGIN Y VALIDACIÓN DE DATOS DEL LOGIN ──
const formularioLogin = document.getElementById('formulario-login');

if (formularioLogin) {
  formularioLogin.addEventListener('submit', function(evento) {
    evento.preventDefault();

    let valido = true;

    const email = document.getElementById('email-login');
    const contrasena = document.getElementById('contrasena-login');

    // Limpiar errores
    document.getElementById('error-email-login').textContent = '';
    document.getElementById('error-contrasena-login').textContent = '';

    // Validar email
    if (email.value.trim() === '') {
      document.getElementById('error-email-login').textContent = 'El correo electrónico es obligatorio.';
      valido = false;
    }

    // Validar contraseña
    if (contrasena.value.trim() === '') {
      document.getElementById('error-contrasena-login').textContent = 'La contraseña es obligatoria.';
      valido = false;
    }

    // Si todo es válido
    if (valido) {
      alert('Inicio de sesión correcto. (Pendiente de conexión con la API)');
      formularioLogin.reset();
    }
  });
}

// ── DASHBOARD PROPIETARIO ──
const dashboardPropietario = document.getElementById('dashboard-propietario');

if (dashboardPropietario) {
  // Por implementar
}

// ── DASHBOARD INQUILINO ──
const dashboardInquilino = document.getElementById('dashboard-inquilino');

if (dashboardInquilino) {
  // Por implementar
}

// ── CATALOGO  INMUEBLES ──
const cuadriculaInmuebles = document.getElementById('cuadricula-inmuebles');

if (cuadriculaInmuebles) {
  const botonFiltrar = document.getElementById('boton-filtrar');
  const botonLimpiar = document.getElementById('boton-limpiar');
  const filtroCiudad = document.getElementById('filtro-ciudad');
  const filtroPrecioMin = document.getElementById('filtro-precio-min');
  const filtroPrecioMax = document.getElementById('filtro-precio-max');
  const textoResultados = document.getElementById('texto-resultados');
  const sinResultados = document.getElementById('sin-resultados');
  const tarjetas = document.querySelectorAll('.tarjeta-inmueble');

  function filtrar() {
    const ciudad = filtroCiudad.value;
    const precioMin = filtroPrecioMin.value ? parseInt(filtroPrecioMin.value) : 0;
    const precioMax = filtroPrecioMax.value ? parseInt(filtroPrecioMax.value) : Infinity;

    let visibles = 0;

    tarjetas.forEach(function(tarjeta) {
      const ciudadTarjeta = tarjeta.dataset.ciudad;
      const precioTarjeta = parseInt(tarjeta.dataset.precio);

      const coincideCiudad = ciudad === '' || ciudadTarjeta === ciudad;
      const coincidePrecio = precioTarjeta >= precioMin && precioTarjeta <= precioMax;

      if (coincideCiudad && coincidePrecio) {
        tarjeta.style.display = 'block';
        visibles++;
      } else {
        tarjeta.style.display = 'none';
      }
    });

    textoResultados.textContent = 'Mostrando ' + visibles + ' inmuebles';
    sinResultados.style.display = visibles === 0 ? 'block' : 'none';
  }

  function limpiar() {
    filtroCiudad.value = '';
    filtroPrecioMin.value = '';
    filtroPrecioMax.value = '';
    filtrar();
  }

  botonFiltrar.addEventListener('click', filtrar);
  botonLimpiar.addEventListener('click', limpiar);
}