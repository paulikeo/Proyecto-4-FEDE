// Imports de React y librerías
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router'

// Imports de componentes locales (con extensiones .jsx)
import { Container } from './Container.jsx'
import { ProductRow } from './ProductRow.jsx'

// Imports del store (Zustand) (con extension .js)
import { useStore } from '../store/useStore.js'

/**
 * Componente Vista: ProductList (Lista de Productos)
 * * Esta es la vista principal (Dashboard) de la sección privada.
 * * Se encarga de:
 * * 1. Obtener y mostrar la lista de productos desde el backend.
 * * 2. Manejar la lógica de autenticación (sólo muestra productos privados si hay token).
 * * 3. Mostrar un spinner de carga.
 * * 4. Manejar la eliminación de productos.
 */
export const ProductList = () => {
  // --- Estados ---
  const [data, setData] = useState([]) // Almacena la lista de productos
  const [loading, setLoading] = useState(true) // Estado de carga
  
  // --- Hooks ---
  const { user } = useStore() // Obtiene el usuario del store global
  const location = useLocation() // Hook para leer la URL actual

  // Lógica para determinar si estamos en la sección privada
  const isPrivate = location.pathname.includes('/private')

  // --- Efecto Carga de Datos (useEffect) ---
  // Se ejecuta cada vez que 'isPrivate' o 'user.token' cambian.
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      
      // Construye la URL correcta (con el prefijo /api/)
      // Usamos import.meta.env (estándar de Vite)
      const url = `${import.meta.env.VITE_API_URL}/api/products`
      const config = {
        headers: {
          'accept': 'application/json'
        }
      }

      // Lógica CRÍTICA:
      // Si estamos en la ruta privada Y tenemos un token,
      // adjuntamos el token al header 'authorization' para pedir
      // los productos privados de ese usuario.
      if (isPrivate && user.token) {
        config.headers.authorization = user.token
      }

      try {
        const req = await fetch(url, config)
        const res = await req.json()

        if (res.error) {
          toast.error(res.msg)
          return
        }
        
        // Carga los productos en el estado 'data'
        setData(res.data)
      } catch {
        toast.error("Error al cargar productos")
      } finally {
        setLoading(false) // Oculta el spinner, ya sea con éxito o error
      }
    }

    getProduct()
  }, [isPrivate, user.token])


  // --- Función Eliminar Producto ---
  async function handleDelete(id) {
    // Usamos 'window.confirm' para una confirmación nativa del navegador
    const confirmDelete = window.confirm("¿Desea eliminar el producto?")

    if (!confirmDelete) {
      toast.info("Producto no eliminado")
      return
    }

    try {
      // Construye la URL de eliminación (con /api/)
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      const config = {
        method: 'DELETE',
        headers: {
          accept: "application/json",
          authorization: user.token // Envía el token para autorización
        }
      }

      const req = await fetch(url, config)
      const res = await req.json()

      if (res.error) {
        toast.error(res.msg)
        return
      }

      toast.success("Producto eliminado correctamente")
      
      // Lógica CRÍTICA (Optimistic UI):
      // Actualiza el estado 'data' localmente filtrando el producto eliminado.
      // Esto evita tener que recargar toda la lista desde el servidor.
      setData(data.filter(product => product.id !== id))
    } catch {
      toast.error("Ocurrio un error inesperado")
    }
  }

  // --- Renderizado del Componente ---
  return (
    <Container>
      {/* Título dinámico */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isPrivate ? 'Gestión de Productos' : 'Catálogo de Productos'}
      </h1>

      {/* 1. Muestra Spinner de Carga */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      
      /* 2. Muestra Mensaje si no hay productos */
      ) : data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        </div>
      
      /* 3. Muestra la lista de productos */
      ) : (
        // Contenedor de las "tarjetas" de producto
        <div className="flex flex-col gap-4">
          {data.map((d) => (
            // Pasa los datos (data) y la función (onDelete) al componente hijo
            <ProductRow key={d.id} data={d} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </Container>
  )
}
