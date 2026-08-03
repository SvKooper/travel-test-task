// Placeholder — visual only for now, no real i18n wired up yet.
function LanguageSwitch() {
  return (
    <div className="inline-flex items-center font-inter text-xs leading-3 font-bold uppercase">
      <button type="button" className="flex w-12 items-center justify-center bg-white py-1.5 px-1 text-neutral-900">
        УКР
      </button>
      <button type="button" className="flex w-12 items-center justify-center py-1.5 px-1 text-white">
        ENG
      </button>
    </div>
  )
}

export default LanguageSwitch
