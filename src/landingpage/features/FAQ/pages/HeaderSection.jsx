import Star from "../../../../assets/Star.svg?react";

const HeaderSection = () => {
  return (
    <section className="relative px-5 py-12 sm:px-10 lg:px-20">
      <div className="flex flex-col ls:flex-row ls:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-brand-accent2">
              Support Center
            </span>
            <Star className="h-3 w-3 text-brand-accent2" />
          </div>
          <h2 className="text-4xl font-bold my-8 text-brand-title md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg max-w-xl text-brand-body">
            Find answers about applications, lender matching, security, approvals, and the YourCreditPal process.
          </p>
        </div>

        <div className="pt-2 text-sm font-light text-brand-body">
            Last Updated: May, 2026
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
