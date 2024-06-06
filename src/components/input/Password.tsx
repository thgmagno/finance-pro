'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Props {
  isInvalid?: boolean
  errorMessage?: string[]
  confirmationIsInvalid?: boolean
  confirmationErrorMessage?: string[]
  responsive?: boolean
  withConfirmation?: boolean
}

export function InputPassword({
  isInvalid,
  errorMessage,
  confirmationIsInvalid,
  confirmationErrorMessage,
  responsive,
  withConfirmation,
}: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={`flex flex-col space-y-2 ${responsive ? 'md:flex-row md:items-center' : ''}`}
    >
      <label htmlFor="password" className="md:w-40">
        Senha
      </label>
      <div className="relative flex flex-1">
        <input
          type={visible ? 'text' : 'password'}
          id="password"
          name="password"
          className={`flex-1 rounded p-2 shadow ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        <span
          onClick={() => setVisible(!visible)}
          className="absolute right-1.5 translate-y-2 cursor-pointer text-sm opacity-60"
          title={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <EyeOff /> : <Eye />}
        </span>
        {errorMessage && (
          <span className="absolute bottom-1 right-1.5 text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
      {withConfirmation && (
        <>
          <label htmlFor="confirmPassword" className="md:w-40">
            Confirme a senha
          </label>
          <div className="relative flex flex-1">
            <input
              type={visible ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`flex-1 rounded p-2 shadow ${confirmationIsInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
            />
            {confirmationErrorMessage && (
              <span className="absolute bottom-1 right-1.5 text-sm text-red-500">
                {confirmationErrorMessage}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
