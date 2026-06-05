import Star from "../../../../assets/Star.svg?react";
import Logo from "../../../../assets/Logo.svg?react";
import LooperBg from "../../../../assets/Looper.png";
import Grid2 from "../../../../assets/Grid2.png"; // Update extension if it's .svg
import File from "../../../../assets/File.png"; // Update extension if it's .png
import Upfront from "../../../../assets/Upfront.png";
import Lend from "../../../../assets/Lend.png";
import Flexible from "../../../../assets/Flexible.png";
import Mobile from "../../../../assets/Mobile.png";
import Quick from "../../../../assets/Quick.png";
import Quick2 from "../../../../assets/Quick2.png"; // Make sure to use the correct extension if it's not a .png

const whyCards = [
  {
    title: "Quick Online Process",
    copy: "Complete your application in just a few minutes from your phone or computer.",
    tone: "light",
    span: "h-[340px] ml:h-auto ml:col-start-1 ml:row-start-1 ml:col-span-2 ml:row-span-6",
    layout: "split",
  },
  {
    title: "Secure Information Handling",
    copy: "Your information is protected using modern encryption and security standards.",
    tone: "primary",
    span: "h-[340px] ml:h-auto ml:col-start-3 ml:row-start-1 ml:col-span-1 ml:row-span-6",
    textCenter: true,
  },
  {
    title: "YourCreditPal",
    copy: "",
    tone: "dark",
    compact: true,
    span: "h-[140px] ml:h-auto ml:col-start-1 ml:row-start-7 ml:row-span-2",
  },
  {
    title: "Flexible Credit Consideration",
    copy: "Loan opportunities may still be available for applicants with varying credit backgrounds.",
    tone: "light",
    span: "h-[300px] ml:h-auto ml:col-start-1 ml:row-start-9 ml:row-span-6",
    layout: "image-bottom",
    textCenter: true,
  },
  {
    title: "Mobile-Friendly Experience",
    copy: "Apply anytime, anywhere with a smooth mobile experience.",
    tone: "light",
    span: "ml:col-start-2 ml:row-start-7 ml:row-span-8",
    layout: "image-bottom",
    textCenter: true,
  },
  {
    title: "Multiple Lending Partners",
    copy: "We work with a network of lenders and financial partners.",
    tone: "light",
    span: "ml:col-start-3 ml:row-start-7 ml:row-span-4",
    textCenter: true,
  },
  {
    title: "No Upfront Fees",
    copy: "Using YourCreditPal will never cost you.",
    tone: "light",
    span: "ml:col-start-3 ml:row-start-11 ml:row-span-4",
    textCenter: true,
  },
];

const WhySection = () => {
  return (
    <section id="why" className="relative bg-brand-lightblue px-5 py-20 sm:px-8 ml:px-20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-brand-accent2">
            Why YourCreditPal
          </span>
          <Star className="h-3 w-3 text-brand-accent2" />
        </div>
        <h2 className="mx-auto my-8 max-w-xl text-3xl font-bold text-brand-title md:text-5xl">
          Designed to Make Loan Matching Easier
        </h2>
        <p className="mx-auto max-w-xl text-lg text-brand-body">
          Our platform helps simplify the process of finding lenders that may
          fit your financial situation.
        </p>
      </div>

      <main className="mt-12 grid gap-5 ml:grid-cols-3 ml:auto-rows-[3.5rem]">
        {whyCards.map((card) => {
          const isPrimary = card.tone === "primary";
          const isDark = card.tone === "dark";

          return (
            <article
              key={card.title}
              className={`relative overflow-hidden rounded-[1.8rem] ${
                card.title === "Multiple Lending Partners" ? "px-3 lss:px-8 pb-3 lss:pb-8 pt-0  lss:pt-0" : "p-3 lss:p-8"
              } ${card.span || ""} ${card.textCenter ? "text-center" : ""} ${
                isPrimary
                  ? "bg-brand-primary text-brand-white bg-no-repeat bg-cover bg-top"
                  : isDark
                    ? "bg-brand-secondary text-brand-white bg-no-repeat bg-cover bg-center"
                    : "bg-white text-brand-title"
              } ${card.compact ? "flex items-center justify-center" : "flex flex-col justify-between"}`}
              style={isDark ? { backgroundImage: `url(${LooperBg})` } : isPrimary ? { backgroundImage: `url(${Grid2})` } : undefined}
            >
              {isPrimary && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent"></div>
              )}

              {isDark ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center">
                    <Logo className="h-10 w-10 text-brand-primary" />
                  </div>
                  <span className="text-lg lg:text-2xl font-heading font-bold tracking-[-0.03em]">
                    YourCreditPal
                  </span>
                </div>
              ) : card.layout === "split" ? (
                <div className="flex h-full flex-row items-stretch justify-between relative">
                  <div className="absolute top-0 left-0 w-[95%] sm:relative sm:top-auto sm:left-auto sm:w-[60%] ml:w-[50%] lss:w-[45%] z-10 ls:self-center">
                    <h3 className="text-lg lg:text-2xl font-bold tracking-[-0.03em] text-brand-title">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base lg:text-base text-brand-body">
                      {card.copy}
                    </p>
                  </div>
                  <div
                    className={`min-h-[9rem] absolute -inset-3 sm:relative sm:inset-auto sm:w-[55%] ml:w-[60%] lss:w-[55%] z-0 ${
                      card.title === "Quick Online Process"
                        ? "sm:-ml-24 sm:-mr-3 lss:ml-0 sm:-my-3 lss:-mr-8 lss:-my-8"
                        : "flex items-center justify-center rounded-[1.4rem] border border-dashed px-4 text-sm font-semibold " +
                          (isPrimary ? "border-white/20 text-white/55" : "border-brand-stroke text-brand-label")
                    }`}
                  >
                    {card.title === "Quick Online Process" ? (
                      <>
                      <img src={Quick} alt="Quick Online Process" className="w-full h-full object-cover object-left hidden ls:block" />
                      <img src={Quick2} alt="Quick Online Process" className="block ls:hidden w-full h-full object-contain object-right-bottom sm:object-right" />
                      </>
                    ) : (
                      "Image here..."
                    )}
                  </div>
                </div>
              ) : card.layout === "image-bottom" ? (
                <>
                  <div className="mb-5">
                    <h3 className={`text-lg lg:text-2xl font-bold tracking-[-0.03em]  ${isPrimary ? "text-brand-offwhite" : "text-brand-title"}`}>
                      {card.title}
                    </h3>
                    {card.copy ? (
                      <p
                        className={`mt-4 max-w-md mx-auto lg:text-lg ${isPrimary ? "text-brand-stroke" : "text-brand-body"}`}
                      >
                        {card.copy}
                      </p>
                    ) : null}
                  </div>

                  <div
                    className={`flex flex-1 justify-center ${
                      card.title === "Flexible Credit Consideration"
                        ? "items-center"
                        : card.title === "Mobile-Friendly Experience"
                        ? "items-end -mb-6 -mx-6 sm:-mb-8 sm:-mx-8 "
                        : "items-center rounded-[1.4rem] border border-dashed px-4 py-8 text-sm font-semibold " +
                          (isPrimary ? "border-white/20 text-white/55" : "border-brand-stroke text-brand-label")
                    } min-h-[4.5rem]`}
                  >
                    {card.title === "Flexible Credit Consideration" ? (
                      <img src={Flexible} alt="Flexible Credit Consideration" className="w-full h-full object-contain" />
                    ) : card.title === "Mobile-Friendly Experience" ? (
                      <img src={Mobile} alt="Mobile-Friendly Experience" className="w-full h-full object-center lss:object-cover lss:object-bottom" />
                    ) : (
                      "Image here..."
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`relative z-10 flex justify-center ${card.title === "Multiple Lending Partners" ? "items-start -mx-3 lss:-mx-8" : "items-center"} ${
                      isPrimary || card.title === "No Upfront Fees" || card.title === "Multiple Lending Partners"
                        ? ""
                        : "rounded-[1.4rem] border border-dashed border-brand-stroke px-4 py-8 text-sm font-semibold text-brand-label"
                    } ${card.title === "Quick Online Process" ? "min-h-[7rem] ls:min-h-[8.5rem]" : "min-h-[4.5rem]"}`}
                  >
                    {isPrimary ? (
                      <img src={File} alt="File" className="w-50 h-50 sm:w-55 sm:h-55 object-contain" />
                    ) : card.title === "No Upfront Fees" ? (
                      <img src={Upfront} alt="No Upfront Fees" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
                    ) : card.title === "Multiple Lending Partners" ? (
                      <img src={Lend} alt="Multiple Lending Partners" className="w-full h-full lss:w-auto lss:h-30 object-cover object-top " />
                    ) : (
                      "Image here..."
                    )}
                  </div>

                  <div className="relative z-10 mt-5">
                    <h3 className={` text-lg lg:text-2xl  ${isPrimary ? "text-brand-offwhite" : "text-brand-title"} font-bold tracking-[-0.03em]`}>
                      {card.title}
                    </h3>
                    {card.copy ? (
                      <p
                        className={`mt-4 mx-auto max-w-md lg:text-lg ${isPrimary ? "text-brand-stroke" : "text-brand-body"}`}
                      >
                        {card.copy}
                      </p>
                    ) : null}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </main>
    </section>
  );
};

export default WhySection;
