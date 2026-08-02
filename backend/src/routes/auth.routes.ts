import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { authConfig } from '../auth/config.js'
import { authCookieName } from '../plugins/auth.plugin.js'

// Only mark the cookie Secure when the deployment actually terminates HTTPS
// in front of it — tying this to NODE_ENV would silently break login on any
// plain-HTTP production deployment (e.g. a bare VPS without a TLS proxy).
const useSecureCookie = process.env.COOKIE_SECURE === 'true'

interface LoginBody {
  username: string
  password: string
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    const { username, password } = request.body ?? {}

    if (!username || !password) {
      return reply.code(400).send({ error: 'Username and password are required' })
    }

    const isValidUsername = username === authConfig.adminUsername
    const isValidPassword = await bcrypt.compare(password, authConfig.adminPasswordHash)

    if (!isValidUsername || !isValidPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    const token = fastify.jwt.sign({ username }, { expiresIn: '12h' })

    reply
      .setCookie(authCookieName, token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: useSecureCookie,
        maxAge: 60 * 60 * 12, // 12h, matches token expiry
      })
      .send({ username })
  })

  fastify.post('/logout', async (_request, reply) => {
    reply.clearCookie(authCookieName, { path: '/' }).send({ ok: true })
  })

  fastify.get(
    '/me',
    { preHandler: fastify.authenticate },
    async (request) => ({ username: request.user.username }),
  )
}
