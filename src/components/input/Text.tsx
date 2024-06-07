'use client'

import { useEffect, useState } from 'react'

interface Props {
  name: string
  label: string
  wFull?: boolean
  isInvalid?: boolean
  errorMessage?: string[]
  responsive?: boolean
  capitalize?: 'auto' | 'lower' | 'lowerNoSpaces'
}

export function InputText({
  name,
  label,
  wFull,
  isInvalid,
  errorMessage,
  responsive,
  capitalize,
}: Props) {
  const [value, setValue] = useState('')
  const [transformedValue, setTransformedValue] = useState('')

  useEffect(() => {
    let newValue = value

    switch (capitalize) {
      case 'auto':
        newValue = value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        break
      case 'lower':
        newValue = value.toLowerCase()
        break
      case 'lowerNoSpaces':
        newValue = value.replace(/\s/g, '').toLowerCase()
        break
    }
    setTransformedValue(newValue)
  }, [value, capitalize])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div
      className={`flex flex-col space-y-2 ${responsive ? 'md:flex-row md:items-center' : ''}`}
    >
      <label htmlFor={name} className="md:w-40">
        {label}
      </label>
      <div className="relative flex flex-1">
        <input
          type="text"
          id={name}
          name={name}
          value={transformedValue}
          onChange={handleChange}
          className={`flex-1 rounded p-2 shadow ${wFull ? 'w-full' : ''} ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
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
