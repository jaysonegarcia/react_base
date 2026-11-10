import { Blocks, FolderCode, Rocket, Terminal } from 'lucide-react'
import { Link } from 'react-router'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'

const features = [
  {
    icon: Blocks,
    title: 'Make it yours',
    description:
      'Accessible shadcn/ui components, Tailwind utilities, and a theme you can change in one place.',
  },
  {
    icon: FolderCode,
    title: 'Find your way around',
    description:
      'Pages, layouts, and UI components have a home. No elaborate architecture to learn first.',
  },
  {
    icon: Rocket,
    title: 'Ship when you’re ready',
    description:
      'Formatting, linting, type checks, and a Vercel configuration are already in place.',
  },
]

export function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <PageHeading
            title="Your next idea starts here."
            description="The setup is done. A clean React foundation with useful defaults, a few example pages, and plenty of room to build something of your own."
          >
            <Badge variant="secondary" className="px-3 py-1">
              Ready for a fresh start
            </Badge>
          </PageHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 px-5">
              <Link to="/about">Explore the starter</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-5">
              <Link to="/contact">Try the contact page</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            React · TypeScript · Tailwind CSS · shadcn/ui
          </p>
        </div>
        <Card className="overflow-hidden py-0 shadow-none">
          <CardHeader className="border-b bg-muted/50 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Terminal className="size-4 text-primary" aria-hidden="true" /> A
              place for everything
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-6">
            <pre className="overflow-x-auto text-sm leading-8 text-muted-foreground">
              <code>{`src/
├── app/          routing
├── pages/        your screens
├── components/   layouts & UI
├── config/       site details
└── lib/          shared helpers`}</code>
            </pre>
            <div className="rounded-lg bg-secondary px-4 py-3 font-mono text-sm text-primary">
              npm install && npm run dev
            </div>
          </CardContent>
        </Card>
      </section>
      <section aria-labelledby="foundation-heading">
        <h2
          id="foundation-heading"
          className="mb-8 text-2xl font-semibold tracking-tight"
        >
          Less setup. More building.
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="space-y-3 border-t pt-6">
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
          ))}
        </div>
      </section>
    </div>
  )
}
