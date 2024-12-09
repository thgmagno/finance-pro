'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X } from 'lucide-react'

import { actions } from '@/actions'
import { InvitationWithUser } from '@/lib/types'
import toast from 'react-hot-toast'

interface RequestsGroupFormProps {
  invitations: InvitationWithUser[]
}

export function RequestsGroupForm({ invitations }: RequestsGroupFormProps) {
  const handleInvitation = (
    invitationId: string,
    status: 'ACCEPTED' | 'REJECTED',
  ) => {
    toast.promise(actions.group.handleRequest(invitationId, status), {
      loading: 'Aguarde...',
      success: (data) => data.message,
      error: ({ error }) => error.message,
    })
  }

  return (
    <Card>
      <CardContent className="mt-6">
        {invitations.length > 0 ? (
          <>
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="mb-2 flex items-center justify-between gap-2 rounded-md bg-zinc-100 p-2"
              >
                <span className="text-sm font-medium">
                  {invitation.user.name}
                </span>
                <div className="flex min-w-fit items-center gap-2">
                  <Button
                    onClick={() => handleInvitation(invitation.id, 'ACCEPTED')}
                    className="transition-all duration-200 active:scale-90"
                    variant="outline"
                    size="icon"
                  >
                    <Check />
                  </Button>
                  <Button
                    onClick={() => handleInvitation(invitation.id, 'REJECTED')}
                    className="transition-all duration-200 active:scale-90"
                    variant="outline"
                    size="icon"
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Nenhum convite pendente
          </p>
        )}
      </CardContent>
    </Card>
  )
}
