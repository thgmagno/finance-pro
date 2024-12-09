import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function CurrencyInput() {
  const [value, setValue] = useState('R$ 0,00')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '') // Remove tudo que não for número
    const numericValue = parseInt(inputValue, 10) || 0

    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    setValue(`R$ ${formattedValue}`)
  }

  return (
    <Input
      type="text"
      id="amount"
      name="amount"
      value={value}
      onChange={handleChange}
    />
  )
}
