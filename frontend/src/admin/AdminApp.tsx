import {useState} from 'react'
import {useAdminAuth} from '@/admin/hooks/useAdminAuth.ts'
import LoginForm from '@/admin/LoginForm.tsx'
import ContentSection from '@/admin/sections/ContentSection.tsx'
import ServicesSection from '@/admin/sections/ServicesSection.tsx'
import FaqSection from '@/admin/sections/FaqSection.tsx'

const TABS = [
  {key: 'content', label: 'Головна сторінка', Component: ContentSection},
  {key: 'services', label: 'Послуги', Component: ServicesSection},
  {key: 'faq', label: 'FAQ', Component: FaqSection},
] as const

type TabKey = (typeof TABS)[number]['key']

function AdminApp() {
  const {status, user, login, logout} = useAdminAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('content')

  if (status === 'loading') {
    return <div className="flex min-h-dvh w-full items-center justify-center bg-neutral-950" />
  }

  if (status === 'unauthenticated') {
    return <LoginForm onLogin={login} />
  }

  const ActiveComponent = TABS.find((tab) => tab.key === activeTab)?.Component ?? ContentSection

  return (
    <div className="flex min-h-dvh w-full flex-col bg-neutral-950">
      <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 sm:px-10">
        <p className="font-oswald text-lg font-bold uppercase tracking-widest text-white">Адмінка</p>
        <div className="flex items-center gap-4">
          <span className="font-oswald text-sm text-white/60">{user?.username}</span>
          <button
            type="button"
            onClick={logout}
            className="font-oswald text-sm uppercase tracking-widest text-white/60 transition-colors hover:text-primary"
          >
            Вийти
          </button>
        </div>
      </header>

      <nav className="flex gap-1 border-b border-white/10 px-6 sm:px-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 font-oswald text-sm uppercase tracking-widest transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-accent text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 p-6 sm:p-10">
        <ActiveComponent />
      </div>
    </div>
  )
}

export default AdminApp
