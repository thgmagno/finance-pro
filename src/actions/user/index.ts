'use server'

import prisma from '@/lib/prisma'

export async function getUserInfo(userId: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    include: {
      group: {
        select: {
          id: true,
        },
      },
    },
  })

  return user
}
