export const currencyBRL = (val: number) =>
  val.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })
