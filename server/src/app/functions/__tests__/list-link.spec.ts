import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { makeRight } from '@/shared/either'
import { makeLink } from '@/test/factories/make-upload'
import { listLinks } from '../list-links'

describe('listLinks', () => {
  beforeEach(async () => {
    await db.execute(sql`
    TRUNCATE TABLE links RESTART IDENTITY CASCADE
  `)
  })

  it('should be able list links success', async () => {
    await makeLink()
    await makeLink()
    await makeLink()

    const result = await listLinks({
      page: 1,
      pageSize: 20,
    })

    expect(makeRight(result).right.right?.links).toBeInstanceOf(Array)
  })
})
