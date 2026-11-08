import { Router } from 'express';
import {
	getInmuebles,
	crearInmueble,
	actualizarInmueble,
	eliminarInmueble	
 } from '../controllers/inmuebleController';

const router = Router ();

//Definimos las rutas del CRUD de inmuebles

router.get('/', getInmuebles);		// Leer todos
router.post('/', crearInmueble);		// Crear nuevo
router.put('/', actualizarInmueble);	// Actializar por ID
router.delete('/', eliminarInmueble);	// Eliminar por ID

export default router;

