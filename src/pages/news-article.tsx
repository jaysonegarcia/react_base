import { Link, useParams } from 'react-router'
import { useNewsArticle } from '@/hooks/useNews'
import { formatNewsDate } from '@/lib/news'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'

export function NewsArticlePage() {
  const { slug = '' } = useParams()
  const { state, retry } = useNewsArticle(slug)

  if (state.status === 'loading') {
    return (
      <section aria-busy="true" className="space-y-6 py-12">
        <PageHeading
          title="News"
          description="Notes on the starter, its patterns, and the people building with it."
        />
        <p role="status" className="text-muted-foreground">
          Loading article…
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

  if (state.data === null) {
    return (
      <section className="space-y-8 py-12">
        <PageHeading
          title="Article not found"
          description="We couldn’t find this article. It may have moved, or the address may be wrong."
        />
        <Button asChild className="h-11 px-5">
          <Link to="/news">Back to news</Link>
        </Button>
      </section>
    )
  }

  const article = state.data

  return (
    <article className="max-w-2xl space-y-8">
      <PageHeading title={article.title} description={article.excerpt}>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <time
            dateTime={article.publishedAt}
            className="text-muted-foreground"
          >
            {formatNewsDate(article.publishedAt)}
          </time>
          <span aria-hidden="true" className="text-muted-foreground">
            ·
          </span>
          <span className="font-medium text-primary">{article.category}</span>
        </div>
      </PageHeading>

      <div className="space-y-6 border-t pt-8 text-[1.0625rem] leading-8 text-pretty">
        {article.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="border-t pt-8">
        <Link
          to="/news"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          All news
        </Link>
      </div>
    </article>
  )
}
