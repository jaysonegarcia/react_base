import { useEffect, useState } from 'react'
import { fetchNews, fetchNewsArticle, type NewsArticle } from '@/lib/news'

type NewsState =
  | { status: 'loading' }
  | { status: 'success'; data: NewsArticle[] }
  | { status: 'error'; message: string }

type NewsArticleState =
  | { status: 'loading' }
  | { status: 'success'; data: NewsArticle | null }
  | { status: 'error'; message: string }

export function useNews() {
  const [state, setState] = useState<NewsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await fetchNews(controller.signal)
        if (!controller.signal.aborted) setState({ status: 'success', data })
      } catch {
        // Leaving this page (or React StrictMode's development cleanup) aborts
        // the old request. Cancellation is not an error to show to the user.
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            message: 'We couldn’t load the news. Please try again.',
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

export function useNewsArticle(slug: string) {
  const [state, setState] = useState<NewsArticleState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await fetchNewsArticle(slug, controller.signal)
        if (!controller.signal.aborted) setState({ status: 'success', data })
      } catch {
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            message: 'We couldn’t load this article. Please try again.',
          })
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [slug, attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return { state, retry }
}
