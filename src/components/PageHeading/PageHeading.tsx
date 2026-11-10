import type { ReactNode } from 'react'
import { siteConfig } from '@/config/site'

type PageHeadingProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PageHeading({
  title,
  description,
  children,
}: PageHeadingProps) {
  return (
    <div className="max-w-2xl space-y-5">
      <title>{`${title} | ${siteConfig.name}`}</title>
      <meta name="description" content={description} />
      {children}
      <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
