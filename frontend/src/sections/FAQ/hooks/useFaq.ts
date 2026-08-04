import {useEffect, useState} from "react";
import type {FaqItem} from "@/domain/faq.ts";

export const useFaq = () => {
    const [faq, setFaq] = useState<FaqItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        fetch('/api/faq')
            .then((res) => res.json())
            .then((data: FaqItem[]) => {
                if (!cancelled) setFaq(data)
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return {faq, isLoading}
}
