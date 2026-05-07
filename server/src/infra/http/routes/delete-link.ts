import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import zod from 'zod'
import { deleteLink } from '@/app/functions/delete-link'
import type { DeleteLinkInput } from '@/types/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete a shortened link by ID',
        tags: ['Links'],
        params: zod.object({
          id: zod.uuidv7().describe('The ID of the link to delete'),
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
      const { id } = request.params as DeleteLinkInput

      if (!id) {
        return reply.status(400).send({ message: 'Id is required.' })
      }

      const result = await deleteLink({ id })

      if (result.left) {
        return reply.status(400).send({ message: result.left.message })
      }

      return reply.status(204).send(null)
    }
  )
}
