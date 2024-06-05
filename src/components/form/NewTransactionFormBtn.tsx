'use client'

import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function NewTransactionFormBtn() {
  const [form, setForm] = useState(false)
  const [formCategory, setFormCategory] = useState(false)
  const [recurrent, setRecurrent] = useState(false)

  return (
    <>
      {form ? (
        <>
          <button
            onClick={() => setForm(false)}
            className="ml-auto flex h-9 items-center gap-1 rounded border border-slate-700 bg-neutral-800/30 px-2 font-medium"
          >
            Cancelar
          </button>

          {/* Formulário Principal */}
          <form
            action=""
            className="my-5 rounded-lg border bg-slate-200 p-2 text-slate-800"
          >
            {/* Categoria */}
            <div className="input-wrapper">
              <label htmlFor="" className="md:w-40">
                Categoria
              </label>
              <div className="flex flex-1">
                <select name="category" id="category" className="flex-1">
                  <option value={-1} defaultChecked disabled>
                    Selecionar
                  </option>
                </select>
                <button
                  type="button"
                  className="ml-2 rounded-full border bg-emerald-400 p-1 text-slate-100"
                  aria-label="Incluir categoria"
                  onClick={() => setFormCategory(true)}
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* Descrição */}
            <div className="input-wrapper">
              <label htmlFor="" className="md:w-40">
                Descrição
              </label>
              <input
                type="text"
                placeholder="Descrição"
                className="md:flex-1"
              />
            </div>

            {/* Recorrente */}
            <div className="input-wrapper">
              <label htmlFor="" className="md:w-40">
                Valor
              </label>
              <input type="text" placeholder="R$ 0,00" className="md:flex-1" />
            </div>
            <div className="checkbox-wrapper">
              <label htmlFor="" className="md:w-40">
                Recorrente?
              </label>
              <input
                type="checkbox"
                checked={recurrent}
                onChange={(e) => setRecurrent(e.target.checked)}
                className="h-5 w-5"
              />
            </div>
            {recurrent && (
              <div className="input-wrapper">
                <label htmlFor="" className="md:w-40">
                  Selecione os meses
                </label>
                <div className="md:flex-1"></div>
              </div>
            )}

            {/* Botão Salvar */}
            <div>
              <button type="submit" className="submit">
                Salvar
              </button>
            </div>
          </form>
          {/* Fim do formulário Principal */}

          {/* Formulário Secundário */}
          {formCategory && (
            <div className="absolute left-0 top-0 z-50 min-h-screen w-full flex-1 bg-neutral-900/95">
              <div className="flex items-center justify-center py-12">
                <form
                  action=""
                  className="my-5 w-[92%] max-w-md rounded-lg border bg-slate-200 p-2 text-slate-800"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex justify-center text-lg text-gray-600">
                      Incluir categoria
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormCategory(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="">Descrição</label>
                    <input type="text" name="description" className="w-full" />
                  </div>
                  {/* Botão Salvar */}
                  <div>
                    <button type="submit" className="submit">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Fim do Formulário Secundário */}
        </>
      ) : (
        <button
          onClick={() => setForm(true)}
          className="ml-auto flex h-9 items-center gap-1 rounded border border-slate-700 bg-green-700 px-2 font-medium"
        >
          <Plus size={18} />
          Inserir
        </button>
      )}
    </>
  )
}
