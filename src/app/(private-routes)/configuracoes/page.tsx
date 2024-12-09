import { actions } from '@/actions'
import { ConfigAccount } from '@/components/forms/group/ConfigAccount'
import { AppPage } from '@/components/ui/app-page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default async function Configuracoes() {
  const [session] = await Promise.all([actions.session.get()])

  return (
    <AppPage title="Configurações">
      <section className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Configurações do sistema</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="device">Dispositivo</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" />
              <label
                htmlFor="notifications"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Receber notificações
              </label>
            </div>
          </CardContent>
        </Card>
        {session && <ConfigAccount session={session} />}
      </section>
    </AppPage>
  )
}
