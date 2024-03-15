const express = require('express');
const bodyParser =require('body-parser');
const Negocio = require('./database/models.js').Negocio;


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
app.use('/items', itemroutes);
app.use('/negocio', negocio);

// Mensaje de puerto encendido
app.listen(port, () => {
    console.log('Server started at port 3000')
});

exports.app = app;