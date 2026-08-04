// Tailwind's scanner needs these arbitrary-value classes to appear literally in source —
// keep them as static strings rather than building "hover:bg-[...]" at runtime.
export const HOVER_BG: Record<string, string> = {
    plane: 'hover:bg-[#112020]',
    hiking: 'hover:bg-[#881e1e]',
    bike: 'hover:bg-[#4f1e8a]',
    car: 'hover:bg-[#bd8112]',
    boat: 'hover:bg-[#295b49]',
}

// Same palette, unprefixed — used for the mobile active tab and its expanded panel.
export const BG: Record<string, string> = {
    plane: 'bg-[#112020]',
    hiking: 'bg-[#881e1e]',
    bike: 'bg-[#4f1e8a]',
    car: 'bg-[#bd8112]',
    boat: 'bg-[#295b49]',
}
