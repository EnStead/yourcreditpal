import MoneyBag from "../../../../assets/MoneyBag.svg?react";
import Emergency from "../../../../assets/Emergency.svg?react";
import HomeIcon from "../../../../assets/Home.svg?react";
import MedicalIcon from "../../../../assets/MedicalKit.svg?react";
import Settings from "../../../../assets/Settings.svg?react";
import Card from "../../../../assets/Card.svg?react";
import Bolt from "../../../../assets/Bolt.svg?react";

const iconMap = {
  "Debt Consolidation": MoneyBag,
  "Emergency Expenses": Emergency,
  "Medical Bills": MedicalIcon,
  "Home Improvement": HomeIcon,
  "Auto Repairs": Settings,
  "Major Purchase": Card,
  Others: Bolt,
};

const ApplyStepOne = ({
  loanAmount,
  setLoanAmount,
  sliderPct,
  purpose,
  setPurpose,
  purposeOptions,
  credit,
  setCredit,
  creditOptions,
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">
        Let&apos;s Find Loan Options That Match Your Needs
      </h1>
      <p className="mt-4 text-base text-brand-body">
        Tell us a little about your request so we can connect you with relevant
        partners.
      </p>

      <div className="mt-5">
        <h2 className="font-bold text-brand-title">
          How much would you like to borrow?
        </h2>
        <p className="mt-4 text-4xl font-semibold text-brand-title">
          ${loanAmount.toLocaleString()}
        </p>
        <div className="relative mt-5">
          <input
            type="range"
            min="1000"
            max="100000"
            step="500"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="loan-slider h-2 w-full appearance-none rounded-full bg-brand-stroke/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-white/90 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white/90 [&::-moz-range-thumb]:shadow-md cursor-pointer"
            style={{
              background: `linear-gradient(to right, #FE2A01 0%, #FE2A01 ${sliderPct}%, #e5e7eb ${sliderPct}%, #e5e7eb 100%)`,
            }}
          />
          <div className="pointer-events-none absolute top-1 inset-0">
            {[25000, 50000, 75000].map((val) => {
              const fraction = (val - 1000) / 99000;
              return val > loanAmount ? (
                <span
                  key={val}
                  className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-secondary/20"
                  style={{ left: `calc(20px + (100% - 40px) * ${fraction})` }}
                />
              ) : null;
            })}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-brand-label">
          <span>$1k</span>
          <span>$100k</span>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="font-bold text-brand-title">
          What&apos;s the purpose of the loan?
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {purposeOptions.map((item) => {
            const Icon = iconMap[item.label];
            const active = purpose === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setPurpose(item.label)}
                className={`inline-flex items-center font-light gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "bg-brand-primary text-brand-white"
                    : "border-brand-stroke bg-brand-white text-brand-body hover:border-brand-secondary hover:text-brand-secondary"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-brand-white" : "text-brand-lightblue"}`}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="font-bold text-brand-title">
          How would you describe your credit?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-body">
          This allows us to check your eligibility for offers from our partners.
          Keep in mind, this is just one of the factors used to match you.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {creditOptions.map((option) => {
            const active = credit === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCredit(option)}
                className={`flex items-center gap-3 font-light rounded-xl border px-4 py-3 text-left text-sm transition ${
                  active
                    ? "border-brand-primary bg-brand-lightblue text-brand-title"
                    : "border-brand-stroke bg-brand-white text-brand-body hover:border-brand-secondary"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${active ? "border-brand-primary" : "border-brand-placeholder"}`}
                >
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-brand-primary" />
                  ) : null}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ApplyStepOne;
