'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const months = [
  {
    value: 'janeiro',
    label: 'Janeiro',
  },
  {
    value: 'fevereiro',
    label: 'Fevereiro',
  },
  {
    value: 'março',
    label: 'Março',
  },
  {
    value: 'abril',
    label: 'Abril',
  },
  {
    value: 'maio',
    label: 'Maio',
  },
  {
    value: 'junho',
    label: 'Junho',
  },
  {
    value: 'julho',
    label: 'Julho',
  },
  {
    value: 'agosto',
    label: 'Agosto',
  },
  {
    value: 'setembro',
    label: 'Setembro',
  },
  {
    value: 'outubro',
    label: 'Outubro',
  },
  {
    value: 'novembro',
    label: 'Novembro',
  },
  {
    value: 'dezembro',
    label: 'Dezembro',
  },
]

interface ComboboxMonthProps {
  value: string
  onChange: (value: string) => void
}

export function ComboboxMonth({ value, onChange }: ComboboxMonthProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          {value
            ? months.find((month) => month.value === value)?.label
            : 'Selecione o mês...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Pesquise o mês..." />
          <CommandList>
            <CommandEmpty>Nenhum mês encontrado.</CommandEmpty>
            <CommandGroup>
              {months.map((month) => (
                <CommandItem
                  key={month.value}
                  value={month.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {month.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === month.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
