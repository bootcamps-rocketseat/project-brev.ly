import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import {
  type DeleteLinkInput,
  type DeleteLinkOutput,
  deleteLinkInput,
} from '@/types/delete-link'
import { formatUrl } from '@/utils/format-url'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const deleteLink = async (
  input: DeleteLinkInput
): Promise<Either<InvalidFileFormatError, DeleteLinkOutput>> => {
  const { shortenedUrl } = deleteLinkInput.parse(input)

  const formatedShortenedUrl = formatUrl(shortenedUrl)

  const result = await db
    .delete(schema.links)
    .where(eq(schema.links.shortenedUrl, formatedShortenedUrl))
    .returning()

  if (result.length === 0) {
    return makeLeft(new Error('Link not found'))
  }

  return makeRight({ message: 'Link deleted successfully' })
}
