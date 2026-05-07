import zod from 'zod'

export const getLinkInput = zod.object({
  id: zod.uuidv7(),
})

export type GetLinkInput = zod.infer<typeof getLinkInput>
