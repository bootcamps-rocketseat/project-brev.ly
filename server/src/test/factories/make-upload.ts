import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { formatUrl } from '@/utils/format-url'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof links>>
) {
  const formatedShortenedUrl = formatUrl(faker.internet.domainName())

  const result = await db
    .insert(links)
    .values({
      originalUrl: faker.internet.url(),
      shortenedUrl: formatedShortenedUrl,
      accessCount: 0,
      ...overrides,
    })
    .returning()

  return result[0]
}
