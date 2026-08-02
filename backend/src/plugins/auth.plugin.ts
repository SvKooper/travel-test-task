import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fp from 'fastify-plugin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { authConfig } from '../auth/config.js'

const COOKIE_NAME = 'token'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { username: string }
  }
}

export const authPlugin = fp(async (fastify) => {
  await fastify.register(fastifyCookie)
  await fastify.register(fastifyJwt, {
    secret: authConfig.jwtSecret,
    cookie: {
      cookieName: COOKIE_NAME,
      signed: false,
    },
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch {
      reply.code(401).send({ error: 'Unauthorized' })
    }
  })
})

export const authCookieName = COOKIE_NAME
