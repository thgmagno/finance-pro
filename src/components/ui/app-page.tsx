interface AppPageProps {
  children: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
}

export function AppPage({
  children,
  title,
  description,
  actions,
}: AppPageProps) {
  return (
    <div className="flex flex-col pb-14">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
        <h1 className="flex-1">{title}</h1>
        {actions && <div className="ml-auto min-w-fit md:ml-0">{actions}</div>}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div className="mt-4">{children}</div>
    </div>
  )
}
