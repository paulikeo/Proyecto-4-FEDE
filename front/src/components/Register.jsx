import { useState } from 'react'
// Imports corregidos (sin .jsx)
import { Form } from './Form'
import { Input } from './Input'
import { Button } from "./Button"
import { Link } from 'react-router-dom' // Corregido
import { toast } from "react-toastify"

/**
 * Componente Legend (Leyenda)
 * * Es un sub-componente local usado solo en Register.jsx.
 * * Muestra el link para navegar de vuelta a la página de Login.
 */
const Legend = () => {
    return (
        <p>
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className='text-slate-700 hover:text-slate-900 font-semibold transition-colors underline decoration-2 decoration-slate-400 hover:decoration-slate-700'>
                Inicia Sesión
            </Link>
        </p>
    )
}

/**
 * Vista de Registro (Página)
 * * Esta es la página de registro de nuevos usuarios (ruta '/register').
 * * Utiliza el layout <Form /> para mostrarse.
 * * Maneja la lógica de 'fetch' al endpoint de creación de usuarios.
 * * NO inicia sesión, solo crea el usuario.
 */
const Register = () => {
  // --- Estados Locales ---
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  /**
   * Maneja el envío del formulario de registro.
   * @param {Event} e Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Endpoint de API para crear un usuario
      const url = `${import.meta.env.VITE_API_URL}/api/users`
      const body = {
        fullName,
        email,
        password,
        confirmPassword
      }

      const req = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const res = await req.json()

      // Si hay un error (ej. email ya existe, contraseñas no coinciden)
      if (res.error) {
        toast.error(res.msg)
        setLoading(false) // Habilita el botón de nuevo
        return
      }

      // ¡ÉXITO!
      toast.success(res.msg)
      // Limpia el formulario
      setFullName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      // (Opcional: podrías redirigir al login con navigate('/') )

    } catch {
      toast.error("Error al registrarse")
    }
    finally {
      setLoading(false)
    }
  }

  // --- Renderizado ---
  return (
    // Renderiza el layout de Form y le pasa el contenido
    <Form title="Registrarse" Legend={Legend} onSubmit={handleSubmit}>
      
      {/* Campos del formulario (children) */}
      <Input
        name="Fullname"
        type="text"
        id="fullname"
        title="Nombre completo"
        placeholder="Nombre completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Input
        name="email"
        type="email"
        id="email"
        title="Correo"
        placeholder="correo@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="Password"
        title="Contraseña"
        placeholder="Contraseña"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        title="Confirmar Contraseña"
         placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {/* Botón de envío */}
      <Button 
        type='submit' 
        value={loading ? "Cargando..." : "Registrarse"} 
      />
    </Form>)
}

export default Register
