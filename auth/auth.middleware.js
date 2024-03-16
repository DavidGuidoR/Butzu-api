import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  // Obtener el token del encabezado 'Authorization'
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]; // Dividir en "Bearer" y el token

    // Verificar el token
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.authData = authData; // Guardar datos de autenticación en el objeto req para usarlos en el controlador
      next(); // Pasar al siguiente middleware/controlador
    });
  } else {
    // No se encontró token en el encabezado
    return res.sendStatus(401); // Unauthorized
  }
};

export default verificarToken;
