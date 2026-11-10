import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'

export function SiteLayout() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      window.scrollTo(0, 0)
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 outline-none sm:px-8 sm:py-20"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
