
import express from 'express'
import multer from 'multer'
import { createItem, deleteItem, editItem, getItem } from './item.controller.js'
import verificarToken from '../auth/auth.middleware.js'
import {Item} from '../database/models.js';
const router = express.Router()

// Configura multer para manejar la carga de imágenes
const imagesUpload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'images', maxCount: 1 }, // Asumiendo que solo se envía una imagen por vez
])

// Ruta para crear un item
router.post('/create', verificarToken, imagesUpload, createItem)

// Ruta para eliminar un item
router.delete('/:itemId', verificarToken, deleteItem)

// Ruta para editar un item
router.patch('/:itemId', verificarToken, imagesUpload, editItem)

// Ruta para obtener un item por su ID
router.get('/:itemId', verificarToken, getItem)

router.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src \'self\'; img-src *');
  next();
});

router.get('/', (req, res) => {
  res.send('Esta es una ruta de ejemplo item.');
});

router.get('/tag', (req, res) => {
  
  Item.find({}, 'tag')
    .then(tags => {
      res.send(tags);
    })
    .catch(err => {
      console.error('Error al consultar tags:', err);
    });
});

export default router;
