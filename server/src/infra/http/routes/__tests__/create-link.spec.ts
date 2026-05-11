import { randomUUID } from 'node:crypto'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createLink } from '@/app/functions/create-link'
import { createLinkRoute } from '../create-link'

vi.mock('@/app/functions/create-link', () => ({
  createLink: vi.fn(),
}))

describe('createLinkRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(createLinkRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should create a shortened link successfully', async () => {
    vi.mocked(createLink).mockResolvedValue({
      right: {
        id: randomUUID(),
        originalUrl: 'https://google.com',
        shortenedUrl: 'https://brev.ly/google',
        accessCount: 0,
        createdAt: new Date(),
      },
    })

    const response = await server.inject({
      method: 'POST',
      url: '/links',
      payload: {
        originalUrl: 'https://google.com',
        shortenedUrl: 'google',
      },
    })

    expect(response.statusCode).toBe(201)

    expect(JSON.parse(response.body)).toEqual({
      originalUrl: 'https://google.com',
      shortenedUrl: 'https://brev.ly/google',
    })

    expect(createLink).toHaveBeenCalledWith({
      originalUrl: 'https://google.com',
      shortenedUrl: 'google',
    })
  })

  it('should return 400 when createLink returns an error', async () => {
    vi.mocked(createLink).mockResolvedValue({
      left: new Error('Shortened URL already exists'),
    })

    const response = await server.inject({
      method: 'POST',
      url: '/links',
      payload: {
        originalUrl: 'https://google.com',
        shortenedUrl: 'google',
      },
    })

    expect(response.statusCode).toBe(400)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Shortened URL already exists',
    })
  })

  it('should return 400 when originalUrl is invalid', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/links',
      payload: {
        originalUrl: 'invalid-url',
        shortenedUrl: 'google',
      },
    })

    expect(response.statusCode).toBe(400)
  })

  it('should return 400 when shortenedUrl is missing', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/links',
      payload: {
        originalUrl: 'https://google.com',
      },
    })

    expect(response.statusCode).toBe(400)
  })
})
