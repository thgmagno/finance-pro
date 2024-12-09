import { z } from 'zod'

const parsed = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  SESSION_COOKIE_NAME: z.string(),
  VISITOR_ID: z.string(),
  VISITOR_GROUP_ID: z.string(),
})

export const env = parsed.parse(process.env)
