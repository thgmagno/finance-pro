'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function sendFeedback(formData: FormData) {
  try {
    const author = formData.get('feedbackName')
      ? String(formData.get('feedbackName'))
      : 'Anônimo'
    const message = String(formData.get('feedbackMessage'))

    if (message.length > 500) {
      return { success: false }
    }

    await prisma.feedback.create({
      data: { author, message },
    })

    revalidatePath('/conheca-o-projeto')
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function getFeedbacks({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
}) {
  const [feedbacks, totalFeedbacks] = await Promise.all([
    prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.feedback.count(),
  ])

  const totalPages = Math.ceil(totalFeedbacks / limit)

  return {
    feedbacks,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

export async function getProjectAnalytics() {
  const usersCount = await prisma.user.count()

  const expensesCount = await prisma.transaction.count({
    where: { type: 'EXPENSE' },
  })

  const incomesCount = await prisma.transaction.count({
    where: { type: 'INCOME' },
  })

  const groupsCount = await prisma.group.count()

  const goalsCount = await prisma.goal.count()

  return { usersCount, expensesCount, incomesCount, groupsCount, goalsCount }
}
