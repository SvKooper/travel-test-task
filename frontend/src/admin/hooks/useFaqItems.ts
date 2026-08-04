import {useEffect, useState} from 'react'
import type {FaqItem} from '@/domain/faq.ts'
import {adminRequest} from '@/admin/api.ts'

export interface FaqDraft extends FaqItem {
  isNew?: boolean
  savedQuestion: string
  savedAnswer: string
}

export const useFaqItems = () => {
  const [items, setItems] = useState<FaqDraft[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    adminRequest<FaqItem[]>('/api/faq')
      .then((data) => {
        if (!cancelled) {
          setItems(data.map((item) => ({...item, savedQuestion: item.question, savedAnswer: item.answer})))
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {items, setItems, isLoading}
}
