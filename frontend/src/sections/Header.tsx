import Logo from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import LanguageSwitch from '@/components/LanguageSwitch'
import { MenuIcon } from '@/components/icons/MenuIcon'

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <Logo />
        <p className="hidden max-w-40 text-xs leading-snug text-white/90 md:block">
          Сервіс подорожей кращими місцями Карпат
        </p>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <SocialLinks />
        <LanguageSwitch />
      </div>

      <button
        type="button"
        aria-label="Відкрити меню"
        className="flex h-11 w-11 items-center justify-center rounded-md bg-red-600 text-white md:hidden"
      >
        <MenuIcon className="h-6 w-6" strokeWidth={2} />
      </button>
    </header>
  )
}

export default Header
