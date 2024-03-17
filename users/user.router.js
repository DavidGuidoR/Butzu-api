import express from 'express';
const router = express.Router();

import { createUser } from './userController.js';

router.post('/create', createUser);
export default router;
