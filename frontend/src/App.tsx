import Hero from '@/sections/Hero/Hero.tsx'
import Services from '@/sections/Services/Services.tsx'
import FAQ from '@/sections/FAQ/FAQ.tsx'
import AdminApp from '@/admin/AdminApp.tsx'

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminApp />
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <Services />
      <FAQ />
    </main>
  )
}

export default App
