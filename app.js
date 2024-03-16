import express from 'express';
import bodyParser from 'body-parser';

//variables entorno
import dotenv from 'dotenv';
dotenv.config();

//base de datos
import './database/database.js';

// Declaración de rutas.
import authRoutes from './auth/auth.router.js';
import itemRoutes from './items/item.router.js'; // Corregido el nombre de la variable de las rutas de los items
import negocioRoutes from './negocio/negocio.router.js'; // Corregido el nombre de la variable de las rutas del negocio
import userRoutes from './users/user.router.js'; // Corregido el nombre de la variable de las rutas de los usuarios

// Manejo aplicación y formato de comunicación.
const app = express();
app.use(bodyParser.json());

//Declaración de puerto.
const port = 3000;

//ruta por default
app.get('/', (req,res) => {
    res.status(200).send('Hola desde el servidor');
});

//Uso de rutas
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/negocio', negocioRoutes);
app.use('/user', userRoutes);

// Mensaje de puerto encendido
app.listen(port, () => {
    console.log('Server started at port 3000');
});

export default app; // Exporta la aplicación para que pueda ser utilizada en otros archivos si es necesario
