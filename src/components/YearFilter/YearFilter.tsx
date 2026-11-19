import { Link } from 'react-router'
import { cn } from '@/lib/utils'

type YearFilterProps = {
  years: number[]
  activeYear: number | null
}

const chipStyles =
  'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors'
const activeStyles = 'border-primary bg-primary text-primary-foreground'
const inactiveStyles =
  'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'

export function YearFilter({ years, activeYear }: YearFilterProps) {
  return (
    <nav
      aria-label="Filter news by year"
      className="flex flex-wrap items-center gap-2"
    >
      <Link
        to="/news"
        aria-current={activeYear === null ? 'page' : undefined}
        className={cn(
          chipStyles,
          activeYear === null ? activeStyles : inactiveStyles,
        )}
      >
        All
      </Link>
      {years.map((year) => {
        const isActive = activeYear === year

        return (
          <Link
            key={year}
            to={`/news?year=${year}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(chipStyles, isActive ? activeStyles : inactiveStyles)}
          >
            {year}
          </Link>
        )
      })}
    </nav>
  )
}
