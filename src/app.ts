
import express from 'express';
import cors from 'cors';
import inmuebleRoutes from './routes/inmuebleRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

//Habilitamos CORS, para que el fronted(en otro puerto o dominio) pueda pedir datos

app.use(cors());
app.use(express.json());

// Activamos endpoint

app.use ('/api/inmuebles', inmuebleRoutes);
app.use('/api/usuarios', userRoutes);

const PORT =3000;
app.listen(PORT, () => { 
	console.log('Servidor backend corriendo en el puerto $PORT');
});


