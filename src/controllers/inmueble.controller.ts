import { Request, Response } from 'express';
import pool from '../config/db';

export const getInmuebles = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inmuebles');
        res.json(rows);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener inmuebles', error: error.message });
    }
};

export const crearInmueble = async (req: Request, res: Response) => {
    try {
        const { id_propietario, titulo, ciudad, direccion, precio, fianza, habitaciones, banos, superficie, descripcion, imagen } = req.body;
        const [result] = await pool.query(
            'INSERT INTO inmuebles (id_propietario, titulo, ciudad, direccion, precio, fianza, habitaciones, banos, superficie, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_propietario, titulo, ciudad, direccion, precio, fianza, habitaciones, banos, superficie, descripcion, imagen]
        );
        res.status(201).json({ message: 'Inmueble creado exitosamente en MySQL', id: (result as any).insertId });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al crear inmueble', error: error.message });
    }
};
