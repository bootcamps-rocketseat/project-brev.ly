import { Readable } from 'node:stream'
import zod from 'zod'

export const uploadFileStorageInput = zod.object({
  fileName: zod.string(),
  contentType: zod.string(),
  folder: zod.enum(['reports']),
  contentStream: zod.instanceof(Readable),
})

export type UploadFileStorageInput = zod.input<typeof uploadFileStorageInput>
