import { Blocks, FolderCode, Rocket, Terminal } from 'lucide-react'
import { Link } from 'react-router'
import { useHomeContent } from '@/hooks/useHomeContent'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'

// JSON holds serializable icon names; React components stay in the UI layer.
const featureIcons = {
  blocks: Blocks,
  'folder-code': FolderCode,
  rocket: Rocket,
}

export function HomePage() {
  const { state, retry } = useHomeContent()

  if (state.status === 'loading') {
    return (
      <section aria-busy="true" className="space-y-6 py-12">
        <PageHeading
          title="Home"
          description="A thoughtful starting point for your next project."
        />
        <p role="status" className="text-muted-foreground">
          Loading home content…
        </p>
      </section>
    )
  }

  if (state.status === 'error') {
    return (
      <section className="space-y-6 py-12">
        <PageHeading
          title="Home"
          description="A thoughtful starting point for your next project."
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

  const content = state.data

  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <PageHeading title={content.title} description={content.description}>
            <Badge variant="secondary" className="px-3 py-1">
              {content.badge}
            </Badge>
          </PageHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 px-5">
              <Link to="/about">{content.aboutLabel}</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-5">
              <Link to="/contact">{content.contactLabel}</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{content.stack}</p>
        </div>
        <Card className="overflow-hidden py-0 shadow-none">
          <CardHeader className="border-b bg-muted/50 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Terminal className="size-4 text-primary" aria-hidden="true" />
              {content.previewTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-6">
            <pre className="overflow-x-auto text-sm leading-8 text-muted-foreground">
              <code>{content.previewLines.join('\n')}</code>
            </pre>
            <div className="rounded-lg bg-secondary px-4 py-3 font-mono text-sm text-primary">
              {content.command}
            </div>
          </CardContent>
        </Card>
      </section>
      <section aria-labelledby="foundation-heading">
        <h2
          id="foundation-heading"
          className="mb-8 text-2xl font-semibold tracking-tight"
        >
          {content.featuresTitle}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {content.features.map(({ id, icon, title, description }) => {
            const Icon = featureIcons[icon]
            return (
              <div key={id} className="space-y-3 border-t pt-6">
                <Icon
                  className="mb-5 size-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
