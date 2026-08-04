interface PageLoaderProps {
  fadeOut?: boolean
}

function PageLoader({fadeOut = false}: PageLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-primary" />
    </div>
  )
}

export default PageLoader
