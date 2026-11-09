import express from 'express';
import usuarioRoutes from './routes/usuario.routes';

const app = express();

// Middleware fundamental para que el servidor entienda el JSON que envías por POST
app.use(express.json());

// Enlace de las rutas
app.use('/api/usuarios', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
