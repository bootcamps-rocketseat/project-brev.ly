import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileStorage } from '@/infra/storage/upload-file-storage'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import type {
  ExportReportLinksOutput,
  ReportLinkRow,
} from '@/types/export-report-links'
import { formatDate } from '@/utils/format-date'
import type { InvalidFileFormatError } from './errors/invalid-file-format'

export const exportReportLinks = async (): Promise<
  Either<InvalidFileFormatError, ExportReportLinksOutput>
> => {
  const result = db
    .select({
      id: schema.links.id,
      createdAt: schema.links.createdAt,
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
      shortenedUrl: schema.links.shortenedUrl,
    })
    .from(schema.links)
    .toSQL()

  if (!result) {
    return makeLeft(new Error('Error exporting report links'))
  }

  const { params, sql } = result

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'created_at', header: 'Criado' },
      { key: 'original_url', header: 'URL Original' },
      { key: 'shortened_url', header: 'URL Encurtada' },
      { key: 'access_count', header: 'Contagem de Acessos' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: ReportLinkRow[], _, callback) {
        for (const chunk of chunks) {
          this.push({
            ...chunk,
            created_at: formatDate(chunk.created_at),
          })
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: `${new Date().toISOString()}-report.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
