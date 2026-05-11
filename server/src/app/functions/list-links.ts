import { asc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import {
  type ListLinksInput,
  type ListLinksOutput,
  listLinksInput,
} from '@/types/list-links'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const listLinks = async (
  input: ListLinksInput
): Promise<Either<InvalidFileFormatError, ListLinksOutput>> => {
  const { page, pageSize } = listLinksInput.parse(input)

  const result = await db
    .select({
      id: schema.links.id,
      createdAt: schema.links.createdAt,
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
      shortenedUrl: schema.links.shortenedUrl,
    })
    .from(schema.links)
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .orderBy(fields => {
      return asc(fields.createdAt)
    })

  if (!result) {
    return makeLeft(new Error('Error listing links'))
  }

  return makeRight({ links: result })
}
