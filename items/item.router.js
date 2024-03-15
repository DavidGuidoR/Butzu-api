import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Esta es una ruta de ejemplo item.');
  });
  
  export default router;