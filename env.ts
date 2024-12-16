import { z } from 'zod'

const parsed = z.object({
  POSTGRES_URL: z.string().url(),
  POSTGRES_PRISMA_URL: z.string().url(),
  POSTGRES_URL_NO_SSL: z.string().url(),
  POSTGRES_URL_NON_POOLING: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
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
