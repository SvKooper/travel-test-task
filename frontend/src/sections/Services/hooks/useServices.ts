import {useEffect, useState} from "react";
import type {ServiceItem} from "@/domain/services.ts";

export const useServices = () => {
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

    return services
}
