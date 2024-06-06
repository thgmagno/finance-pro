import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { translateStatusBRL } from '@/utils/translateStatusBRL'

interface Props {
  data: Transaction[]
}

export function GridTransactions({ data }: Props) {
  return (
    <div className="no-scrollbar my-8 flex overflow-scroll rounded bg-slate-800">
      <table className="w-full border-b-2">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Mês</th>
            <th>Ano</th>
            <th>Status</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.description}</td>
              <td>{currencyBRL(row.amount)}</td>
              <td>{monthToString(row.month)}</td>
              <td>{row.year}</td>
              <td>{translateStatusBRL(row.status)}</td>
              <td>{row.categoryId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
