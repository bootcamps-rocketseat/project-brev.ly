import zod from 'zod'

const createLinkInput = zod.object({
  originalUrl: zod.url(),
  shortenedUrl: zod.url(),
})

export type CreateLinkInput = zod.infer<typeof createLinkInput>
