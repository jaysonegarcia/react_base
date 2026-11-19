import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteLayout } from '@/components/layout/SiteLayout/SiteLayout'
import { HomePage } from '@/pages/home'
import { AboutPage } from '@/pages/about'
import { ContactPage } from '@/pages/contact'
import { NewsPage } from '@/pages/news'
import { NewsArticlePage } from '@/pages/news-article'
import { NotFoundPage } from '@/pages/not-found'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsArticlePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
