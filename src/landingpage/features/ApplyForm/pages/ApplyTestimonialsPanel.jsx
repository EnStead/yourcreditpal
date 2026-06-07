import { ChevronLeft, ChevronRight, Lock, Mail, ShieldCheck } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import Testimony from '../../../../assets/Testimony.jpg'

const testimonials = [
  {
    text: 'I appreciated the clean experience and the clear communication throughout the application process.',
    name: 'Eric W.',
    location: 'Houston, Tx',
    image: Testimony,
  },
  {
    text: 'I completed my application from my phone in just a few minutes. The experience felt secure and professional.',
    name: 'Danielle K.',
    location: 'Phoenix, AZ',
    image: Testimony,
  },
  {
    text: 'YourCreditpal made it easier to explore my options without having to fill out multiple applications.',
    name: 'Jason M.',
    location: 'Tampa, FL',
    image: Testimony,
  },
]

const ApplyTestimonialsPanel = () => {
  const activeIndex = 0

  return (
    <aside className="hidden bg-brand-lightblue px-5 py-5 sm:px-7 sm:py-7 lg:flex lg:flex-col lg:px-8 lg:py-8">
      <div className="flex items-center justify-between text-sm text-brand-body">
        <span className="inline-flex items-center gap-2">
          <Mail className="h-4 w-4" />
          info@yourcreditpal.com
        </span>
        <span>© 2026 YourCreditpal.</span>
      </div>
 
      {/* <div className="flex flex-1 items-center justify-center py-8">
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

                <p className="max-w-lg text-2xl leading-[1.6] tracking-[-0.03em] text-brand-title lg:text-3xl">
                  {item.text}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                  <div className="text-left">
                    <div className="text-xl font-semibold text-brand-title">{item.name}</div>
                    <div className="text-sm text-brand-body">{item.location}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      <div className="flex items-center justify-center gap-6">
        <button type="button" className="apply-testimonial-prev text-2xl text-brand-title">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`block rounded-full transition-all ${activeIndex === dotIndex ? 'h-2 w-7 bg-brand-title' : 'h-2 w-2 bg-brand-stroke'}`}
            />
          ))}
        </div>
        <button type="button" className="apply-testimonial-next text-2xl text-brand-title">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-auto space-y-5 pt-8 pb-1 text-sm text-brand-title">
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <ShieldCheck className="h-5 w-5" />
          <span>Your information is safe</span>
        </div>
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <Lock className="h-5 w-5" />
          <span>Secure and encrypted data handling</span>
        </div>
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-title/10">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-title" />
          </div>
          <span>Your credit score is also not affected</span>
        </div>
      </div>
    </aside>
  )
}

export default ApplyTestimonialsPanel
