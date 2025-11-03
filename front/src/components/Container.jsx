/**
 * Componente Contenedor Principal (Container)
 * * Este componente sirve como layout principal para las vistas
 * * dentro de la sección privada (ej. la lista de productos).
 * * Renderiza un botón para "Cargar Producto" y luego muestra
 * * cualquier contenido hijo (`children`) dentro de una tarjeta blanca.
 */
import { Link } from 'react-router' // Import de React Router para la navegación

export const Container = ({ 
    /**
     * Los componentes hijos que serán renderizados dentro de la tarjeta blanca.
     * En este caso, suele ser el componente <ProductList>.
     */
    children 
}) => {
  return (
    // Contenedor principal: centrado, con padding y un ancho máximo
    <div className="flex flex-col container mx-auto px-4 py-6 max-w-6xl">
      
      {/* Wrapper para el botón de "Cargar Producto" */}
      {/* TODO: Este botón es redundante con el link "+ Nuevo Producto" 
           en el header (Private.jsx). Se podría eliminar en el futuro 
           para simplificar la navegación. */}
      <div className="mb-6">
        
        {/* Componente <Link> que funciona como un botón */}
        <Link
          // Redirige a la página de creación de producto
          to="/private/products/new"
          // Clases de Tailwind para darle estilo de botón verde
          className="inline-block bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          + Cargar Producto
        </Link>
      </div>
      
      {/* La 'card' blanca que envuelve al contenido principal (children) */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {children}
      </div>
    </div>
  )
}