import { uuidv7 } from 'uuidv7'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { type CreateLinkInput, createLinkInput } from '@/types/create-link'
import type { Link } from '@/types/link'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const createLink = async (
  input: CreateLinkInput
): Promise<Either<InvalidFileFormatError, Link>> => {
  try {
    const { originalUrl, shortenedUrl } = createLinkInput.parse(input)

    const linkData = {
      id: uuidv7(),
      accessCount: 0,
      originalUrl,
      shortenedUrl,
      createdAt: new Date(),
    } as Link

    const [link] = await db.insert(schema.links).values(linkData).returning()

    return makeRight(link)
  } catch (error: unknown) {
    const cause = error instanceof Error ? error.cause : null

    if (
      typeof cause === 'object' &&
      cause !== null &&
      'code' in cause &&
      cause.code === '23505'
    ) {
      return makeLeft(new Error('Shortened URL already exists'))
    }

    throw error
  }
}
