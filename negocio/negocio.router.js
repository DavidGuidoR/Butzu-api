import express from 'express';
import multer from 'multer';
import uploadFileToS3 from '../config/multerUpload.js';
import NegocioValidations from'./validaciones.negocio.js';
import {createNegocio} from './negocio.controller.js';
import {getUserNegocios} from './negocio.controller.js'
import verificarToken from '../auth/auth.middleware.js';
const router = express.Router();

const imagesCreate = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'images', maxCount: 3 },]);

router.get('/', (req, res) => {
    res.send('Esta es una ruta de ejemplo negocio.');
  });

//imagesCreate maneja las imágenes recibidas, verificar token la autenticación, negociovalidations que el formato de campos sea correcto y createNegocio es el controller destino 
router.post('/create',imagesCreate, verificarToken, NegocioValidations, createNegocio);

router.get('/user/:userId',verificarToken, getUserNegocios);

// Configura multer para manejar diferentes campos en la misma ruta
const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'image', maxCount: 3 },]);
// Asumiendo que tienes identificadores únicos para cada tipo de imagen

router.post('/upload', upload, async (req, res) => {
  try {
    // Accede al primer archivo en el campo 'image'
    const file = req.files['image'][0]; // Cambio importante aquí
    console.log(file);
    const folderName = 'negocio'; // Nombre de la carpeta donde se guardarán los archivos

    if (!file) {
      return res.status(400).json({ error: "Archivo faltante." });
    }

    // Lógica para subir el archivo a S3 y obtener la URL
    const fileUrl = await uploadFileToS3(file.buffer, file.originalname, file.mimetype, folderName);
    console.log(fileUrl);

    // Devuelve la URL del archivo
    res.json({ fileUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});


  export default router;