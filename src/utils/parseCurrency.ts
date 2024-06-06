export const parseCurrency = (val: string) => {
  return Number(val.replace('R$ ', '').replace('.', '').replace(',', '')) / 100
}
