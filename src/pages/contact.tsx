import { useState, type SubmitEvent } from 'react'
import { Mail } from 'lucide-react'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/Button/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'
import { Input } from '@/components/ui/Input/Input'
import { Label } from '@/components/ui/Label/Label'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { siteConfig } from '@/config/site'

export function ContactPage() {
  const [previewed, setPreviewed] = useState(false)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPreviewed(true)
  }

  return (
    <div className="space-y-12">
      <PageHeading
        title="Good things start with a conversation."
        description="A ready-to-customize contact page for your next project. Add your details and connect the form to your preferred service."
      />
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-5">
          <Mail className="size-6 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Say hello</h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-primary underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            This is a placeholder address. Replace it in{' '}
            <code className="text-foreground">src/config/site.ts</code> before
            publishing.
          </p>
        </aside>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Try the form</CardTitle>
            <p
              id="demo-notice"
              className="text-sm leading-6 text-muted-foreground"
            >
              Demo only: this form does not send or store messages. All fields
              are required.
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              onChange={() => setPreviewed(false)}
              aria-describedby="demo-notice"
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={100}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What are you working on?"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  className="min-h-32"
                />
              </div>
              <Button type="submit" className="h-11 px-5">
                Preview submission
              </Button>
              <p
                role="status"
                aria-live="polite"
                className="text-sm leading-6 text-primary"
              >
                {previewed
                  ? 'Demo complete. Your form is valid, but no message was sent or stored.'
                  : ''}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
