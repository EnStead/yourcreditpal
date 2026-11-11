import { useEffect, useMemo, useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BriefcaseBusiness, Search, ChevronDown } from "lucide-react";
import MoneyBag from "../../../../assets/MoneyBag.svg?react";
import Self from "../../../../assets/Self.svg?react";
import Retired from "../../../../assets/Retired.svg?react";
import Benefits from "../../../../assets/Benefits.svg?react";
import Unemployed from "../../../../assets/Unemployed.svg?react";
import { ConfidenceBox } from "./shared";

const API_BASE_URL =
  import.meta.env.VITE_APPLY_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://creditpal-backend.onrender.com";

const incomeBands = [
  { label: "Less than $1,500", value: 750 },
  { label: "$1,500 - $3,000", value: 2250 },
  { label: "$3,000 - $5,000", value: 4000 },
  { label: "$5,000+", value: 5500 },
];

const keepSearchFocus = (event) => {
  event.stopPropagation();
};

const iconMap = {
  "Employed Full-Time": MoneyBag,
  "Employed Part-Time": MoneyBag,
  "Self-Employed": Self,
  Retired: Retired,
  "Benefits/Disability": Benefits,
  Unemployed: Unemployed,
};

const ApplyStepThree = ({
  employment,
  setEmployment,
  employmentOptions,
  monthlyIncome,
  setMonthlyIncome,
  bankId,
  setBankId,
  bankName,
  setBankName,
  accountType,
  setAccountType,
}) => {
  const bankSearchRef = useRef(null);
  const [bankQuery, setBankQuery] = useState(bankName || "");
  const [bankResults, setBankResults] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankError, setBankError] = useState("");
  const isBankActive = Boolean(bankId || bankName || bankQuery);

  useEffect(() => {
    const query = bankQuery.trim();

    if (query.length < 2) {
      return undefined;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setBankLoading(true);
        setBankError("");

        const params = new URLSearchParams({
          q: query,
          type: "all",
          limit: "20",
        });

        const response = await fetch(
          `${API_BASE_URL}/financial-institutions/search?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to load banks");
        }

        const data = await response.json();
        setBankResults(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setBankError("Unable to load bank suggestions right now.");
          setBankResults([]);
        }
      } finally {
        setBankLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [bankQuery]);

  const selectedBankLabel = useMemo(() => {
    if (bankName) return bankName;
    return "";
  }, [bankName]);

  const handleBankSelect = (institution) => {
    const selectedName = institution.display_name || institution.canonical_name || institution.name || "";
    setBankId(institution.id);
    setBankName(selectedName);
    setBankQuery(selectedName);
    setBankResults([]);
  };

  const handleBankInputChange = (event) => {
    const value = event.target.value;
    setBankId("");
    setBankName(value);
    setBankQuery(value);

    if (value.trim().length < 2) {
      setBankResults([]);
      setBankError("");
      setBankLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">Almost There</h1>
      <p className="mt-3 text-base text-brand-body">
        Lenders use this information to review your request and match you with available options.
      </p>

      <div className="mt-6">
        <h2 className="font-bold text-brand-title">Employment Status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {employmentOptions.map((item) => {
            const active = employment === item;
            const Icon = iconMap[item] || BriefcaseBusiness;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setEmployment(item)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-light transition ${
                  active
                    ? "bg-brand-primary text-brand-white"
                    : "border-brand-stroke bg-brand-white text-brand-body hover:border-brand-secondary"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-brand-white" : "text-brand-lightblue"}`} />
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-brand-title">
          What is your monthly income after taxes?
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {incomeBands.map((band) => {
            const active = monthlyIncome === band.value;
            return (
              <button
                key={band.value}
                type="button"
                onClick={() => setMonthlyIncome(band.value)}
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
                {band.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-brand-body">
          Includes all sources: salary, benefits, pension and freelance income.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="block">
          <span
            className={`mb-3 block font-sans text-base font-medium transition-colors ${
              isBankActive ? "text-brand-title" : "text-brand-label"
            }`}
          >
            Bank Name
          </span>
          <Select.Root
            value={bankId}
            onOpenChange={(open) => {
              if (open) {
                requestAnimationFrame(() => bankSearchRef.current?.focus());
              }
            }}
            onValueChange={(value) => {
              const selected = bankResults.find((item) => item.id === value);
              if (selected) {
                handleBankSelect(selected);
              }
            }}
          >
            <Select.Trigger
              className={`flex w-full min-w-0 font-sans items-center justify-between gap-3 font-normal rounded-none border-b bg-transparent py-2 text-left text-base outline-none transition hover:border-brand-title ${
                isBankActive
                  ? "border-brand-title text-brand-title"
                  : "border-brand-stroke text-brand-placeholder"
              }`}
            >
              {bankName ? (
                <span className="min-w-0 flex-1 truncate text-brand-title">{bankName}</span>
              ) : (
                <span className="min-w-0 flex-1 truncate">
                  <Select.Value placeholder="Search or type bank name">
                    {selectedBankLabel}
                  </Select.Value>
                </span>
              )}
              <Select.Icon>
                <ChevronDown
                  className={`h-4 w-4 text-brand-placeholder transition-colors ${
                    isBankActive ? "text-brand-title" : ""
                  }`}
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={8}
                className="z-50 font-sans w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-brand-stroke bg-brand-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
              >
                <div className="border-b border-brand-stroke px-3 py-3">
                  <div className="flex items-center gap-2 rounded-xl border border-brand-stroke bg-brand-offwhite px-3 py-2">
                    <Search className="h-4 w-4 text-brand-placeholder" />
                    <input
                      ref={bankSearchRef}
                      value={bankQuery}
                      onChange={handleBankInputChange}
                      onKeyDown={keepSearchFocus}
                      onKeyUp={keepSearchFocus}
                      placeholder="Search banks..."
                      className="w-full bg-transparent font-sans text-sm text-brand-title outline-none placeholder:text-brand-placeholder"
                    />
                  </div>
                </div>
                <Select.Viewport className="max-h-72 overflow-auto p-2">
                  {bankLoading ? (
                    <div className="px-3 py-4 text-sm text-brand-label">Searching banks...</div>
                  ) : bankError ? (
                    <div className="px-3 py-4 text-sm text-brand-label">{bankError}</div>
                  ) : bankResults.length ? (
                    bankResults.map((bank) => (
                      <Select.Item
                        key={bank.id}
                        value={bank.id}
                        className="relative flex cursor-pointer font-sans items-center rounded-xl px-3 py-3 text-sm text-brand-body outline-none transition hover:bg-brand-lightblue data-[highlighted]:bg-brand-lightblue data-[highlighted]:text-brand-title data-[state=checked]:bg-transparent data-[state=checked]:text-brand-title"
                      >
                        <Select.ItemText>
                          <span className="block">
                            <span className="block font-normal text-brand-title">
                              {bank.display_name || bank.canonical_name}
                            </span>
                            <span className="block text-xs text-brand-label">
                              {(bank.type === "CREDIT_UNION" ? "Credit union" : "Bank") +
                                (bank.city || bank.state_code
                                  ? ` · ${[bank.city, bank.state_code].filter(Boolean).join(", ")}`
                                  : "")}
                            </span>
                          </span>
                        </Select.ItemText>
                      </Select.Item>
                    ))
                  ) : bankQuery.trim().length >= 2 ? (
                    <div className="px-3 py-4 text-sm text-brand-label">
                      No matches found. Keep typing or use the typed bank name on submit.
                    </div>
                  ) : (
                    <div className="px-3 py-4 text-sm text-brand-label">
                      Type at least 2 characters to search for your bank.
                    </div>
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="block">
          <label htmlFor="account-type" className="mb-3 block font-sans text-base font-medium text-brand-label">
            Account Type
          </label>
          <select
            id="account-type"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            className="w-full border-0 border-b border-brand-stroke bg-transparent px-0 py-2 font-sans text-base text-brand-title focus:border-brand-primary"
          >
            <option value="" disabled>Select account type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
        </div>
      </div>

      <ConfidenceBox
        items={[
          "Secure Application",
          "No Upfront Fees",
          "Takes Just a Few Minutes",
          "No Obligation to Accept an Offer",
        ]}
      />
    </>
  );
};

export default ApplyStepThree;
