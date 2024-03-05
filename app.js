const express = require('express');
const bodyParser =require('body-parser');

//base de datos
require('./database/database');

// Declaración de rutas.
const authRoutes =  require('./auth/auth.router');
const itemroutes = require('./items/item.router');
const negocio = require('./negocio/negocio.router');

// Manejo aplicación y formato de comunicación.
const app = express();
app.use(bodyParser.json());

//Declaración de puerto.
const port = 3000;

//ruta por default
app.get('/', (req,res) => {
    res.status(200).send('Hola desde el servidor')
})

//Uso de rutas
app.use('/auth', authRoutes);
app.use('/items', itemroutes);
app.use('/negocio', negocio);

// Mensaje de puerto encendido
app.listen(port, () => {
    console.log('Server started at port 3000')
});

exports.app = app;