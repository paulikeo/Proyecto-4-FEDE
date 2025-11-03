import express from "express"
import "dotenv/config"
import cors from "cors"
import { sequelize } from './config/db.mjs'
import './models/User.mjs'
import './models/Product.mjs'
import { routes as userRoutes } from "./routes/user.mjs"
import { routes as productRoutes } from "./routes/product.mjs"

const PORT = process.argv[2] ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

// Rutas con prefijos organizados
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("Base de datos conectada")
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  } catch (error) {
    console.log("Hubo un error en la conexion a la base de datos", error)
  }
})
