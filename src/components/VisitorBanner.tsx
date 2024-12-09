'use client'

import { actions } from '@/actions'

export function VisitorBanner() {
  const handleCreateAccount = async () => {
    return actions.session.del('/cadastrar')
  }

  return (
    <div className="mb-3 flex flex-col justify-center rounded-lg bg-muted p-4">
      <h3 className="text-sm font-medium">Sessão de visitante</h3>
      <p className="text-xs text-muted-foreground">
        As funcionalidades estarão limitadas e os dados serão somente leitura.
        Para ter uma experiência completa,{' '}
        <button
          onClick={handleCreateAccount}
          className="text-blue-500 underline"
        >
          crie uma conta
        </button>
        .
      </p>
    </div>
  )
}
