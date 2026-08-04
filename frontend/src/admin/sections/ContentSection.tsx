import {useContentAdmin} from '@/admin/hooks/useContentAdmin.ts'

function ContentSection() {
  const {heroTitle, setHeroTitle, isLoading, isSaving, error, savedAt, isDirty, save} = useContentAdmin()

  if (isLoading) return null

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="heroTitle" className="font-oswald text-xs uppercase tracking-widest text-white/60">
          Головний заголовок (новий рядок — перенесення рядка)
        </label>
        <textarea
          id="heroTitle"
          rows={3}
          value={heroTitle}
          onChange={(event) => setHeroTitle(event.target.value)}
          className="resize-none border border-white/10 bg-white/5 px-4 py-3 font-oswald text-white outline-none transition-colors focus:border-accent"
        />
      </div>

      {error && <p className="font-oswald text-sm text-primary">{error}</p>}

      <button
        type="button"
        onClick={save}
        disabled={isSaving || !isDirty}
        className="self-start bg-white px-8 py-3 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Збереження...' : 'Зберегти'}
      </button>
    </div>
  )
}

export default ContentSection
