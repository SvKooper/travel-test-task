import Header from './Header'

function Hero() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <img
        src="/unsplash_zlP5OXporxw.png"
        alt="Захід сонця над Карпатами"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <Header />
    </section>
  )
}

export default Hero
