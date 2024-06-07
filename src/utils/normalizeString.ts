export const normalizeString = (value: string) => {
  const newValue = value
    .toLocaleLowerCase() // Converte para minúsculas
    .normalize('NFD') // Normaliza para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos

  return newValue
}
