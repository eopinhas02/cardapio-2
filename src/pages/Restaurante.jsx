import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getRestaurante } from '../lib/restaurantes.js'
import { carregarFontes, resolverEstilo, temaParaCssVars } from '../lib/tema.js'
import Cabecalho from '../components/Cabecalho.jsx'
import NavCategorias from '../components/NavCategorias.jsx'
import SecaoCategoria from '../components/SecaoCategoria.jsx'
import SeletorEstilo from '../components/SeletorEstilo.jsx'
import NaoEncontrado from './NaoEncontrado.jsx'

// Cards, modal e carrinho (A3–A5) e o redirecionamento do modo externo (B2) vêm depois.
export default function Restaurante() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const restaurante = getRestaurante(slug)

  // ?estilo=classico mostra o cardápio em outro estilo sem mudar o JSON
  // (usado para apresentar os estilos aos clientes; funciona também em produção).
  const estilo = resolverEstilo(searchParams.get('estilo') ?? restaurante?.estilo)
  // ?demo=1 mostra o seletor de estilo no canto da tela (para apresentar a clientes)
  const modoDemo = searchParams.get('demo') === '1'

  useEffect(() => {
    carregarFontes(estilo)
  }, [estilo])

  // Slug inexistente ou JSON inválido (ver lib/restaurantes.js): 404 amigável (B1)
  if (!restaurante) {
    return <NaoEncontrado slug={slug} />
  }

  // Só entram categorias que têm itens (na navegação e nas seções)
  const secoes = restaurante.categorias
    .map((categoria) => ({
      categoria,
      itens: restaurante.itens.filter((item) => item.categoriaId === categoria.id),
    }))
    .filter((secao) => secao.itens.length > 0)

  return (
    <div className="tema" style={temaParaCssVars(restaurante, estilo)}>
      <Cabecalho nome={restaurante.nome} logo={restaurante.logo} />
      <NavCategorias categorias={secoes.map((secao) => secao.categoria)} />
      <main className="cardapio">
        {secoes.map(({ categoria, itens }) => (
          <SecaoCategoria key={categoria.id} categoria={categoria} itens={itens} />
        ))}
      </main>
      {modoDemo && <SeletorEstilo estilo={estilo} />}
    </div>
  )
}
