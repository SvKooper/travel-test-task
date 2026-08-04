import {useEffect, useState} from "react";
import type {SiteContent} from "@/domain/content.ts";

const DEFAULT_CONTENT: SiteContent = {
    heroTitle: 'Мааааам, я\nв Карпати',
}

export const useSiteContent = () => {
    const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)

    useEffect(() => {
        let cancelled = false

        fetch('/api/content')
            .then((res) => res.json())
            .then((data: SiteContent) => {
                if (!cancelled) setContent(data)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return content
}
