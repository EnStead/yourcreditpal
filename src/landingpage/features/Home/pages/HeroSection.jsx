import { useState, useRef, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import heroImage from "../../../../assets/HeroImg.webp"; // Update with your actual image name and extension
import Logo from "../../../../assets/Logo.svg?react";
import GreenTick from "../../../../assets/GreenTick.svg?react";
import Line1 from "../../../../assets/Line1.png";
import Line2 from "../../../../assets/Line 2.png";
import Line3 from "../../../../assets/Line 3.png";
import Line4 from "../../../../assets/Line 4.png";
import Line5 from "../../../../assets/Line 5.png";
import Line7 from "../../../../assets/Line 7.png";
import RacingCar from "../../../../assets/RacingCar.png";
import MedicalCase from "../../../../assets/MedicalCase.png";
import HouseGarden from "../../../../assets/HouseGarden.png";
import Confetti from "../../../../assets/Confetti.png";
import CapConfetti from "../../../../assets/CapConfetti.png";
import HeroCarousel from "../components/HeroCarousel";

const HeroSection = () => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setScale(Math.min(width / 900, height / 400));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className=" min-h-[calc(100vh-160px)] py-20 ">
      <main className="px-5  sm:px-10 lg:px-20">
        <div className="text-center">
          <div className=" translate-y-2 border-3 border-brand-white  md:translate-y-3 z-10 inline-flex text-sm md:text-base  -rotate-3 rounded-full bg-brand-stroke px-3 md:px-5 py-2 font-medium text-brand-title transition duration-300 hover:rotate-0 hover:bg-brand-stroke">
            Fast • Secure • Simple Loan Matching
          </div>
          <h1 className="font-bold text-4xl md:text-6xl">
            Find Loan Offers That <br />{" "}
            <span className="text-brand-accent2">Match Your Needs </span>
          </h1>
          <p className="text-brand-body md:text-lg max-w-xl mx-auto mt-6 text-center">
            Complete a quick application and get matched with lenders based on
            your financial profile. No hidden fees, no complicated process.
          </p>
          <NavLink
            to="/apply"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand-primary px-7 py-3 font-heading text-sm font-semibold text-brand-white transition hover:opacity-90 md:px-10 md:text-base"
          >
            See My Personal Loan Options
          </NavLink>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-140 rounded-2xl hidden xls:block">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="relative overflow-hidden h-72 xsm:h-90 sm:h-90 ls:h-140 rounded-2xl bg-brand-lightblue p-2 md:p-6 md:col-span-3 xls:col-span-2">
            {/* Right Box (Larger) */}
            <div
              ref={containerRef}
              className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
            >
              <div
                className="relative flex justify-between items-center w-[900px] h-[400px] flex-shrink-0 origin-center"
                style={{ transform: `scale(${scale})` }}
              >
                <div className="rounded-xl relative z-10 bg-brand-white h-70 py-5 px-5 flex flex-col justify-between flex-shrink-0">
                  {[
                    "Phone Verified",
                    "Identity Checked",
                    "ZIP Confirmed",
                    "Income Validated",
                    "Application Submitted",
                    "Finding Lenders",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <GreenTick className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs font-medium text-brand-body">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* This decorative line is positioned between the first and second columns */}
                <img
                  src={Line1}
                  alt=""
                  className="absolute top-1/2 left-[31%] -translate-y-1/2 -translate-x-1/2"
                />
                <img
                  src={Line2}
                  alt=""
                  className="absolute top-[34%] left-[34.5%] -translate-y-1/2 -translate-x-1/2"
                />
                <img
                  src={Line3}
                  alt=""
                  className="absolute bottom-[0%] left-[34.5%] -translate-y-1/2 -translate-x-1/2"
                />
                <img
                  src={Line4}
                  alt=""
                  className="absolute top-1/2 right-[15%] -translate-y-1/2 -translate-x-1/2"
                />
                <img
                  src={Line5}
                  alt=""
                  className="absolute top-[22%] right-[2%] -translate-y-1/2 -translate-x-1/2"
                />
                <img
                  src={Line7}
                  alt=""
                  className="absolute bottom-[12%] right-[2%] -translate-y-1/2 -translate-x-1/2"
                />

                <div className=" relative z-10 flex flex-col justify-center gap-18 ">
                  {[
                    {
                      Icon: RacingCar,
                      title: "Estimated Loan",
                      amount: "$5,900",
                      period: "87% matched",
                      bgClass: "bg-brand-accent2/15",
                      textClass: "text-brand-accent2",
                    },
                    {
                      Icon: MedicalCase,
                      title: "Medical Loan",
                      amount: "$5,000",
                      period: "99% matched",
                      bgClass: "bg-brand-primary/15",
                      textClass: "text-brand-primary",
                    },
                    {
                      Icon: HouseGarden,
                      title: "Home Improvement",
                      amount: "$8,000",
                      period: "65% matched",
                      bgClass: "bg-brand-accent1/15",
                      textClass: "text-brand-accent1",
                    },
                  ].map(
                    (
                      { Icon, title, amount, period, bgClass, textClass },
                      idx,
                    ) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-brand-white h-16 flex items-center p-1.5 gap-3"
                      >
                        <div className="bg-brand-offwhite p-1 rounded-lg flex-shrink-0 w-10 h-10 flex items-center justify-center ">
                          <img
                            src={Icon}
                            alt={title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <span className="text-xs text-brand-title font-medium">
                            {title}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-lg text-brand-black">
                              {amount}
                            </span>
                            <span
                              className={`${bgClass} ${textClass} rounded-full font-medium px-1 text-[8px]`}
                            >
                              {period}
                            </span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div
                  className=" relative z-10 w-48 flex-shrink-0 rounded-xl bg-brand-white h-48 p-4 flex flex-col items-center justify-center text-center bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url(${Confetti})` }}
                >
                  <img
                    src={CapConfetti}
                    alt="Cap Confetti"
                    className="w-14 h-14 object-contain mb-1"
                  />
                  <span className="font-bold text-sm text-brand-title">
                    Congratulations
                  </span>
                  <span className="text-sm text-brand-label leading-tight mt-0.5">
                    A lender is reviewing your application
                  </span>
                </div>
              </div>
            </div>
            <Logo className="absolute -bottom-22 -right-22 w-56 h-56 text-brand-primary opacity-20" />
          </div>
        </div>
      </main>

      <div className="pt-20">
        <HeroCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
