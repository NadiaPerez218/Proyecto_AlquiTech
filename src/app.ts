
import express from 'express'
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// endpoint de prueba

app.get('/api/health', (req, res) => { 
	res.json({ status: 'API AlquiTech funcionando correctamente' });
});
const PORT =3000;
app.listen(PORT, () => { 
	console.log('Servidor backend corriendo en el puerto $PORT');
});


