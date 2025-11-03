/**
 * Componente de Layout de Formulario (Form)
 * * Este es un componente de layout de PÁGINA COMPLETA, diseñado
 * * específicamente para las vistas de Login y Register.
 * * Proporciona una imagen de fondo y centra una tarjeta blanca
 * * donde se renderiza el formulario.
 */

// El 'import' de Link se fue, ya que este componente no lo usa directamente.

export const Form = ({ 
    /**
     * Los componentes hijos (usualmente los <Input> y <Button>).
     */
    children, 
    
    /**
     * El título que se mostrará en el <h2> (Ej: "Iniciar Sesión").
     */
    title, 
    
    /**
     * El componente "leyenda" que se renderiza debajo del formulario.
     * (Ej: el link a "¿No tienes cuenta? Regístrate").
     */
    Legend, 
    
    /**
     * La función que se ejecutará cuando el <form> se envíe (onSubmit).
     */
    onSubmit 
}) => {
    return (
        // 1. Contenedor principal: layout de columna vertical que ocupa toda la pantalla.
        <div 
            className="flex flex-col min-h-screen bg-cover bg-center"
            // Se aplica la imagen de fondo
            style={{ backgroundImage: "url('/deposito.jpg')" }} 
        >
            
            {/* 2. Contenido principal: 
                - 'grow' hace que ocupe todo el espacio vertical disponible.
                - 'flex items-center justify-center' centra la tarjeta blanca.
            */}
            <main className="grow flex items-center justify-center p-4">
                
                {/* 3. Tarjeta blanca del formulario (Tu diseño) */}
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12">
                    
                    <h2 className="font-bold text-3xl text-gray-800 text-center mb-8">
                        {title}
                    </h2>
                    
                    {/* Etiqueta <form> que recibe los inputs (children) y la función onSubmit */}
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                        {children}
                    </form>
                    
                    {/* Contenedor para la leyenda (link de registro/login) */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <Legend />
                    </div>
                </div>
            </main>

        </div>
    )
}
