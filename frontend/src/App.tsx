import {useEffect, useState} from 'react'
import Hero from '@/sections/Hero/Hero.tsx'
import Services from '@/sections/Services/Services.tsx'
import FAQ from '@/sections/FAQ/FAQ.tsx'
import AdminApp from '@/admin/AdminApp.tsx'
import PageLoader from '@/components/PageLoader.tsx'
import {useSiteContent} from '@/sections/Hero/hooks/useSiteContent.ts'
import {useServices} from '@/sections/Services/hooks/useServices.ts'
import {useFaq} from '@/sections/FAQ/hooks/useFaq.ts'
import {usePageLoad} from '@/hooks/usePageLoad.ts'

const LOADER_FADE_MS = 300

function Landing() {
  const {content, isLoading: isContentLoading} = useSiteContent()
  const {services, isLoading: isServicesLoading} = useServices()
  const {faq, isLoading: isFaqLoading} = useFaq()
  const isPageLoaded = usePageLoad()

  const isLoading = isContentLoading || isServicesLoading || isFaqLoading || !isPageLoaded
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (isLoading || !showLoader) return

    const timeout = setTimeout(() => setShowLoader(false), LOADER_FADE_MS)
    return () => clearTimeout(timeout)
  }, [isLoading, showLoader])

  return (
    <>
      {showLoader && <PageLoader fadeOut={!isLoading} />}
      <main className="min-h-screen bg-neutral-950">
        <Hero heroTitle={content.heroTitle} />
        <Services services={services} />
        <FAQ faq={faq} />
      </main>
    </>
  )
}

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminApp />
  }

  return <Landing />
}

export default App
