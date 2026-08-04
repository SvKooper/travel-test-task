import {useState} from 'react'
import type {FaqItem} from '@/domain/faq.ts'
import {adminRequest} from '@/admin/api.ts'
import type {FaqDraft} from './useFaqItems.ts'

export const useFaqSave = (item: FaqDraft, onSaved: (tempId: number, saved: FaqItem) => void) => {
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
        await adminRequest<FaqItem>(`/api/faq/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify({question: item.question, answer: item.answer, order: item.order}),
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти')
    } finally {
      setIsSaving(false)
    }
  }

  return {isSaving, error, handleSave}
}
