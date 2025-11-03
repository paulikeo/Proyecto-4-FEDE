/**
 * Layout Privado (Private)
 * * Este componente actúa como un "Layout Guard" (Plantilla de Guardia).
 * * 1. Protege todas las rutas anidadas dentro de él.
 * * 2. Renderiza la barra de navegación principal (header).
 * * 3. Renderiza las vistas hijas (como ProductList o ProductForm)
 * * a través del componente <Outlet>.
 */

// 1. IMPORTANTE: Cambiamos 'Link' por 'NavLink'
import { Outlet, useNavigate, NavLink } from 'react-router'
import { useStore } from '../store/useStore' // Asumo que .js no es necesario aquí
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function Private() {
  // --- Hooks ---
  const { user, setUser } = useStore() // Estado global del usuario
  const navigate = useNavigate() // Hook para redirigir

  // --- Efecto Guardia (Guard Effect) ---
  // Se ejecuta cada vez que el 'user' cambia.
  useEffect(() => {
    // Si el token es nulo (no hay sesión), redirige al Login.
    if (user.token === null) {
      navigate("/")
    }
  }, [user, navigate])

  /**
   * Cierra la sesión del usuario.
   * Limpia los datos del usuario en el store global (Zustand)
   * y redirige a la página de Login.
   */
  const handleLogout = () => {
    setUser({
      id: null,
      full_name: null,
      email: null,
      token: null
    })
    toast.info("Sesión cerrada")
    navigate("/")
  }

  // --- Lógica de Estilos para NavLink ---
  
  // Clases base que todos los links de navegación comparten
  const baseLinkClass = "hover:underline font-semibold"
  
  /**
   * Función helper para <NavLink>
   * Devuelve clases de Tailwind según si el link está "activo" o no.
   * @param {{ isActive: boolean }} props
   * @returns {string} Clases de Tailwind
   */
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? `text-blue-800 underline font-bold ${baseLinkClass}` // Estilo ACTIVO
      : `text-blue-600 ${baseLinkClass}` // Estilo INACTIVO
  }

  /**
   * Igual que getNavLinkClass pero para el botón "Nuevo Producto".
   */
  const getNewProductLinkClass = ({ isActive }) => {
    return isActive
      ? `text-green-800 underline font-bold ${baseLinkClass} hidden sm:inline` // ACTIVO
      : `text-green-600 ${baseLinkClass} hidden sm:inline` // INACTIVO
  }


  return (
    // Contenedor principal de la página (layout)
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100">
      
      {/* Header / Barra de Navegación */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Links de Navegación */}
          <div className="flex gap-4">
            
            {/* NavLink a Dashboard (Ruta principal privada) */}
            {/* Usa <NavLink> en lugar de <Link> para detectar la ruta activa */}
            {/* 'end' es clave: asegura que solo se active en '/private' exacto,
                y no en '/private/products/new' */}
            <NavLink 
              to="/private" 
              className={getNavLinkClass}
              end 
            >
              Dashboard
            </NavLink>
            
            {/* NavLink a "Nuevo Producto" */}
            <NavLink 
              to="/private/products/new" 
              className={getNewProductLinkClass}
            >
              + Nuevo Producto
            </NavLink>
          </div>

          {/* Sección de Usuario y Logout */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 hidden md:inline">
              Hola, <strong>{user.full_name}</strong>
            </span>
            {/* Botón de Logout */}
            <button
              onClick={handleLogout}
              className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal de la Página */}
      <main className="container mx-auto p-4">
        {/* React Router renderizará aquí el componente hijo 
            que coincida con la ruta (ej. ProductList o ProductForm) */}
        <Outlet />
      </main>
    </div>
  )
}

export default Private