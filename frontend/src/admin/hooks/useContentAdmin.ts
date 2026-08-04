import {useCallback, useEffect, useState} from 'react'
import type {SiteContent} from '@/domain/content.ts'
import {adminRequest} from '@/admin/api.ts'

export const useContentAdmin = () => {
  const [heroTitle, setHeroTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    adminRequest<SiteContent>('/api/content')
      .then((data) => {
        if (!cancelled) setHeroTitle(data.heroTitle)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const save = useCallback(async () => {
    setIsSaving(true)
    setError(null)

    try {
      await adminRequest<SiteContent>('/api/content', {
        method: 'PUT',
        body: JSON.stringify({heroTitle}),
      })
      setSavedAt(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти')
    } finally {
      setIsSaving(false)
    }
  }, [heroTitle])

  return {heroTitle, setHeroTitle, isLoading, isSaving, error, savedAt, save}
}
