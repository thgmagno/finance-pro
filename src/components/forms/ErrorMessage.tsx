interface ErrorMessageProps {
  message?: string | string[]
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null

  if (Array.isArray(message)) {
    return <p className="pt-1 text-sm text-red-500">{message.join('. ')}</p>
  }

  return <p className="pt-1 text-sm text-red-500">{message}</p>
}
