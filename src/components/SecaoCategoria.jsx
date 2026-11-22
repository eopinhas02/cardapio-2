import { formatarPreco } from '../lib/formatar.js'
import { idSecao } from '../lib/categorias.js'
import './SecaoCategoria.css'

// PROVISÓRIO (A2): seção de uma categoria com lista simples de itens.
// A A3 troca a lista pelos cards de verdade; o <section> com id continua (a navegação depende dele).
export default function SecaoCategoria({ categoria, itens }) {
  const idTitulo = `${idSecao(categoria.id)}-titulo`

  return (
    <section id={idSecao(categoria.id)} className="secao-categoria" aria-labelledby={idTitulo}>
      <h2 id={idTitulo}>{categoria.nome}</h2>
      <ul className="secao-categoria-itens">
        {itens.map((item) => (
          <li key={item.id}>
            <span>{item.nome}</span>
            <span>{formatarPreco(item.preco)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
