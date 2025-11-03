/**
 * Store Global de Zustand (useStore)
 * * Este archivo crea y configura el "store" global de la aplicación
 * * usando Zustand.
 * * Zustand es un manejador de estado: un único lugar centralizado
 * * para guardar información que necesita ser compartida entre
 * * componentes lejanos (ej. el estado del usuario).
 *
 * * Usamos el middleware 'persist' para que el estado
 * * se guarde automáticamente en el 'localStorage' del navegador.
 * * Esto permite que la sesión del usuario se mantenga
 * * incluso si se recarga la página.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// create(persist(funcion, configuracion))
export const useStore = create(
  persist(
    /**
     * @param {function} set - Función para actualizar el estado.
     * @returns {object} El objeto que define el estado.
     */
    (set) => ({
      // --- Estado Inicial (State) ---
      
      /**
       * El objeto 'user' contiene toda la información de la sesión.
       * Es el 'getter' (el valor que leemos).
       */
      user: { 
        id: null,
        email: null,
        full_name: null,
        token: null
      },
      
      // --- Acciones (Setters) ---

      /**
       * 'setUser' es la acción para modificar o borrar el estado del usuario.
       * Es el 'setter' (la función que usamos para actualizar).
       * @param {object} newuser - El nuevo objeto de usuario.
       * (Ej. { id: 1, email: 'a@a.com', ... } o { id: null, ... })
       */
      setUser: (newuser) => set({ user: newuser })
    }),
    
    // --- Configuración de 'persist' ---
    {
      /**
       * 'name' es la clave que se usará en el localStorage
       * para guardar nuestro estado.
       */
      name: "proyecto_fusionado_auth"
    }
  )
)