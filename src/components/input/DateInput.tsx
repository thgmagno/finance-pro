'use client'

import { Input } from '@/components/ui/input'
import { ComboboxMonth } from './ComboboxMonth'

interface DateInputProps {
  month: string
  setMonth: (value: string) => void
  year: number
  setYear: (value: number) => void
}

export function DateInput({ month, setMonth, year, setYear }: DateInputProps) {
  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (isNaN(parseInt(value))) return setYear(1900)
    if (value.length <= 4) {
      setYear(parseInt(value))
    } else {
      const updatedYear = year.toString().slice(1) + value.slice(-1)
      setYear(parseInt(updatedYear))
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <ComboboxMonth value={month} onChange={setMonth} />
      <Input
        type="text"
        value={year.toString()}
        onChange={handleChangeYear}
        className="w-full text-center"
      />
    </div>
  )
}
