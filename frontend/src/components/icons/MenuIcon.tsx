import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

export function MenuIcon({ className = '', open = false, ...props }: Props) {
  return (
    <div className={`flex flex-col items-center justify-between py-[3px] cursor-pointer ${className}`} {...props}>
      <span
        className={`h-1 w-8 bg-current transition-all duration-200 ${open ? 'translate-y-[11px] rotate-45' : 'group-hover:w-4'}`}
      />
      <span
        className={`h-1 w-4 bg-current transition-all duration-200 ${open ? 'w-0 opacity-0' : 'group-hover:w-8'}`}
      />
      <span
        className={`h-1 w-8 bg-current transition-all duration-200 ${open ? '-translate-y-[11px] -rotate-45' : 'group-hover:w-4'}`}
      />
    </div>
  )
}
