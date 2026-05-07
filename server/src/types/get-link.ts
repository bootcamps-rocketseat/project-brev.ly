import zod from 'zod'

const getLink = zod.object({
  id: zod.uuidv7(),
})

export type GetLinkInput = zod.infer<typeof getLink>
