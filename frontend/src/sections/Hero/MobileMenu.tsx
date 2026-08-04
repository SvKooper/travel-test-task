import { useEffect } from 'react'
import Nav from './Nav.tsx'
import SocialLinks from '@/components/SocialLinks.tsx'

interface Props {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-20 flex flex-col justify-center gap-12 bg-neutral-950 px-8 py-24 transition-opacity duration-300 lg:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <Nav variant="mobile" onNavigate={onClose} />
      <SocialLinks />
    </div>
  )
}

export default MobileMenu
