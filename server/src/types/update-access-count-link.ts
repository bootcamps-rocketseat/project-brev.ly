import zod from 'zod'

export const updateAccessCountLinkInput = zod.object({
  id: zod.uuidv7(),
})

export type UpdateAccessCountLinkInput = zod.infer<
  typeof updateAccessCountLinkInput
>

export type UpdateAccessCountLinkOutput = {
  message: string
}
