import { Router } from 'express';
import { getInmuebles } from '../controllers/inmuebleController';

const router = Router ();

router.get('/', getInmuebles);

export default router;

