import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authPlugin } from './plugins/auth.plugin.js'
import { authRoutes } from './routes/auth.routes.js'
import { faqRoutes } from './routes/faq.routes.js'
import { servicesRoutes } from './routes/services.routes.js'
import { contentRoutes } from './routes/content.routes.js'

const PORT = Number(process.env.PORT ?? 4000)

async function main() {
  const fastify = Fastify({ logger: true })

  // CORS is only needed for local dev (frontend on :5173, backend on :4000).
  // In production nginx proxies /api/* same-origin, so this is a no-op there.
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  })

  await fastify.register(authPlugin)

  await fastify.register(authRoutes, { prefix: '/api/auth' })
  await fastify.register(faqRoutes, { prefix: '/api/faq' })
  await fastify.register(servicesRoutes, { prefix: '/api/services' })
  await fastify.register(contentRoutes, { prefix: '/api/content' })

  fastify.get('/api/health', async () => ({ status: 'ok' }))

  await fastify.listen({ port: PORT, host: '0.0.0.0' })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
