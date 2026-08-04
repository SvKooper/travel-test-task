import { useState } from 'react'
import Logo from '@/components/Logo.tsx'
import SocialLinks from '@/components/SocialLinks.tsx'
import LanguageSwitch from '@/components/LanguageSwitch.tsx'
import { MenuIcon } from '@/components/icons/MenuIcon.tsx'
import MobileMenu from './MobileMenu.tsx'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="relative flex inset-x-0 top-0 z-30 flex justify-between p-4 sm:p-6 lg:p-8">
          <div className="flex items-center flex-1 justify-between">
              <div className="flex items-center justify-start gap-6 flex-1">
                  <Logo/>
                  <div className="hidden items-center justify-center flex-1 lg:flex">
                      <p className="hidden w-52 shrink-0 font-tektur text-sm leading-5 font-semibold text-white md:block">
                          Сервіс подорожей кращими місцями Карпат
                      </p>
                  </div>
              </div>

              <div className="hidden lg:flex items-center flex-1 justify-center">
                  <SocialLinks/>
              </div>

              <div className="hidden lg:flex items-center flex-0.5 justify-end">
                  <LanguageSwitch/>
              </div>

          </div>

          <button
              type="button"
              aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="group relative z-30 flex h-12 w-12 shrink-0 items-center justify-center bg-red-600 p-2 text-white lg:hidden"
          >
              <MenuIcon className="h-full w-full" open={isMenuOpen}/>
          </button>

          <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
      </header>
  )
}

export default Header
