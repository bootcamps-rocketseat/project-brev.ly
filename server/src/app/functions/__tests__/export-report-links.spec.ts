import { randomUUID } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { db } from '@/infra/db'
import { uploadFileStorage } from '@/infra/storage/upload-file-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-upload'
import { formatDate } from '@/utils/format-date'
import { exportReportLinks } from '../export-report-links'

vi.mock('@/infra/storage/upload-file-storage', () => ({
  uploadFileStorage: vi.fn(),
}))

describe('exportReportLinks', () => {
  beforeEach(async () => {
    await db.execute(sql`
      TRUNCATE TABLE links RESTART IDENTITY CASCADE
    `)
  })

  it('should be able to export uploads', async () => {
    const uploadStub = vi.mocked(uploadFileStorage).mockResolvedValueOnce({
      key: `${randomUUID()}.csv`,
      url: 'http://example.com/file.csv',
    })

    const upload1 = await makeLink()
    const upload2 = await makeLink()
    const upload3 = await makeLink()

    const input = await exportReportLinks()

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(input)).toBe(true)

    expect(unwrapEither(input)).toEqual({
      reportUrl: 'http://example.com/file.csv',
    })

    expect(csvAsArray).toEqual([
      ['ID', 'Criado', 'URL Original', 'URL Encurtada', 'Contagem de Acessos'],
      [
        upload1.id,
        formatDate(new Date(upload1.createdAt.getTime() + 3 * 60 * 60 * 1000)),
        upload1.originalUrl,
        upload1.shortenedUrl,
        String(upload1.accessCount),
      ],
      [
        upload2.id,
        formatDate(new Date(upload2.createdAt.getTime() + 3 * 60 * 60 * 1000)),
        upload2.originalUrl,
        upload2.shortenedUrl,
        String(upload2.accessCount),
      ],
      [
        upload3.id,
        formatDate(new Date(upload3.createdAt.getTime() + 3 * 60 * 60 * 1000)),
        upload3.originalUrl,
        upload3.shortenedUrl,
        String(upload3.accessCount),
      ],
    ])
  })
})
