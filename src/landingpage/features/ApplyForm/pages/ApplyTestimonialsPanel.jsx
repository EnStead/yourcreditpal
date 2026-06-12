import { useState } from 'react'
import { Mail, Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Left from '../../../../assets/Left.svg?react'
import Right from '../../../../assets/Right.svg?react'
import Infos from '../../../../assets/Infos.svg?react'
import Heart from '../../../../assets/Heart.svg?react'
import Gps from '../../../../assets/Gps.svg?react'
import Eric from '../../../../assets/eric.webp'
import Daniella from '../../../../assets/daniella.webp'
import Jason from '../../../../assets/jason.webp'

const testimonials = [
  {
    text: 'I appreciated the clean experience and the clear communication throughout the application process.',
    name: 'Eric W.',
    location: 'Houston, Tx',
    image: Eric,
  },
  {
    text: 'I completed my application from my phone in just a few minutes. The experience felt secure and professional.',
    name: 'Danielle K.',
    location: 'Phoenix, AZ',
    image: Daniella,
  },
  {
    text: 'YourCreditPal made it easier to explore my options without having to fill out multiple applications.',
    name: 'Jason M.',
    location: 'Tampa, FL',
    image: Jason,
  },
]

const ApplyTestimonialsPanel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <aside className="hidden min-w-0 mr-3 my-3 rounded-2xl bg-brand-lightblue px-5 py-5 sm:px-7 sm:py-7 lg:flex lg:flex-col lg:px-8 lg:py-8">
      <div className="flex items-center justify-between text-sm text-brand-body">
        <span className="inline-flex items-center gap-2">
          <Mail className="h-4 w-4" />
          contact@yourcreditpal.com
        </span>
        <span>© 2026 YourCreditPal.</span>
      </div>
 
      <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden py-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          navigation={{ nextEl: '.apply-testimonial-next', prevEl: '.apply-testimonial-prev' }}
          className="w-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <div className="mb-4 flex items-center gap-1 text-brand-accent1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-brand-accent1 text-brand-accent1" />
                  ))}
                </div>

                <p className="max-w-lg text-2xl font-medium font-heading text-brand-title">
                  {item.text}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                  <div className="text-left">
                    <div className="text-xl font-semibold text-brand-title">{item.name}</div>
                    <div className="text-sm font-light text-brand-label">{item.location}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-8 flex items-center justify-center gap-6">
          <button type="button" className="apply-testimonial-prev text-2xl text-brand-title">
            <Left className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`block rounded-full transition-all ${activeIndex === dotIndex ? 'h-2 w-7 bg-brand-title' : 'h-2 w-2 bg-brand-placeholder'}`}
              />
            ))}
          </div>
          <button type="button" className="apply-testimonial-next text-2xl text-brand-title">
            <Right className="h-4 w-4" />
          </button>
        </div>
      </div>


      <div className="mt-auto mx-auto text-center space-y-5 pt-8 pb-1 text-sm text-brand-title">
        <div className="flex items-center gap-3 justify-center ">
          <Infos className="h-5 w-5" />
          <span>Your information is safe</span>
        </div>
        <div className="flex items-center gap-3 justify-center ">
          <Heart className="h-5 w-5" />
          <span>Secure and encrypted data handling</span>
        </div>
        <div className="flex items-center gap-3 justify-center ">
          <Gps className="h-5 w-5" />
          <span>Your credit score is also not affected</span>
        </div>
      </div>
    </aside>
  )
}

export default ApplyTestimonialsPanel
