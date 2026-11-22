/** Formata um preço em reais (número) para exibição, ex. 32.9 -> "R$ 32,90". */
export const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
