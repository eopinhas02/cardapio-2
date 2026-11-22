/** id do <section> de cada categoria no HTML (alvo dos links da navegação). */
export const idSecao = (categoriaId) => `categoria-${categoriaId}`

/** Rolagem suave, ou instantânea para quem pediu menos movimento no sistema. */
export const comportamentoRolagem = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
