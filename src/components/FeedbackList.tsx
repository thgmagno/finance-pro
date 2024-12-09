import { actions } from '@/actions'
import { cn } from '@/lib/utils'
import { Feedback } from '@prisma/client'
import { SimplePagination } from './SimplePagination'

interface FeedbackListProps {
  page?: number
  limit?: number
  latest?: boolean
}

export async function FeedbackList({ page, limit, latest }: FeedbackListProps) {
  const itemStyle = latest
    ? 'bg-white'
    : 'bg-zinc-50 border border-zinc-200 rounded-lg shadow'
  const { feedbacks, totalPages, currentPage, hasNextPage, hasPreviousPage } =
    await actions.project.getFeedbacks({ page, limit })

  if (feedbacks.length === 0) {
    return (
      <p className="rounded-lg p-5 text-center text-sm text-zinc-500 shadow">
        Nenhum feedback encontrado.
      </p>
    )
  }

  const feedbacksToShow = latest ? feedbacks.slice(0, 3) : feedbacks

  return (
    <>
      {feedbacksToShow.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          itemStyle={itemStyle}
        />
      ))}
      {!latest && (
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
        />
      )}
    </>
  )
}

function FeedbackItem({
  feedback,
  itemStyle,
}: {
  feedback: Feedback
  itemStyle: string
}) {
  return (
    <div className={cn('w-full space-y-2 rounded-lg p-4', itemStyle)}>
      <p className="text-sm font-medium">
        {feedback.author} <span className="text-zinc-500">disse:</span>
      </p>
      <p className="text-sm">{feedback.message}</p>
      <p className="text-xs text-zinc-500">
        {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(feedback.createdAt))}
      </p>
    </div>
  )
}
