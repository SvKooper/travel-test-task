// Placeholder — visual only for now, no real i18n wired up yet.
function LanguageSwitch() {
  return (
    <div className="inline-flex items-center rounded-full bg-white/10 p-1 text-xs font-semibold uppercase">
      <button type="button" className="rounded-full bg-white px-3 py-1 text-neutral-900">
        УКР
      </button>
      <button type="button" className="px-3 py-1 text-white/70">
        ENG
      </button>
    </div>
  )
}

export default LanguageSwitch
