import {createContext, useCallback, useContext, useRef, useState, type ReactNode} from 'react'

interface SnackbarContextValue {
  showSnackbar: (message: string) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

const AUTO_HIDE_MS = 2500

export function SnackbarProvider({children}: {children: ReactNode}) {
  const [message, setMessage] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showSnackbar = useCallback((next: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMessage(next)
    timeoutRef.current = setTimeout(() => setMessage(null), AUTO_HIDE_MS)
  }, [])

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}

      <div
        aria-live="polite"
        className={`fixed inset-x-0 top-6 z-50 flex justify-center px-4 transition-all duration-300 ${
          message ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="border border-white/10 bg-green-600 px-6 py-3 font-oswald text-sm text-white shadow-lg">
          {message}
        </div>
      </div>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider')
  return ctx
}
