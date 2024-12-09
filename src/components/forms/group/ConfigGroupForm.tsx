'use client'

import { actions } from '@/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SessionPayload } from '@/lib/types'
import { Group } from '@prisma/client'
import { Copy, Trash2 } from 'lucide-react'
import { useActionState, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ErrorMessage } from '../ErrorMessage'

interface ConfigGroupFormProps {
  group: Group
  session: SessionPayload
}

export function ConfigGroupForm({ group, session }: ConfigGroupFormProps) {
  const [formState, action] = useActionState(actions.group.update, {
    errors: {},
  })

  const [view, setView] = useState<'view' | 'edit'>('view')

  const handleAllowFindMe = (checked: boolean) => {
    actions.group.updateAllowFindMe(checked).then(() => {
      toast.success('A visibilidade do grupo foi atualizada com sucesso')
    })
  }

  const isOwnerGroup = useMemo(() => {
    return group.creatorId === session.id
  }, [group, session])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do grupo</CardTitle>
        <CardDescription>
          Configure as opções do grupo para personalizar sua experiência.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="allow-find-me"
            checked={group?.allowFindMe}
            onCheckedChange={handleAllowFindMe}
          />
          <label
            htmlFor="allow-find-me"
            className="flex flex-col gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Permitir que outros usuários encontrem você
            <small className="text-xs text-muted-foreground">
              Ao ativar esta opção, seu grupo ficará visível em buscas
              realizadas por outros usuários. Eles poderão enviar convites para
              participar, mas suas transações e dados financeiros continuarão
              privados e visíveis apenas para os integrantes do grupo.
            </small>
          </label>
        </div>
        <form action={action} className="mt-6 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label>Tag do grupo</Label>
            <div className="flex items-center gap-2">
              <Input
                value={group?.tag ?? ''}
                className="bg-zinc-100 font-semibold tracking-widest text-muted-foreground"
                readOnly
              />
              <Button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(group?.tag ?? '')
                  toast.success(
                    'Tag do grupo copiada para a área de transferência',
                  )
                }}
                variant="outline"
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <small className="block text-xs text-muted-foreground">
              A tag é uma identificação única do grupo que pode ser usada para
              encontrar o grupo em buscas externas.
            </small>
          </div>
          <div>
            <Label>Nome do grupo</Label>
            <Input
              name="name"
              defaultValue={group?.name ?? ''}
              readOnly={view === 'view'}
            />
            {<ErrorMessage message={formState.errors.name} />}
          </div>
          <div>
            <Label>Descrição do grupo</Label>
            <Input
              name="description"
              defaultValue={group?.description ?? ''}
              readOnly={view === 'view'}
            />
            {<ErrorMessage message={formState.errors.description} />}
          </div>
          {isOwnerGroup ? (
            <ConfigGroupOptions view={view} setView={setView} group={group} />
          ) : (
            <LeaveGroupButton />
          )}
        </form>
      </CardContent>
    </Card>
  )
}

interface ConfigGroupOptionsProps {
  view: 'view' | 'edit'
  setView: (view: 'view' | 'edit') => void
  group: Group
}

function ConfigGroupOptions({ view, setView, group }: ConfigGroupOptionsProps) {
  const nameConfirmationRef = useRef<HTMLInputElement>(null)

  const handleDeleteGroup = async () => {
    if (nameConfirmationRef.current?.value === group?.name) {
      const result = await actions.group.destroy(group.id)
      if (result.error) {
        toast.error(result.message)
      } else {
        toast.success(result.message)
      }
    } else {
      toast.error('O nome do grupo não corresponde ao nome do grupo')
    }
  }

  return (
    <div className="config-button-group">
      {view === 'view' && (
        <Button onClick={() => setView('edit')} type="button" variant="outline">
          Editar informações do grupo
        </Button>
      )}
      {view === 'edit' && (
        <Button type="submit" variant="success">
          Salvar
        </Button>
      )}
      {view === 'edit' && (
        <Button onClick={() => setView('view')} type="button" variant="outline">
          Cancelar
        </Button>
      )}
      {view === 'edit' && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive">
              <Trash2 className="h-4 w-4" />
              Excluir grupo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir o grupo?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  <b>Atenção:</b> Esta ação é irreversível.
                </p>
                <p>
                  Ao excluir o grupo, todos os dados financeiros e transações
                  associados serão perdidos permanentemente.
                </p>
                <ul>
                  <li>
                    <b>Transações:</b> Todas as transações do grupo serão
                    excluídas.
                  </li>
                  <li>
                    <b>Dados financeiros:</b> Todos os dados financeiros do
                    grupo serão excluídos.
                  </li>
                  <li>
                    <b>Integrantes:</b> Todos os integrantes do grupo serão
                    removidos.
                  </li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form action="">
              <AlertDialogContent>
                <Label>Digite o nome do grupo para confirmar a exclusão</Label>
                <Input name="confirm-group-name" />
              </AlertDialogContent>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteGroup}
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Excluir grupo
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

function LeaveGroupButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2 className="h-4 w-4" />
          Sair do grupo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja sair do grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tenha em mente que você não poderá mais acessar as transações e os
            dados financeiros do grupo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await actions.session.del()}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Sair do grupo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
