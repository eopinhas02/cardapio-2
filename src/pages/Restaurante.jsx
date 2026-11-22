import { useParams } from 'react-router-dom'
import { getRestaurante } from '../lib/restaurantes.js'

// Placeholder: só mostra que o JSON do restaurante está sendo carregado.
// O cardápio de verdade (A1–A5) e o redirecionamento do modo externo (B2) vêm depois.
export default function Restaurante() {
  const { slug } = useParams()
  const restaurante = getRestaurante(slug)

  if (!restaurante) {
    // 404 amigável fica para a tarefa B1
    return (
      <main>
        <p>Restaurante "{slug}" não encontrado (placeholder).</p>
      </main>
    )
  }

  return (
    <main>
      <h1>{restaurante.nome}</h1>
      <p>Modo: {restaurante.modo}</p>
      <p>
        {restaurante.categorias.length} categorias, {restaurante.itens.length} itens
      </p>
    </main>
  )
}
