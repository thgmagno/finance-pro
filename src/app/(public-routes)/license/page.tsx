import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'

export default function License() {
  return (
    <div className="mx-auto mb-20 max-w-5xl space-y-12 px-4 py-10">
      <div className="flex justify-end">
        <Link
          href="/conheca-o-projeto"
          className={cn(buttonVariants({ size: 'sm' }))}
        >
          <Undo2 className="h-4 w-4" />
          Voltar
        </Link>
      </div>

      <section className="space-y-4 rounded-lg bg-zinc-100 p-4 text-sm md:text-base">
        <h1 className="text-2xl font-bold">License</h1>
        <p>Copyright © {new Date().getFullYear()} Thiago Magno</p>
        <p>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>
        <p>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </section>

      <hr />

      <section className="space-y-4 rounded-lg bg-zinc-100 p-4 text-sm md:text-base">
        <h2 className="text-xl font-bold">
          Tradução para o Português (informativa)
        </h2>
        <p>Copyright © {new Date().getFullYear()} Thiago Magno</p>
        <p>
          A permissão é concedida, gratuitamente, a qualquer pessoa que obtenha
          uma cópia deste software e dos arquivos de documentação associados (o
          "Software"), para lidar com o Software sem restrições, incluindo, sem
          limitação, os direitos de usar, copiar, modificar, mesclar, publicar,
          distribuir, sublicenciar e/ou vender cópias do Software, e permitir
          que pessoas a quem o Software é fornecido façam o mesmo, sujeitas às
          seguintes condições:
        </p>
        <p>
          O aviso de copyright acima e este aviso de permissão devem ser
          incluídos em todas as cópias ou partes substanciais do Software.
        </p>
        <p>
          O SOFTWARE É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA", SEM GARANTIA DE
          QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO,
          ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO
          VIOLAÇÃO. EM NENHUMA CIRCUNSTÂNCIA OS AUTORES OU DETENTORES DOS
          DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANO OU
          OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO CONTRATUAL, DE
          RESPONSABILIDADE CIVIL OU DE OUTRA FORMA, DECORRENTE DE, FORA DE OU EM
          CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.
        </p>
      </section>
    </div>
  )
}
