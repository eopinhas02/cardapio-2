import { Link } from 'react-router-dom'
import { ESTILOS } from '../lib/tema.js'
import './AmostraTema.css'

// TEMPORÁRIO (A1): amostra para revisar o tema. Sai quando a A3 criar os cards de verdade.
// Usa só as CSS variables do tema, como os componentes A2–A5 vão fazer.

const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const NOMES_DESTAQUE = { 'mais-pedido': 'Mais pedido', chef: 'Escolha do chef' }

export default function AmostraTema({ restaurante, estilo }) {
  const item = restaurante.itens.find((i) => i.destaque) ?? restaurante.itens[0]

  return (
    <main className="amostra">
      <h1>{restaurante.nome}</h1>

      <nav className="amostra-estilos" aria-label="Ver em outro estilo">
        {Object.keys(ESTILOS).map((nome) => (
          <Link
            key={nome}
            to={`?estilo=${nome}`}
            className="botao amostra-estilo"
            aria-current={nome === estilo ? 'true' : undefined}
          >
            {nome}
          </Link>
        ))}
      </nav>

      <article className="amostra-card">
        <div className="amostra-card-texto">
          <div className="amostra-card-linha">
            <h2>{item.nome}</h2>
            <span className="amostra-card-guia" aria-hidden="true" />
            <span className="amostra-card-preco">{formatarPreco(item.preco)}</span>
          </div>
          <p>{item.descricao}</p>
          {item.destaque && <span className="amostra-selo">{NOMES_DESTAQUE[item.destaque]}</span>}
        </div>
        {/* Sem fotos reais ainda: bloco no lugar da foto */}
        <div className="amostra-card-foto" aria-hidden="true" />
      </article>

      <button type="button" className="amostra-botao">
        Adicionar ao pedido
      </button>
    </main>
  )
}
