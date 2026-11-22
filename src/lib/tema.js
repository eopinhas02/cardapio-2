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
 *
 * Jeito do cabeçalho (A2):
 *   --cabecalho-direcao: "row" = logo ao lado do nome | "column" = logo em cima, tudo centralizado
 *   --cabecalho-texto-alinhar: alinhamento do nome (acompanha a direção)
 *   --cabecalho-fundo / --cabecalho-texto / --cabecalho-raio / --cabecalho-separador: o bloco do topo
 *   --logo-*: tamanho, raio, borda e sombra do logo; --logo-fundo / --logo-texto pintam o monograma
 *     (inicial do nome) que aparece quando o restaurante não tem logo ou a imagem falha
 *
 * Jeito da navegação de categorias (A2):
 *   --nav-fundo / --nav-separador: a barra que gruda no topo
 *   --nav-fonte / --nav-peso / --nav-gap: texto e espaço entre os itens
 *   --nav-item-*: cada categoria (altura, padding, raio, borda, fundo, texto)
 *   --nav-item-ativo-*: a categoria visível no momento (classico usa sublinhado via sombra inset)
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
      '--cabecalho-direcao': 'row',
      '--cabecalho-texto-alinhar': 'start',
      '--cabecalho-fundo': 'var(--cor-fundo)',
      '--cabecalho-texto': 'var(--cor-texto)',
      '--cabecalho-raio': '0',
      '--cabecalho-separador': 'none',
      '--cabecalho-padding': '28px 16px 12px',
      '--cabecalho-nome-tamanho': 'clamp(1.6rem, 7vw, 2.1rem)',
      '--logo-tamanho': '56px',
      '--logo-raio': '16px',
      '--logo-borda': 'none',
      '--logo-sombra': 'none',
      '--logo-fundo': 'var(--cor-primaria)',
      '--logo-texto': 'var(--cor-sobre-primaria)',
      '--nav-fundo': 'color-mix(in srgb, var(--cor-fundo) 88%, transparent)',
      '--nav-separador': '1px solid var(--cor-borda)',
      '--nav-fonte': 'var(--fonte-texto)',
      '--nav-peso': '600',
      '--nav-gap': '8px',
      '--nav-item-altura': '40px',
      '--nav-item-padding': '0 16px',
      '--nav-item-raio': '999px',
      '--nav-item-borda': '1px solid transparent',
      '--nav-item-fundo': 'var(--cor-superficie)',
      '--nav-item-texto': 'var(--cor-texto)',
      '--nav-item-ativo-fundo': 'var(--cor-primaria)',
      '--nav-item-ativo-texto': 'var(--cor-sobre-primaria)',
      '--nav-item-ativo-sombra': 'none',
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
      '--cabecalho-direcao': 'column',
      '--cabecalho-texto-alinhar': 'center',
      '--cabecalho-fundo': 'var(--cor-fundo)',
      '--cabecalho-texto': 'var(--cor-texto)',
      '--cabecalho-raio': '0',
      // fio duplo, como o filete de cardápio impresso
      '--cabecalho-separador': '3px double var(--cor-borda)',
      '--cabecalho-padding': '36px 16px 22px',
      '--cabecalho-nome-tamanho': 'clamp(2rem, 9vw, 2.6rem)',
      '--logo-tamanho': '52px',
      '--logo-raio': '50%',
      '--logo-borda': '1px solid var(--cor-borda)',
      '--logo-sombra': 'none',
      '--logo-fundo': 'transparent',
      '--logo-texto': 'var(--cor-primaria)',
      '--nav-fundo': 'var(--cor-fundo)',
      '--nav-separador': '1px solid var(--cor-borda)',
      '--nav-fonte': 'var(--fonte-titulo)',
      '--nav-peso': '500',
      '--nav-gap': '4px',
      '--nav-item-altura': '44px',
      '--nav-item-padding': '0 10px',
      '--nav-item-raio': '0',
      '--nav-item-borda': '1px solid transparent',
      '--nav-item-fundo': 'transparent',
      '--nav-item-texto': 'var(--cor-texto-suave)',
      '--nav-item-ativo-fundo': 'transparent',
      '--nav-item-ativo-texto': 'var(--cor-texto)',
      // sublinhado na cor da marca, sem caixa
      '--nav-item-ativo-sombra': 'inset 0 -2px 0 var(--cor-primaria)',
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
      '--cabecalho-direcao': 'row',
      '--cabecalho-texto-alinhar': 'start',
      // bloco cheio na cor da marca, com cantos de baixo arredondados (cara de adesivo)
      '--cabecalho-fundo': 'var(--cor-primaria)',
      '--cabecalho-texto': 'var(--cor-sobre-primaria)',
      '--cabecalho-raio': '0 0 28px 28px',
      '--cabecalho-separador': '2px solid var(--cor-texto)',
      '--cabecalho-padding': '32px 16px 28px',
      '--cabecalho-nome-tamanho': 'clamp(2.1rem, 11vw, 3rem)',
      '--logo-tamanho': '68px',
      '--logo-raio': '50%',
      '--logo-borda': '2px solid var(--cor-texto)',
      '--logo-sombra': '3px 3px 0 var(--cor-texto)',
      '--logo-fundo': 'var(--cor-fundo)',
      '--logo-texto': 'var(--cor-texto)',
      '--nav-fundo': 'var(--cor-fundo)',
      '--nav-separador': '2px solid var(--cor-texto)',
      '--nav-fonte': 'var(--fonte-texto)',
      '--nav-peso': '700',
      '--nav-gap': '10px',
      '--nav-item-altura': '44px',
      '--nav-item-padding': '0 18px',
      '--nav-item-raio': '999px',
      '--nav-item-borda': '2px solid var(--cor-texto)',
      '--nav-item-fundo': 'var(--cor-fundo)',
      '--nav-item-texto': 'var(--cor-texto)',
      '--nav-item-ativo-fundo': 'var(--cor-primaria)',
      '--nav-item-ativo-texto': 'var(--cor-sobre-primaria)',
      '--nav-item-ativo-sombra': '2px 2px 0 var(--cor-texto)',
    },
  },
}

/**
 * Devolve o nome do estilo se ele existir; senão, o estilo padrão.
 * Object.hasOwn (e não "in") para não aceitar nomes herdados do Object.prototype,
 * como ?estilo=toString ou ?estilo=constructor.
 */
export function resolverEstilo(nome) {
  return typeof nome === 'string' && Object.hasOwn(ESTILOS, nome) ? nome : ESTILO_PADRAO
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
