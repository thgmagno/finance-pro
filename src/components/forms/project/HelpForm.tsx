'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function HelpForm() {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    message: '',
  })

  const isFormValid =
    formFields.name &&
    formFields.email &&
    formFields.message.length > 0 &&
    formFields.message.length <= 500

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormFields((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form action="" className="mt-4 space-y-4 lg:w-1/2">
      <div>
        <Label>Seu nome</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formFields.name}
          onChange={handleChange}
          placeholder="Digite seu nome"
        />
      </div>
      <div>
        <Label>Seu e-mail</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formFields.email}
          onChange={handleChange}
          placeholder="Digite seu e-mail"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Sua mensagem</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formFields.message}
          onChange={handleChange}
          placeholder="Digite sua mensagem"
        />
        <small
          className={cn(
            'ml-auto flex items-center text-xs text-muted-foreground md:text-sm',
            {
              'font-semibold text-red-500': formFields.message.length > 500,
            },
          )}
        >
          {formFields.message.length}/500
        </small>
      </div>
      <Button className="w-full" disabled={!isFormValid}>
        Enviar
      </Button>
    </form>
  )
}
