import { Transaction } from '@/lib/types'
import { BarChart } from './BarChart'
import { ChartWrapper } from './Wrapper'
import { Details } from './Details'

export function Charts({ data }: { data: Transaction[] }) {
  return (
    <div className="py-5 md:mx-auto">
      <ChartWrapper title="Receitas x Despesas">
        <BarChart data={data} />
      </ChartWrapper>
      <Details data={data} />
    </div>
  )
}
