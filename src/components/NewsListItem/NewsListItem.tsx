import { Link } from 'react-router'
import { formatNewsDate, type NewsArticle } from '@/lib/news'

type NewsListItemProps = {
  article: NewsArticle
}

export function NewsListItem({ article }: NewsListItemProps) {
  return (
    <article className="relative grid gap-3 border-t py-7 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:flex-col sm:items-start sm:gap-y-2">
        <time dateTime={article.publishedAt} className="text-muted-foreground">
          {formatNewsDate(article.publishedAt)}
        </time>
        <span className="font-medium text-primary">{article.category}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-balance">
          <Link
            to={`/news/${article.slug}`}
            className="decoration-primary/40 underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}
