import { useCallback, useEffect, useState } from 'react'

interface AdminUser {
  username: string
}

type Status = 'loading' | 'authenticated' | 'unauthenticated'

const errorMessages: Record<string, string> = {
  'Invalid credentials': 'Невірний логін або пароль',
  'Username and password are required': "Введіть логін і пароль",
}

export const useAdminAuth = () => {
  const [status, setStatus] = useState<Status>('loading')
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: AdminUser) => {
        if (!cancelled) {
          setUser(data)
          setStatus('authenticated')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('unauthenticated')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(errorMessages[data.error] ?? 'Не вдалося увійти')
    }

    setUser(data)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  return { status, user, login, logout }
}
