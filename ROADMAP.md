# Roadmap — Cardápio Digital

Plataforma de cardápio digital para restaurantes, acessada por placas com QR code e NFC.
Toda placa aponta para `/r/:slug`. Cada restaurante é um JSON em `src/data/restaurantes/`.

## Formato do JSON do restaurante

| Campo | Tipo | Observação |
|---|---|---|
| `slug` | string | Usado na URL `/r/:slug` |
| `nome` | string | |
| `logo` | string | URL ou caminho da imagem |
| `modo` | `"externo"` \| `"interativo"` | Externo redireciona para `urlExterna`; interativo abre nosso cardápio |
| `urlExterna` | string \| null | Obrigatória só no modo externo; endereço `http://` ou `https://` completo |
| `estilo` | `"moderno"` \| `"classico"` \| `"despojado"` | Opcional, padrão `"moderno"`. Preset de tipografia, bordas, sombras, espaçamento e cards (A1, em `src/lib/tema.js`) |
| `cores` | `{ primaria, sobrePrimaria?, fundo, texto }` | Cores do tema (A1). `sobrePrimaria` é opcional: texto em cima da primária, padrão `#ffffff` |
| `categorias` | `[{ id, nome }]` | |
| `itens` | lista (abaixo) | |

Cada item:

| Campo | Tipo | Observação |
|---|---|---|
| `id` | string | |
| `categoriaId` | string | id de uma categoria |
| `nome`, `descricao` | string | |
| `preco` | number | Em reais, ex. `32.9` |
| `foto` | string | URL ou caminho |
| `tags` | lista de `"vegetariano"`, `"apimentado"`, `"sem-gluten"` | |
| `destaque` | `"mais-pedido"` \| `"chef"` \| `null` | |
| `combinaCom` | lista de ids de itens | Usado no "Combina com" (A4) e upsell (A5) |

Exemplo completo: `src/data/restaurantes/demo.json`. Para ler um restaurante: `getRestaurante(slug)` em `src/lib/restaurantes.js`.

## Trilha A — Cardápio / visual

- [x] **A1** Tema por CSS variables vindas do JSON (`estilo` e `cores`).
- [x] **A2** Header + navegação de categorias sticky.
- [ ] **A3** Cards dos itens com foto, preço e selos de destaque.
- [ ] **A4** Detalhe do item em modal com "Combina com".
- [ ] **A5** Carrinho em lista com total e upsell.

## Trilha B — Infra

- [x] **B1** Validação do JSON + 404 amigável para slug inexistente.
- [x] **B2** Redirecionamento do modo externo.
- [x] **B3** Segundo restaurante de exemplo em modo externo.
- [ ] **B4** Página `/admin/qr` que gera e baixa PNG do QR de cada restaurante.
- [ ] **B5** Deploy na Vercel com `vercel.json` para as rotas.

## Futuro

- Pedido para cozinha
- Sistema do restaurante
- Painel admin
- Quiz "me ajuda a escolher"
- Sugestões por horário
- Métricas de escaneamento
