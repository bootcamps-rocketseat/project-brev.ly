import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import zod from 'zod'
import { createLink } from '@/app/functions/create-link'
import { createLinkInput } from '@/types/create-link'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a new shortened link',
        tags: ['Links'],
        body: zod.object({
          originalUrl: zod.url().describe('The original URL to shorten'),
          shortenedUrl: zod.url().describe('The shortened URL'),
        }),
        response: {
          201: zod
            .object({
              originalUrl: zod.url().describe('The original URL'),
              shortenedUrl: zod.url().describe('The shortened URL'),
            })
            .describe('Link created successfully'),
          400: zod.object({
            message: zod.string().describe('Validation error.'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortenedUrl } = createLinkInput.parse(request.body)

      if (!originalUrl || !shortenedUrl) {
        return reply
          .status(400)
          .send({ message: 'Original URL and shortened URL are required.' })
      }

      const result = await createLink({
        originalUrl,
        shortenedUrl,
      })

      if (result.left) {
        return reply.status(400).send({ message: 'Error creating link.' })
      }

      return reply.status(201).send({
        originalUrl: result.right.originalUrl,
        shortenedUrl: result.right.shortenedUrl,
      })
    }
  )
}
