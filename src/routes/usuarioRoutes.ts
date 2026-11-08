import { Router } from 'express';
import { obtenerUsuarios } from '../controllers/usuarioController';

const router = Router();


router.get('/', obtenerUsuarios);

export default router;
