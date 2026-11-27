import './Redirecionando.css'

// Tela rápida do modo externo (B2), mostrada enquanto o navegador troca de página.
// O redirecionamento em si acontece em Restaurante.jsx; aqui fica só o link manual,
// caso o navegador bloqueie ou demore (ex.: conexão lenta no restaurante).
// Visual neutro, igual ao 404: o cardápio de verdade é do próprio restaurante.
export default function Redirecionando({ nome, url }) {
  return (
    <main className="redirecionando">
      <div className="redirecionando__caixa">
        <p className="redirecionando__icone" aria-hidden="true">
          🍽️
        </p>
        <h1>Abrindo o cardápio</h1>
        <p>Estamos te levando para o cardápio de {nome}.</p>
        <a className="redirecionando__link" href={url}>
          Abrir cardápio
        </a>
      </div>
    </main>
  )
}
