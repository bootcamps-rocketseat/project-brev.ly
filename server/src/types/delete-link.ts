import zod from 'zod'

const deleteLink = zod.object({
  id: zod.uuidv7(),
})

export type DeleteLinkInput = zod.infer<typeof deleteLink>
