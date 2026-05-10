import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import zod from 'zod'
import { deleteLink } from '@/app/functions/delete-link'
import { deleteLinkInput } from '@/types/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:shortenedUrl',
    {
      schema: {
        summary: 'Delete a shortened link by shortenedUrl',
        tags: ['Links'],
        params: zod.object({
          shortenedUrl: zod
            .string()
            .describe('The shortenedUrl of the link to delete'),
        }),
        response: {
          204: zod.null().describe('Link deleted successfully'),
          400: zod.object({
            message: zod.string().describe('Validation error.'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = deleteLinkInput.parse(request.params)

      if (!shortenedUrl) {
        return reply.status(400).send({ message: 'ShortenedUrl is required.' })
      }

      const result = await deleteLink({ shortenedUrl })

      if (result.left) {
        return reply.status(400).send({ message: result.left.message })
      }

      return reply.status(204).send(null)
    }
  )
}
