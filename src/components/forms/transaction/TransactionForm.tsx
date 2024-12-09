'use client'

import { actions } from '@/actions'
import { ComboboxCategory } from '@/components/input/ComboboxCategory'
import { CurrencyInput } from '@/components/input/CurrencyInput'
import { DateInput } from '@/components/input/DateInput'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { ErrorMessage } from '../ErrorMessage'

interface TransactionFormProps {
  type: 'INCOME' | 'EXPENSE'
  categories: { value: string; label: string }[]
}

export function TransactionForm({ type, categories }: TransactionFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.transaction.save,
    { errors: {} },
  )

  const [month, setMonth] = useState(
    new Date().toLocaleString('pt-br', { month: 'long' }),
  )
  const [year, setYear] = useState(new Date().getFullYear())
  const [status, setStatus] = useState<'PENDING' | 'OK'>('PENDING')
  const [category, setCategory] = useState('')

  const { back } = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === 'INCOME' ? 'Adicionar Receita' : 'Adicionar Despesa'}
        </CardTitle>
        <CardDescription>
          {type === 'INCOME'
            ? 'Registre um novo ganho financeiro.'
            : 'Registre um novo gasto financeiro.'}
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="month" value={month} />
          <input type="hidden" name="year" value={year} />
          <input type="hidden" name="categoryId" value={category} />

          <div className="grid space-y-3 lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-col gap-2 lg:col-span-2">
              <Label>Descrição</Label>
              <Input type="text" id="description" name="description" />
              <ErrorMessage message={formState.errors.description} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Valor</Label>
              <CurrencyInput />
              <ErrorMessage message={formState.errors.amount} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Categoria</Label>
              <ComboboxCategory
                value={category}
                onChange={setCategory}
                options={categories}
              />
              <ErrorMessage message={formState.errors.categoryId} />
            </div>
          </div>

          <Accordion type="multiple" className="mt-4">
            <AccordionItem value="data">
              <AccordionTrigger>Lançamento detalhado</AccordionTrigger>
              <AccordionContent>
                <small className="text-xs text-muted-foreground">
                  Por padrão o lançamento será registrado no mês e ano atual e
                  status pendente, a menos que seja informado uma data diferente
                  ou o status seja alterado.
                </small>
              </AccordionContent>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Label>Selecionar a data</Label>
                  <DateInput
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                  />
                  <ErrorMessage message={formState.errors.month} />
                </div>
              </AccordionContent>
              <AccordionContent className="mt-2 flex flex-col gap-3">
                <Label>Selecionar o status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    value={status}
                    checked={status === 'OK'}
                    onCheckedChange={(checked) =>
                      setStatus(checked ? 'OK' : 'PENDING')
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status === 'OK'
                      ? 'Lançamento recebido/pago'
                      : 'Lançamento pendente'}
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" onClick={back} variant="outline">
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Incluir'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
