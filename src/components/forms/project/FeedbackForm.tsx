'use client'

import { actions } from '@/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    feedbackName: '',
    feedbackMessage: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await actions.project.sendFeedback(new FormData(e.currentTarget))
      toast.success('Feedback enviado com sucesso!')
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar o feedback. Tente novamente')
    } finally {
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({ feedbackName: '', feedbackMessage: '' })
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>
          Seu nome{' '}
          <span className="text-sm text-muted-foreground">(opcional)</span>
        </Label>
        <Input
          type="text"
          name="feedbackName"
          placeholder="Informe seu nome"
          className="bg-white"
          value={formData.feedbackName}
          onChange={handleChange}
        />
        <small className="flex items-center text-xs text-muted-foreground md:text-sm">
          Respeitamos sua privacidade. Você pode não preencher o nome para
          enviar um comentário de forma anônima.
        </small>
      </div>
      <hr />
      <div className="flex flex-col space-y-2">
        <Label>Sua mensagem</Label>
        <Textarea
          name="feedbackMessage"
          className="bg-white"
          placeholder="Escreva seu feedback aqui..."
          rows={4}
          value={formData.feedbackMessage}
          onChange={handleChange}
        />
        <small
          className={cn(
            'ml-auto flex items-center text-xs text-muted-foreground md:text-sm',
            {
              'font-semibold text-red-500':
                formData.feedbackMessage.length > 500,
            },
          )}
        >
          {formData.feedbackMessage.length}/500
        </small>
      </div>
      <button
        type="submit"
        disabled={
          isLoading ||
          !formData.feedbackMessage ||
          formData.feedbackMessage.length > 500
        }
        className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
      >
        {isLoading ? 'Processando sua mensagem...' : 'Enviar Feedback'}
      </button>
    </form>
  )
}
