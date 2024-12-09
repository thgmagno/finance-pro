import { FeedbackList } from '@/components/FeedbackList'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'

interface FeedbacksPageProps {
  searchParams: {
    pagina?: string
    limite?: string
  }
}

export default function FeedbacksPage({ searchParams }: FeedbacksPageProps) {
  const parsedPage = parseInt(searchParams.pagina || '1')
  const parsedLimit = parseInt(searchParams.limite || '10')

  return (
    <div className="mx-auto flex w-[96%] max-w-3xl flex-col items-center justify-center space-y-4 pb-40">
      <div className="my-12 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Feedbacks</h1>
        <Link
          href="/conheca-o-projeto"
          className={cn(buttonVariants({ size: 'sm' }))}
        >
          <Undo2 className="h-4 w-4" />
          Voltar
        </Link>
      </div>
      <FeedbackList page={parsedPage} limit={parsedLimit} />
    </div>
  )
}
