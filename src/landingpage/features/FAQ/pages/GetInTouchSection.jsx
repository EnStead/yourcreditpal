import React from "react";
import Star from "../../../../assets/Star.svg?react";

const GetInTouchSection = () => {
  return (
    <section className="relative px-5 py-20 sm:px-10 lg:px-20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-brand-accent2">
            Get In Touch
          </span>
          <Star className="h-3 w-3 text-brand-accent2" />
        </div>
        <h2 className="mx-auto my-8 max-w-xl text-3xl font-bold text-brand-title md:text-5xl">
          Still Have Questions?
        </h2>
        <p className="mx-auto max-w-xl text-lg text-brand-body">
            Our team is here to help you better understand the application and matching process.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:support@yourcreditpal.com" className="inline-flex text-sm sm:text-base items-center justify-center font-semibold font-heading rounded-xl bg-brand-primary text-brand-white px-10 py-3 transition hover:opacity-90">
            Contact Support
          </a>
          <button className="bg-transparent border-2 border-brand-placeholder text-brand-title px-10 py-3 transition hover:bg-brand-offwhite">
            Start Application
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
