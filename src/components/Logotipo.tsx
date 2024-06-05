import Image from 'next/image'

export function Logotipo({ small }: { small?: boolean }) {
  return (
    <>
      {}
      {small ? (
        <div className="relative ml-auto flex items-center gap-2.5">
          <Image
            src="/logotipo/dollar.png"
            height={20}
            width={20}
            alt="Logotipo Finance Pro"
            className="absolute -left-6"
          />
          <span className="text-sm text-slate-300">FinancePro</span>
        </div>
      ) : (
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
      )}
    </>
  )
}
