import { mongoose } from 'mongoose'
import { validationResult } from 'express-validator'
import { Item } from '../database/models.js'
import uploadFileToS3 from '../config/multerUpload.js'

export const createItem = async (req, res) => {
  let photo = ''

  // comprueba si se enviaron imágenes y las recorre insertándolas en la BD
  if (req.files) {
    let files = req.files

    let folderName = 'item'

    photo = await uploadFileToS3(
      files.images.buffer,
      files.images.originalname,
      files.images.mimetype,
      folderName
    )
  }

  // Extraer datos del cuerpo de la solicitud
  const negocioId = new mongoose.Types.ObjectId(req.body.negocio_id)
  const { name, price, tag, description } = req.body

  try {
    // Crear y guardar el documento Item const newNItem= new Negocio({
    const newItem = new Item({
      negocio_id: negocioId,
      name,
      price,
      tag,
      description,
      photo,
    })

    const itemSaved = await newItem.save()

    // Responder con éxito
    res.status(201).json({
      message: 'Item creado con éxito',
      item: itemSaved,
    })
  } catch (error) {
    console.error('Error al crear item', error)
    res.status(500).json({
      message: 'Error al crear negocio y dirección',
      error: error.message,
    })
  }
}

export default { createItem }
