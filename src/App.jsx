import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Restaurante from './pages/Restaurante.jsx'
import NaoEncontrado from './pages/NaoEncontrado.jsx'

// /admin/qr é só para nós: carregada sob demanda para a lib de QR (~25 KB)
// não ir junto no carregamento do cardápio dos clientes.
const AdminQr = lazy(() => import('./pages/AdminQr.jsx'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Toda placa (QR/NFC) aponta para /r/:slug */}
      <Route path="/r/:slug" element={<Restaurante />} />
      <Route
        path="/admin/qr"
        element={
          <Suspense fallback={<p style={{ padding: 16 }}>Carregando…</p>}>
            <AdminQr />
          </Suspense>
        }
      />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  )
}
