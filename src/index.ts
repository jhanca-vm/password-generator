import path from 'node:path'

import fastifyStatic from '@fastify/static'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'

import routes from './ui/routes'
import { appRouter } from './ui/routes/trpc'

const server = fastify({
  logger: { transport: { target: '@fastify/one-line-logger' } }
})

server.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'static'),
  prefix: '/static'
})

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter }
})

server.register(routes)

server.listen({ host: '0.0.0.0', port: 3000 })
