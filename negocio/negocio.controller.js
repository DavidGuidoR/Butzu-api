import {mongoose} from "mongoose";
import {validationResult} from "express-validator"
import uploadFileToS3 from "../config/multerUpload.js";
import {Negocio} from '../database/models.js'; // Asegúrate de que la ruta de importación es correcta
import {Address} from '../database/models.js';

export const createNegocio  = async(req, res) => {
    let photo = '';
    let banner = '';
    let background_photo = '';
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si hay errores, devuelve una respuesta con el código de estado 400 y los errores de validación
            return res.status(400).json({ errors: errors.array() });
        }
    
    // comprueba si se enviaron imágenes y las recorre insertándolas en la BD
    if(req.files){
        let files = req.files
        for (let key in req.files.images) {

            let folderName = 'negocio'

            if(key == 0){
                photo = await uploadFileToS3(files.images[key].buffer, files.images[key].originalname, files.images[key].mimetype, folderName);
            }
            else if(key == 1){
                banner =  await uploadFileToS3(files.images[key].buffer, files.images[key].originalname, files.images[key].mimetype, folderName);
            }

            else if(key == 2) {
                background_photo = await uploadFileToS3(files.images[key].buffer, files.images[key].originalname, files.images[key].mimetype, folderName);
            }
            else  {

            }
        }
    }
    // Extraer datos del cuerpo de la solicitud
    const userId = new mongoose.Types.ObjectId(req.body.user_id);
    const {business_name, description, tag, color_top, tag_color, tag_font, item_font, num_int, num_ext, city, street, zip_code, state, country } = req.body;
   
    try {
    // Crear y guardar el documento Negocio
    const newNegocio = new Negocio({
        user_id: userId, business_name, description, photo, tag, banner, background_photo, color_top, tag_color, tag_font, item_font
    });

    const negocioSaved = await newNegocio.save();

    // Crear y guardar el documento Address con el ID del negocio recién creado
    const newAddress = new Address({
        negocio_id: negocioSaved._id,
        num_int, num_ext, city, street, zip_code, state, country
    });

    await newAddress.save();

    // Responder con éxito
    res.status(201).json({ message: "Negocio y dirección creados con éxito", negocio: negocioSaved, address: newAddress });
    } catch (error) {
    console.error("Error al crear negocio y dirección", error);
    res.status(500).json({ message: "Error al crear negocio y dirección", error: error.message });
    }
        
};

export const getUserNegocios = async (req,res) => {
    let userId = req.params.userId;
    userId = new mongoose.Types.ObjectId(userId);

  try {
    // Primero, obtenemos los negocios asociados al usuario
    const negocios = await Negocio.find({ user_id: userId });

    // Luego, para cada negocio, obtenemos sus direcciones
    const negociosConDirecciones = await Promise.all(negocios.map(async negocio => {
      const direcciones = await Address.find({ negocio_id: negocio._id });
      return {
        ...negocio.toObject(),
        direcciones
      };
    }));

    if (negocios.length === 0) {
        return res.status(404).json({ message: "No ha creado aun un negocio" });
    } else {
    res.json(negociosConDirecciones);
    }
  } catch (error) {
    console.error("Error al obtener negocios y direcciones", error);
    res.status(500).send("Error al obtener negocios y direcciones");
  }
};

export default {createNegocio, getUserNegocios};
