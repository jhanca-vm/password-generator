import type { FastifyInstance } from 'fastify'

import homeHandler from './home/handler'

export default function routes(fastify: FastifyInstance) {
  fastify.get('/favicon.svg', (_, reply) => {
    reply.sendFile('favicon.svg', import.meta.dirname)
  })

  fastify.get('/', homeHandler)
}
