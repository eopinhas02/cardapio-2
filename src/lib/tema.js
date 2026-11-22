/**
 * Tema do cardápio: transforma "estilo" e "cores" do JSON em CSS variables.
 *
 * Os componentes (A2–A5) NUNCA leem o JSON para se estilizar: só usam var(--...).
 * As variáveis são aplicadas no elemento com a classe .tema (ver styles/global.css),
 * onde também são calculadas as cores derivadas (--cor-superficie, --cor-texto-suave, --cor-borda).
 *
 * Jeito do card (usado pela A3): no HTML do card o texto vem ANTES da foto.
 *   --card-direcao: "row" = foto à direita | "row-reverse" = foto à esquerda | "column-reverse" = foto em cima
 *   --card-fundo / --card-separador: fundo do card e linha entre itens (classico usa linha, não caixa)
 *   --card-guia-preco: linha que liga nome e preço, como no cardápio impresso ("none" = sem guia)
 */

export const ESTILO_PADRAO = 'moderno'

const CORES_PADRAO = {
  primaria: '#1f6f50',
  sobrePrimaria: '#ffffff',
  fundo: '#ffffff',
  texto: '#1c2321',
}

export const ESTILOS = {
  // Limpo e prático, estilo app de delivery bem feito. Card sem sombra, muito respiro.
  moderno: {
    fontes: 'https://fonts.googleapis.com/css2?family=Onest:wght@400;600;700&display=swap',
    vars: {
      '--fonte-titulo': "'Onest', system-ui, sans-serif",
      '--fonte-texto': "'Onest', system-ui, sans-serif",
      '--peso-titulo': '700',
      '--tracking-titulo': '-0.02em',
      '--tamanho-base': '17px',
      '--altura-linha': '1.5',
      '--raio-card': '16px',
      '--raio-botao': '12px',
      '--raio-selo': '8px',
      '--borda-card': 'none',
      '--sombra-card': 'none',
      '--espaco': '16px',
      '--espaco-card': '20px',
      '--card-fundo': 'var(--cor-superficie)',
      '--card-separador': 'none',
      '--card-guia-preco': 'none',
      '--card-direcao': 'row',
      '--card-foto-largura': '96px',
      '--card-foto-proporcao': '1 / 1',
      '--altura-toque': '48px',
    },
  },

  // Cardápio impresso de restaurante sofisticado: itens em linhas, sem caixas, quase sem raio.
  classico: {
    fontes:
      'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&family=Newsreader:opsz,wght@6..72,500&display=swap',
    vars: {
      '--fonte-titulo': "'Newsreader', Georgia, serif",
      '--fonte-texto': "'Instrument Sans', system-ui, sans-serif",
      '--peso-titulo': '500',
      '--tracking-titulo': '0',
      '--tamanho-base': '17px',
      '--altura-linha': '1.6',
      '--raio-card': '0',
      '--raio-botao': '2px',
      '--raio-selo': '2px',
      '--borda-card': 'none',
      '--sombra-card': 'none',
      '--espaco': '14px',
      '--espaco-card': '14px 0',
      '--card-fundo': 'transparent',
      '--card-separador': '1px solid var(--cor-borda)',
      '--card-guia-preco': '1px dotted var(--cor-texto-suave)',
      '--card-direcao': 'row-reverse',
      '--card-foto-largura': '72px',
      '--card-foto-proporcao': '4 / 3',
      '--altura-toque': '44px',
    },
  },

  // Lanchonete, açaí, hamburgueria: foto grande em cima, borda grossa e sombra sólida (cara de adesivo).
  despojado: {
    fontes:
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Nunito:wght@400;700&display=swap',
    vars: {
      '--fonte-titulo': "'Bricolage Grotesque', system-ui, sans-serif",
      '--fonte-texto': "'Nunito', system-ui, sans-serif",
      '--peso-titulo': '800',
      '--tracking-titulo': '-0.01em',
      '--tamanho-base': '17px',
      '--altura-linha': '1.45',
      '--raio-card': '24px',
      '--raio-botao': '999px',
      '--raio-selo': '999px',
      '--borda-card': '2px solid var(--cor-texto)',
      '--sombra-card': '4px 4px 0 var(--cor-texto)',
      '--espaco': '14px',
      '--espaco-card': '16px',
      '--card-fundo': 'var(--cor-fundo)',
      '--card-separador': 'none',
      '--card-guia-preco': 'none',
      '--card-direcao': 'column-reverse',
      '--card-foto-largura': '100%',
      '--card-foto-proporcao': '16 / 10',
      '--altura-toque': '52px',
    },
  },
}

/** Devolve o nome do estilo se ele existir; senão, o estilo padrão. */
export function resolverEstilo(nome) {
  return nome in ESTILOS ? nome : ESTILO_PADRAO
}

/**
 * Monta o objeto de CSS variables para usar em style={...} no elemento .tema.
 * Cores ausentes no JSON caem nos valores padrão.
 */
export function temaParaCssVars(restaurante, nomeEstilo = restaurante.estilo) {
  const estilo = ESTILOS[resolverEstilo(nomeEstilo)]
  const cores = { ...CORES_PADRAO, ...restaurante.cores }

  return {
    ...estilo.vars,
    '--cor-primaria': cores.primaria,
    '--cor-sobre-primaria': cores.sobrePrimaria,
    '--cor-fundo': cores.fundo,
    '--cor-texto': cores.texto,
  }
}

/**
 * Carrega só as fontes do estilo em uso (evita baixar as 6 fontes no celular).
 * Reaproveita um único <link id="fontes-tema"> no <head>.
 */
export function carregarFontes(nomeEstilo) {
  const url = ESTILOS[resolverEstilo(nomeEstilo)].fontes
  let link = document.getElementById('fontes-tema')
  if (!link) {
    link = document.createElement('link')
    link.id = 'fontes-tema'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  if (link.href !== url) link.href = url
}
