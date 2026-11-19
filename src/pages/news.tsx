import { useSearchParams } from 'react-router'
import { useNews } from '@/hooks/useNews'
import { filterNewsByYear, getNewsYears } from '@/lib/news'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { NewsListItem } from '@/components/NewsListItem/NewsListItem'
import { YearFilter } from '@/components/YearFilter/YearFilter'
import { Button } from '@/components/ui/Button/Button'

export function NewsPage() {
  const { state, retry } = useNews()
  const [searchParams] = useSearchParams()

  if (state.status === 'loading') {
    return (
      <section aria-busy="true" className="space-y-6 py-12">
        <PageHeading
          title="News"
          description="Notes on the starter, its patterns, and the people building with it."
        />
        <p role="status" className="text-muted-foreground">
          Loading news…
        </p>
      </section>
    )
  }

  if (state.status === 'error') {
    return (
      <section className="space-y-6 py-12">
        <PageHeading
          title="News"
          description="Notes on the starter, its patterns, and the people building with it."
        />
        <p role="alert" className="text-muted-foreground">
          {state.message}
        </p>
        <Button onClick={retry} className="h-11 px-5">
          Try again
        </Button>
      </section>
    )
  }

  const years = getNewsYears(state.data)
  const requestedYear = Number(searchParams.get('year'))
  const activeYear = years.includes(requestedYear) ? requestedYear : null
  const articles = filterNewsByYear(state.data, activeYear)

  return (
    <div className="space-y-10">
      <PageHeading
        title="News"
        description="Notes on the starter, its patterns, and the people building with it."
      />

      <section aria-labelledby="news-list-heading" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <YearFilter years={years} activeYear={activeYear} />
          <p role="status" className="text-sm text-muted-foreground">
            {articles.length === 1
              ? '1 article'
              : `${articles.length} articles`}
            {activeYear === null ? '' : ` from ${activeYear}`}
          </p>
        </div>

        <h2 id="news-list-heading" className="sr-only">
          All news
        </h2>

        {articles.length === 0 ? (
          <p className="border-t pt-8 text-muted-foreground">
            No articles published in this year yet.
          </p>
        ) : (
          <div className="border-b">
            {articles.map((article) => (
              <NewsListItem key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
