import Header from './Header.tsx'
import Nav from './Nav.tsx'

function Hero() {
  return (
    <section className="relative flex h-dvh w-full flex-col overflow-hidden">
      <img
        src="/unsplash_zlP5OXporxw.png"
        alt="Захід сонця над Карпатами"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <Header />

      <div className="relative z-10 flex flex-1 flex-col justify-end gap-8 md:flex-row md:items-center md:justify-between p-6 ">
        <div className="hidden md:block">
          <Nav />
        </div>

        <div className="flex max-w-xl md:pr-24 justify-center">
            <div>
                <h1 className="text-5xl font-extrabold uppercase leading-[0.95] text-white sm:text-7xl md:text-5xl lg:text-7xl">
                    Мааааам, я
                    <br/>
                    в Карпати
                </h1>
                <a
                    href="#about"
                    className="mt-6 block bg-white py-4 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 transition-colors hover:bg-primary"
                >
                    Дізнатися більше
                </a>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
