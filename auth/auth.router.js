import express from 'express';
const router = express.Router();
import { authenticateUser } from './auth.controller.js';

router.get('/', (req, res) => {
    res.send('Esta es una ruta de ejemplo auth.');
  });

router.post('/', authenticateUser);

  export default  router;