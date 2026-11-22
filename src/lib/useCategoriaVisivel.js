import { useCallback, useEffect, useRef, useState } from 'react'
import { comportamentoRolagem, idSecao } from './categorias.js'

// Quanto tempo sem eventos de scroll para considerar que a rolagem programada terminou
const FIM_DA_ROLAGEM_MS = 150
// Se a página nem chegar a rolar (já estava na seção), libera o scroll-spy depois disso
const LIMITE_SEM_ROLAGEM_MS = 1000

/**
 * Scroll-spy: descobre qual categoria está visível enquanto a pessoa rola a página.
 *
 * A categoria ativa é a última seção cujo topo já passou da base da barra de navegação
 * (navRef). No fim da página vale a última seção, mesmo que ela seja curta demais para
 * chegar até a barra.
 *
 * Devolve { ativa, irPara }. irPara(id) rola até a seção e marca a categoria na hora;
 * durante essa rolagem o cálculo fica pausado para o destaque não passar pelas
 * categorias do caminho.
 */
export function useCategoriaVisivel(ids, navRef) {
  const [ativa, setAtiva] = useState(ids[0])
  const pausado = useRef(false)
  const timer = useRef(0)

  // Chave em texto para o efeito só refazer quando as categorias mudarem de verdade
  const chave = ids.join('|')

  useEffect(() => {
    const lista = chave.split('|')
    let quadro = 0

    function calcular() {
      quadro = 0
      const linha = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 8
      let atual = lista[0]
      for (const id of lista) {
        const secao = document.getElementById(idSecao(id))
        if (secao && secao.getBoundingClientRect().top <= linha) atual = id
      }
      const raiz = document.documentElement
      if (window.innerHeight + window.scrollY >= raiz.scrollHeight - 2) {
        atual = lista[lista.length - 1]
      }
      setAtiva(atual)
    }

    function aoRolar() {
      if (pausado.current) {
        // Rolagem programada em andamento: libera quando os eventos de scroll pararem.
        // Não recalcula ao liberar, senão perto do fim da página a última categoria
        // "roubaria" o destaque da que a pessoa tocou.
        clearTimeout(timer.current)
        timer.current = setTimeout(() => (pausado.current = false), FIM_DA_ROLAGEM_MS)
        return
      }
      // no máximo um cálculo por quadro de animação
      if (!quadro) quadro = requestAnimationFrame(calcular)
    }

    calcular()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
      cancelAnimationFrame(quadro)
      clearTimeout(timer.current)
    }
  }, [chave, navRef])

  const irPara = useCallback((id) => {
    const secao = document.getElementById(idSecao(id))
    if (!secao) return false
    pausado.current = true
    setAtiva(id)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => (pausado.current = false), LIMITE_SEM_ROLAGEM_MS)
    secao.scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' })
    return true
  }, [])

  return { ativa, irPara }
}
