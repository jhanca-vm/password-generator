import type { FastifyInstance } from 'fastify'

import homeHandler from '../pages/home/api/handler'

export default function routes(fastify: FastifyInstance) {
  fastify.get('/favicon.svg', (_, reply) => {
    reply.sendFile('favicon.svg', import.meta.dirname)
  })

  fastify.get('/', homeHandler)
}
