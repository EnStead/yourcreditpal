import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { NavLink } from 'react-router-dom'
import {
  ApplyStepOne,
  ApplyStepTwo,
  ApplyStepThree,
  ApplyStepFour,
  ApplyTestimonialsPanel,
} from "./pages";
import Logo from "../../../assets/Logo.svg?react";

const steps = [
  { id: 1, label: "Loan" },
  { id: 2, label: "Personal" },
  { id: 3, label: "Financial" },
  { id: 4, label: "Housing" },
];

const purposeOptions = [
  { label: "Debt Consolidation" },
  { label: "Emergency Expenses" },
  { label: "Medical Bills" },
  { label: "Home Improvement" },
  { label: "Auto Repairs" },
  { label: "Major Purchase" },
  { label: "Others" },
];

const creditOptions = [
  "Excellent (720+)",
  "Good (660-719)",
  "Fair (580-659)",
  "Poor (Below 580)",
  "Not sure of my score",
];
const employmentOptions = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Retired",
  "Benefits/Disability",
  "Unemployed",
];
const housingOptions = ["Own Home", "Rent", "Living with Family", "Other"];
const countPhoneDigits = (value) => value.replace(/\D/g, "").slice(0, 10).length;

const TrustedForm = () => {
  useEffect(() => {
    const existingScript = document.querySelector('script[data-trustedform="true"]');
    if (existingScript) {
      return undefined;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.dataset.trustedform = "true";
    script.src =
      `${window.location.protocol === "https:" ? "https" : "http"}://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=` +
      `${Date.now()}${Math.random()}`;

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <noscript>
      <img src="https://api.trustedform.com/ns.gif" alt="" aria-hidden="true" />
    </noscript>
  );
};

const ApplyForm = () => {
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [purpose, setPurpose] = useState("");
  const [credit, setCredit] = useState("");
  const [employment, setEmployment] = useState("Employed Full-Time");
  const [housing, setHousing] = useState("Rent");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [usState, setUsState] = useState("");

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const sliderPct = useMemo(() => {
    const min = 1000;
    const max = 35000;
    return ((loanAmount - min) / (max - min)) * 100;
  }, [loanAmount]);

  const isLastStep = step === 4;
  const isStepOneValid = loanAmount > 0 && purpose !== "" && credit !== "";
  const isStepTwoValid =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    countPhoneDigits(phone) === 10 &&
    dob !== "" &&
    usState !== "";
  const isStepThreeValid = employment !== "" && monthlyIncome !== "" && bankName !== "" && accountType !== "";
  const isStepFourValid = housing !== "" && streetAddress !== "" && city !== "" && zipCode !== "";

  const isCurrentStepValid = 
    (step === 1 && isStepOneValid) ||
    (step === 2 && isStepTwoValid) ||
    (step === 3 && isStepThreeValid) ||
    (step === 4 && isStepFourValid);

  const buttonText = isLastStep
    ? "Submit My Application"
    : isCurrentStepValid
      ? "Continue"
      : "Next";

  return (
    <>
      <TrustedForm />
    <main className="h-screen overflow-hidden">
      <div className="mx-auto grid h-full grid-cols-1 overflow-hidden bg-brand-white lg:grid-cols-[2.5fr_2fr]">
        <section className="flex h-full flex-col overflow-y-auto px-5 py-6 sm:px-8 lg:px-14 lg:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NavLink
                to="/"
                className="flex items-center gap-3"
                aria-label="YourCreditPal home"
              >
                <Logo
                  className="h-10 w-auto text-brand-primary"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-lg font-bold">YourCreditPal</h3>
                </div>
              </NavLink>
            </div>

            <div className="rounded-xl bg-brand-lightblue px-4 py-2 text-sm font-medium text-brand-body lg:hidden">
              Step {step}/4
            </div>
          </div>

          <div className="mt-6 hidden items-center gap-3 text-sm text-brand-body sm:flex">
            {steps.map((item, index) => {
              const active = item.id === step;
              const completed = item.id < step;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                      active || completed
                        ? "bg-brand-darkBlue text-brand-lightblue"
                        : "bg-brand-secondary/30 text-brand-lightblue"
                    }`}
                  >
                    {item.id}
                  </div>
                  <span
                    className={
                      active
                        ? "text-brand-title font-medium"
                        : completed
                          ? "text-brand-title font-light"
                          : "text-brand-body/30 font-light"
                    }
                  >
                    {item.label}
                  </span>
                  {index < steps.length - 1 ? (
                    <ChevronRight className="h-4 w-4 text-brand-label" />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-10 w-full max-w-none">
            {step === 1 ? (
              <ApplyStepOne
                loanAmount={loanAmount}
                setLoanAmount={setLoanAmount}
                sliderPct={sliderPct}
                purpose={purpose}
                setPurpose={setPurpose}
                purposeOptions={purposeOptions}
                credit={credit}
                setCredit={setCredit}
                creditOptions={creditOptions}
              />
            ) : step === 2 ? (
              <ApplyStepTwo
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                dob={dob}
                setDob={setDob}
                usState={usState}
                setUsState={setUsState}
              />
            ) : step === 3 ? (
              <ApplyStepThree
                employment={employment}
                setEmployment={setEmployment}
                employmentOptions={employmentOptions}
                monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome}
                bankName={bankName}
                setBankName={setBankName}
                accountType={accountType}
                setAccountType={setAccountType}
              />
            ) : (
              <ApplyStepFour
                housing={housing}
                setHousing={setHousing}
                housingOptions={housingOptions}
                streetAddress={streetAddress}
                setStreetAddress={setStreetAddress}
                city={city}
                setCity={setCity}
                zipCode={zipCode}
                setZipCode={setZipCode}
              />
            )}

            <div
              className={`mt-10 flex items-center gap-4 ${
                step === 1 ? "justify-start" : "justify-between"
              }`}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(1, current - 1))}
                  className="rounded-xl border border-brand-title bg-brand-white px-6 py-3 text-sm font-semibold text-brand-title transition hover:bg-brand-offwhite"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                disabled={!isCurrentStepValid}
                onClick={() => setStep((current) => Math.min(4, current + 1))}
                className={`rounded-xl px-6 py-3 text-sm font-semibold text-brand-white transition-all duration-300 ${
                  buttonText === "Continue" ? "min-w-[15rem]" : "min-w-[10rem]"
                } ${
                  !isCurrentStepValid
                    ? "cursor-not-allowed bg-brand-secondary/50"
                    : isLastStep
                      ? "bg-brand-title hover:opacity-90"
                      : "bg-brand-secondary hover:opacity-90"
                }`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </section>

        <ApplyTestimonialsPanel />
      </div>
    </main>
    </>
  );
};

export default ApplyForm;
