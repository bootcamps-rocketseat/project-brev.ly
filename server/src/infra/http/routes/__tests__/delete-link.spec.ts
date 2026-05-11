import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { deleteLink } from '@/app/functions/delete-link'
import { deleteLinkRoute } from '../delete-link'

vi.mock('@/app/functions/delete-link', () => ({
  deleteLink: vi.fn(),
}))

describe('deleteLinkRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(deleteLinkRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should delete a shortened link successfully', async () => {
    vi.mocked(deleteLink).mockResolvedValue({
      right: {
        message: 'Link deleted successfully',
      },
    })

    const response = await server.inject({
      method: 'DELETE',
      url: '/links/google',
    })

    expect(response.statusCode).toBe(204)

    expect(deleteLink).toHaveBeenCalledWith({
      shortenedUrl: 'google',
    })
  })

  it('should return 400 when deleteLink returns an error', async () => {
    vi.mocked(deleteLink).mockResolvedValue({
      left: new Error('Link not found'),
    })

    const response = await server.inject({
      method: 'DELETE',
      url: '/links/google',
    })

    expect(response.statusCode).toBe(400)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Link not found',
    })
  })

  it('should return 400 when shortenedUrl is missing', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/links/',
    })

    expect(response.statusCode).toBe(400)
  })
})
