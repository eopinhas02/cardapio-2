/**
 * Formato do JSON de um restaurante (um arquivo por restaurante em src/data/restaurantes/):
 *
 * {
 *   slug: string,                       // usado na URL: /r/:slug
 *   nome: string,
 *   logo: string,                       // URL ou caminho da imagem
 *   modo: "externo" | "interativo",     // externo = redireciona; interativo = nosso cardápio
 *   urlExterna: string | null,          // obrigatória só no modo "externo"
 *   cores: { primaria: string, fundo: string, texto: string },
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

// Carrega todos os JSONs da pasta em tempo de build.
// Para adicionar um restaurante basta criar um novo arquivo .json lá.
const arquivos = import.meta.glob('../data/restaurantes/*.json', {
  eager: true,
  import: 'default',
})

// Mapa slug -> restaurante
const restaurantesPorSlug = {}
for (const restaurante of Object.values(arquivos)) {
  restaurantesPorSlug[restaurante.slug] = restaurante
}

/**
 * Retorna o restaurante com o slug informado, ou null se não existir.
 * (A validação do formato fica para a tarefa B1.)
 */
export function getRestaurante(slug) {
  return restaurantesPorSlug[slug] ?? null
}
