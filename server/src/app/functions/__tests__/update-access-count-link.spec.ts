import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { makeRight } from '@/shared/either'
import { makeLink } from '@/test/factories/make-upload'
import { updateAccessCountLink } from '../update-access-count-link'

describe('updateAccessCountLink', () => {
  beforeEach(async () => {
    await db.execute(sql`
    TRUNCATE TABLE links RESTART IDENTITY CASCADE
  `)
  })

  it('should be able update access count link success', async () => {
    const input = await makeLink()

    const result = await updateAccessCountLink({
      shortenedUrl: input.shortenedUrl.split('/').reverse()[0],
    })

    expect(makeRight(result).right.right).toEqual({
      message: 'Access count updated successfully',
    })
  })
})
