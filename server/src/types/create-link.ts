import zod from 'zod'

export const createLinkInput = zod.object({
  originalUrl: zod.url(),
  shortenedUrl: zod.string(),
})

export type CreateLinkInput = zod.infer<typeof createLinkInput>
