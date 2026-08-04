import {useState} from 'react'
import type {FaqItem} from '@/domain/faq.ts'
import {adminRequest} from '@/admin/api.ts'
import {useFaqItems, type FaqDraft} from '@/admin/hooks/useFaqItems.ts'
import {useFaqMove} from '@/admin/hooks/useFaqMove.ts'
import {useFaqSave} from '@/admin/hooks/useFaqSave.ts'

let tempIdCounter = 0
const nextTempId = () => --tempIdCounter

function FaqSection() {
  const {items, setItems, isLoading} = useFaqItems()
  const handleMove = useFaqMove(setItems)

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {id: nextTempId(), question: '', answer: '', order: prev.length, isNew: true},
    ])
  }

  const handleChange = (id: number, patch: Partial<FaqDraft>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? {...item, ...patch} : item)))
  }

  const handleSaved = (tempId: number, saved: FaqItem) => {
    setItems((prev) => prev.map((item) => (item.id === tempId ? {...saved} : item)))
  }

  const handleDelete = async (id: number) => {
    const item = items.find((it) => it.id === id)
    if (!item) return

    if (!item.isNew) {
      await adminRequest(`/api/faq/${id}`, {method: 'DELETE'})
    }

    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  if (isLoading) return null

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {items.map((item, index) => (
        <FaqRow
          key={item.id}
          item={item}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          onChange={handleChange}
          onDelete={handleDelete}
          onMove={handleMove}
          onSaved={handleSaved}
        />
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="self-start border border-white/20 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
      >
        + Додати питання
      </button>
    </div>
  )
}

interface FaqRowProps {
  item: FaqDraft
  isFirst: boolean
  isLast: boolean
  onChange: (id: number, patch: Partial<FaqDraft>) => void
  onDelete: (id: number) => Promise<void>
  onMove: (id: number, direction: -1 | 1) => void
  onSaved: (tempId: number, saved: FaqItem) => void
}

function FaqRow({item, isFirst, isLast, onChange, onDelete, onMove, onSaved}: FaqRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const {isSaving, error: saveError, handleSave} = useFaqSave(item, onSaved)

  const handleDelete = async () => {
    setIsDeleting(true)
    setDeleteError(null)

    try {
      await onDelete(item.id)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Не вдалося видалити')
      setIsDeleting(false)
    }
  }

  const error = saveError ?? deleteError

  return (
    <div className="flex flex-col gap-3 border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onMove(item.id, -1)}
            disabled={isFirst}
            aria-label="Перемістити вгору"
            className="px-2 py-1 text-white/60 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={() => onMove(item.id, 1)}
            disabled={isLast}
            aria-label="Перемістити вниз"
            className="px-2 py-1 text-white/60 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            ▼
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <textarea
            rows={2}
            placeholder="Питання"
            value={item.question}
            onChange={(event) => onChange(item.id, {question: event.target.value})}
            className="resize-none border border-white/10 bg-transparent px-3 py-2 font-oswald text-white outline-none transition-colors focus:border-accent"
          />
          <textarea
            rows={2}
            placeholder="Відповідь"
            value={item.answer}
            onChange={(event) => onChange(item.id, {answer: event.target.value})}
            className="resize-none border border-white/10 bg-transparent px-3 py-2 font-oswald text-white outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      {error && <p className="font-oswald text-sm text-primary">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white px-6 py-2 text-center text-xs font-bold uppercase tracking-widest text-neutral-950 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Збереження...' : 'Зберегти'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-6 py-2 text-center text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? 'Видалення...' : 'Видалити'}
        </button>
      </div>
    </div>
  )
}

export default FaqSection
