import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import zod from 'zod'
import { getLink } from '@/app/functions/get-link'
import { getLinkInput } from '@/types/get-link'

export const getLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:id',
    {
      schema: {
        summary: 'Get a shortened link by ID',
        tags: ['Links'],
        params: zod.object({
          id: zod.uuidv7().describe('The ID of the link to retrieve'),
        }),
        response: {
          200: zod
            .object({
              id: zod.uuidv7().describe('The ID of the link'),
              originalUrl: zod.url().describe('The original URL'),
              shortenedUrl: zod.url().describe('The shortened URL'),
              accessCount: zod
                .number()
                .int()
                .nonnegative()
                .describe('The number of times the link has been accessed'),
              createdAt: zod.date().describe('The date the link was created'),
            })
            .describe('Link retrieved successfully'),
          400: zod.object({
            message: zod.string().describe('Validation error.'),
          }),
          404: zod.object({
            message: zod.string().describe('Link not found.'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = getLinkInput.parse(request.params)

      if (!id) {
        return reply.status(400).send({ message: 'Id is required.' })
      }

      const result = await getLink({ id })

      if (result.left) {
        return reply.status(404).send({ message: result.left.message })
      }

      return reply.status(200).send(result.right)
    }
  )
}
