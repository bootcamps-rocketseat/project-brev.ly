import type { FastifyPluginAsync } from 'fastify'
import zod from 'zod'
import { listLinks } from '@/app/functions/list-links'
import { listLinksInput } from '@/types/list-links'

export const listLinksRoute: FastifyPluginAsync = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'List all shortened links with pagination',
        tags: ['Links'],
        querystring: listLinksInput,
        response: {
          200: zod.object({
            links: zod.array(
              zod.object({
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
            ),
          }),
          400: zod.object({
            message: zod.string().describe('Validation error.'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize } = listLinksInput.parse(request.query)

      const result = await listLinks({ page, pageSize })

      if (result.left) {
        return reply.status(400).send({ message: result.left.message })
      }

      return reply.status(200).send(result.right)
    }
  )
}
