import express from 'express'
import multer from 'multer'
import uploadFileToS3 from '../config/multerUpload.js'
import verificarToken from '../auth/auth.middleware.js'
import { Upload } from '@aws-sdk/lib-storage'
import deleteImageFromS3 from '../config/deleteUpload.js'
import { createItem } from './item.controller.js'

const router = express.Router()

const imagesCreate = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'images', maxCount: 1 },
])

router.post('/create', imagesCreate, verificarToken, createItem)

export default router
