import {mongoose} from "mongoose";
import {validationResult} from "express-validator";
import {Negocio} from '../database/models.js'; // Asegúrate de que la ruta de importación es correcta
import {Address} from '../database/models.js';
import deleteImageFromS3 from '../config/deleteUpload.js';
import uploadFileToS3 from '../config/multerUpload.js';

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

export const editNegocioUser = async (req,res) => {
    let negocioId;
    negocioId = new mongoose.Types.ObjectId(req.params.negocioId);
    const modificaciones = req.body;
    let images = req.files.images;
    console.log(images);
    let metadata = JSON.parse(req.body.metadata || '{}');
    const folderName = 'negocio';
    console.log('Antes de las modificaciones');
    console.log(modificaciones);

    try {
        const negocio = await Negocio.findById(negocioId);
        if (!negocio) {
            return res.status(404).send({ message: "Negocio no encontrado" });
          }
            if(metadata){
                for (const image of images) {
                if (image.originalname === metadata.profileImage) {
                    let photo = image;
                    let photoAnt = negocio.photo;
                    deleteImageFromS3(photoAnt);
                    photo = await uploadFileToS3(image.buffer, image.originalname, image.mimetype, folderName);
                    modificaciones.photo = photo;

                } else if (image.originalname === metadata.bannerImage) {
                    let banner = image;
                    let bannerAnt = negocio.banner;
                    deleteImageFromS3(bannerAnt);
                    banner = await uploadFileToS3(image.buffer, image.originalname, image.mimetype, folderName);
                    modificaciones.banner = banner;

                } else if (image.originalname === metadata.backgroundImage) {
                    let background_photo = image;
                    let background_photoAnt = negocio.background_photo;
                    deleteImageFromS3(background_photoAnt);
                    background_photo = await uploadFileToS3(image.buffer, image.originalname, image.mimetype, folderName);
                    modificaciones.background_photo = background_photo;

                }
            };
                delete modificaciones.metadata;
            }
        
            console.log(modificaciones);
        Object.keys(modificaciones).forEach((modificacion) => {
        negocio[modificacion] = modificaciones[modificacion];
        });

        await negocio.save();
        res.send(negocio);

    } catch (error) {
        res.status(500).send("Ah ocurrido un error inesperado")
        console.log(error);
    }
}

export default {createNegocio, getUserNegocios, editNegocioUser};
