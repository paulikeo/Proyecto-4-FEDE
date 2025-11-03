/**
 * Componente Fila de Producto (ProductRow)
 * * Este componente renderiza una "tarjeta" o "fila" individual para un solo producto.
 * * Es un componente "inteligente" porque:
 * * 1. Sabe quién es el usuario logueado (desde `useStore`).
 * * 2. Sabe si el usuario es el dueño (`isOwner`) del producto.
 * * 3. Muestra/oculta los botones de "Editar" y "Borrar" basándose en esa lógica.
 */

// Importaciones originales de tu proyecto
import { Link, useLocation } from 'react-router' 
import { useStore } from '../store/useStore'

export const ProductRow = ({ 
    /**
     * Objeto que contiene toda la información del producto.
     * (Ej: { id, name, price, stock, userId, creator: { fullName } })
     */
    data, 
    
    /**
     * Función (pasada desde ProductList) que se ejecuta al
     * hacer clic en el botón "Borrar".
     */
    onDelete 
}) => {
  // --- Lógica de Contexto ---
  const { user } = useStore() // Obtiene el usuario actual del store
  const location = useLocation() // Obtiene la info de la URL actual

  // Detectar si estamos en la ruta privada (ej. /private/...)
  const isPrivate = location.pathname.includes('/private')

  // Lógica CRÍTICA: Verificar si el usuario logueado es el creador del producto
  // Compara el ID del usuario del store con el 'userId' del producto
  const isOwner = user?.id === data.userId
  // --- Fin de la lógica ---

  return (
    // Contenedor principal de la tarjeta (responsive: col a row)
    <div className="flex flex-col sm:flex-row gap-4 p-4 mb-3 bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg justify-between items-start sm:items-center hover:shadow-md transition-all duration-200">
      
      {/* Sección de Info: Nombre y Creador */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-lg font-semibold truncate">{data.name}</p>
        
        {/* Info del creador (obtenida del 'include' del backend) */}
        <div className="mt-1 flex items-center gap-1 text-sm">
          <span className="text-gray-500">Subido por:</span>
          <span className="font-medium text-blue-600">
            {data.creator?.fullName || 'Usuario desconocido'}
          </span>
        </div>
      </div>

      {/* Sección de Precio y Stock */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <p className="text-green-600 font-bold text-lg">${data.price}</p>
        <p className="text-gray-600">
          Stock: <span className="font-bold text-gray-800">{data.stock}</span>
        </p>
      </div>

      {/* --- Sección Condicional de Botones --- */}
      
      {/* MUESTRA ESTO SÓLO SI: estamos en ruta privada Y el usuario es el dueño */}
      {isPrivate && isOwner && (
        <section className="flex gap-2 w-full sm:w-auto pt-3 sm:pt-0 sm:border-t-0 border-t border-gray-200">
          {/* Botón Borrar: ejecuta la función 'onDelete' pasada por props */}
          <button
            className="flex-1 sm:flex-none py-2 px-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => onDelete(data.id)}
          >
            Borrar
          </button>
          
          {/* Botón Editar: usa <Link> para navegar a la página de edición */}
          <Link
            className="flex-1 sm:flex-none py-2 px-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
            to={`/private/products/${data.id}`}
          >
            Editar
          </Link>
        </section>
      )}

      {/* MUESTRA ESTO SÓLO SI: estamos en ruta privada PERO el usuario NO es el dueño */}
      {isPrivate && !isOwner && (
        <div className="w-full sm:w-auto pt-3 sm:pt-0 sm:border-t-0 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic sm:text-right">
            Este producto pertenece a otro usuario
          </p>
        </div>
      )}
      {/* --- Fin de la lógica de botones --- */}

    </div>
  )
}