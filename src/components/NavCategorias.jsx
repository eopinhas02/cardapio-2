import { useEffect, useRef } from 'react'
import { comportamentoRolagem, idSecao } from '../lib/categorias.js'
import { useCategoriaVisivel } from '../lib/useCategoriaVisivel.js'
import './NavCategorias.css'

// Barra de categorias que gruda no topo e rola na horizontal no celular.
// Os links apontam para #categoria-<id> (funcionam mesmo sem JS); com JS a rolagem é suave.
// A categoria visível na tela fica destacada (scroll-spy) e centralizada na barra.
export default function NavCategorias({ categorias }) {
  const navRef = useRef(null)
  const listaRef = useRef(null)
  const { ativa, irPara } = useCategoriaVisivel(
    categorias.map((categoria) => categoria.id),
    navRef,
  )

  // Centraliza o item ativo na barra, rolando só na horizontal (sem mexer na página)
  useEffect(() => {
    const lista = listaRef.current
    const item = lista?.querySelector('[aria-current]')
    if (!item) return
    const caixaLista = lista.getBoundingClientRect()
    const caixaItem = item.getBoundingClientRect()
    const deslocamento =
      caixaItem.left - caixaLista.left - (caixaLista.width - caixaItem.width) / 2
    lista.scrollBy({ left: deslocamento, behavior: comportamentoRolagem() })
  }, [ativa])

  function aoTocar(evento, categoriaId) {
    if (irPara(categoriaId)) evento.preventDefault()
  }

  return (
    <nav className="nav-categorias" aria-label="Categorias" ref={navRef}>
      <ul className="nav-categorias-lista" ref={listaRef}>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <a
              href={`#${idSecao(categoria.id)}`}
              className="nav-categorias-item"
              aria-current={categoria.id === ativa ? 'true' : undefined}
              onClick={(evento) => aoTocar(evento, categoria.id)}
            >
              {categoria.nome}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
