import { Outlet } from 'react-router'
import ScrollToTop from '../../src/landingpage/components/ScrollToTop'
import MetaPixelTracker from '../../src/landingpage/components/MetaPixelTracker'

export default function Effects() {
  return (
    <>
      <ScrollToTop />
      <MetaPixelTracker />
      <Outlet />
    </>
  )
}
