import type {Dispatch, SetStateAction} from 'react'
import {adminRequest} from '@/admin/api.ts'
import type {FaqDraft} from './useFaqItems.ts'

export const useFaqMove = (setItems: Dispatch<SetStateAction<FaqDraft[]>>) => {
  const handleMove = (id: number, direction: -1 | 1) => {
    setItems((prev) => {
      const index = prev.findIndex((it) => it.id === id)
      const swapIndex = index + direction
      if (index === -1 || swapIndex < 0 || swapIndex >= prev.length) return prev

      const next = [...prev]
      const a = next[index]
      const b = next[swapIndex]
      next[index] = {...b, order: a.order}
      next[swapIndex] = {...a, order: b.order}

      for (const item of [next[index], next[swapIndex]]) {
        if (!item.isNew) {
          adminRequest(`/api/faq/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({question: item.question, answer: item.answer, order: item.order}),
          }).catch(() => {})
        }
      }

      return next.sort((x, y) => x.order - y.order)
    })
  }

  return handleMove
}
