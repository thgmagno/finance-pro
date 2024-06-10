export function ChartWrapper({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="mb-5 rounded-lg bg-slate-200 p-2.5 shadow-md md:mx-auto md:max-h-[290px] md:max-w-[580px] md:p-6 lg:max-h-[360px] lg:max-w-[720px]">
      <h1 className="text-zinc-500">{title}</h1>
      {children}
    </div>
  )
}
