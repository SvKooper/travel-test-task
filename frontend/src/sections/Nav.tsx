const links = [
  { label: 'Ціни', href: '#prices' },
  { label: 'Про Маунті', href: '#about' },
  { label: 'Спорядження', href: '#gear' },
  { label: 'Маршрути', href: '#routes' },
  { label: 'FAQ', href: '#faq' },
]

function Nav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-wide text-white">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="transition-colors hover:text-white/70">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
