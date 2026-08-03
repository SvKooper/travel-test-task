import { useEffect, useState, type ComponentType, type SVGProps } from 'react'
import { PlaneIcon } from '@/components/icons/services/PlaneIcon'
import { WalkingIcon } from '@/components/icons/services/WalkingIcon'
import { BikeIcon } from '@/components/icons/services/BikeIcon'
import { CarIcon } from '@/components/icons/services/CarIcon'
import { BoatIcon } from '@/components/icons/services/BoatIcon'

interface ServiceItem {
  id: number
  icon: string
  title: string
  description: string
  order: number
}

type ServiceIcon = ComponentType<SVGProps<SVGSVGElement> & { filled?: boolean }>

const ICONS: Record<string, ServiceIcon> = {
  plane: PlaneIcon,
  hiking: WalkingIcon,
  bike: BikeIcon,
  car: CarIcon,
  boat: BoatIcon,
}

// Tailwind's scanner needs these arbitrary-value classes to appear literally in source —
// keep them as static strings rather than building "hover:bg-[...]" at runtime.
const HOVER_BG: Record<string, string> = {
  plane: 'hover:bg-[#112020]',
  hiking: 'hover:bg-[#881e1e]',
  bike: 'hover:bg-[#4f1e8a]',
  car: 'hover:bg-[#bd8112]',
  boat: 'hover:bg-[#295b49]',
}

function Services() {
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    let cancelled = false

    fetch('/api/services')
      .then((res) => res.json())
      .then((data: ServiceItem[]) => {
        if (!cancelled) setServices(data)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="services" className="flex flex-col w-full bg-neutral-950 h-dvh">
      <div className="border-b border-white/10 px-6 py-4 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-white">Послуги</p>
      </div>

      <div className="flex flex-row flex-1">
        {services.map(({ id, icon, title }) => {
          const Icon = ICONS[icon] ?? PlaneIcon

          return (
            <a
              key={id}
              href="#"
              className={`group flex flex-1 border-b border-white/10 transition-[flex-basis,background-color] duration-300 last:border-b-0 hover:basis-[300px] md:border-r md:border-b-0 md:last:border-r-0 ${HOVER_BG[icon] ?? 'hover:bg-accent'}`}
            >
              <div className="flex flex-1 gap-3 flex-col justify-center items-center p-5">
                  <div className="h-[143px] w-[143px] relative shrink-0 text-white">
                    <Icon
                        className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0"/>
                    <Icon
                        filled
                        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                <div className="relative h-6 w-[160px]">
                  <h3 className="absolute inset-0 flex text-center text-sm font-bold uppercase tracking-wide text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {title}
                  </h3>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Services
