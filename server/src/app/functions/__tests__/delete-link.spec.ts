import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { makeRight } from '@/shared/either'
import { makeLink } from '@/test/factories/make-upload'
import { deleteLink } from '../delete-link'

describe('deleteLink', () => {
  beforeEach(async () => {
    await db.execute(sql`
    TRUNCATE TABLE links RESTART IDENTITY CASCADE
  `)
  })

  it('should be able delete link success', async () => {
    const input = await makeLink()

    const result = await deleteLink({
      shortenedUrl: input.shortenedUrl.split('/').reverse()[0],
    })

    expect(makeRight(result).right.right).toEqual({
      message: 'Link deleted successfully',
    })
  })

  it('should not be able to delete a link to an already not found link', async () => {
    const result = await deleteLink({
      shortenedUrl: 'test-1000',
    })

    expect(result.left).toEqual(new Error('Link not found'))
  })
})
