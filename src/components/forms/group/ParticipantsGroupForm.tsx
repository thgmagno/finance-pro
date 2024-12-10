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
import { SessionPayload } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Group, User } from '@prisma/client'
import { Crown, Trash2, User as UserIcon } from 'lucide-react'
import { LeaveGroupButton } from './LeaveGroupButton'

interface ParticipantsGroupFormProps {
  members: User[]
  group: Group
  session: SessionPayload
}

export function ParticipantsGroupForm({
  members,
  group,
  session,
}: ParticipantsGroupFormProps) {
  const isOwnerGroup = group.creatorId === session.id

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex justify-between">
          <div>
            <CardTitle>{group.name}</CardTitle>
            {group.description && (
              <CardDescription className="flex flex-col space-y-1">
                <span>{group.description}</span>
                <span className="text-xs text-muted-foreground">
                  {members.length} participantes
                </span>
              </CardDescription>
            )}
          </div>
          {!isOwnerGroup && <LeaveGroupButton />}
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <form action="" className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {members.map((member) => (
              <ParticipantItem
                key={member.id}
                member={member}
                group={group}
                session={session}
              />
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ParticipantItem({
  member,
  group,
  session,
}: {
  member: User
  group: Group
  session: SessionPayload
}) {
  const isOwner = member.id === group.creatorId
  const isCurrentUser = session.id === member.id
  const canRemoveParticipant =
    session.id === group.creatorId && member.id !== group.creatorId

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-md bg-zinc-100 p-2',
        {
          'border-2 bg-white': isCurrentUser,
        },
      )}
    >
      <div className="flex items-center gap-2">
        {isOwner ? (
          <Crown className="h-4 w-4" />
        ) : (
          <UserIcon className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">{member.name}</span>
      </div>
      {canRemoveParticipant && (
        <RemoveParticipantButton member={member} group={group} />
      )}
      {isCurrentUser && (
        <span className="cursor-default select-none text-sm text-muted-foreground">
          você
        </span>
      )}
    </div>
  )
}

function RemoveParticipantButton({
  member,
  group,
}: {
  member: User
  group: Group
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover {member.name} do grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação irá remover o acesso de {member.name} às transações e
            dados financeiros do grupo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () =>
              await actions.group.removeParticipant(group.id, member.id)
            }
            className={buttonVariants({ variant: 'destructive' })}
          >
            Remover participante
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
