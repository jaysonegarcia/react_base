import { useEffect, useState } from 'react'
import { fetchHomeContent, type HomeContent } from '@/lib/home-content'

type HomeContentState =
  | { status: 'loading' }
  | { status: 'success'; data: HomeContent }
  | { status: 'error'; message: string }

export function useHomeContent() {
  const [state, setState] = useState<HomeContentState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await fetchHomeContent(controller.signal)
        if (!controller.signal.aborted) setState({ status: 'success', data })
      } catch {
        // Leaving this page (or React StrictMode's development cleanup) aborts
        // the old request. Cancellation is not an error to show to the user.
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            message: 'We couldn’t load the home content. Please try again.',
          })
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return { state, retry }
}
