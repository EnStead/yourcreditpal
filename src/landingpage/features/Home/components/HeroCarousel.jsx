import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";
import Encrypted from '../../../../assets/EncryptedData.svg?react'
import Security from '../../../../assets/SecureShield.svg?react'
import Fast from '../../../../assets/FastLender.svg?react'
import Multiple from '../../../../assets/Multiple.svg?react'
import "swiper/css";



const credTypes = [
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },
  { src: Encrypted, alt: "Encrypted", title: "Encrypted Data" },
  { src: Security, alt: "Security", title: "Secure Application" },
  { src: Fast, alt: "Fast Lender Matching", title: "Fast Lender Matching" },
  { src: Multiple, alt: "Multiple Lenders", title: "Multiple Lending Partners" },

  // add more as needed
];


const HeroCarousel = () => {
  return (
    <div className="w-full mx-auto bg-brand-secondary py-1 ">
        {/* Carousel Section */}
        <Swiper
            modules={[Autoplay]}
              slidesPerView="auto"   // allow natural width
                spaceBetween={80}
                loop={true}
                speed={8000}          // make it very slow & smooth
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false} // optional, so users don’t drag
                className="continuous-slider"
        >

            {credTypes.concat(credTypes).map((cred, index) => (
                <SwiperSlide key={index} className="!w-auto">
                    <div className="flex items-center py-2 gap-12 md:gap-18 w-fit">
                        {/* Image */}
                        <div>
                            <cred.src
                                className="w-5 md:w-8 h-full object-cover"
                                aria-label={cred.alt}
                            />
                        </div>

                        {/* Text */}
                        <div>
                        <h3 className=" md:text-xl text-brand-white font-bold uppercase">
                            {cred.title}
                        </h3>
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            
        </Swiper>
    </div>
  )
}

export default HeroCarousel