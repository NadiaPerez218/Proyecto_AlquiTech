import { Router } from 'express';
import { obtenerInmuebles } from '../controllers/inmuebleController';

const router = Router ();

//Ruta para obtener el catalogo de prueba

router.get('/', obtenerInmuebles);		// Leer todos

export default router;

