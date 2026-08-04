import { useState } from 'react'
import type { FormEvent } from 'react'
import Logo from '@/components/Logo.tsx'

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onLogin(username, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося увійти')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-neutral-950 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-oswald text-xs uppercase tracking-widest text-white/60">
              Логін
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="border border-white/10 bg-white/5 px-4 py-3 font-oswald text-white outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-oswald text-xs uppercase tracking-widest text-white/60">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-white/10 bg-white/5 px-4 py-3 font-oswald text-white outline-none transition-colors focus:border-accent"
            />
          </div>

          {error && <p className="font-oswald text-sm text-primary">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-white py-4 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
