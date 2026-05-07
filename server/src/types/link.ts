import z from 'zod'

export const linkSchema = z.object({
  id: z.uuidv7(),
  createdAt: z.date(),
  accessCount: z.number().int().nonnegative(),
  originalUrl: z.url(),
  shortenedUrl: z.url(),
})

export type Link = z.infer<typeof linkSchema>
