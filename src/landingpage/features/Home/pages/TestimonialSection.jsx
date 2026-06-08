import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Star from '../../../../assets/Star.svg?react'
import { Star as LucideStar } from 'lucide-react'
import Testimony from '../../../../assets/Testimony.jpg'
import Live from '../../../../assets/Live.svg?react'
import Left from '../../../../assets/Left.svg?react'
import Right from '../../../../assets/Right.svg?react'

gsap.registerPlugin(ScrollTrigger)

const data = [
  {
    image: Testimony,
    name: "Sarah Jenkins",
    country: "Houston, TX",
    text: "YourCreditPal made finding a loan incredibly easy. I was matched with a lender within minutes and the funds were deposited the next day.",
  },
  {
    image: Testimony,
    name: "Michael Chen",
    country: "Atlanta, GA",
    text: "I was worried about my credit history, but YourCreditPal found options that worked for me. Highly recommend their service!",
  },
  {
    image: Testimony,
    name: "Emma Thompson",
    country: "Phoenix, AZ",
    text: "The transparency and speed of the entire process were outstanding. No hidden fees and straight to the point.",
  },
  {
    image: Testimony,
    name: "David Rodriguez",
    country: "Tampa, FL",
    text: "Excellent service! The platform is very intuitive and it saved me hours of researching different lenders manually.",
  },
  {
    image: Testimony,
    name: "Aisha Patel",
    country: "Charlotte, NC",
    text: "I've used other loan matching services before, but YourCreditPal is by far the most reliable and user-friendly.",
  },
]

const stats = [
  {
    value: 1824593,
    suffix: '',
    label: 'Applications Submitted Through YourCreditPal',
  },
  {
    value: 50,
    suffix: 'k+',
    label: 'Monthly Applicants',
  },
  {
    value: 50,
    suffix: '',
    label: 'States Nationwide',
  },
]

const TestimonialSection = () => {
  const statsRef = useRef(null)
  const countRefs = useRef([])

  useLayoutEffect(() => {
    if (!statsRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const counters = countRefs.current.filter(Boolean)

      const animateCount = (el, endValue, suffix = '') => {
        const state = { value: 0 }

        gsap.to(state, {
          value: endValue,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = Math.round(state.value).toLocaleString()
            el.textContent = `${formatted}${suffix}`
          },
        })
      }

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          counters.forEach((el, index) => {
            const item = stats[index]
            if (!item) return
            animateCount(el, item.value, item.suffix)
          })
        },
      })
    }, statsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative px-5 py-20 sm:px-10 lg:px-20">
      <div className="flex ml:flex-row flex-col items-center justify-between mb-16 w-full">
        {/* Left: Title + Subtext */}
        <div className="w-full ml:w-1/2 text-center ml:text-left mb-7 ml:mb-0 ml:pr-8">
          <div className="flex items-center justify-center ml:justify-start gap-3">
            <span className="text-sm font-medium text-brand-accent2">
              Real People. Real Applications
            </span>
            <Star className="h-3 w-3 text-brand-accent2" />
          </div>
          <h2 className="font-bold text-3xl md:text-5xl text-brand-title my-7">
            Applicants Continue to Trust YourCreditPal Every Day
          </h2>
          <p className="text-brand-body font-sans text-lg font-normal">
            YourCreditPal helps connect applicants with lending partners through a
            fast, secure, and simplified online experience.
          </p>
        </div>

        {/* Right: Carousel Buttons */}
        <div className="w-full ml:w-1/2 flex justify-center ml:justify-end gap-10">
          <button className="custom-prev !static !w-12 sm:!w-14 !h-12 sm:!h-14 !rounded-full !bg-brand-offwhite border-none flex items-center justify-center font-bold text-brand-black text-2xl  hover:!bg-brand-secondary hover:!text-brand-white active:!bg-brand-secondary active:!text-brand-white ">
            <Left className="h-4 w-4" />
          </button>
          <button className="custom-next !static !w-12 sm:!w-14 !h-12 sm:!h-14 !rounded-full !bg-brand-offwhite border-none flex items-center justify-center text-brand-black text-2xl  hover:!bg-brand-secondary hover:!text-brand-white active:!bg-brand-secondary active:!text-brand-white">
            <Right className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        speed={1000}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className=" h-[400px] xsm:h-[350px] md:h-[450px] pb-6"
      >
        {data.map((c, i) => (
          <SwiperSlide key={i} className=" md:px-0 ">
            {({ isActive }) => (
              <div className="flex-1 bg-brand-white flex flex-col ml:flex-row items-center gap-8 lg:gap-18 h-full ml:min-h-[300px]">
                
                <div className=" w-25 h-25 md:w-50 ml:w-100 md:h-50 ml:h-100 mt-5 rounded-lg sm:rounded-2xl shrink-0 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${
                      isActive ? "scale-105 opacity-100 translate-x-0 rotate-0 delay-100" : "scale-90 opacity-0 -translate-x-16 -rotate-3"
                    }`}
                  />
                </div>

                <div 
                  className={`p-0 md:p-0 ml-8 ml:mr-0 mr-8 lg:pr-18 transition-all duration-700 ease-out transform ${
                    isActive ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-50"
                  }`}
                >
                  <div className="items-center ml:flex hidden gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <LucideStar
                        key={idx}
                        className="w-4 h-4 text-brand-accent1 fill-brand-accent1"
                      />
                    ))}
                  </div>

                  <p className=" text-center md:text-left ssm:text-lg md:text-2xl ml:text-3xl font-park font-medium text-brand-title flex-1 mb-6 ml:my-6">
                    {c.text}
                  </p>
                  <div className="text-center md:text-left ">
                    <h4 className="  font-semibold text-sm ssm:text-base md:text-lg text-brand-body">
                      - {c.name}
                    </h4>
                    <span className="text-xs ssm:text-sm text-brand-label">
                      {c.country}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={statsRef}
        className="mt-16 rounded-3xl bg-brand-stroke p-3 sm:p-10 lg:p-14 flex flex-col items-center justify-around gap-10 md:flex-row md:gap-4"
      >
        {stats.map((item, index) => (
          <div key={item.label} className="text-center">
            <h3
              ref={(node) => {
                countRefs.current[index] = node
              }}
              className="mb-2 text-3xl sm:text-5xl font-extrabold text-brand-secondary"
            >
              0{item.suffix}
            </h3>
            <p className=" text-xs sm:text-sm font-medium text-brand-black">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-brand-title">
        <Live className="w-4 h-4" />
        Stats updated last by May 22, 2026, 00:05 am
      </p>
    </section>
  )
}

export default TestimonialSection
