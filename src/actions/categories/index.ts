'use server'

import prisma from '@/lib/prisma'
import { actions } from '..'

export async function getCategories(type: 'INCOME' | 'EXPENSE') {
  try {
    const session = await actions.session.get()
    if (!session || !session.groupId) {
      return { error: true, message: 'Usuário não autenticado' }
    }

    const categories = await prisma.category.findMany({
      where: { groupId: session.groupId, type },
      orderBy: { description: 'asc' },
    })

    return { error: false, categories }
  } catch (error) {
    return { error: true, message: 'Erro ao buscar categorias' }
  }
}
