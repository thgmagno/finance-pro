'use client'

interface Props {
  recurrent: boolean
  setRecurrent: (value: boolean) => void
  isInvalid?: boolean
  errorMessage?: string[]
}

export function SelectRecurrency({
  recurrent,
  setRecurrent,
  isInvalid,
  errorMessage,
}: Props) {
  const maxRecurrency = 36
  const options: { value: number; label: string }[] = []

  for (let i = 2; i <= maxRecurrency; i++) {
    options.push({ value: i, label: String(i).concat('x') })
  }

  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row md:items-center">
        <label htmlFor="" className="md:w-40">
          Recorrente?
        </label>
        <input
          type="checkbox"
          checked={recurrent}
          onChange={(e) => setRecurrent(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
      {recurrent && (
        <div className="flex flex-col space-y-2 md:flex-row md:items-center">
          <label htmlFor="recurrency" className="md:w-40">
            Parcelas
          </label>
          <div className="relative flex flex-1">
            <select
              name="recurrency"
              id="recurrency"
              className={`flex-1 rounded p-2 shadow ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
            >
              <option value="empty" selected disabled>
                Selecionar
              </option>
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errorMessage && (
              <span className="absolute bottom-1 right-1.5 text-sm text-red-500">
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}
