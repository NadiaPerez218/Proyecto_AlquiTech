import { Router } from 'express';
import { getInmuebles, crearInmueble } from '../controllers/inmueble.controller';

const router = Router();

router.get('/', getInmuebles);
router.post('/', crearInmueble);

export default router;
