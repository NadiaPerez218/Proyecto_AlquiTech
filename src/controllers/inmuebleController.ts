import {Request, Response } from 'express';
export const getInmuebles = (req: Request, res: Response) => {
        const inmuebles = [

        {
                id: 1,
                titulo: "Piso céntrico y luminoso",
                direccion: "Calle Mayor 10",
                ciudad: "Madrid",
                precio: 850,
                estado: "disponible"
        },
        {
                id: 2,
                titulo: "Estado reformado",
                direccion: "Av. Diagonal 45",
                ciudad: "Barcelona",
                precio: 600,
                estado: "disponible"     
 }



  ];
        // Devolvemos el array directamente como JSON
        res.json(inmuebles);
};

// Endpoint para crear inmueble

export const crearInmueble = (req: Request, res: Response) =>{
	res.json({	
		mensaje: "Inmueble creado con éxito (simulado)",
		inmueble: {
		 id: 3, 
		titulo: "casa con jardín",
		precio: 1200
		 }
});
};

// Endpoint para actualizar un inmueble

export const actualizarInmueble = (req: Request, res: Response) =>{ 
        res.json({
mensaje: `Inmueble con ID ${req.params.id} actualizado con éxito (silamulado)`
	});
};

// Endpoint para eliminar un inmueble

export const eliminarInmueble = (req: Request, res: Response) =>{
        res.json({
	 mensaje: `Inmueble con ID ${req.params.id} eliminado con éxito (simulado)`
        });
};

