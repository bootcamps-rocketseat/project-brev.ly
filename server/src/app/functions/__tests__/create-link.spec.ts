import { describe, expect, it } from 'vitest'
import { makeRight } from '@/shared/either'
import type { CreateLinkInput } from '@/types/create-link'
import { createLink } from '../create-link'

const input: CreateLinkInput = {
  originalUrl: 'https://www.google.com.br',
  shortenedUrl: 'teste-1',
}

describe('createLink', () => {
  it('should be able create link success', async () => {
    const result = await createLink(input)

    expect(makeRight(result).right).toBe(result)
  })

  it('should not be able to create a link to an already existing link', async () => {
    const result = await createLink(input)

    expect(result.left).toEqual(new Error('Shortened URL already exists'))
  })
})
