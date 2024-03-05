const mongoose = require('mongoose');
const password = 'aho3kzQWUieojGzc';
const dbName = 'ButzuBD'

mongoose.connect(`mongodb+srv://ButzuAdmin:${password}@butzu-mobile.jsj2xpf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Butzu-mobile`)
  .then(() => console.log('Conexión a MongoDB exitosa en la base de datos:', dbName))
  .catch((err) => console.error('Error al conectar a MongoDB', err));
