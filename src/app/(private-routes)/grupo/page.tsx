import { actions } from '@/actions'
import { ConfigGroupForm } from '@/components/forms/group/ConfigGroupForm'
import { ParticipantsGroupForm } from '@/components/forms/group/ParticipantsGroupForm'
import { RequestsGroupForm } from '@/components/forms/group/RequestsGroupForm'
import { SearchGroupForm } from '@/components/forms/group/SearchGroupForm'
import { AppPage } from '@/components/ui/app-page'
import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InvitationWithUser, SessionPayload } from '@/lib/types'
import { Group, User } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { env } from 'root/env'

interface GroupsPageProps {
  group: Group
  session: SessionPayload
  members: User[]
  invitations: InvitationWithUser[]
}

export default async function GroupsPage() {
  const [session, group, members, invitations] = await Promise.all([
    actions.session.get(),
    actions.group.getGroupBySession(),
    actions.group.getMembers().then((res) => res.members),
    actions.group.getInvitations().then((res) => res.invitations),
  ])
  const alreadyHasGroup = session?.groupId

  if (
    members.length > 0 &&
    !members.find((member) => member.id === session?.id)
  ) {
    redirect(`${env.NEXT_PUBLIC_API_URL}/refresh-token`)
  }

  return (
    <AppPage
      title="Grupos"
      description={
        alreadyHasGroup
          ? 'Acesse e gerencie os detalhes do seu grupo'
          : 'Descubra grupos ou crie um grupo personalizado para você'
      }
      actions={
        alreadyHasGroup ? null : (
          <Link href="/grupo/criar" className={buttonVariants()}>
            Criar grupo
          </Link>
        )
      }
    >
      {alreadyHasGroup ? (
        <MyGroup
          group={group!}
          session={session}
          members={members}
          invitations={invitations}
        />
      ) : (
        <SearchGroup />
      )}
    </AppPage>
  )
}

function SearchGroup() {
  return <SearchGroupForm />
}

function MyGroup({ group, session, members, invitations }: GroupsPageProps) {
  return (
    <Tabs defaultValue="participants">
      <TabsList>
        <TabsTrigger value="participants">Participantes</TabsTrigger>
        <TabsTrigger value="requests">
          Solicitações{' '}
          {invitations.length > 0 && (
            <span className="ml-1 font-semibold text-red-500">
              {invitations.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="configuration">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="participants">
        <ParticipantsGroupForm
          members={members}
          group={group}
          session={session}
        />
      </TabsContent>
      <TabsContent value="requests">
        <RequestsGroupForm invitations={invitations} />
      </TabsContent>
      <TabsContent value="configuration">
        <ConfigGroupForm group={group} session={session} />
      </TabsContent>
    </Tabs>
  )
}
