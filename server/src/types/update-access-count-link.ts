import zod from 'zod'

export const updateAccessCountLinkInput = zod.object({
  shortenedUrl: zod.string(),
})

export type UpdateAccessCountLinkInput = zod.infer<
  typeof updateAccessCountLinkInput
>

export type UpdateAccessCountLinkOutput = {
  message: string
}
