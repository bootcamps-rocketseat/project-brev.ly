import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { listLinks } from '@/app/functions/list-links'
import { listLinksRoute } from '../list-links'

vi.mock('@/app/functions/list-links', () => ({
  listLinks: vi.fn(),
}))

describe('listLinksRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(listLinksRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should list links successfully', async () => {
    const createdAt = new Date()

    vi.mocked(listLinks).mockResolvedValue({
      right: {
        links: [
          {
            id: '0196f2b7-4c8a-7d92-bb1e-9f4a8c2d7e11',
            originalUrl: 'https://google.com',
            shortenedUrl: 'https://brev.ly/google',
            accessCount: 10,
            createdAt,
          },
          {
            id: '0196f2b7-4c8a-7d92-bb1e-9f4a8c2d7e12',
            originalUrl: 'https://github.com',
            shortenedUrl: 'https://brev.ly/github',
            accessCount: 5,
            createdAt,
          },
        ],
      },
    })

    const response = await server.inject({
      method: 'GET',
      url: '/links?page=1&pageSize=10',
    })

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body)).toEqual({
      links: [
        {
          id: '0196f2b7-4c8a-7d92-bb1e-9f4a8c2d7e11',
          originalUrl: 'https://google.com',
          shortenedUrl: 'https://brev.ly/google',
          accessCount: 10,
          createdAt: createdAt.toISOString(),
        },
        {
          id: '0196f2b7-4c8a-7d92-bb1e-9f4a8c2d7e12',
          originalUrl: 'https://github.com',
          shortenedUrl: 'https://brev.ly/github',
          accessCount: 5,
          createdAt: createdAt.toISOString(),
        },
      ],
    })

    expect(listLinks).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
    })
  })

  it('should return 400 when listLinks returns an error', async () => {
    vi.mocked(listLinks).mockResolvedValue({
      left: new Error('Failed to list links'),
    })

    const response = await server.inject({
      method: 'GET',
      url: '/links?page=1&pageSize=10',
    })

    expect(response.statusCode).toBe(400)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Failed to list links',
    })
  })

  it('should return 400 when query params are invalid', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/links?page=invalid&pageSize=invalid',
    })

    expect(response.statusCode).toBe(400)
  })
})
