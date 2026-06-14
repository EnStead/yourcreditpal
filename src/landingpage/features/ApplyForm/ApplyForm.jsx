import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  ApplyStepOne,
  ApplyStepTwo,
  ApplyStepThree,
  ApplyStepFour,
  ApplyPendingScreen,
  ApplyNoLenderScreen,
  ApplyTestimonialsPanel,
} from "./pages";
import Logo from "../../../assets/Logo.svg?react";

const API_BASE_URL =
  import.meta.env.VITE_APPLY_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://creditpal-backend.onrender.com";

const steps = [
  {
    id: 1,
    label: "Loan",
    subtitle: "Choose your amount, purpose, and credit range.",
  },
  {
    id: 2,
    label: "Personal",
    subtitle: "Share your contact details, DOB, and state.",
  },
  {
    id: 3,
    label: "Financial",
    subtitle: "Add income, bank, and account information.",
  },
  {
    id: 4,
    label: "Housing",
    subtitle: "Confirm your housing and address details.",
  },
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
const countPhoneDigits = (value) =>
  value.replace(/\D/g, "").slice(0, 10).length;
const INITIATE_CHECKOUT_PIXEL_ID = "1723525005474622";
const SUBMIT_PIXEL_ID = "1634731517818041";
const LOAN_PURPOSE_MAP = {
  "Debt Consolidation": "debt_consolidation",
  "Emergency Expenses": "emergency_expenses",
  "Medical Bills": "medical_bills",
  "Home Improvement": "home_improvement",
  "Auto Repairs": "auto_repairs",
  "Major Purchase": "major_purchase",
  Others: "others",
};
const EMPLOYMENT_STATUS_MAP = {
  "Employed Full-Time": "employed_full_time",
  "Employed Part-Time": "employed_part_time",
  "Self-Employed": "self_employed",
  Retired: "retired",
  "Benefits/Disability": "benefits_disability",
  Unemployed: "unemployed",
};
const HOUSING_STATUS_MAP = {
  "Own Home": "own_home",
  Rent: "rent",
  "Living with Family": "living_with_family",
  Other: "other",
};
const ACCOUNT_TYPE_MAP = {
  checking: "checking",
  savings: "savings",
};
const CREDIT_SCORE_MAP = {
  "Excellent (720+)": "720+",
  "Good (660-719)": "660-719",
  "Fair (580-659)": "580-659",
  "Poor (Below 580)": "Below 580",
  "Not sure of my score": "Not sure",
};

const fireSubmitPixel = () => {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq("init", SUBMIT_PIXEL_ID);
  window.fbq("track", "PageView");
};

const fireLeadPixel = (eventName, eventId) => {
  if (typeof window === "undefined" || !window.fbq || !eventId) return;

  window.fbq("track", eventName || "Lead", {}, { eventID: eventId });
};

const getCookie = (name) => {
  if (typeof document === "undefined") return "";

  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!entry) return "";

  return entry.split("=").slice(1).join("=");
};

const getTrustedFormCertUrl = (root = document) => {
  if (typeof document === "undefined") return "";

  const element =
    root?.querySelector?.('input[name="xxTrustedFormCertUrl"]') ||
    document.querySelector('input[name="xxTrustedFormCertUrl"]');
  return element?.value || "";
};

const waitForTrustedFormCertUrl = async (root, timeoutMs = 5000) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const cert = getTrustedFormCertUrl(root);
    if (cert) return cert;

    await new Promise((resolve) => window.setTimeout(resolve, 120));
  }

  return "";
};

const formatMoneyToInteger = (value) => {
  const digits = String(value).replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};

const formatDobForApi = (value) => String(value).replace(/\D/g, "");

const buildLeadPayload = ({
  firstName,
  lastName,
  email,
  phone,
  dob,
  usState,
  loanAmount,
  purpose,
  credit,
  employment,
  monthlyIncome,
  bankName,
  accountType,
  housing,
  streetAddress,
  city,
  zipCode,
  trustedformCertUrl,
}) => ({
  first_name: firstName.trim(),
  last_name: lastName.trim(),
  email: email.trim(),
  phone: phone.trim(),
  state: usState,
  zip: zipCode.trim(),
  city: city.trim(),
  address: streetAddress.trim(),
  dob: formatDobForApi(dob),
  loan_amount: Number(loanAmount),
  loan_purpose: LOAN_PURPOSE_MAP[purpose] || "",
  credit_score_range: CREDIT_SCORE_MAP[credit] || credit,
  employment_status: EMPLOYMENT_STATUS_MAP[employment] || "",
  monthly_income: formatMoneyToInteger(monthlyIncome),
  bank_name: bankName.trim(),
  account_type: ACCOUNT_TYPE_MAP[accountType] || "",
  housing_status: HOUSING_STATUS_MAP[housing] || "",
  trustedform_cert_url: trustedformCertUrl || "",
  fbp: getCookie("_fbp"),
  fbc: getCookie("_fbc"),
});

const submitLead = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message[0]
      : data?.message || "Unable to submit your application right now.";
    throw new Error(message);
  }

  return data;
};

const isAtLeast18 = (value) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;

  const [, month, day, year] = match;
  const dob = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    dob.getFullYear() !== Number(year) ||
    dob.getMonth() !== Number(month) - 1 ||
    dob.getDate() !== Number(day)
  ) {
    return false;
  }

  const today = new Date();
  const eighteenthBirthday = new Date(
    dob.getFullYear() + 18,
    dob.getMonth(),
    dob.getDate(),
  );

  return eighteenthBirthday <= today;
};

const TrustedForm = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-trustedform="true"]',
    );
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
  const formPanelRef = useRef(null);
  const applyFormRef = useRef(null);
  const initiateCheckoutFiredRef = useRef(false);
  const submitPixelFiredRef = useRef(false);

  const [step, setStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);
  const [mobileStepsOpen, setMobileStepsOpen] = useState(false);
  const [postSubmitState, setPostSubmitState] = useState(null);
  const [submitResponse, setSubmitResponse] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastTimerRef = useRef(null);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [purpose, setPurpose] = useState("");
  const [credit, setCredit] = useState("");
  const [employment, setEmployment] = useState("");
  const [housing, setHousing] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [usState, setUsState] = useState("");

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const hasUnsavedChanges = useMemo(() => {
    if (postSubmitState) return false;
    return (
      step > 1 ||
      purpose !== "" ||
      credit !== "" ||
      employment !== "" ||
      housing !== "" ||
      firstName !== "" ||
      lastName !== "" ||
      email !== "" ||
      phone !== "" ||
      dob !== "" ||
      usState !== "" ||
      monthlyIncome !== "" ||
      bankName !== "" ||
      accountType !== "" ||
      streetAddress !== "" ||
      city !== "" ||
      zipCode !== ""
    );
  }, [
    step, purpose, credit, employment, housing, firstName, lastName,
    email, phone, dob, usState, monthlyIncome, bankName, accountType,
    streetAddress, city, zipCode, postSubmitState
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

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
    isAtLeast18(dob) &&
    usState !== "";
  const isStepThreeValid =
    employment !== "" &&
    monthlyIncome !== "" &&
    bankName !== "" &&
    accountType !== "";
  const isStepFourValid =
    housing !== "" && streetAddress !== "" && city !== "" && zipCode !== "";

  const isCurrentStepValid =
    (step === 1 && isStepOneValid) ||
    (step === 2 && isStepTwoValid) ||
    (step === 3 && isStepThreeValid) ||
    (step === 4 && isStepFourValid);

  const buttonText = isLastStep
    ? "Submit My Application"
    : isCurrentStepValid
      ? step === 2
        ? "See My Loan Options"
        : "Continue"
      : "Next";

  const scrollFormToTop = () => {
    requestAnimationFrame(() => {
      formPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3000);
  };

  useEffect(
    () => () => {
      window.clearTimeout(toastTimerRef.current);
    },
    [],
  );

  const handlePrimaryAction = async () => {
    if (isLastStep) {
      if (!isStepFourValid || isSubmitting) {
        return;
      }

      if (!submitPixelFiredRef.current) {
        submitPixelFiredRef.current = true;
        fireSubmitPixel();
      }

      try {
        setSubmitResponse(null);
        setIsSubmitting(true);
        setPostSubmitState("loading");
        scrollFormToTop();

        const trustedformCertUrl = await waitForTrustedFormCertUrl(
          applyFormRef.current,
        );
        if (!trustedformCertUrl) {
          throw new Error(
            "TrustedForm is still loading. Please wait a moment and try again.",
          );
        }

        const payload = buildLeadPayload({
          firstName,
          lastName,
          email,
          phone,
          dob,
          usState,
          loanAmount,
          purpose,
          credit,
          employment,
          monthlyIncome,
          bankName,
          accountType,
          housing,
          streetAddress,
          city,
          zipCode,
          trustedformCertUrl,
        });

        const result = await submitLead(payload);
        setSubmitResponse(result);

        if (result?.event_id) {
          fireLeadPixel(result.event_name || "Lead", result.event_id);
        }

        setPostSubmitState(result?.status || "hard_reject");
      } catch (error) {
        setPostSubmitState(null);
        const message =
          error instanceof Error
            ? error.message
            : "Unable to submit your application right now.";
        showToast(message, "error");
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    goToStep((current) => current + 1, { markReached: true });
  };

  const goToStep = (nextStep, { markReached = false } = {}) => {
    setStep((current) => {
      const targetStep =
        typeof nextStep === "function" ? nextStep(current) : nextStep;
      const nextClampedStep = Math.min(4, Math.max(1, targetStep));

      if (
        current === 2 &&
        nextClampedStep === 3 &&
        !initiateCheckoutFiredRef.current &&
        typeof window !== "undefined"
      ) {
        initiateCheckoutFiredRef.current = true;
        window.fbq?.(
          "trackSingle",
          INITIATE_CHECKOUT_PIXEL_ID,
          "InitiateCheckout",
        );
      }

      if (markReached) {
        setHighestStep((highest) => Math.max(highest, nextClampedStep));
      }

      return nextClampedStep;
    });
    scrollFormToTop();
  };

  const goToReachedStep = (targetStep) => {
    if (targetStep > highestStep) return;

    goToStep(targetStep);
    setMobileStepsOpen(false);
  };

  const handleReviewApplication = () => {
    setPostSubmitState(null);
    scrollFormToTop();
  };

  return (
    <>
      <TrustedForm />
      <main className="h-screen overflow-hidden">
        <form ref={applyFormRef} className="h-full">
          <div className="mx-auto grid h-full grid-cols-1 overflow-hidden bg-brand-white lg:grid-cols-[2.5fr_2fr]">
            <section
              ref={formPanelRef}
              className="flex h-full flex-col overflow-y-auto px-5 py-6 sm:px-8 lg:px-14 lg:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
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

                {!postSubmitState ? (
                  <button
                    type="button"
                    onClick={() => setMobileStepsOpen(true)}
                    className="rounded-xl bg-brand-lightblue px-4 py-2 text-sm font-medium text-brand-body transition hover:bg-brand-secondary/30 lg:hidden"
                  >
                    Step {step}/4
                  </button>
                ) : null}
              </div>

              {!postSubmitState ? (
                <div className="mt-6 hidden items-center gap-3 text-sm text-brand-body sm:flex">
                  {steps.map((item, index) => {
                    const active = item.id === step;
                    const completed = item.id < step;
                    const reachable = item.id <= highestStep;
                    const stepContent = (
                      <>
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
                      </>
                    );

                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        {reachable ? (
                          <button
                            type="button"
                            onClick={() => goToReachedStep(item.id)}
                            disabled={active}
                            className="flex items-center gap-3 rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:opacity-100"
                          >
                            {stepContent}
                          </button>
                        ) : (
                          <div className="flex items-center gap-3">
                            {stepContent}
                          </div>
                        )}
                        {index < steps.length - 1 ? (
                          <ChevronRight className="h-4 w-4 text-brand-label" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="mt-10 w-full max-w-none flex-1">
                {postSubmitState ? (
                  postSubmitState === "loading" ? (
                    <ApplyPendingScreen />
                  ) : postSubmitState === "hard_reject" ? (
                    <ApplyNoLenderScreen
                      variant="hard_reject"
                      message={submitResponse?.message}
                      rejectionReasons={submitResponse?.rejection_reasons || []}
                      onReviewApplication={handleReviewApplication}
                    />
                  ) : postSubmitState === "soft_reject" ? (
                    <ApplyNoLenderScreen
                      variant="soft_reject"
                      message={submitResponse?.message}
                    />
                  ) : postSubmitState === "boberdoo_pending" ? (
                    <ApplyPendingScreen
                      variant="boberdoo_pending"
                      message={submitResponse?.message}
                    />
                  ) : (
                    <ApplyNoLenderScreen variant="hard_reject" />
                  )
                ) : (
                  <>
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
                        bankId={bankId}
                        setBankId={setBankId}
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
                          onClick={() => goToStep((current) => current - 1)}
                          className="rounded-xl border border-brand-title bg-brand-white px-6 py-3 text-sm font-semibold text-brand-title transition hover:bg-brand-offwhite"
                        >
                          Back
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={!isCurrentStepValid || isSubmitting}
                        onClick={handlePrimaryAction}
                        className={`rounded-xl px-6 py-3 text-sm font-semibold text-brand-white transition-all duration-300 ${
                          buttonText === "Continue" ||
                          buttonText === "See My Loan Options"
                            ? "min-w-[15rem]"
                            : "min-w-[10rem]"
                        } ${
                          !isCurrentStepValid
                            ? "cursor-not-allowed bg-brand-secondary/50"
                            : isLastStep
                              ? "bg-brand-title hover:opacity-90"
                              : "bg-brand-secondary hover:opacity-90"
                        }`}
                      >
                        {isSubmitting ? "Submitting..." : buttonText}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>

            <ApplyTestimonialsPanel />
          </div>

          {mobileStepsOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                aria-label="Close step navigation"
                className="absolute inset-0 bg-brand-title/40"
                onClick={() => setMobileStepsOpen(false)}
              />
              <div className="absolute inset-x-0 bottom-0 rounded-t-[1.5rem] bg-brand-white px-5 pb-6 pt-4 shadow-[0_-18px_45px_rgba(0,0,0,0.16)]">
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-brand-stroke" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Logo
                      className="h-9 w-9 text-brand-primary"
                      aria-hidden="true"
                    />
                    <h2 className="text-xl font-bold text-brand-title">
                      Application process
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileStepsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-offwhite text-brand-title transition hover:bg-brand-lightblue"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative mt-8 space-y-10">
                  <div className="absolute left-[1.125rem] top-5 h-[calc(100%-2.5rem)] w-px bg-brand-stroke" />
                  {steps.map((item) => {
                    const active = item.id === step;
                    const reachable = item.id <= highestStep;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={!reachable || active}
                        onClick={() => goToReachedStep(item.id)}
                        className={`relative flex w-full items-start gap-4 text-left transition ${
                          active
                            ? "cursor-default"
                            : reachable
                              ? "hover:translate-x-1"
                              : "cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            active || reachable
                              ? "bg-brand-darkBlue text-brand-lightblue"
                              : "bg-brand-offwhite text-brand-label"
                          }`}
                        >
                          {item.id}
                        </span>
                        <span
                          className={`min-w-0 ${reachable ? "" : "opacity-45"}`}
                        >
                          <span className="block text-sm font-bold text-brand-title">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-xs font-light leading-5 text-brand-body">
                            {item.subtitle}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {toast ? (
            <div className="pointer-events-none fixed bottom-5 right-5 z-50">
              <div
                className={`pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 ${
                  toast.type === "error"
                    ? "border-red-200 bg-white/95 text-brand-title"
                    : "border-brand-stroke bg-brand-white/95 text-brand-title"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    toast.type === "error"
                      ? "bg-red-500 text-brand-white"
                      : "bg-brand-primary text-brand-white"
                  }`}
                >
                  {toast.type === "error" ? "!" : "✓"}
                </span>
                <p className="max-w-[18rem]">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="ml-1 text-brand-label transition hover:text-brand-title"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            </div>
          ) : null}
        </form>
      </main>
    </>
  );
};

export default ApplyForm;
