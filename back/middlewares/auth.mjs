import jwt from 'jsonwebtoken';
import { User } from '../models/User.mjs';

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Obtener token del header
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({
        error: true,
        msg: "No autorizado: Token no proporcionado"
      });
    }

    // 2. Extraer token (formato: "Bearer TOKEN_AQUI")
    const token = auth.split(" ")[1];

    // 3. Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.SECRET);

    // 4. Buscar usuario en DB
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({
        error: true,
        msg: "Usuario no encontrado"
      });
    }

    // 5. Agregar info del usuario al request
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName
    };

    next(); // Continuar a la ruta
  } catch (error) {
    res.status(401).json({
      error: true,
      msg: "Token inválido o expirado"
    });
  }
};
