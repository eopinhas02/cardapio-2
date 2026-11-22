import { Link } from 'react-router-dom'

// Placeholder da página inicial
export default function Home() {
  return (
    <main>
      <h1>Cardápio Digital</h1>
      <p>Página inicial (placeholder).</p>
      <p>
        <Link to="/r/demo">Ver restaurante demo</Link>
      </p>
    </main>
  )
}
