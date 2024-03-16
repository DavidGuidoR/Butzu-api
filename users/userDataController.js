// userDataController.js
import { User } from './models.js'; // Asume que tienes un modelo de usuario definido
import { Negocio } from './models.js'; // Asume que tienes un modelo de negocio definido

export const getUserData = async (userId) => {
  try {
    // Buscar al usuario en la base de datos por ID
    const user = await User.findById(userId);

    if (!user) {
      return { error: 'Usuario no encontrado' };
    }

    // Buscar todos los negocios en la base de datos
    const negocios = await Negocio.find();

    if (negocios.length === 0) {
      return { message: 'Aun no existen negocios creados' };
    }

    return {
      user: {
        _id: user._id,
        name: user.name,
        photo: user.photo,
      },
      negocios: negocios.map(negocio => ({
        _id: negocio._id,
        bussines_name: negocio.bussines_name,
        description: negocio.description,
        photo: negocio.photo,
        tag: negocio.tag,
      })),
    };
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener los datos del usuario y los negocios' };
  }
};
