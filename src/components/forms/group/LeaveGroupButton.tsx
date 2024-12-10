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
import { LogOut } from 'lucide-react'

export function LeaveGroupButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-red-600"
        >
          Sair do grupo
          <LogOut className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja sair do grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tenha em mente que as transações e os dados financeiros ficam
            vinculados ao grupo. Portanto você não poderá mais acessar essas
            informações.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={actions.group.leave}>
            <AlertDialogAction
              type="submit"
              className={buttonVariants({ variant: 'destructive' })}
            >
              Sair do grupo
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
