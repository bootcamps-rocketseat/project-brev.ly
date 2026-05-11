import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { exportReportLinks } from '@/app/functions/export-report-links'
import { exportReportLinksRoute } from '../export-report-links'

vi.mock('@/app/functions/export-report-links', () => ({
  exportReportLinks: vi.fn(),
}))

describe('exportReportLinksRoute', () => {
  let server: ReturnType<typeof Fastify>

  beforeEach(async () => {
    server = Fastify()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    await server.register(exportReportLinksRoute)

    await server.ready()

    vi.clearAllMocks()
  })

  it('should export links report successfully', async () => {
    vi.mocked(exportReportLinks).mockResolvedValue({
      right: {
        reportUrl:
          'https://pub-55a04407e8b5427ab4390053b05c5238.r2.dev/reports/report.csv',
      },
    })

    const response = await server.inject({
      method: 'GET',
      url: '/export-report-links',
    })

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body)).toEqual({
      reportUrl:
        'https://pub-55a04407e8b5427ab4390053b05c5238.r2.dev/reports/report.csv',
    })

    expect(exportReportLinks).toHaveBeenCalled()
  })

  it('should return 400 when exportReportLinks returns an error', async () => {
    vi.mocked(exportReportLinks).mockResolvedValue({
      left: new Error('Failed to export report'),
    })

    const response = await server.inject({
      method: 'GET',
      url: '/export-report-links',
    })

    expect(response.statusCode).toBe(400)

    expect(JSON.parse(response.body)).toEqual({
      message: 'Failed to export report',
    })
  })
})
