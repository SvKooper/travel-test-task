import {useState, type Dispatch, type SetStateAction} from 'react'
import type {DragEndEvent} from '@dnd-kit/core'
import {arrayMove} from '@dnd-kit/sortable'
import {adminRequest} from '@/admin/api.ts'
import {useSnackbar} from '@/admin/context/SnackbarContext.tsx'
import type {FaqDraft} from './useFaqItems.ts'

export const useFaqReorder = (
  items: FaqDraft[],
  setItems: Dispatch<SetStateAction<FaqDraft[]>>,
) => {
  const {showSnackbar} = useSnackbar()
  const [error, setError] = useState<string | null>(null)

  const handleDragEnd = async (event: DragEndEvent) => {
    const {active, over} = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const previous = items
    const reordered = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index,
    }))

    setItems(reordered)
    setError(null)

    const persistableIds = reordered.filter((item) => !item.isNew).map((item) => item.id)
    if (persistableIds.length === 0) return

    try {
      await adminRequest('/api/faq/reorder', {
        method: 'PATCH',
        body: JSON.stringify({ids: persistableIds}),
      })
      showSnackbar('Зміна застосована')
    } catch (err) {
      setItems(previous)
      setError(err instanceof Error ? err.message : 'Не вдалося змінити порядок')
    }
  }

  return {handleDragEnd, reorderError: error}
}
