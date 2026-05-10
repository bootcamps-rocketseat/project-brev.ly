import zod from 'zod'

export const deleteLinkInput = zod.object({
  shortenedUrl: zod.string(),
})

export type DeleteLinkInput = zod.infer<typeof deleteLinkInput>

export type DeleteLinkOutput = {
  message: string
}
