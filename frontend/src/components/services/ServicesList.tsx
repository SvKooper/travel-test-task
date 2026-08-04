import {useState} from "react";
import {PlaneIcon} from "@/components/icons/services/PlaneIcon.tsx";
import type {ServiceItem} from "@/domain/services.ts";
import {SERVICE_ICONS} from "@/components/icons/services";
import {BG, HOVER_BG} from "@/components/services/constants.ts";
import {useSequencedSwap} from "@/components/services/hooks/useSequencedSwap.ts";

interface Props {
    services: ServiceItem[]
}
export const ServicesList = (props: Props) => {
    return (
        <>
            <div className="hidden lg:flex flex-row flex-1">
                <Desktop {...props}/>
            </div>
            <div className="flex flex-row flex-1 lg:hidden">
                <Mobile {...props}/>
            </div>
        </>
    )
}

const Desktop = ({services}: Props) => {
    return services.map(({id, icon, title}) => {
        const Icon = SERVICE_ICONS[icon] ?? PlaneIcon

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
        })
}

const Mobile = ({services}: Props) => {
    const [activeId, setActiveId] = useState<number | null>(null)
    const activeService = services.find(({id}) => id === activeId) ?? services[0]

    const {displayed: displayedService, isHidden} = useSequencedSwap(activeService)
    const ActiveIcon = displayedService ? SERVICE_ICONS[displayedService.icon] ?? PlaneIcon : PlaneIcon

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-row border-white/10">
                {services.map(({id, icon, title}) => {
                    const Icon = SERVICE_ICONS[icon] ?? PlaneIcon
                    const isActive = id === activeService?.id

                    return (
                        <button
                            key={id}
                            type="button"
                            aria-label={title}
                            aria-pressed={isActive}
                            onClick={() => setActiveId(id)}
                            className={`flex flex-1 items-center justify-center border-r border-white/10 py-5 transition-colors duration-300 last:border-r-0 ${isActive ? BG[icon] ?? 'bg-accent' : ''}`}
                        >
                            <div className="relative h-8 w-8 shrink-0 text-white">
                                <Icon
                                    className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <Icon
                                    filled
                                    className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </div>
                        </button>
                    )
                })}
            </div>

            {activeService && displayedService && (
                <div
                    className={`flex flex-1 flex-col items-center justify-center p-8 pb-10 transition-colors duration-300 ${BG[activeService.icon] ?? 'bg-accent'}`}
                >
                    <ActiveIcon
                        filled
                        className={`h-40 w-40 shrink-0 pb-6 text-white transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <h3
                        className={`w-full text-center text-2xl font-bold uppercase leading-tight text-white transition-all duration-300 ${isHidden ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}
                    >
                        {displayedService.title}
                    </h3>
                </div>
            )}
        </div>
    )
}
