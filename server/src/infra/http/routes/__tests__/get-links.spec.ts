import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getLink } from '@/app/functions/get-link'
import { getLinkRoute } from '../get-link'

vi.mock('@/app/functions/get-link', () => ({
  getLink: vi.fn(),
}))

describe('getLinkRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(getLinkRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should retrieve a shortened link successfully', async () => {
    const createdAt = new Date()

    vi.mocked(getLink).mockResolvedValue({
      right: {
        id: '0196f2b7-4c8a-7d92-bb1e-9f4a8c2d7e11',
        originalUrl: 'https://google.com',
        shortenedUrl: 'https://brev.ly/google',
        accessCount: 10,
        createdAt,
      },
    })

    const response = await server.inject({
      method: 'GET',
      url: '/links/google',
    })

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body)).toEqual({
      id: expect.any(String),
      originalUrl: 'https://google.com',
      shortenedUrl: 'https://brev.ly/google',
      accessCount: 10,
      createdAt: createdAt.toISOString(),
    })

    expect(getLink).toHaveBeenCalledWith({
      shortenedUrl: 'google',
    })
  })

  it('should return 404 when getLink returns an error', async () => {
    vi.mocked(getLink).mockResolvedValue({
      left: new Error('Link not found'),
    })

    const response = await server.inject({
      method: 'GET',
      url: '/links/google',
    })

    expect(response.statusCode).toBe(404)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Link not found',
    })
  })

  it('should return 400 when shortenedUrl is missing', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/links/',
    })

    expect(response.statusCode).toBe(400)
  })
})
