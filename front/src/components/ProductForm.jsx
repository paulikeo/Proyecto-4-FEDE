/**
 * Componente Vista: ProductForm (Formulario de Producto)
 * * Esta es la vista para "Crear" un nuevo producto o "Editar" uno existente.
 * * Controla toda la lógica de estado del formulario y las llamadas a la API.
 */

// Imports de componentes (corregidos, sin extensiones)
import { Input } from './Input'
import { Button } from './Button' 

// Imports de React y librerías
import { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useParams, useNavigate, Link } from 'react-router'

// Imports del store (corregido, sin extensión)
import { useStore } from '../store/useStore'


export const ProductForm = () => {
  // --- Hooks ---
  const params = useParams() // Hook para leer parámetros de la URL (ej. /:id)
  const navigate = useNavigate() // Hook para redirigir al usuario
  const { user } = useStore() // Obtiene el usuario (con token) del store

  // --- Estados del Formulario ---
  const [id, setId] = useState(params.id ?? "") // ID del producto (si es modo edición)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  // --- Efecto Carga de Datos (Modo Edición) ---
  // Se ejecuta UNA VEZ si hay un 'id' en la URL.
  useEffect(() => {
    /**
     * Carga los datos de un producto específico desde la API
     * y rellena los campos del formulario.
     */
    const getProduct = async () => {
      try {
        // Si no hay ID, es modo "Crear", no hay nada que cargar.
        if (id === "") return

        // Pide el producto específico a la API (con auth)
        const url = `${import.meta.env.VITE_API_URL}/api/products/${params.id}`
        const config = {
          method: "GET",
          headers: {
            "accept": "application/json",
            "authorization": user.token
          }
        }
        const req = await fetch(url, config)
        const res = await req.json()

        if (res.error) {
          toast.error(res.msg)
          return
        }

        // Rellena los estados del formulario con los datos de la API
        setName(res.product.name)
        setPrice(res.product.price)
        setStock(res.product.stock)

      } catch (err) {
        toast.error(`Error al cargar producto: ${err.message}`)
      }
    }
    getProduct()
  }, [id, params.id, user.token]) // Dependencias correctas

  // --- Función Actualizar Producto (Modo Edición) ---
  const updateProduct = async () => {
    try {
      const config = {
        method: "PUT", // Método HTTP para actualizar
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "authorization": user.token // Requiere auth
        },
        body: JSON.stringify({
          name: name,
          price: price,
          stock: stock
        })
      }

      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      const req = await fetch(url, config)
      const res = await req.json()

      if (res.error) {
        toast.error(res.msg)
        return
      }

      toast.success(res.msg)
      // Redirige al Dashboard después de 0.7 segundos
      setTimeout(() => navigate("/private"), 700) 

    } catch (er) {
      console.log(er)
      toast.error("Ha ocurrido un error")
    }
  }

  // --- Función Principal (Submit) ---
  // Esta función decide si debe "Crear" o "Actualizar"
  const handleSubmit = async (e) => {
    e.preventDefault() // Previene el refresco de la página

    // Si hay un 'id', llamamos a la función de actualizar
    if (id !== "") {
      await updateProduct()
      return
    }

    // Si no hay 'id', ejecutamos la lógica de "Crear"
    try {
      const config = {
        method: "POST", // Método HTTP para crear
        headers: {
          "content-type": "application/json",
          "authorization": user.token // Requiere auth
        },
        body: JSON.stringify({
          name: name,
          price: price,
          stock: stock,
          userId: user.id // Enviamos el ID del usuario
        })
      }

      const url = `${import.meta.env.VITE_API_URL}/api/products`
      const req = await fetch(url, config)
      const res = await req.json()

      if (res.error) {
        toast.error(res.msg)
        return
      }

      toast.success(res.msg)
      // Limpia el formulario
      setName("")
      setPrice("")
      setStock("")
      // Redirige al Dashboard
      navigate("/private")

    } catch (er) {
      console.log(er)
      toast.error("Ha ocurrido un error")
    }
  }

  // --- Renderizado del Componente (JSX) ---
  return (
    // Contenedor de la página con fondo degradado
    <div className='min-h-[calc(100vh-6rem)] flex flex-col items-center justify-start py-12 px-4 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50'>
      
      {/* Título dinámico */}
      <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight'>
        {id !== "" ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      {/* Tarjeta del Formulario */}
      <form
        className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100"
        onSubmit={handleSubmit}
      >
        {/* Campos del formulario (componentes Input) */}
        <Input
          type="text"
          name="Nombre_Producto"
          placeholder="Ingrese el nombre del producto"
          value={name}
          title="Nombre del Producto"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <Input
          type="number"
          name="Precio"
          placeholder="Ingrese el precio"
          value={price}
          title="Precio"
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <Input
          name="Cantidad"
          type="number"
          placeholder="Ingrese la cantidad en stock"
          value={stock}
          title="Stock"
          onChange={(e) => {
            setStock(e.target.value)
          }}
        />
        
        {/* Botón de envío (componente Button) */}
        <div className='mt-6'>
          <Button
            type="submit"
            value={id !== "" ? "Actualizar Producto" : "Crear Producto"}
          />
        </div>
      </form>
      
      {/* Link para volver al Dashboard */}
      <Link 
        to="/private" 
        className='mt-6 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white p-3 px-6 rounded-lg shadow-md cursor-pointer font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]'
      >
        Volver al Dashboard
      </Link>
    </div>
  )
}