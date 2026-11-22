import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getRestaurante } from '../lib/restaurantes.js'
import { carregarFontes, resolverEstilo, temaParaCssVars } from '../lib/tema.js'
import AmostraTema from '../components/AmostraTema.jsx'

// O cardápio de verdade (A2–A5) e o redirecionamento do modo externo (B2) vêm depois.
export default function Restaurante() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const restaurante = getRestaurante(slug)

  // ?estilo=classico mostra o cardápio em outro estilo sem mudar o JSON
  // (usado para apresentar os estilos aos clientes; funciona também em produção).
  const estilo = resolverEstilo(searchParams.get('estilo') ?? restaurante?.estilo)

  useEffect(() => {
    carregarFontes(estilo)
  }, [estilo])

  if (!restaurante) {
    // 404 amigável fica para a tarefa B1
    return (
      <main>
        <p>Restaurante "{slug}" não encontrado (placeholder).</p>
      </main>
    )
  }

  return (
    <div className="tema" style={temaParaCssVars(restaurante, estilo)}>
      <AmostraTema restaurante={restaurante} estilo={estilo} />
    </div>
  )
}
