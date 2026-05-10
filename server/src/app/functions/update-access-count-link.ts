import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import {
  type UpdateAccessCountLinkInput,
  type UpdateAccessCountLinkOutput,
  updateAccessCountLinkInput,
} from '@/types/update-access-count-link'
import type { InvalidFileFormatError } from './errors/invalid-file-format'
import { getLink } from './get-link'

export const updateAccessCountLink = async (
  input: UpdateAccessCountLinkInput
): Promise<Either<InvalidFileFormatError, UpdateAccessCountLinkOutput>> => {
  const { shortenedUrl } = updateAccessCountLinkInput.parse(input)

  const linkForUpdate = await getLink({ shortenedUrl })

  if (linkForUpdate.left) {
    return makeLeft(new Error('Link not found'))
  }

  const result = await db
    .update(schema.links)
    .set({
      accessCount: linkForUpdate.right.accessCount + 1,
    })
    .where(eq(schema.links.shortenedUrl, linkForUpdate.right.shortenedUrl))
    .returning()

  if (result.length === 0) {
    return makeLeft(new Error('Failed to update access count'))
  }

  return makeRight({ message: 'Access count updated successfully' })
}
