'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const handleCreateAccount = async () => {
    return actions.session.del('/cadastrar')
  }

  if (error.message.includes('Usuário visitante não tem permissão')) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="mx-auto w-[90%] max-w-sm rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-3 text-center text-lg font-semibold">
            Oops! Você está acessando como visitante
          </h2>
          <p className="mb-5 text-center text-sm text-gray-600">
            Para desbloquear todos os recursos e aproveitar a experiência
            completa, crie uma conta agora!
          </p>
          <div className="space-y-3">
            <Button onClick={handleCreateAccount} className="w-full">
              Criar minha conta
            </Button>
            <Button onClick={reset} variant="outline" className="w-full">
              Fechar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="mx-auto w-[90%] max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-3 text-center text-lg font-semibold">
          Oops! Parece que algo deu errado
        </h2>
        <p className="mb-5 text-center text-sm text-gray-600">
          Mas não se preocupe, estamos trabalhando para resolver o problema o
          mais rápido possível.
        </p>
        <div className="space-y-3">
          <Button onClick={reset} variant="outline" className="w-full">
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  )
}
