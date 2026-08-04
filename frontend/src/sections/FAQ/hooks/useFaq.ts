import {useEffect, useState} from "react";
import type {FaqItem} from "@/domain/faq.ts";

export const useFaq = () => {
    const [faq, setFaq] = useState<FaqItem[]>([])

    useEffect(() => {
        let cancelled = false

        fetch('/api/faq')
            .then((res) => res.json())
            .then((data: FaqItem[]) => {
                if (!cancelled) setFaq(data)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return faq
}
