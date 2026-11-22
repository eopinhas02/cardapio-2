import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Restaurante from './pages/Restaurante.jsx'
import AdminQr from './pages/AdminQr.jsx'
import NaoEncontrado from './pages/NaoEncontrado.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Toda placa (QR/NFC) aponta para /r/:slug */}
      <Route path="/r/:slug" element={<Restaurante />} />
      <Route path="/admin/qr" element={<AdminQr />} />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  )
}
