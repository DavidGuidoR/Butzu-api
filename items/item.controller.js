import { mongoose } from 'mongoose'
import { validationResult } from 'express-validator'
import { Item } from '../database/models.js'
import uploadFileToS3 from '../config/multerUpload.js'
import deleteImageFromS3 from '../config/deleteUpload.js' // Importa la función para eliminar imágenes de S3 si es necesario

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
    // Crear y guardar el documento Item
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
      message: 'Error al crear item',
      error: error.message,
    })
  }
}

export const deleteItem = async (req, res) => {
  const itemId = new mongoose.Types.ObjectId(req.params.itemId)

  try {
    // Buscar y eliminar el item por su ID
    const item = await Item.findById(itemId)

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' })
    }

    // Eliminar la imagen asociada al item si existe
    if (item.photo) {
      const url = item.photo
      const bucketUrl = 'https://butzuimages.s3.amazonaws.com/'
      const key = url.replace(bucketUrl, '')

      deleteImageFromS3(key)
    }

    await item.deleteOne()

    res.status(200).json({ message: 'Item eliminado con éxito' })
  } catch (error) {
    console.error('Error al eliminar item', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar item', error: error.message })
  }
}

export const editItem = async (req, res) => {
  const itemId = req.params.itemId
  const modificaciones = req.body
  const images = req.files ? req.files.images : []

  try {
    const item = await Item.findById(itemId)

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' })
    }

    if (images) {
      const url = item.photo
      const bucketUrl = 'https://butzuimages.s3.amazonaws.com/'
      const key = url.replace(bucketUrl, '')

      deleteImageFromS3(key)

      const folderName = 'item'
      const newPhoto = await uploadFileToS3(
        images.buffer,
        images.originalname,
        images.mimetype,
        folderName
      )
      modificaciones.photo = newPhoto
    }

    Object.keys(modificaciones).forEach((modificacion) => {
      item[modificacion] = modificaciones[modificacion]
    })

    await item.save()

    res.send(item)
  } catch (error) {
    console.error('Error al editar item', error)
    res
      .status(500)
      .json({ message: 'Error al editar item', error: error.message })
  }
}

export const getItem = async (req, res) => {
  const itemId = req.params.itemId

  try {
    const item = await Item.findById(itemId)

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' })
    }

    res.json(item)
  } catch (error) {
    console.error('Error al obtener item', error)
    res
      .status(500)
      .json({ message: 'Error al obtener item', error: error.message })
  }
}

export default { createItem, deleteItem, editItem, getItem }
