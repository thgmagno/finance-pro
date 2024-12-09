import HelpForm from '@/components/forms/project/HelpForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AppPage } from '@/components/ui/app-page'

export default function Ajuda() {
  return (
    <AppPage title="Ajuda">
      <Accordion type="multiple">
        <AccordionItem value="como-funciona">
          <AccordionTrigger>
            <span>Como funciona o sistema?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              O Finance Pro é uma ferramenta prática para organizar suas
              finanças pessoais. Primeiro, crie sua conta — se você está aqui,
              essa etapa já foi concluída. Em seguida, basta criar um grupo para
              começar a gerenciar suas receitas, despesas e muito mais!
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="open-source-e-gratuito">
          <AccordionTrigger>
            <span>O Finance Pro é realmente gratuito?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Sim! O Finance Pro é uma ferramenta 100% gratuita e open source.
              Isso significa que você pode usá-lo sem custos, colaborar com o
              projeto ou até personalizá-lo de acordo com suas necessidades. Não
              há taxas escondidas!
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="porque-criar-um-grupo">
          <AccordionTrigger>
            <span>Por que criar um grupo?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Criar um grupo permite que você organize e centralize todas as
              suas finanças em um só lugar. Nele, você pode adicionar
              categorias, registrar transações e acompanhar seu saldo em tempo
              real. Também é perfeito para compartilhar o controle financeiro
              com parceiros, familiares ou amigos. Mas se preferir, pode usar de
              forma privada, para gerenciar suas finanças de maneira exclusiva.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="compartilhamento-financeiro">
          <AccordionTrigger>
            <span>Como funciona o compartilhamento de grupos?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              O compartilhamento de grupos permite que você gerencie suas
              finanças junto com outras pessoas. É ideal para casais, famílias
              ou sócios que precisam de uma visão conjunta das finanças. Basta
              adicionar os membros ao grupo para que todos possam colaborar e
              acompanhar as movimentações.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="armazenamento-de-informacoes">
          <AccordionTrigger>
            <span>Onde minhas informações ficam armazenadas?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Suas informações são armazenadas em um banco de dados seguro na
              nuvem, utilizando serviços confiáveis que garantem alta
              disponibilidade e desempenho. Todos os dados são tratados com
              cuidado e nunca compartilhados com terceiros.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="seguranca-dos-dados">
          <AccordionTrigger>
            <span>Como o Finance Pro protege meus dados?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              A segurança dos seus dados é uma prioridade no Finance Pro. As
              senhas são protegidas por criptografia, e seguimos boas práticas
              para garantir que as informações estejam armazenadas de forma
              segura. Apesar de não utilizarmos servidores próprios, contamos
              com uma infraestrutura de confiança para hospedar a aplicação e o
              banco de dados.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vantagens-do-sistema">
          <AccordionTrigger>
            <span>Quais as vantagens do Finance Pro?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Com o Finance Pro, você tem controle total sobre suas finanças de
              forma simples e eficiente. O sistema é intuitivo, acessível de
              qualquer lugar e oferece ferramentas como relatórios detalhados,
              gestão de categorias personalizadas e compartilhamento de grupos.
              Tudo pensado para facilitar sua vida financeira.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="seguranca-e-responsabilidade">
          <AccordionTrigger>
            <span>Existe alguma responsabilidade ao usar o sistema?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              O Finance Pro é fornecido "no estado em que se encontra" e deve
              ser usado com bom senso. Ele foi criado para fins educacionais e
              pessoais, sem garantias. Use-o como uma ferramenta prática para
              organizar suas finanças, mas lembre-se de que o autor não se
              responsabiliza por eventuais problemas decorrentes do uso da
              aplicação.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contato">
          <AccordionTrigger>
            <span>Não encontrou o que procurava?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Precisa de ajuda ou quer compartilhar sua opinião? O Finance Pro é
              uma ferramenta open source e gratuita, criado para facilitar sua
              vida financeira. Caso tenha dúvidas, sugestões, críticas ou
              elogios, preencha o formulário abaixo. Estaremos respondendo o
              mais breve possível!
            </p>
            <HelpForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </AppPage>
  )
}
