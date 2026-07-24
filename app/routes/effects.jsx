import { Outlet } from 'react-router'
import ScrollToTop from '../../src/landingpage/components/ScrollToTop'

export default function Effects() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}
