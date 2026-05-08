import type { FastifyPluginAsync } from 'fastify'
import zod from 'zod'
import { exportReportLinks } from '@/app/functions/export-report-links'

export const exportReportLinksRoute: FastifyPluginAsync = async server => {
  server.get(
    '/export-report-links',
    {
      schema: {
        tags: ['Report'],
        summary: 'Exports a links report in CSV format',
        response: {
          200: zod.object({
            reportUrl: zod.url(),
          }),
          400: zod.object({
            message: zod.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportReportLinks()

      if (result.left) {
        return reply.status(400).send({ message: result.left.message })
      }

      return reply.status(200).send(result.right)
    }
  )
}
