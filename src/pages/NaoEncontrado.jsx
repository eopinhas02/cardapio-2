import { Link } from 'react-router-dom'

// 404 para qualquer rota que não exista
export default function NaoEncontrado() {
  return (
    <main>
      <h1>Página não encontrada</h1>
      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </main>
  )
}
