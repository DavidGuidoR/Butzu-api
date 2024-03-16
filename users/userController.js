import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { getUserData } from './userDataController.js';

console.log("Hola");

// Endpoint para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, last_name_1, last_name_2, email, phone, birth_date, username, password } = req.body;

    // Verificar si el usuario ya existe por email, phone o username
    const existingUser = await User.findOne({ $or: [{ email }, { phone }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico, teléfono o nombre de usuario ya está en uso.' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      last_name_1,
      last_name_2,
      email,
      phone,
      birth_date,
      username,
      password: hashedPassword, // Guardar la contraseña en formato hash
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Devolver una respuesta exitosa
    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).json({ message: 'Error en los datos de registro' });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = await getUserData(userId);
    
    if (userData.error) {
      return res.status(404).json({ message: userData.error });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los datos del usuario y los negocios' });
  }
};