const links = [
  { label: 'Ціни', href: '#prices' },
  { label: 'Про Маунті', href: '#about' },
  { label: 'Спорядження', href: '#gear' },
  { label: 'Маршрути', href: '#routes' },
  { label: 'Послуги', href: '#services' },
  { label: 'FAQ', href: '#faq' },
]

interface Props {
  variant?: 'default' | 'mobile'
  onNavigate?: () => void
}

function Nav({ variant = 'default', onNavigate }: Props) {
  const isMobile = variant === 'mobile'

  return (
    <nav>
      <ul
        className={`flex flex-col font-bold uppercase text-white ${
          isMobile ? 'gap-2 text-3xl tracking-wide' : '-ml-4 text-sm tracking-wide'
        }`}
      >
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              onClick={onNavigate}
              className={`inline-block transition-colors hover:bg-primary ${isMobile ? 'py-2' : 'p-[8px]'}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
