import zod from 'zod'

export const deleteLinkInput = zod.object({
  id: zod.uuidv7(),
})

export type DeleteLinkInput = zod.infer<typeof deleteLinkInput>

export type DeleteLinkOutput = {
  message: string
}
