import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const password = process.env.DB_PASS;
const dbName = 'ButzuBD'
const dbUser = process.env.DB_USER;

mongoose.connect(`mongodb+srv://${dbUser}:${password}@butzu-mobile.jsj2xpf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Butzu-mobile`)
  .then(() => console.log('Conexión a MongoDB exitosa en la base de datos:', dbName))
  .catch((err) => console.error('Error al conectar a MongoDB', err));

