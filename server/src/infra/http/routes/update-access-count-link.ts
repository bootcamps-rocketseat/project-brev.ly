import type { FastifyPluginAsync } from 'fastify'
import zod from 'zod'
import { updateAccessCountLink } from '@/app/functions/update-access-count-link'
import { updateAccessCountLinkInput } from '@/types/update-access-count-link'

export const updateAccessCountLinkRoute: FastifyPluginAsync = async server => {
  server.patch(
    '/links/:shortenedUrl/access-count',
    {
      schema: {
        summary: 'Increment the access count of a shortened link',
        tags: ['Links'],
        params: zod.object({
          shortenedUrl: zod
            .string()
            .describe('The shortenedUrl of the link to update'),
        }),
        response: {
          200: zod.object({
            message: zod.string().describe('Success message'),
          }),
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
      const { shortenedUrl } = updateAccessCountLinkInput.parse(request.params)

      if (!shortenedUrl) {
        return reply.status(400).send({ message: 'ShortenedUrl is required' })
      }

      const result = await updateAccessCountLink({ shortenedUrl })

      if (result.left) {
        return reply.status(404).send({ message: result.left.message })
      }

      return reply.status(200).send(result.right)
    }
  )
}
