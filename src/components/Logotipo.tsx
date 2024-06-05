import Image from 'next/image'

export function Logotipo() {
  return (
    <div className="relative m-5 flex items-center gap-2.5">
      <Image
        src="/logotipo/dollar.png"
        height={30}
        width={30}
        alt="Logotipo Finance Pro"
        className="absolute -left-10"
      />
      <span className="text-xl text-slate-300">FinancePro</span>
    </div>
  )
}
