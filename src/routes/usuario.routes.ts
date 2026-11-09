import { Router } from 'express';
import { getUsuarios, crearUsuario } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);

export default router;
