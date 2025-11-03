import { useState } from 'react'
// Ruta de importación de tu compañero
import { Link } from 'react-router' 
import { Form } from './Form'
// Rutas de importación de tu compañero
import { Input } from "./Input"
import { Button } from "./Button"
import { toast } from 'react-toastify'
// Ruta de importación de tu compañero
import { useStore } from '../store/useStore'

/**
 * Componente Legend (Leyenda)
 * * Es un sub-componente local usado solo en Login.jsx.
 * * Muestra el link para navegar a la página de Registro.
 */
const Legend = () => {
    return (
        <p>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Regístrate
            </Link>
        </p>
    )
}

/**
 * Vista de Login (Página)
 * * Esta es la página principal de inicio de sesión (ruta '/').
 * * Utiliza el layout <Form /> para mostrarse.
 * * Maneja la lógica de hacer 'fetch' al endpoint de login,
 * * y si tiene éxito, guarda los datos del usuario en el store global.
 */
const Login = () => {
    // --- Hooks ---
    const { setUser } = useStore() // Función para guardar el usuario en el store global

    // --- Estados Locales ---
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false) // Estado para deshabilitar el botón

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * @param {Event} e Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true) // Deshabilita el botón

        try {
            const body = {
                email,
                password
            }
            // Endpoint de la API para iniciar sesión
            const url = `${import.meta.env.VITE_API_URL}/api/users/login`
            const config = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            }

            const req = await fetch(url, config)
            const res = await req.json()

            // Si el backend devuelve un error (ej. contraseña incorrecta)
            if (res.error) {
                toast.error(res.msg)
                setLoading(false) // Vuelve a habilitar el botón
                return
            }

            // ¡ÉXITO! Guarda los datos del usuario (incluyendo el token)
            // en el store global de Zustand.
            setUser(res.user) 
            toast.success("Sesión iniciada")
            // No es necesario redirigir aquí, el componente <Public />
            // detectará el cambio en 'user' y lo hará automáticamente.

        } catch {
            toast.error("Error al iniciar sesión")
        } finally {
            // Se ejecuta siempre, haya error o no
            setLoading(false) 
        }
    }

    return (
        // Renderiza el layout de Form y le pasa el contenido
        <Form title="Iniciar Sesión" Legend={Legend} onSubmit={handleSubmit}>
            
            {/* Campos del formulario (children) */}
            <Input
                type="email"
                id="email"
                name="email"
                title="Email"
                placeholder="correo@correo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <Input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                title="Contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            {/* Botón de envío */}
            <Button 
                type='submit' 
                value={loading ? "Cargando..." : "Iniciar Sesión"} 
            />
        </Form>
    )
}

export default Login