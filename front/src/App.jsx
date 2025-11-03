import { BrowserRouter, Routes, Route } from 'react-router'
import Public from "./components/Public"
import Private from './components/Private'
import Login from './components/Login'
import Register from './components/Register'
import { ProductList } from './components/ProductList'
import { ProductForm } from './components/ProductForm'
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS - Autenticación */}
        <Route element={<Public />} path="/">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* RUTAS PRIVADAS - Requieren autenticación */}
        <Route element={<Private />} path="/private">
          <Route index element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800">404</h1>
              <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
            </div>
          </div>
        } />
      </Routes>
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
