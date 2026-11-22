/**
 * Formato do JSON de um restaurante (um arquivo por restaurante em src/data/restaurantes/):
 *
 * {
 *   slug: string,                       // usado na URL: /r/:slug
 *   nome: string,
 *   logo: string,                       // URL ou caminho da imagem
 *   modo: "externo" | "interativo",     // externo = redireciona; interativo = nosso cardápio
 *   urlExterna: string | null,          // obrigatória só no modo "externo"
 *   estilo: "moderno" | "classico" | "despojado",  // opcional; padrão "moderno" (presets em lib/tema.js)
 *   cores: {
 *     primaria: string,
 *     sobrePrimaria?: string,           // opcional; texto em cima da cor primária, padrão "#ffffff"
 *     fundo: string,
 *     texto: string
 *   },
 *   categorias: [{ id: string, nome: string }],
 *   itens: [{
 *     id: string,
 *     categoriaId: string,              // id de uma categoria
 *     nome: string,
 *     descricao: string,
 *     preco: number,                    // em reais, ex.: 32.9 (formatação fica na tela)
 *     foto: string,
 *     tags: ("vegetariano" | "apimentado" | "sem-gluten")[],
 *     destaque: "mais-pedido" | "chef" | null,
 *     combinaCom: string[]              // ids de outros itens
 *   }]
 * }
 */

import { ESTILOS } from './tema.js'

const MODOS = ['externo', 'interativo']
const TAGS = ['vegetariano', 'apimentado', 'sem-gluten']
const DESTAQUES = ['mais-pedido', 'chef', null]

const ehTexto = (v) => typeof v === 'string' && v.trim() !== ''

/**
 * Confere se o JSON de um restaurante segue o formato acima.
 * Retorna uma lista de mensagens de erro (vazia = tudo certo).
 */
export function validarRestaurante(r) {
  const erros = []

  if (!r || typeof r !== 'object') {
    return ['o arquivo não contém um objeto']
  }

  // Campos de texto obrigatórios
  for (const campo of ['slug', 'nome', 'logo']) {
    if (!ehTexto(r[campo])) erros.push(`"${campo}" deve ser um texto não vazio`)
  }

  if (!MODOS.includes(r.modo)) {
    erros.push(`"modo" deve ser "externo" ou "interativo" (veio ${JSON.stringify(r.modo)})`)
  }
  if (r.modo === 'externo' && !ehTexto(r.urlExterna)) {
    erros.push('"urlExterna" é obrigatória no modo "externo"')
  }

  if (!r.cores || typeof r.cores !== 'object') {
    erros.push('"cores" deve ser um objeto { primaria, fundo, texto }')
  } else {
    for (const cor of ['primaria', 'fundo', 'texto']) {
      if (!ehTexto(r.cores[cor])) erros.push(`"cores.${cor}" deve ser um texto não vazio`)
    }
    // Opcional: se vier, tem que ser texto
    if (r.cores.sobrePrimaria !== undefined && !ehTexto(r.cores.sobrePrimaria)) {
      erros.push('"cores.sobrePrimaria" é opcional, mas se vier deve ser um texto não vazio')
    }
  }

  // Opcional: sem "estilo" o tema usa o padrão. Se vier, tem que ser um preset de lib/tema.js
  // (Object.hasOwn evita aceitar nomes herdados do objeto, como "toString").
  if (r.estilo !== undefined && !(typeof r.estilo === 'string' && Object.hasOwn(ESTILOS, r.estilo))) {
    const nomes = Object.keys(ESTILOS).map((n) => `"${n}"`).join(', ')
    erros.push(`"estilo" deve ser ${nomes} (veio ${JSON.stringify(r.estilo)})`)
  }

  // Categorias
  const idsCategorias = new Set()
  if (!Array.isArray(r.categorias)) {
    erros.push('"categorias" deve ser uma lista')
  } else {
    r.categorias.forEach((c, i) => {
      if (!ehTexto(c?.id)) erros.push(`categorias[${i}]: "id" deve ser um texto não vazio`)
      else if (idsCategorias.has(c.id)) erros.push(`categorias[${i}]: id "${c.id}" repetido`)
      else idsCategorias.add(c.id)
      if (!ehTexto(c?.nome)) erros.push(`categorias[${i}]: "nome" deve ser um texto não vazio`)
    })
  }

  // Itens
  if (!Array.isArray(r.itens)) {
    erros.push('"itens" deve ser uma lista')
    return erros
  }

  // Primeiro junta os ids, para depois conferir os "combinaCom"
  const idsItens = new Set()
  r.itens.forEach((item, i) => {
    if (!ehTexto(item?.id)) erros.push(`itens[${i}]: "id" deve ser um texto não vazio`)
    else if (idsItens.has(item.id)) erros.push(`itens[${i}]: id "${item.id}" repetido`)
    else idsItens.add(item.id)
  })

  r.itens.forEach((item, i) => {
    const onde = `item "${item?.id ?? i}"`
    if (!item || typeof item !== 'object') return

    for (const campo of ['nome', 'descricao', 'foto']) {
      if (typeof item[campo] !== 'string') erros.push(`${onde}: "${campo}" deve ser texto`)
    }
    if (!ehTexto(item.nome)) erros.push(`${onde}: "nome" não pode ser vazio`)

    if (!idsCategorias.has(item.categoriaId)) {
      erros.push(`${onde}: categoriaId "${item.categoriaId}" não existe em "categorias"`)
    }

    if (typeof item.preco !== 'number' || !Number.isFinite(item.preco) || item.preco < 0) {
      erros.push(`${onde}: "preco" deve ser um número >= 0 (veio ${JSON.stringify(item.preco)})`)
    }

    if (!Array.isArray(item.tags)) {
      erros.push(`${onde}: "tags" deve ser uma lista`)
    } else {
      for (const tag of item.tags) {
        if (!TAGS.includes(tag)) erros.push(`${onde}: tag "${tag}" inválida`)
      }
    }

    if (!DESTAQUES.includes(item.destaque)) {
      erros.push(`${onde}: "destaque" deve ser "mais-pedido", "chef" ou null`)
    }

    if (!Array.isArray(item.combinaCom)) {
      erros.push(`${onde}: "combinaCom" deve ser uma lista`)
    } else {
      for (const id of item.combinaCom) {
        if (!idsItens.has(id)) erros.push(`${onde}: combinaCom "${id}" não é um item existente`)
        else if (id === item.id) erros.push(`${onde}: combinaCom não pode apontar para o próprio item`)
      }
    }
  })

  return erros
}

// Carrega todos os JSONs da pasta em tempo de build.
// Para adicionar um restaurante basta criar um novo arquivo .json lá.
const arquivos = import.meta.glob('../data/restaurantes/*.json', {
  eager: true,
  import: 'default',
})

// Mapa slug -> restaurante.
// Map (e não objeto comum) porque o slug vem da URL: com objeto, /r/toString ou /r/constructor
// devolveriam funções herdadas do Object.prototype no lugar de "não encontrado".
// JSONs inválidos (ou com slug repetido) ficam de fora e geram erro no console,
// com o nome do arquivo, para quem estiver editando achar o problema rápido.
const restaurantesPorSlug = new Map()
for (const [caminho, restaurante] of Object.entries(arquivos)) {
  const arquivo = caminho.split('/').pop()
  const erros = validarRestaurante(restaurante)

  if (erros.length === 0 && restaurantesPorSlug.has(restaurante.slug)) {
    erros.push(`slug "${restaurante.slug}" já é usado por outro arquivo`)
  }

  if (erros.length > 0) {
    console.error(
      `[restaurantes] ${arquivo} foi ignorado por ter erros:\n- ${erros.join('\n- ')}`,
    )
    continue
  }

  restaurantesPorSlug.set(restaurante.slug, restaurante)
}

/**
 * Retorna o restaurante com o slug informado, ou null se não existir
 * (ou se o JSON dele for inválido — ver validarRestaurante).
 */
export function getRestaurante(slug) {
  return restaurantesPorSlug.get(slug) ?? null
}
