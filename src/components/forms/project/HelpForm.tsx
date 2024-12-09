'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function HelpForm() {
  return (
    <form action="" className="mt-4 space-y-4 lg:w-1/2">
      <div>
        <Label>Seu nome</Label>
        <Input type="text" id="nome" name="nome" />
      </div>
      <div>
        <Label>Seu e-mail</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div>
        <Label>Sua mensagem</Label>
        <Textarea id="mensagem" name="mensagem" rows={4} />
      </div>
      <Button className="w-full">Enviar</Button>
    </form>
  )
}
