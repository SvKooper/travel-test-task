import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { WhatsappIcon } from '@/components/icons/WhatsappIcon'
import { TelegramIcon } from '@/components/icons/TelegramIcon'
import { TwitterIcon } from '@/components/icons/TwitterIcon'
import { YoutubeIcon } from '@/components/icons/YoutubeIcon'
import { TiktokIcon } from '@/components/icons/TiktokIcon'

const links = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'WhatsApp', href: '#', Icon: WhatsappIcon },
  { label: 'Telegram', href: '#', Icon: TelegramIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
  { label: 'TikTok', href: '#', Icon: TiktokIcon },
]

function SocialLinks() {
  return (
    <ul className="flex items-center gap-4">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            className="block text-white/90 transition-colors hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
