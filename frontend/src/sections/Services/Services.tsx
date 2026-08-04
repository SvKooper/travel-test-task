import {ServicesList} from "@/components/services/ServicesList.tsx";
import type {ServiceItem} from "@/domain/services.ts";

interface ServicesProps {
  services: ServiceItem[]
}

function Services({services}: ServicesProps) {
  return (
    <section id="services" className="flex flex-col w-full bg-neutral-950 h-dvh border-b border-white/10">
      <div className="border-b border-white/10 px-6 py-4 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-white">Послуги</p>
      </div>

      <ServicesList services={services}/>
    </section>
  )
}

export default Services
