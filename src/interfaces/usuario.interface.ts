export interface Usuario {
	id?: number;
	nombre: string;
	apellidos: sting;
	email: string;
	telefono: string;
	dni: string;
	contrasena: string;
	rol: 'propietario'|'inquilino';
	
}

