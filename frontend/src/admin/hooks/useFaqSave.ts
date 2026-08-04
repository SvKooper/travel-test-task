import {useState} from 'react'
import type {FaqItem} from '@/domain/faq.ts'
import {adminRequest} from '@/admin/api.ts'
import {useSnackbar} from '@/admin/context/SnackbarContext.tsx'
import type {FaqDraft} from './useFaqItems.ts'

export const useFaqSave = (item: FaqDraft, onSaved: (tempId: number, saved: FaqItem) => void) => {
  const {showSnackbar} = useSnackbar()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      if (item.isNew) {
        const created = await adminRequest<FaqItem>('/api/faq', {
          method: 'POST',
          body: JSON.stringify({question: item.question, answer: item.answer, order: item.order}),
        })
        onSaved(item.id, created)
      } else {
        const updated = await adminRequest<FaqItem>(`/api/faq/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify({question: item.question, answer: item.answer, order: item.order}),
        })
        onSaved(item.id, updated)
      }
      showSnackbar('Зміна застосована')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти')
    } finally {
      setIsSaving(false)
    }
  }

  return {isSaving, error, handleSave}
}
