import { Link } from 'react-router'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'

export function NotFoundPage() {
  return (
    <div className="space-y-8 py-12">
      <p className="text-sm font-medium text-primary">404 / Page not found</p>
      <PageHeading
        title="A little off the path."
        description="This page doesn’t exist. Check the address or head back to the home page to find your way."
      />
      <Button asChild className="h-11 px-5">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}
