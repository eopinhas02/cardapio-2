import { Link, useSearchParams } from 'react-router-dom'
import { ESTILOS } from '../lib/tema.js'
import './SeletorEstilo.css'

// Seletor de estilo discreto para mostrar os estilos a clientes.
// Só aparece com ?demo=1 na URL (quem decide isso é Restaurante.jsx).
const NOMES = { moderno: 'Moderno', classico: 'Clássico', despojado: 'Despojado' }

export default function SeletorEstilo({ estilo }) {
  const [searchParams] = useSearchParams()

  // Mantém os outros parâmetros (inclusive demo=1) e troca só o estilo
  function urlDoEstilo(nome) {
    const params = new URLSearchParams(searchParams)
    params.set('estilo', nome)
    return `?${params}`
  }

  return (
    <nav className="seletor-estilo" aria-label="Estilo do cardápio">
      {Object.keys(ESTILOS).map((nome) => (
        <Link
          key={nome}
          to={urlDoEstilo(nome)}
          replace
          preventScrollReset
          className="seletor-estilo-opcao"
          aria-current={nome === estilo ? 'true' : undefined}
        >
          {NOMES[nome] ?? nome}
        </Link>
      ))}
    </nav>
  )
}
