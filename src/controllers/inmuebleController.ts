
import { Request, Response } from 'express'; 
 

export const obtenerInmuebles = async (req: Request, res: Response)=>{ 
	try { 
	const inmueblesMock = [ 
	{ 
		id: 1, 
		propietarioId: 101, 
		titulo: "Piso en el centro", 
		ciudad: "Madrid", 
		habitaciones: 3, 
		banos: 2, 
		metrosCuadrados: 90, 
		precioMensual: 950, 
		estado: "Alquilado" 
	}, 
		{ 
		id: 2, 
		propietarioId: 102, 
		titulo: "Apartamento luminoso", 
		ciudad: "Barcelona", 
		habitaciones: 2, 
		banos: 1, 
		metrosCuadrados: 65, 
		precioMensual: 1100, 
		estado: "Disponible" 
	} 
	]; 

	res.status(200).json(inmueblesMock); 
	} catch (error){ 
	res.status(500).json({ error: 'Error al obtener inmuebles' }); 
	} 
}; 
