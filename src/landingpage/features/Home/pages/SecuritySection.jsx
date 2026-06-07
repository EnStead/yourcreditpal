import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SecurityImg from '../../../../assets/SecurityImg.jpg'
import Star from '../../../../assets/Star.svg?react'
import PieChart from '../../../../assets/PieChart.svg?react'
import HealthInsur from '../../../../assets/HealthInsur.png'
import Signature from '../../../../assets/signature.svg?react'
import Sign2 from '../../../../assets/sign2.svg?react'

gsap.registerPlugin(ScrollTrigger)

const SecuritySection = () => {
  const sectionRef = useRef(null)
  const floatingRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const floatConfigs = [
        { from: { y: 70, x: -18, rotate: -4, scale: 0.88 } },
        { from: { y: 55, x: -10, rotate: 2, scale: 0.92 } },
        { from: { y: 80, x: 16, rotate: 5, scale: 0.88 } },
      ]

      floatingRefs.current.forEach((el, index) => {
        if (!el || !floatConfigs[index]) return

        gsap.fromTo(
          el,
          {
            ...floatConfigs[index].from,
            opacity: 0,
          },
          {
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1.2,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-5 py-20 sm:px-10 lg:px-20">
      <main className="bg-brand-darkBlue p-5 sm:p-10 md:p-20 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-brand-lightblue">
              Security & Privacy
            </span>
            <Star className="h-3 w-3 text-brand-lightblue" />
          </div>
          <h2 className="text-3xl ls:text-4xl font-bold text-brand-white mb-6">
            Your Information Matters
          </h2>
          <p className="ls:text-lg text-brand-offwhite mb-14 max-w-xl">
            We use secure technology and verification systems to help protect your personal information throughout the application process.
          </p>

          <div className="flex flex-col border-t-2 border-brand-skyBlue">
            {[
              { title: 'SSL Encrypted Connection', text: 'Your information is securely transmitted using encrypted connections.' },
              { title: 'Secure Verification Process', text: 'We verify submitted information to help reduce fraudulent applications.' },
              { title: 'Responsible Data Practices', text: 'We work to handle your information carefully and responsibly.' },
            ].map((item, idx) => (
              <div key={idx} className="border-b-2 border-brand-skyBlue py-6">
                <h4 className="text-xl font-semibold text-brand-offwhite mb-2">{item.title}</h4>
                <p className="text-brand-stroke font-normal">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full h-[400px] lg:h-[600px]">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <img
              src={SecurityImg}
              alt="Security and Privacy"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            ref={(el) => (floatingRefs.current[0] = el)}
            className="absolute -top-8 -left-4 lg:-left-8 bg-brand-white px-5 py-4 lg:px-6 rounded-2xl border-[12px] border-brand-darkBlue will-change-transform"
          >
            <div className="flex flex-col">
              <span className="text-brand-title text-xs xsm:text-base font-bold font-heading mb-0.5">Application Status</span>
              <div className="flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-brand-primary" />
                <span className="text-xs xsm:text-xs text-brand-label">4/5 complete</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <img src={HealthInsur} alt="Health Insurance" className="w-14 h-14 object-contain" />
            </div>
          </div>

          <div
            ref={(el) => (floatingRefs.current[1] = el)}
            className="absolute bottom-[40%] xsm:bottom-[25%] -left-6 lg:-left-12 bg-brand-white px-5 py-2 lg:px-6 rounded-full will-change-transform"
          >
            <span className="text-brand-title font-medium font-heading text-xs xsm:text-sm">Identity Verified</span>
          </div>

          <div
            ref={(el) => (floatingRefs.current[2] = el)}
            className="absolute -bottom-2 ssm:-bottom-8 -right-4 lg:-right-8 bg-brand-white px-5 py-4 lg:px-6 rounded-2xl border-[12px] border-brand-darkBlue will-change-transform"
          >
            <span className="text-brand-primary font-bold font-heading text-xs xsm:text-sm block mb-1">e-Consent Approved</span>
            <div className="flex items-center">
              <Signature className="h-7 xsm:h-10 w-auto" />
              <Sign2 className="h-3 xsm:h-4 w-auto -ml-1" />
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default SecuritySection
