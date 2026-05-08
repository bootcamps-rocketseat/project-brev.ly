import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { exportReportLinksRoute } from './routes/export-report-links'
import { getLinkRoute } from './routes/get-link'
import { listLinksRoute } from './routes/list-links'
import { updateAccessCountLinkRoute } from './routes/update-access-count-link'

const server = fastify({
  logger: true,
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  console.error(error)
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, {
  origin: '*',
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly API',
      description: 'API documentation for Brevly.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
})

server.register(createLinkRoute)
server.register(deleteLinkRoute)
server.register(getLinkRoute)
server.register(listLinksRoute)
server.register(updateAccessCountLinkRoute)
server.register(exportReportLinksRoute)

server.listen({ port: 3000 }, (_, address: string) => {
  server.log.info(`Server listening at ${address}`)
})
