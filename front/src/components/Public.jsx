/**
 * Layout Público (Public)
 * * Este componente actúa como un "Layout Guard" (Plantilla de Guardia)
 * * para las páginas públicas (Login y Register).
 * * Su principal responsabilidad es verificar si el usuario YA tiene
 * * una sesión activa y, en ese caso, redirigirlo a la zona privada.
 */

// Imports de tu compañero (jerarquía correcta)
import { Outlet, useNavigate } from 'react-router'
import { useEffect } from 'react'
// Corregido: Agregada la extensión .js
import { useStore } from '../store/useStore.js' 

const Public = () => {
  // --- Hooks ---
  const { user, setUser } = useStore() // Estado global del usuario
  const navigate = useNavigate() // Hook para redirigir

  // --- Efecto de Verificación de Token ---
  // Se ejecuta si el 'user' (o sus dependencias) cambian.
  useEffect(() => {
    /**
     * Verifica si el token del usuario (guardado en el store)
     * sigue siendo válido en el backend.
     */
    async function verifyUser() {
      // 1. Si no hay token en el store, no hay nada que verificar.
      if (!user.token) return

      // 2. Prepara la llamada a la API de verificación de token
      const url = `${import.meta.env.VITE_API_URL}/api/users/verify-token`
      const config = {
        method: "GET",
        headers: {
          'content-type': "application/json",
          'authorization': user.token
        }
      }

      try {
        const req = await fetch(url, config)
        const res = await req.json()

        // 3. Si el token es inválido (o expiró), el backend devuelve error.
        if (res.error) {
          // Limpiamos el token inválido del store
          setUser({
            id: null,
            full_name: null,
            token: null,
            email: null
          })
          return // Nos quedamos en la página pública
        }

        // 4. Si el token es VÁLIDO (no hubo error), redirigimos
        // al usuario al Dashboard privado.
        navigate("/private")

      } catch {
        // Si hay un error de red, limpiamos el store por seguridad.
        setUser({
          id: null,
          full_name: null,
          token: null,
          email: null
        })
      }
    }
    verifyUser()

  // 4. Dependencias correctas
  }, [user, navigate, setUser])

  // --- Renderizado ---
  // Usamos un Fragmento (<>) para no agregar HTML innecesario.
  // El layout real (con fondo, etc.) lo define el componente
  // <Form /> que se renderiza dentro del <Outlet />.
  return (
    <>
      {/* React Router renderizará aquí el componente hijo
          (Login.jsx o Register.jsx) */}
      <Outlet />
    </>
  )
}

export default Public
