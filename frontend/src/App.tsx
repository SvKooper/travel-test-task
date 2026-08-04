import Hero from '@/sections/Hero/Hero.tsx'
import Services from '@/sections/Services/Services.tsx'
import FAQ from '@/sections/FAQ/FAQ.tsx'
import AdminApp from '@/admin/AdminApp.tsx'
import PageLoader from '@/components/PageLoader.tsx'
import {useSiteContent} from '@/sections/Hero/hooks/useSiteContent.ts'
import {useServices} from '@/sections/Services/hooks/useServices.ts'
import {useFaq} from '@/sections/FAQ/hooks/useFaq.ts'

function Landing() {
  const {content, isLoading: isContentLoading} = useSiteContent()
  const {services, isLoading: isServicesLoading} = useServices()
  const {faq, isLoading: isFaqLoading} = useFaq()

  if (isContentLoading || isServicesLoading || isFaqLoading) {
    return <PageLoader />
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero heroTitle={content.heroTitle} />
      <Services services={services} />
      <FAQ faq={faq} />
    </main>
  )
}

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminApp />
  }

  return <Landing />
}

export default App
