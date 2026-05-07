import { uuidv7 } from 'uuidv7'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import type { CreateLinkInput } from '@/types/create-link'
import type { Link } from '@/types/link'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const createLink = async (
  data: CreateLinkInput
): Promise<Either<InvalidFileFormatError, Link>> => {
  try {
    const linkData = {
      id: uuidv7(),
      accessCount: '0',
      originalUrl: data.originalUrl,
      shortenedUrl: data.shortenedUrl,
      createdAt: new Date(),
    } as Link

    const [link] = await db.insert(schema.links).values(linkData).returning()

    return makeRight(link)
  } catch (error) {
    return makeLeft(error as InvalidFileFormatError)
  }
}
