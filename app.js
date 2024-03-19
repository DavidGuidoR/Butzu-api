import express from 'express';
import bodyParser from 'body-parser';
import { Negocio } from './database/models.js';

//variables entorno
import dotenv from 'dotenv';
dotenv.config();

//base de datos
import './database/database.js';

// Declaración de rutas.
import authRoutes from './auth/auth.router.js';
import itemRoutes from './items/item.router.js';
import negocioRoutes from './negocio/negocio.router.js';

// Manejo aplicación y formato de comunicación.
const app = express();
app.use(bodyParser.json());

//Declaración de puerto.
const port = 3000;

//ruta por default
app.get('/', (req,res) => {
    Negocio.find({}, 'business_name description photo tag')
    .then(neg => {
        if (neg.length === 0) {
            res.send('Aun no existen negocios creados.');
        } else {
            res.send(neg);
        }
    })
    .catch(err => {
      console.error('Error al consultar negocios:', err);
    });
})

//Uso de rutas
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/negocio', negocioRoutes);


// Mensaje de puerto encendido
app.listen(port, () => {
    console.log('Server started at port 3000')
});

export default app;


