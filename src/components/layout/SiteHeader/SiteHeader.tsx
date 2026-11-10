import { CodeXml } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CodeXml className="size-5" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-muted',
                  isActive
                    ? 'bg-secondary text-primary'
                    : 'text-muted-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
