/**
 * Componente de Input Reutilizable (Input)
 * * Este componente crea un campo de <input> con su <label> asociado.
 * Está diseñado para usarse dentro de formularios, con un layout vertical
 * (label arriba, input abajo) y estilos consistentes.
 */

// Comentarios originales de tu compañero
// Type =  text - password - number - date - local-datetime - time - checkbox - email - radio
// value = Contiene el valor
// onChange = Evento que registra el cambio y cambia el valor

export const Input = ({ 
    /**
     * El atributo 'type' del input. (Ej: 'text', 'email', 'password', 'number')
     */
    type, 
    
    /**
     * El atributo 'name' del input.
     */
    name, 
    
    /**
     * El texto que se muestra dentro del input cuando está vacío.
     */
    placeholder, 
    
    /**
     * El 'id' único para el input. Es CRÍTICO para la accesibilidad,
     * ya que conecta el <label> con el <input> (via 'htmlFor').
     */
    id, 
    
    /**
     * El texto que se mostrará en el <label> arriba del input.
     */
    title, 
    
    /**
     * El valor actual del input. 
     * Generalmente se controla con un 'useState' en el componente padre.
     */
    value, 
    
    /**
     * La función que se ejecuta cada vez que el usuario escribe.
     * Es la que actualiza el 'useState' en el componente padre.
     */
    onChange 
}) => {
    return (
        // Layout (con gap responsive)
        <div className="flex flex-col gap-2 md:gap-3">
            <label 
                htmlFor={id} // Conecta este label al input con el mismo id
                // Estilos para el label
                className='font-semibold text-sm text-gray-700'
            >
                {title}
            </label>
            <input
                // Estilos para el input (con focus, hover, transitions)
                className="shadow-sm border border-gray-300 rounded-lg p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400"
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
