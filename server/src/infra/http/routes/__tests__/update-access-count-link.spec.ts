import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { updateAccessCountLink } from '@/app/functions/update-access-count-link'
import { updateAccessCountLinkRoute } from '../update-access-count-link'

vi.mock('@/app/functions/update-access-count-link', () => ({
  updateAccessCountLink: vi.fn(),
}))

describe('updateAccessCountLinkRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(updateAccessCountLinkRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should update access count successfully', async () => {
    vi.mocked(updateAccessCountLink).mockResolvedValue({
      right: {
        message: 'Access count updated successfully',
      },
    })

    const response = await server.inject({
      method: 'PATCH',
      url: '/links/google/access-count',
    })

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Access count updated successfully',
    })

    expect(updateAccessCountLink).toHaveBeenCalledWith({
      shortenedUrl: 'google',
    })
  })

  it('should return 404 when updateAccessCountLink returns an error', async () => {
    vi.mocked(updateAccessCountLink).mockResolvedValue({
      left: new Error('Link not found'),
    })

    const response = await server.inject({
      method: 'PATCH',
      url: '/links/google/access-count',
    })

    expect(response.statusCode).toBe(404)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Link not found',
    })
  })

  it('should return 400 when shortenedUrl is missing', async () => {
    const response = await server.inject({
      method: 'PATCH',
      url: '/links//access-count',
    })

    expect(response.statusCode).toBe(400)
  })
})
