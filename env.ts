import { z } from 'zod'

const parsed = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  API_URL: z.string().url(),
  VISITOR_ID: z.string(),
  VISITOR_GROUP_ID: z.string(),
  ACCESS_TOKEN: z.string(),
  REFRESH_TOKEN: z.string(),
  ACCESS_TOKEN_MAX_AGE: z.string().transform(Number),
  REFRESH_TOKEN_MAX_AGE: z.string().transform(Number),
})

export const env = parsed.parse(process.env)
