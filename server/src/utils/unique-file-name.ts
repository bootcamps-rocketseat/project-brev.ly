import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import type { UniqueFileNameInput } from '@/types/unique-file-name'

export const uniqueFileName = (input: UniqueFileNameInput) => {
  const { fileName, folder } = input

  const fileExtension = extname(fileName)
  const fileNameWithoutExtension = basename(fileName, fileExtension)

  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )
  const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

  const uniqueFileNameFormated = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

  return { uniqueFileNameFormated }
}
