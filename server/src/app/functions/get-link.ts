import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { type GetLinkInput, getLinkInput } from '@/types/get-link'
import type { Link } from '@/types/link'
import { formatUrl } from '@/utils/format-url'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const getLink = async (
  input: GetLinkInput
): Promise<Either<InvalidFileFormatError, Link>> => {
  const { shortenedUrl } = getLinkInput.parse(input)

  const formatedShortenedUrl = formatUrl(shortenedUrl)

  const result = await db.query.links.findFirst({
    where: eq(schema.links.shortenedUrl, formatedShortenedUrl),
  })

  if (!result) {
    return makeLeft(new Error('Link not found'))
  }

  return makeRight(result)
}
