'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GroupWithDetails } from '@/lib/types'
import { Crown, Plus, UsersIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { ErrorMessage } from '../ErrorMessage'

export function SearchGroupForm() {
  const [formState, action, isPending] = useActionState(actions.group.list, {
    data: undefined,
    errors: {},
  })

  useEffect(() => {
    const noErrors = Object.keys(formState.errors).length === 0
    const noGroups = formState.data?.length === 0

    if (noErrors && noGroups) {
      toast.error('Nenhum grupo encontrado')
    }
  }, [formState.errors, formState.data])

  return (
    <Card>
      <CardContent className="mt-6">
        <form action={action} className="mb-5 flex flex-col">
          <div className="flex flex-col">
            <Label htmlFor="search" className="mb-2">
              Procurar grupo
            </Label>
            <Input
              id="search"
              name="search"
              placeholder="Digite o nome ou ID do grupo"
              className="w-full"
            />
            {<ErrorMessage message={formState.errors.search} />}
          </div>
          <Button type="submit" className="self-end" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Buscar'}
          </Button>
        </form>
        {formState.data && <GroupList groups={formState.data} />}
      </CardContent>
    </Card>
  )
}

function GroupList({ groups }: { groups: GroupWithDetails[] }) {
  const sendInvitation = (groupId: string) => {
    toast.promise(actions.group.sendInvitation(groupId), {
      loading: 'Enviando convite...',
      success: 'Convite enviado com sucesso!',
      error: (error) => error.message,
    })
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.id} className="my-2 space-y-2 rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-2 border-r border-zinc-300 pr-2">
                <Crown className="h-4 w-4" />
                <span className="text-sm">{group.creator.name}</span>
              </div>
              <div className="flex items-center gap-2 border-zinc-300 pr-2 lg:border-r">
                <UsersIcon className="h-4 w-4" />
                <span className="text-sm">
                  {group._count.users}{' '}
                  <span className="hidden lg:inline">participantes</span>
                </span>
              </div>
              <div className="hidden items-center gap-2 lg:flex">
                <span className="text-sm tracking-wider">#{group.tag}</span>
              </div>
            </div>
            <Button
              onClick={() => sendInvitation(group.id)}
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Pedir para participar</span>
            </Button>
          </div>
          <hr className="my-2 border-zinc-300" />
          <div className="flex flex-col text-sm">
            <span>
              <b>Nome</b>: <span>{group.name}</span>
            </span>
            <span>
              <b>Descrição</b>: <span>{group.description}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
