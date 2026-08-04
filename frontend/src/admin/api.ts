export async function adminRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: options?.body ? {'Content-Type': 'application/json', ...options?.headers} : options?.headers,
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Щось пішло не так')
  }

  if (res.status === 204) return undefined as T

  return res.json()
}
