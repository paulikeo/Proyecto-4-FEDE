import { Router } from 'express';
import { Product } from '../models/Product.mjs';
import { User } from '../models/User.mjs';
import { authMiddleware } from '../middlewares/auth.mjs';

export const routes = Router();

// RUTAS PÚBLICAS (sin middleware) - Solo lectura

// Listar todos los productos con info del creador
routes.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'fullName', 'email']
      }]
    });

    res.json({
      error: false,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "No se pudieron cargar los productos"
    });
  }
});

// Ver detalle de un producto específico
routes.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'fullName', 'email']
      }]
    });

    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "Producto no encontrado"
      });
    }

    res.json({
      error: false,
      product: product
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Hubo un error en el servidor"
    });
  }
});

// RUTAS PRIVADAS (con authMiddleware) - Requieren autenticación

// Crear producto (userId extraído del token)
routes.post('/', authMiddleware, async (req, res) => {
  try {
    const body = req.body;

    if (Object.values(body).includes("")) {
      return res.json({
        error: true,
        msg: "Todos los campos son obligatorios"
      });
    }

    const product = new Product({
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock),
      userId: req.user.id  // Extraído del token por el middleware
    });

    await product.save();

    res.json({
      error: false,
      msg: "Producto creado",
      product
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      msg: err.message
    });
  }
});

// Actualizar producto (solo si es el creador)
routes.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "No se puede actualizar, porque no existe"
      });
    }

    // Verificar que el usuario es el creador
    if (product.userId !== req.user.id) {
      return res.status(403).json({
        error: true,
        msg: "No autorizado: Solo el creador puede editar este producto"
      });
    }

    const body = req.body;
    product.name = body.name;
    product.stock = body.stock;
    product.price = body.price;

    await product.save();

    res.json({
      error: false,
      msg: "Producto actualizado"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Ocurrio un error al actualizar"
    });
  }
});

// Eliminar producto (solo si es el creador)
routes.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: true,
        msg: "Producto no encontrado"
      });
    }

    // Verificar que el usuario es el creador
    if (product.userId !== req.user.id) {
      return res.status(403).json({
        error: true,
        msg: "No autorizado: Solo el creador puede eliminar este producto"
      });
    }

    await product.destroy();

    res.json({
      error: false,
      msg: "Producto eliminado"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Ocurrio un error"
    });
  }
});
