'use client'

import { useEffect, useState } from 'react'

interface Props {
  name: string
  isInvalid: boolean
  errorMessage?: string[]
  noLabel?: boolean
  defaultValue?: number
  textDark?: boolean
}

export function InputCurrencyBRL({
  name,
  isInvalid,
  errorMessage,
  noLabel,
  defaultValue,
  textDark,
}: Props) {
  const [value, setValue] = useState('')

  const formatValue = (value: string): string => {
    let newValue = value.replace(/[^\d]/g, '')

    newValue = newValue.replace(/^0+/, '')

    while (newValue.length < 3) {
      newValue = '0' + newValue
    }

    const integerPart = newValue.slice(0, -2)
    const decimalPart = newValue.slice(-2)

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    )

    return `R$ ${formattedIntegerPart},${decimalPart}`
  }

  const formatDefaultValue = (value: number): string => {
    const cents = Math.round(value * 100).toString()
    return formatValue(cents)
  }

  useEffect(() => {
    if (defaultValue) {
      setValue(formatDefaultValue(defaultValue))
    }
  }, [defaultValue])

  const onChange = (value: string) => {
    setValue(formatValue(value))
  }

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center">
      <label htmlFor="" className={`md:w-40 ${noLabel ? 'hidden' : ''}`}>
        Valor
      </label>
      <div className="relative flex flex-1">
        <input
          id={name}
          name={name}
          type="text"
          placeholder="R$ 0,00"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 rounded p-2 shadow ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'} ${textDark ? 'font-normal text-zinc-900' : ''}`}
        />
        {errorMessage && (
          <span className="absolute bottom-1 right-1.5 text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  )
}
