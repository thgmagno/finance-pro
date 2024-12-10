import { getProjectAnalytics } from '@/actions/project'
import { FeedbackList } from '@/components/FeedbackList'
import { FeedbackForm } from '@/components/forms/project/FeedbackForm'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Coins } from 'lucide-react'
import Link from 'next/link'

export default async function ConhecaOProjeto() {
  const { usersCount, expensesCount, incomesCount, groupsCount } =
    await getProjectAnalytics()

  return (
    <div className="mx-auto mb-20 max-w-5xl px-4 py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
          Conheça o projeto
        </h1>
        <Link href="/" className={cn(buttonVariants({ size: 'sm' }))}>
          Ir para o site
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="my-32">
        <h1 className="text-5xl font-bold lg:text-7xl">FinancePro</h1>
        <p className="mb-20 mt-2 text-lg">
          Controle suas finanças de forma simples e eficaz.
        </p>
        <p className="text-xl leading-relaxed md:text-2xl">
          <strong>Finance Pro</strong> é uma ferramenta{' '}
          <strong>open source</strong> e <strong>gratuita</strong> projetada
          para te ajudar a gerenciar suas finanças pessoais com facilidade.
          Organizar suas despesas, receitas, metas e muito mais de forma
          simples, intuitiva e acessível a todos!
        </p>
      </section>

      <section className="mb-12 rounded-lg border bg-zinc-200/60 p-4 shadow">
        <h2 className="mb-2 text-2xl font-bold">Recursos e Estatísticas</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Projeto Open Source:</strong>
            <p>
              Você pode contribuir e adaptar o Finance Pro de acordo com suas
              necessidades.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Gratuito:</strong>
            <p>
              O Finance Pro é totalmente gratuito, sem custos ou taxas
              escondidas.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Total de Usuários:</strong>
            <p>Mais de {usersCount} usuários cadastrados e contando!</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Despesas Cadastradas:</strong>
            <p>Já são mais de {expensesCount} despesas organizadas.</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Receitas Cadastradas:</strong>
            <p>Um total de {incomesCount} receitas registradas.</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Metas Cadastradas:</strong>
            <p>Mais de 'implementar' metas financeiras planejadas.</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <strong>Grupos no Finance Pro:</strong>
            <p>Atualmente {groupsCount} grupos estão ativos na plataforma.</p>
          </div>
        </div>
      </section>

      <section className="mb-12 rounded-lg border bg-zinc-200/60 p-4 shadow">
        <h2 className="mb-4 text-2xl font-bold">Origem do Projeto</h2>
        <p className="md:text-lg">
          Criado por <strong>Thiago Magno</strong>, o Finance Pro nasceu da
          necessidade de um sistema simples e eficiente para gerenciamento
          financeiro pessoal. A ideia foi desenvolver uma ferramenta que
          permitisse controlar entradas e saídas de forma intuitiva, sem
          complicações, oferecendo recursos essenciais para quem busca
          organização financeira.
        </p>
        <h2 className="mb-4 mt-8 text-2xl font-bold">Tempo em Produção</h2>
        <p className="md:text-lg">
          O Finance Pro está em produção desde{' '}
          <strong>7 de junho de 2024</strong>, o Finance Pro vem ganhando
          melhorias contínuas, sempre focado na experiência do usuário. O
          projeto tem se expandido e adaptado às necessidades de seus usuários,
          garantindo cada vez mais funcionalidades e estabilidade.
        </p>
      </section>

      <section className="mb-12 space-y-4 rounded-lg border bg-zinc-200/60 p-4 shadow">
        <h2 className="text-2xl font-bold">Feedback dos usuários</h2>
        <p className="text-sm text-zinc-500">
          Agradecemos a todos que contribuem para o Finance Pro!
        </p>
        <FeedbackList latest />
        <div className="mt-4 flex items-center justify-center">
          <Link
            href="/feedbacks"
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            Ver todos os feedbacks
          </Link>
        </div>
      </section>

      <section className="mb-12 rounded-lg border bg-zinc-200/60 p-3 shadow-md md:p-6">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">
          Deixe seu feedback para apoiar nosso trabalho
        </h2>
        <p className="mb-4 md:text-lg">
          Valorizamos sua opinião! Compartilhe o que achou do Finance Pro e
          ajude-nos a melhorar.
        </p>
        <FeedbackForm />
        <div className="mt-20 text-center">
          <p className="mb-4 text-lg">
            Gostou do projeto? Você pode nos apoiar!
          </p>
          <Link
            href="https://link-do-stripe-checkout.com" // Substitua pelo link do seu checkout
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'success', size: 'lg' }))}
          >
            Apoiar Finance Pro <Coins className="h-8 w-8" />
          </Link>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm">
        <p>Thiago Magno dos Santos</p>
        <p className="mt-2">
          Copyright &copy; {new Date().getFullYear()} Finance Pro. Todos os
          direitos reservados.
        </p>
        <p className="mt-2">
          Este projeto está licenciado sob a Licença MIT. Veja o arquivo{' '}
          <Link href="/license" className="text-blue-500 hover:underline">
            LICENSE
          </Link>{' '}
          para mais detalhes.
        </p>
      </footer>
    </div>
  )
}
