import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-7 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>A small foundation. Room for your ideas.</p>
      </div>
    </footer>
  )
}
