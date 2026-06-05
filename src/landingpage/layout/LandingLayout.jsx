import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-brand-white text-brand-title">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout
