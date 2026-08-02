function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const authConfig = {
  adminUsername: requireEnv('ADMIN_USERNAME'),
  adminPasswordHash: requireEnv('ADMIN_PASSWORD_HASH'),
  jwtSecret: requireEnv('JWT_SECRET'),
}
