import type { HTMLAttributes } from 'react'

export function MenuIcon({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col items-center justify-between py-[3px] cursor-pointer ${className}`} {...props}>
      <span className="h-1 w-8 bg-current transition-all duration-200 group-hover:w-4" />
      <span className="h-1 w-4 bg-current transition-all duration-200 group-hover:w-8" />
      <span className="h-1 w-8 bg-current transition-all duration-200 group-hover:w-4" />
    </div>
  )
}
