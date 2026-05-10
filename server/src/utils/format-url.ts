import { env } from '@/env'

export const formatUrl = (shortenedUrl: string) => {
  const frontendUrl = env.FRONTEND_URL

  return `${frontendUrl}/${shortenedUrl}`
}
