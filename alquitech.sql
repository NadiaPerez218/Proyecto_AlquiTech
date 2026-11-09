CREATE DATABASE IF NOT EXISTS alquitech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alquitech;

CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

INSERT INTO roles (nombre_rol, descripcion)
VALUES ('propietario', 'Usuario propietario de inmuebles'),
       ('inquilino', 'Usuario buscador/inquilino'),
       ('admin', 'Administrador de la plataforma')
ON DUPLICATE KEY UPDATE nombre_rol=VALUES(nombre_rol);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    dni VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    foto_perfil VARCHAR(255) DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS inmuebles (
    id_inmueble INT AUTO_INCREMENT PRIMARY KEY,
    id_propietario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fianza DECIMAL(10, 2) NOT NULL,
    habitaciones INT NOT NULL,
    banos INT NOT NULL,
    superficie INT NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    texto_imagen VARCHAR(255),
    disponibilidad VARCHAR(50) DEFAULT 'Inmediata',
    estado ENUM('disponible', 'alquilado', 'mantenimiento') DEFAULT 'disponible',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_inmueble_propietario FOREIGN KEY (id_propietario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inmueble_caracteristicas (
    id_caracteristica INT AUTO_INCREMENT PRIMARY KEY,
    id_inmueble INT NOT NULL,
    clave_casilla VARCHAR(50) NOT NULL,
    nombre_etiqueta VARCHAR(100) NOT NULL,
    CONSTRAINT fk_caracteristica_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id_inmueble) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS solicitudes_alquiler (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    id_inmueble INT NOT NULL,
    id_inquilino INT NOT NULL,
    fecha_entrada DATE NOT NULL,
    duracion_meses INT NOT NULL,
    personas INT NOT NULL,
    ingresos DECIMAL(10, 2) NOT NULL,
    mensaje TEXT NOT NULL,
    estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_solicitud_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id_inmueble) ON DELETE CASCADE,
    CONSTRAINT fk_solicitud_inquilino FOREIGN KEY (id_inquilino) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contratos (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    id_inmueble INT NOT NULL,
    id_inquilino INT NOT NULL,
    id_propietario INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    duracion_meses INT NOT NULL,
    cuota_mensual DECIMAL(10, 2) NOT NULL,
    fianza DECIMAL(10, 2) NOT NULL,
    estado ENUM('Activo', 'Finalizado', 'Cancelado') DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contrato_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id_inmueble) ON DELETE CASCADE,
    CONSTRAINT fk_contrato_inquilino FOREIGN KEY (id_inquilino) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_contrato_propietario FOREIGN KEY (id_propietario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS documentos_contrato (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    fecha_subida DATE NOT NULL,
    CONSTRAINT fk_documento_contrato FOREIGN KEY (id_contrato) REFERENCES contratos(id_contrato) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE,
    metodo_pago VARCHAR(50),
    archivo_justificante VARCHAR(255),
    estado_pago ENUM('pendiente', 'pagado') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pago_contrato FOREIGN KEY (id_contrato) REFERENCES contratos(id_contrato) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS incidencias (
    id_incidencia INT AUTO_INCREMENT PRIMARY KEY,
    referencia VARCHAR(20) NOT NULL UNIQUE,
    id_inmueble INT NOT NULL,
    id_inquilino INT NOT NULL,
    id_propietario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL,
    estado ENUM('Abierta', 'En curso', 'Resuelta') DEFAULT 'Abierta',
    descripcion TEXT NOT NULL,
    foto VARCHAR(255),
    fecha_creacion DATE NOT NULL,
    CONSTRAINT fk_incidencia_inmueble FOREIGN KEY (id_inmueble) REFERENCES inmuebles(id_inmueble) ON DELETE CASCADE,
    CONSTRAINT fk_incidencia_inquilino FOREIGN KEY (id_inquilino) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_incidencia_propietario FOREIGN KEY (id_propietario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS incidencia_seguimiento (
    id_seguimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia INT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    texto TEXT NOT NULL,
    fecha VARCHAR(20) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_seguimiento_incidencia FOREIGN KEY (id_incidencia) REFERENCES incidencias(id_incidencia) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mensajes (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_emisor INT NOT NULL,
    id_receptor INT NOT NULL,
    texto TEXT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mensaje_emisor FOREIGN KEY (id_emisor) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_mensaje_receptor FOREIGN KEY (id_receptor) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contactos (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    asunto VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    acepto_privacidad BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

