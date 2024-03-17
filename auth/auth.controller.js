// authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../database/models.js'; // Asume que tienes un modelo de usuario definido

export const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Devolver la respuesta con el token y los datos del usuario
    res.status(200).json({
      message: 'Autenticación exitosa',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        is_premium: user.is_premium,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la autenticación' });
  }
};

export default authenticateUser