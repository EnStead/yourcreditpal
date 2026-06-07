import { useLayoutEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Star from "../../../../assets/Star.svg?react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "STEP 1",
    title: "Complete Your Application",
    description:
      "Answer a few questions about your loan request and financial profile.",
  },
  {
    number: "STEP 2",
    title: "Get Matched With Lenders",
    description:
      "Our system reviews your information and connects you with lenders that fit your needs.",
  },
  {
    number: "STEP 3",
    title: "Review Your Options",
    description:
      "A lender may contact you with available loan offers, rates, and repayment terms.",
  },
];

const ACTIVE_THEME = {
  backgroundColor: "#0157FE",
  borderColor: "#0157FE",
  titleColor: "#FFFFFF",
  descriptionColor: "rgba(255,255,255,0.86)",
  numberColor: "transparent",
  numberStroke: "1.5px rgba(255,255,255,0.38)",
};

const INACTIVE_THEME = {
  backgroundColor: "#FFFFFF",
  borderColor: "rgba(237,237,237,0.9)",
  titleColor: "#151515",
  descriptionColor: "rgba(51,51,51,0.72)",
  numberColor: "transparent",
  numberStroke: "1.5px rgba(21,21,21,0.12)",
};

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      if (cards.length !== steps.length || !stageRef.current) {
        return;
      }

      const setTheme = (card, theme) => {
        const title = card.querySelector('[data-role="title"]');
        const description = card.querySelector('[data-role="description"]');
        const number = card.querySelector('[data-role="number"]');

        gsap.set(card, {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
        });

        gsap.set(title, { color: theme.titleColor });
        gsap.set(description, { color: theme.descriptionColor });
        gsap.set(number, {
          color: theme.numberColor,
          webkitTextStroke: theme.numberStroke,
        });
      };

      gsap.set(cards[0], {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        zIndex: 1,
      });

      gsap.set(cards[1], {
        y: 180,
        scale: 0.94,
        autoAlpha: 0,
        zIndex: 2,
      });

      gsap.set(cards[2], {
        y: 240,
        scale: 0.9,
        autoAlpha: 0,
        zIndex: 3,
      });

      setTheme(cards[0], ACTIVE_THEME);
      setTheme(cards[1], INACTIVE_THEME);
      setTheme(cards[2], INACTIVE_THEME);

      const animateTheme = (tl, card, theme, duration, position) => {
        const title = card.querySelector('[data-role="title"]');
        const description = card.querySelector('[data-role="description"]');
        const number = card.querySelector('[data-role="number"]');

        tl.to(card, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor, duration }, position)
          .to(title, { color: theme.titleColor, duration }, position)
          .to(description, { color: theme.descriptionColor, duration }, position)
          .to(number, { color: theme.numberColor, webkitTextStroke: theme.numberStroke, duration }, position);
      };

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 3%",
          end: "+=300%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .add("start1")
        .to(cards[1], {
          autoAlpha: 1,
          y: 64,
          scale: 0.97,
          duration: 0.45,
        }, "start1")
        .to(
          cards[0],
          {
            y: -22,
            scale: 0.96,
            duration: 0.45,
          },
          "start1"
        )
        .add("step1")
        .to(cards[1], { y: 0, scale: 1, duration: 0.55 }, "step1");

      animateTheme(timeline, cards[0], INACTIVE_THEME, 0.8, "start1");
      animateTheme(timeline, cards[1], ACTIVE_THEME, 0.8, "start1");

      timeline
        .add("start2")
        .to(cards[2], {
          autoAlpha: 1,
          y: 64,
          scale: 0.97,
          duration: 0.45,
        }, "start2")
        .to(
          cards[1],
          {
            y: -22,
            scale: 0.96,
            duration: 0.45,
          },
          "start2"
        )
        .add("step2")
        .to(cards[2], { y: 0, scale: 1, duration: 0.55 }, "step2");

      animateTheme(timeline, cards[1], INACTIVE_THEME, 0.8, "start2");
      animateTheme(timeline, cards[2], ACTIVE_THEME, 0.8, "start2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative px-5 py-12 sm:px-10 lg:px-20">
      <div>
        {/* Header Text */}
        <div className="flex flex-col ls:flex-row ls:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-brand-accent2">
                How It Works
              </span>
              <Star className="h-3 w-3 text-brand-accent2" />
            </div>
            <h2 className="text-3xl font-bold my-8 text-brand-title md:text-5xl">
              A Simple 3-Step Process
            </h2>
            <p className="text-lg max-w-xl text-brand-body">
              We make it easy to explore loan options from our network of
              lending partners.
            </p>
          </div>
          <div className="pt-2">
            <NavLink
              to="/apply"
              className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-10 py-3 font-heading text-sm font-semibold text-brand-white transition hover:opacity-90 sm:text-base"
            >
              Apply Now
            </NavLink>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div
            ref={stageRef}
            className="relative h-[23rem] sm:h-[24rem] lg:h-[26rem]"
          >
            <div className="relative h-full">
              {steps.map((step, index) => (
                <article
                  key={step.number}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  className="absolute inset-x-0 top-0 flex h-[18rem] flex-col justify-between overflow-hidden rounded-[2rem] border bg-white px-7 py-7 shadow-[0_18px_60px_rgba(5,18,45,0.08)] sm:h-[19rem] sm:px-8 lg:h-[20rem] lg:flex-row lg:items-end lg:px-12 lg:py-10"
                >
                  <span
                    data-role="number"
                    className="order-2 lg:order-0 pointer-events-none font-heading text-7xl font-extrabold leading-18 text-transparent sm:text-9xl lg:text-8xl xls:text-9xl"
                  >
                    {step.number}
                  </span>

                  <div className="max-w-md lg:mb-14 order-1 lg:order-0">
                    <h3
                      data-role="title"
                      className="text-2xl sm:text-3xl font-bold text-brand-title"
                    >
                      {step.title}
                    </h3>
                    <p
                      data-role="description"
                      className="mt-4 sm:text-lg text-brand-body/70"
                    >
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
