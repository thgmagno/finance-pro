import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { SelectStatus } from '../select/Status'
import { getStatusColor } from '@/utils/getStatusColor'
import { DeleteBox } from '../dialog/DeleteBox'
import { UpdateBox } from '../dialog/UpdateBox'

interface Props {
  data: Transaction[]
}

export function GridTransactions({ data }: Props) {
  return (
    <div className="no-scrollbar mb-40 flex flex-col overflow-scroll rounded bg-slate-800">
      <table className="w-full border-b-2">
        <thead>
          <tr>
            <th className="max-w-40">Descrição</th>
            <th className="min-w-28">Valor</th>
            <th className="min-w-28">Mês</th>
            <th className="min-w-28">Ano</th>
            <th className="min-w-28">Status</th>
            <th className="min-w-40">Categoria</th>
            <th className="min-w-40">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt) => (
            <tr key={dt.id} className={`${getStatusColor(dt.status)}`}>
              <td className="truncate">{dt.description}</td>
              <td className="truncate">{currencyBRL(dt.amount)}</td>
              <td className="truncate">{monthToString(dt.month)}</td>
              <td className="truncate">{dt.year}</td>
              <td className="truncate">
                <SelectStatus transaction={dt} />
              </td>
              <td className="truncate">{dt.category.description}</td>
              <td className="flex items-center justify-evenly">
                <UpdateBox transaction={dt} />
                <DeleteBox
                  transaction={dt}
                  data={data.filter((item) => item.uuid === dt.uuid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
