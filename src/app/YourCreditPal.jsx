import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApplyForm, Blog, BlogPostSection, Faq, Home, LandingLayout, Legal, ScrollToTop, Unsubscribe } from '../landingpage'

const router = createBrowserRouter([
  {
    path: '/apply',
    element: (
      <>
        <ScrollToTop />
        <ApplyForm />
      </>
    ),
  },
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <LandingLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'faq',
        element: <Faq />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPostSection />,
      },
      {
        path: 'legal/:slug',
        element: <Legal />,
      },
      {
        path: 'unsubscribe',
        element: <Unsubscribe />,
      },
    ],
  },
])

function YourCreditPal() {
  return <RouterProvider router={router} />
}

export default YourCreditPal
