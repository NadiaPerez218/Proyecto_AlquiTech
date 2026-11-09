import { Request, Response } from 'express';
import pool from '../config/db';

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre, apellidos, email, id_rol FROM usuarios');
        res.json(rows);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, apellidos, email, dni, password, id_rol } = req.body;
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellidos, email, dni, password, id_rol) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, email, dni, password, id_rol]
        );
        res.status(201).json({ message: 'Usuario creado exitosamente en MySQL', id: (result as any).insertId });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};
