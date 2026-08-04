import type { FastifyInstance } from 'fastify'
import { prisma } from '../db/prisma.js'

const DEFAULT_HERO_TITLE = 'Мааааам, я\nв Карпати'

interface ContentBody {
  heroTitle: string
}

export async function contentRoutes(fastify: FastifyInstance) {
  // Public — main page reads hero copy
  fastify.get('/', async () => {
    return prisma.siteContent.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, heroTitle: DEFAULT_HERO_TITLE },
    })
  })

  fastify.put<{ Body: ContentBody }>('/', { preHandler: fastify.authenticate }, async (request) => {
    const { heroTitle } = request.body

    return prisma.siteContent.upsert({
      where: { id: 1 },
      update: { heroTitle },
      create: { id: 1, heroTitle },
    })
  })
}
