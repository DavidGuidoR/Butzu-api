import express from 'express';
const router = express.Router();

import { createUser } from './userController.js';

router.post('/user', createUser);
export default router;
