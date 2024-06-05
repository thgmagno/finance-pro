export function LoginForm() {
  return (
    <form
      action=""
      className="flex w-full max-w-sm flex-col space-y-2.5 rounded-lg bg-slate-200 p-5 shadow"
    >
      <input type="text" placeholder="email@exemplo.com" />
      <input type="password" placeholder="Digite sua senha" />
      <button className="rounded border bg-slate-400 p-2 text-slate-100 shadow hover:opacity-90">
        Acessar
      </button>
    </form>
  )
}
