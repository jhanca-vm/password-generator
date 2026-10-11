import type { RouteHandlerMethod } from 'fastify'
import { renderToStaticMarkup } from 'react-dom/server'

import HomePage from '../ui/home'

const html = renderToStaticMarkup(<HomePage />)

const homeHandler: RouteHandlerMethod = async (_, reply) => {
  reply.type('text/html').send(`<!doctype html>${html}`)
}

export default homeHandler
