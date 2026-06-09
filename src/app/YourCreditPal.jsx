import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import {
  ApplyForm,
  Blog,
  BlogPostSection,
  Faq,
  Home,
  LandingLayout,
  Legal,
  ScrollToTop,
  Unsubscribe,
} from '../landingpage'
import MetaPixelTracker from '../landingpage/components/MetaPixelTracker'

const RouteEffects = () => {
  return (
    <>
      <ScrollToTop />
      <MetaPixelTracker />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RouteEffects />,
    children: [
      {
        path: '/apply',
        element: <ApplyForm />,
      },
      {
        path: '/',
        element: <LandingLayout />,
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
    ],
  },
])

function YourCreditPal() {
  return <RouterProvider router={router} />
}

export default YourCreditPal
