import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { EcommercePlatform } from './pages/EcommercePlatform'
import { EcommercePrueba } from './pages/EcommercePrueba'
import { ProductDetail } from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EcommercePlatform />} />
        <Route path='home' element={<EcommercePlatform />} />
        <Route path='prueba' element={<EcommercePrueba />} />
        <Route path='producto' element={<ProductDetail />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}


export default App
