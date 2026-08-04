import {useEffect, useState} from 'react'
import type {ServiceItem} from '@/domain/services.ts'
import {adminRequest} from '@/admin/api.ts'
import {SERVICE_ICONS} from '@/components/icons/services'
import {PlaneIcon} from '@/components/icons/services/PlaneIcon.tsx'

interface ServiceDraft extends ServiceItem {
  savedTitle: string
}

function ServicesSection() {
  const [services, setServices] = useState<ServiceDraft[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    adminRequest<ServiceItem[]>('/api/services')
      .then((data) => {
        if (!cancelled) setServices(data.map((item) => ({...item, savedTitle: item.title})))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const updateTitle = (id: number, title: string) => {
    setServices((prev) => prev.map((item) => (item.id === id ? {...item, title} : item)))
  }

  const handleSaved = (id: number, title: string) => {
    setServices((prev) => prev.map((item) => (item.id === id ? {...item, savedTitle: title} : item)))
  }

  if (isLoading) return null

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {services.map((service) => (
        <ServiceRow key={service.id} service={service} onChange={updateTitle} onSaved={handleSaved} />
      ))}
    </div>
  )
}

interface ServiceRowProps {
  service: ServiceDraft
  onChange: (id: number, title: string) => void
  onSaved: (id: number, title: string) => void
}

function ServiceRow({service, onChange, onSaved}: ServiceRowProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const Icon = SERVICE_ICONS[service.icon] ?? PlaneIcon
  const isDirty = service.title !== service.savedTitle

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      await adminRequest(`/api/services/${service.id}`, {
        method: 'PUT',
        body: JSON.stringify({icon: service.icon, title: service.title, order: service.order}),
      })
      onSaved(service.id, service.title)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-4">
        <Icon className="h-10 w-10 shrink-0 text-white" />

        <input
          type="text"
          value={service.title}
          onChange={(event) => onChange(service.id, event.target.value)}
          className="flex-1 border border-white/10 bg-transparent px-3 py-2 font-oswald text-white outline-none transition-colors focus:border-accent"
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="shrink-0 bg-white px-6 py-2 text-center text-xs font-bold uppercase tracking-widest text-neutral-950 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>

      {error && <p className="font-oswald text-sm text-primary">{error}</p>}
    </div>
  )
}

export default ServicesSection
