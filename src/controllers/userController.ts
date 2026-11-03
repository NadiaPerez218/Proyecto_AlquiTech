import { Request, Response } from 'express';

//Endpoint simulado para registrar un usuario
export const registrarUsuario = (req: Request, res: Response) => {
	res.json({
	mensaje: "Usuario registrado con éxito",
	usuario:{
		id:1,
		nombre: "Nuevo Usuario",
		email: "usuario@alquitech.com"
		 } 
	});

};

//Endpoint simulado para hacer login
export const loginUsuario = (req: Request, res: Response) =>{
	res.json({
		mensaje: "Login exitoso",
		token: "token-simulado-123456"
	});
};

