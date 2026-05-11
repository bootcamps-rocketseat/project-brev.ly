import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { makeRight } from '@/shared/either'
import { makeLink } from '@/test/factories/make-upload'
import { getLink } from '../get-link'

describe('getLink', () => {
  beforeEach(async () => {
    await db.execute(sql`
    TRUNCATE TABLE links RESTART IDENTITY CASCADE
  `)
  })

  it('should be able get link success', async () => {
    const input = await makeLink()

    const result = await getLink({
      shortenedUrl: input.shortenedUrl.split('/').reverse()[0],
    })

    expect(makeRight(result).right).toBe(result)
  })

  it('should not be able to get a link to an already not found link', async () => {
    const result = await getLink({
      shortenedUrl: 'test',
    })

    expect(result.left).toEqual(new Error('Link not found'))
  })
})
