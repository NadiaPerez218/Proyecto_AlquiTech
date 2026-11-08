import { Request, Response } from 'express';
import { Usuario } from '../interfaces/usuario.interface';

export const obtenerUsuarios = async (req: Request, res: Response) => {
	try {
	const usuariosMock: Usuario[] = [
	{
		id: 1,
		nombre: "Carlos",
		apellidos: "Martínez",
		email: "carlos@propietario.com",
		telefono: "600123456",
		dni: "12345678A",
		contrasena: "password123",
		rol: "propietario"
		 },
	{
                id: 2,
                nombre: "Juan",
                apellidos: "García",
                email: "juan@inquilino.com",
                telefono: "600987654",
                dni: "87654321B",
                contrasena: "password456",
                rol: "inquilino"
                 }
 
	];

	res.status(200).json(usuariosMock);
	}catch (error) {
	res.status(500).json({ error: 'Error al obtener usuarios' });
	}
};

