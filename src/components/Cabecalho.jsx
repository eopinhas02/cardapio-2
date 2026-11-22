import { useState } from 'react'
import './Cabecalho.css'

// Topo do cardápio: logo + nome do restaurante.
// O visual (alinhamento, cores, formato do logo) vem todo das variáveis --cabecalho-* e --logo-* do tema.
export default function Cabecalho({ nome, logo }) {
  // Se não houver logo ou a imagem não carregar, mostra a inicial do nome (monograma)
  const [logoFalhou, setLogoFalhou] = useState(false)
  const mostrarImagem = logo && !logoFalhou

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        {mostrarImagem ? (
          // alt vazio: o nome já está no título logo ao lado
          <img className="cabecalho-logo" src={logo} alt="" onError={() => setLogoFalhou(true)} />
        ) : (
          <span className="cabecalho-logo cabecalho-monograma" aria-hidden="true">
            {nome.trim().charAt(0)}
          </span>
        )}
        <h1 className="cabecalho-nome">{nome}</h1>
      </div>
    </header>
  )
}
