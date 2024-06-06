import { ButtonFormSubmit } from '../button/FormSubmit'

export function LoginForm() {
  return (
    <form
      action=""
      className="flex w-full max-w-sm flex-col space-y-2.5 rounded-lg bg-slate-200 p-5 shadow"
    >
      <input type="text" placeholder="email@exemplo.com" />
      <input type="password" placeholder="Digite sua senha" />
      <ButtonFormSubmit title="Acessar" />
    </form>
  )
}
