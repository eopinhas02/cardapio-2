# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Plataforma de cardápio digital para restaurantes, acessada por placas com QR code e NFC. Equipe de 2 devs. Stack: React + Vite (JavaScript, sem TypeScript) + react-router-dom. **Mobile-first.**

Tarefas e status ficam em `ROADMAP.md` (marcar o checkbox ao concluir uma tarefa).

## Comandos

```
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run lint      # oxlint (configurado em .oxlintrc.json)
npm run preview   # serve o build localmente
```

Não há testes automatizados configurados ainda.

## Arquitetura

- **Toda placa aponta para `/r/:slug`.** A rota renderiza `src/pages/Restaurante.jsx`, que busca o restaurante com `getRestaurante(slug)`.
- **Cada restaurante é um arquivo JSON** em `src/data/restaurantes/`. Não há backend: `src/lib/restaurantes.js` carrega todos os JSONs em tempo de build via `import.meta.glob` e indexa por `slug`. Adicionar um restaurante = criar um novo `.json` (o `slug` interno é o que vale, não o nome do arquivo).
- **Dois modos por restaurante** (campo `modo`):
  - `"externo"`: redireciona para `urlExterna` (cardápio próprio do restaurante).
  - `"interativo"`: abre o nosso cardápio, com tema vindo de `cores`.
- O formato completo do JSON está documentado no JSDoc de `src/lib/restaurantes.js` e em `ROADMAP.md`. `src/data/restaurantes/demo.json` é o exemplo de referência. Ao mudar o formato, atualizar os três lugares.
- Convenções do JSON: `preco` é número em reais (formatação só na UI); `combinaCom` e `categoriaId` referenciam ids existentes; `destaque` é `"mais-pedido"`, `"chef"` ou `null`.
- Rotas definidas em `src/App.jsx` (`BrowserRouter` em `src/main.jsx`). Por ser SPA, o deploy precisa de rewrite de todas as rotas para `index.html` (tarefa B5, `vercel.json`).

## Divisão de tarefas e branches

| Dev | Trilha | Branch | Escopo |
|---|---|---|---|
| Dev A | A1–A5 (cardápio/visual) | `cardapio` | tema, header, cards, modal, carrinho — principalmente `src/components`, `src/styles`, `src/pages/Restaurante.jsx` |
| Dev B | B1–B5 (infra) | `infra` | validação do JSON, 404, modo externo, restaurantes de exemplo, `/admin/qr`, deploy — principalmente `src/lib`, `src/data`, `src/pages/AdminQr.jsx`, config |

Fluxo:
- `main` é a versão estável. Não desenvolver direto nela.
- Cada dev trabalha na sua branch (`cardapio` ou `infra`) e traz a `main` para a branch com frequência (`git pull origin main`) para reduzir conflitos.
- Ao concluir e aprovar uma tarefa, fazer merge da branch na `main`.
- Pontos de contato entre as trilhas: `src/pages/Restaurante.jsx` (B1/B2 decidem 404/redirecionamento antes de renderizar o cardápio de A) e o formato do JSON. Mudanças nesses pontos devem ser combinadas entre os dois.

## Regras de trabalho

- Fazer **uma etapa/tarefa por vez**. Ao terminar, parar, mostrar o que mudou e como testar, e esperar o OK antes de seguir.
- Só fazer commit depois da aprovação, com mensagem clara em **português**.
- Código simples, com comentários em português quando não for óbvio.
- Nada de bibliotecas além das estritamente necessárias (ex.: uma lib de QR code para B4 é justificável; frameworks de UI/CSS não).
