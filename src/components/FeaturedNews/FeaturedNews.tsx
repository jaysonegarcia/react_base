import { Link } from 'react-router'
import { useNews } from '@/hooks/useNews'
import { Button } from '@/components/ui/Button/Button'
import { NewsListItem } from '@/components/NewsListItem/NewsListItem'

type FeaturedNewsProps = {
  title: string
  description: string
  viewAllLabel: string
}

export function FeaturedNews({
  title,
  description,
  viewAllLabel,
}: FeaturedNewsProps) {
  const { state, retry } = useNews()

  return (
    <section
      aria-labelledby="featured-news-heading"
      className="space-y-8 border-t pt-10"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-3">
          <h2
            id="featured-news-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            {title}
          </h2>
          <p className="leading-7 text-muted-foreground">{description}</p>
        </div>
        <Button asChild variant="outline" className="h-11 shrink-0 px-5">
          <Link to="/news">{viewAllLabel}</Link>
        </Button>
      </div>

      {state.status === 'loading' && (
        <p role="status" className="text-sm text-muted-foreground">
          Loading latest news…
        </p>
      )}

      {state.status === 'error' && (
        <div className="flex flex-wrap items-center gap-4">
          <p role="alert" className="text-sm text-muted-foreground">
            {state.message}
          </p>
          <Button onClick={retry} variant="outline" className="h-9 px-4">
            Try again
          </Button>
        </div>
      )}

      {state.status === 'success' &&
        (state.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            New articles will appear here.
          </p>
        ) : (
          <div className="border-b">
            {state.data.slice(0, 3).map((article) => (
              <NewsListItem key={article.slug} article={article} />
            ))}
          </div>
        ))}
    </section>
  )
}
