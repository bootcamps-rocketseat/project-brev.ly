import zod from 'zod'

export const getLinkInput = zod.object({
  shortenedUrl: zod.string(),
})

export type GetLinkInput = zod.infer<typeof getLinkInput>
