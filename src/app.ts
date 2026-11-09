import express from 'express';
import usuarioRoutes from './routes/usuario.routes';
import inmuebleRoutes from './routes/inmueble.routes';

const app = express();

app.use(express.json());

// Enlace de las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/inmuebles', inmuebleRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
