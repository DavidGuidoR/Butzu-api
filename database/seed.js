import mongoose from 'mongoose';
import { User, Negocio, Address, Item } from './models.js';
import './database.js';

async function createSeedData() {
  try {
    // Crear un Usuario
    const user = await User.create({
      name: "Juan",
      last_name_1: "Pérez",
      last_name_2: "López",
      email: "juan.perez@example.com",
      phone: "1234567890",
      birth_date: new Date(1990, 1, 1),
      username: "juanperez",
      password: "unaContraseñaSegura",
      is_premium: false,
      photo: "/ruta/a/la/foto.jpg"
    });

    // Crear un Negocio asociado al Usuario
    const negocio = await Negocio.create({
      user_id: user._id,
      business_name: "Cafetería Juan's",
      description: "Una acogedora cafetería en el corazón de la ciudad.",
      photo: "ruta/a/la/foto/negocio.jpg",
      tag: "cafetería",
      banner:"ruta/a/la/foto/banner.jpg",
      background_photo:"ruta/a/la/foto/background.jpg",
      color_top: "#000000",
      tag_color: "#ffffff",
      tag_font: "Roboto",
      item_font: "Sans serif"
    });

    // Crear una Dirección para el Negocio
    await Address.create({
      negocio_id: negocio._id,
      city: "Ciudad de México",
      street: "Calle de la Reforma",
      state: "CDMX",
      country: "México"
    });

    // Crear un Item asociado al Negocio
    await Item.create({
      negocio_id: negocio._id,
      name: "Café Americano",
      price: "25",
      tag: "bebida",
      description: "Un delicioso café americano, perfecto para empezar el día.",
      photo: "ruta/a/la/foto/item.jpg"
    });

    console.log('Datos de semilla creados exitosamente.');
  } catch (err) {
    console.error('Error al crear datos de semilla:', err);
  } finally {
    // Cierra la conexión a la base de datos
    mongoose.connection.close();
  }
}

createSeedData();

