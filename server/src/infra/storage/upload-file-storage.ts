import { Upload } from '@aws-sdk/lib-storage'
import { env } from '@/env'
import {
  type UploadFileStorageInput,
  uploadFileStorageInput,
} from '@/types/upload-file-storage'
import { uniqueFileName } from '@/utils/unique-file-name'
import { r2 } from './client'

export async function uploadFileStorage(input: UploadFileStorageInput) {
  const { contentStream, contentType, fileName, folder } =
    uploadFileStorageInput.parse(input)

  const { uniqueFileNameFormated } = uniqueFileName({ fileName, folder })

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileNameFormated,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueFileNameFormated,
    url: new URL(uniqueFileNameFormated, env.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}
