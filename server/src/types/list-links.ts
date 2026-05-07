import zod from 'zod'
import type { Link } from './link'

export const listLinksInput = zod.object({
  page: zod.coerce.number().int().positive().optional().default(1),
  pageSize: zod.coerce.number().int().positive().optional().default(20),
})

export type ListLinksInput = zod.infer<typeof listLinksInput>

export type ListLinksOutput = {
  links: Link[]
}
