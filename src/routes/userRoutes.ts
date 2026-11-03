import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/userController';

const router = Router();

//Definimos las rutas y las conectamos con su función correspondiente

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

export default router;
