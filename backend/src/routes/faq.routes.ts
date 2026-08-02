import type { FastifyInstance } from 'fastify'
import { prisma } from '../db/prisma.js'

interface FaqBody {
  question: string
  answer: string
  order?: number
}

export async function faqRoutes(fastify: FastifyInstance) {
  // Public — main page reads FAQ content
  fastify.get('/', async () => {
    return prisma.faqItem.findMany({ orderBy: { order: 'asc' } })
  })

  // Everything below requires the admin session
  fastify.addHook('preHandler', (request, reply, done) => {
    if (request.method === 'GET') return done()
    fastify.authenticate(request, reply).then(() => done(), done)
  })

  fastify.post<{ Body: FaqBody }>('/', async (request, reply) => {
    const { question, answer, order = 0 } = request.body
    const item = await prisma.faqItem.create({ data: { question, answer, order } })
    return reply.code(201).send(item)
  })

  fastify.put<{ Params: { id: string }; Body: FaqBody }>('/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const { question, answer, order } = request.body

    try {
      const item = await prisma.faqItem.update({
        where: { id },
        data: { question, answer, order },
      })
      return item
    } catch {
      return reply.code(404).send({ error: 'FAQ item not found' })
    }
  })

  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const id = Number(request.params.id)

    try {
      await prisma.faqItem.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ error: 'FAQ item not found' })
    }
  })
}
