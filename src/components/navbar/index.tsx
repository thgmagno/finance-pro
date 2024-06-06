'use client'

import { SquareMinus, SquarePlus, LogOut, Home, Menu } from 'lucide-react'
import Link from 'next/link'
import { ElementType, useEffect, useRef, useState } from 'react'
import { Logotipo } from '@/components/Logotipo'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const Item = ({
    title,
    href,
    Icon,
    classNames,
  }: {
    title: string
    href: string
    Icon: ElementType
    classNames?: string
  }) => {
    const isActive =
      (pathname === '/' && href === '/') ||
      (href !== '/' && pathname.includes(href))

    return (
      <li onClick={() => setOpen(false)}>
        <Link
          href={href}
          className={`mb-1 flex items-center rounded p-1.5 ${isActive ? 'border border-slate-500 bg-slate-700 text-slate-300' : 'text-slate-300 hover:bg-slate-700'}`}
        >
          <Icon className={`mr-1.5 h-5 w-5 ${classNames}`} />
          {title}
        </Link>
      </li>
    )
  }

  return (
    <>
      <nav className="flex border-b-2 border-slate-700 bg-slate-800 p-2.5">
        <Menu
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-slate-100"
        />
        <Logotipo small />
      </nav>
      {open && (
        <ul
          ref={menuRef}
          className="absolute z-50 m-1 w-[200px] rounded border border-slate-700 bg-slate-600 p-1.5"
        >
          <Item title="Início" href="/" Icon={Home} />
          <Item
            title="Despesa"
            href="/despesa"
            Icon={SquareMinus}
            classNames="text-amber-500"
          />
          <Item
            title="Receita"
            href="/receita"
            Icon={SquarePlus}
            classNames="text-green-500"
          />
          <li className="flex">
            <button className="flex flex-1 items-center rounded border border-slate-400 bg-slate-700 p-1.5 text-red-500">
              <LogOut className="mr-1.5 h-5 w-5" /> Finalizar sessão
            </button>
          </li>
        </ul>
      )}
    </>
  )
}
