const express = require('express');
const router = express.Router();
const Item = require('../database/models.js').Item;


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

module.exports = router;
