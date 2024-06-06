interface Props {
  name: string
  label: string
  wFull?: boolean
  isInvalid?: boolean
  errorMessage?: string[]
}

export function InputText({
  name,
  label,
  wFull,
  isInvalid,
  errorMessage,
}: Props) {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center">
      <label htmlFor={name} className="md:w-40">
        {label}
      </label>
      <div className="relative flex flex-1">
        <input
          type="text"
          id={name}
          name={name}
          className={`flex-1 rounded p-2 shadow ${wFull ? 'w-full' : ''} ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
        />
        {errorMessage && (
          <span className="absolute bottom-1 right-1.5 text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  )
}
