import zod from 'zod'

const envConfig = zod.object({
  PORT: zod.coerce.number(),
  DATABASE_URL: zod.string().default(''),
  CLOUDFLARE_ACCOUNT_ID: zod.string().default(''),
  CLOUDFLARE_ACCESS_KEY_ID: zod.string().default(''),
  CLOUDFLARE_SECRET_ACCESS_KEY: zod.string().default(''),
  CLOUDFLARE_BUCKET: zod.string().default(''),
  CLOUDFLARE_PUBLIC_URL: zod.string().default(''),
  FRONTEND_URL: zod.string().default(''),
  NODE_ENV: zod
    .enum(['development', 'test', 'production'])
    .default('production'),
})

export const env = envConfig.parse(process.env)
