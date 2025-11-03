/**
 * Componente de Botón Reutilizable (Button)
 * * Este es el componente de botón principal para toda la aplicación.
 * Está diseñado para ser estilizado de manera consistente y aceptar
 * las propiedades (props) estándar de un botón.
 */
export const Button = ({
    /**
     * El atributo 'type' del botón HTML.
     * Por defecto es 'submit' para que funcione bien dentro de formularios.
     * @default 'submit'
     */
    type = 'submit',
    
    /**
     * El texto que se mostrará dentro del botón.
     * (Ej: "Iniciar Sesión", "Crear Producto")
     * Es una prop requerida.
     */
    value,
    
    /**
     * Función opcional que se ejecuta al hacer clic en el botón.
     * Útil para botones que no son de tipo 'submit'.
     * @default undefined
     */
    onClick = undefined
}) => {
    return (
        <button
            // Clases de estilo de Tailwind CSS:
            // - w-full: Ocupa el 100% del ancho del contenedor.
            // - py-3 md:py-4: Padding vertical responsivo (más grande en pantallas 'md' y superiores).
            // - bg-linear-to-r...: Fondo con un degradado de color 'slate' (gris).
            // - hover:..., active:..., focus:...: Estilos interactivos para el mouse (hover),
            //   cuando se hace clic (active) y para accesibilidad (focus).
            // - transition-all duration-300 transform...: Animaciones suaves para los efectos.
            className='w-full py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-lg font-semibold text-base md:text-lg text-white bg-linear-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            
            // Asigna las props recibidas a los atributos HTML correspondientes
            type={type} 
            onClick={onClick}
        >
            {/* El texto del botón se pasa como 'value' desde las props */}
            {value}
        </button>
    )
}