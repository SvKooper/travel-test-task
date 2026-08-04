const links = [
  { label: 'Ціни', href: '#prices' },
  { label: 'Про Маунті', href: '#about' },
  { label: 'Спорядження', href: '#gear' },
  { label: 'Маршрути', href: '#routes' },
  { label: 'Послуги', href: '#services' },
  { label: 'FAQ', href: '#faq' },
]

function Nav() {
  return (
    <nav>
      <ul className="-ml-4 flex flex-col text-sm font-bold uppercase tracking-wide text-white">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="inline-block p-[8px] transition-colors hover:bg-primary"
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
