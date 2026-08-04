import {useEffect, useState} from "react";

export const usePageLoad = () => {
    const [isLoaded, setIsLoaded] = useState(document.readyState === "complete");

    useEffect(() => {
        if (isLoaded) return;

        const handleLoad = () => setIsLoaded(true);
        window.addEventListener("load", handleLoad);

        return () => window.removeEventListener("load", handleLoad);
    }, [isLoaded]);

    return isLoaded;
};
