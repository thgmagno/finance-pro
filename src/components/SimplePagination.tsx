'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from './ui/button'

interface SimplePaginationProps {
  currentPage: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export function SimplePagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
}: SimplePaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const { replace } = useRouter()

  const previousPage = () => {
    if (currentPage === 1) return null
    params.set('pagina', (currentPage - 1).toString())
    return replace(`${pathname}?${params.toString()}`)
  }

  const nextPage = () => {
    if (currentPage === totalPages) return null
    params.set('pagina', (currentPage + 1).toString())
    return replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-5">
      <Button
        onClick={previousPage}
        variant="outline"
        size="sm"
        disabled={!hasPreviousPage}
      >
        Anterior
      </Button>
      <Button
        onClick={nextPage}
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
      >
        Próximo
      </Button>
    </div>
  )
}
