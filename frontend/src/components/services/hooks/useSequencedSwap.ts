import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'exiting' | 'entering'

interface Identifiable {
    id: number
}

// Swaps `displayed` to `active` in two steps: the current content is given a
// chance to fade/slide out first, and only once that's done is it replaced and
// faded/slid back in. A plain CSS transition can't sequence "out, then in" on
// its own, so it's driven here.
export function useSequencedSwap<T extends Identifiable>(active: T | undefined, transitionMs = 300) {
    const [displayed, setDisplayed] = useState(active)
    const [phase, setPhase] = useState<Phase>('idle')
    const displayedIdRef = useRef(active?.id)

    useEffect(() => {
        if (!active) return

        if (active.id === displayedIdRef.current) {
            setPhase('idle')
            return
        }

        if (displayedIdRef.current === undefined) {
            displayedIdRef.current = active.id
            setDisplayed(active)
            setPhase('entering')
            return
        }

        setPhase('exiting')
        const exitTimer = setTimeout(() => {
            displayedIdRef.current = active.id
            setDisplayed(active)
            setPhase('entering')
        }, transitionMs)

        return () => clearTimeout(exitTimer)
    }, [active?.id, transitionMs])

    useEffect(() => {
        if (phase !== 'entering') return

        // Double rAF: let the browser paint the "hidden" starting position first,
        // then flip to the resting classes so the transition actually animates.
        const frame = requestAnimationFrame(() => {
            requestAnimationFrame(() => setPhase('idle'))
        })

        return () => cancelAnimationFrame(frame)
    }, [phase])

    return { displayed, isHidden: phase !== 'idle' }
}
