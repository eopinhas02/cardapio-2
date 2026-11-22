import { Link } from 'react-router-dom'
import './NaoEncontrado.css'

// 404 amigável. Usado em dois casos:
// - rota que não existe (App.jsx, sem props)
// - /r/:slug de restaurante inexistente ou com JSON inválido (Restaurante.jsx, com slug)
// Quem chega aqui geralmente escaneou uma placa, então o texto fala com o cliente no restaurante.
// Não usa o tema (.tema): sem restaurante não há cores, então o visual é neutro.
export default function NaoEncontrado({ slug }) {
  return (
    <main className="nao-encontrado">
      <div className="nao-encontrado__caixa">
        <p className="nao-encontrado__icone" aria-hidden="true">
          🍽️
        </p>
        <h1>{slug ? 'Cardápio não encontrado' : 'Página não encontrada'}</h1>
        <p>
          {slug
            ? 'Não conseguimos abrir este cardápio. O link da placa pode estar desatualizado.'
            : 'O endereço que você abriu não existe.'}
        </p>
        {slug && <p>Se estiver no restaurante, peça ajuda a um atendente.</p>}
        {/* Ajuda quem for corrigir a placa a saber qual endereço ela abre */}
        {slug && <p className="nao-encontrado__codigo">Código da placa: {slug}</p>}
        <Link className="nao-encontrado__link" to="/">
          Ir para o início
        </Link>
      </div>
    </main>
  )
}
