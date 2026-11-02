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
