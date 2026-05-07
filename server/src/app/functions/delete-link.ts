import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import type { DeleteLinkInput } from '@/types/delete-link'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const deleteLink = async (
  input: DeleteLinkInput
): Promise<Either<InvalidFileFormatError, { message: string }>> => {
  const { id } = input

  const result = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning()

  if (result.length === 0) {
    return makeLeft(new Error('Link not found'))
  }

  return makeRight({ message: 'Link deleted successfully' })
}
