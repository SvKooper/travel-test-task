import {useCallback, useEffect, useState} from 'react'
import type {SiteContent} from '@/domain/content.ts'
import {adminRequest} from '@/admin/api.ts'
import {useSnackbar} from '@/admin/context/SnackbarContext.tsx'

export const useContentAdmin = () => {
  const {showSnackbar} = useSnackbar()
  const [heroTitle, setHeroTitle] = useState('')
  const [savedHeroTitle, setSavedHeroTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    adminRequest<SiteContent>('/api/content')
      .then((data) => {
        if (!cancelled) {
          setHeroTitle(data.heroTitle)
          setSavedHeroTitle(data.heroTitle)
        }
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
      setSavedHeroTitle(heroTitle)
      showSnackbar('Зміна застосована')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти')
    } finally {
      setIsSaving(false)
    }
  }, [heroTitle, showSnackbar])

  const isDirty = heroTitle !== savedHeroTitle

  return {heroTitle, setHeroTitle, isLoading, isSaving, error, isDirty, save}
}
