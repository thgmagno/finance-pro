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
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import { buttonVariants } from '../ui/button'

export function EndSession() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton>
          <LogOut />
          Finalizar sessão
        </SidebarMenuButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Finalizar sessão?</AlertDialogTitle>
          <AlertDialogDescription>
            Você será redirecionado para a página de login e terá que se
            autenticar novamente quando voltar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await actions.session.del()}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
