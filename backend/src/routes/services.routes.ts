import type { FastifyInstance } from 'fastify'
import { prisma } from '../db/prisma.js'

interface ServiceBody {
  icon: string
  title: string
  description: string
  order?: number
}

export async function servicesRoutes(fastify: FastifyInstance) {
  // Public — main page reads Послуги content
  fastify.get('/', async () => {
    return prisma.serviceItem.findMany({ orderBy: { order: 'asc' } })
  })

  // Everything below requires the admin session
  fastify.addHook('preHandler', (request, reply, done) => {
    if (request.method === 'GET') return done()
    fastify.authenticate(request, reply).then(() => done(), done)
  })

  fastify.post<{ Body: ServiceBody }>('/', async (request, reply) => {
    const { icon, title, description, order = 0 } = request.body
    const item = await prisma.serviceItem.create({ data: { icon, title, description, order } })
    return reply.code(201).send(item)
  })

  fastify.put<{ Params: { id: string }; Body: ServiceBody }>('/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const { icon, title, description, order } = request.body

    try {
      const item = await prisma.serviceItem.update({
        where: { id },
        data: { icon, title, description, order },
      })
      return item
    } catch {
      return reply.code(404).send({ error: 'Service item not found' })
    }
  })

  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const id = Number(request.params.id)

    try {
      await prisma.serviceItem.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ error: 'Service item not found' })
    }
  })
}
