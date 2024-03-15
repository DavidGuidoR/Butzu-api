import express from 'express';
const router = express.Router();
import {  Item } from '../database/models.js';


router.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src \'self\'; img-src *');
  next();
});

router.get('/', (req, res) => {
    res.send('Esta es una ruta de ejemplo item.');
  });

  router.get('/tag', (req, res) => {
    Item.find({})
    .then(items => {
        res.status(200).send({ message: 'Esta es una ruta de ejemplo item.', data: items });
    })
    .catch(err => {
        console.error('Error al consultar items:', err);
        res.status(500).send({ message: 'Error al consultar items' });
    });
  });
  
  export default router;