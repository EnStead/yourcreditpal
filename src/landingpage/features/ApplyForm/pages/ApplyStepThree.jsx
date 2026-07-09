import { useEffect, useMemo, useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BriefcaseBusiness, Search, ChevronDown, Check, Loader2 } from "lucide-react";
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

const formatIncome = (value) => {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
};

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

const accountTypeOptions = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
];

// Use a server-side proxy to avoid CORS when contacting bankrouting.io
const BANKROUTING_PROXY_ENDPOINT = "/api/validate-aba";

const normalizeBankToken = (token) => {
  const normalized = token.replace(/[^A-Z0-9]/g, "");
  const aliases = {
    BBT: "TRUIST",
    BBANDT: "TRUIST",
    SUNTRUST: "TRUIST",
    TRUIST: "TRUIST",
    BOA: "BANKOFAMERICA",
    BOFA: "BANKOFAMERICA",
    BANKOFAMERICA: "BANKOFAMERICA",
    CITI: "CITI",
    CITIBANK: "CITI",
    WELLS: "WELLS",
  };
  return aliases[normalized] || normalized;
};

const normalizeBankName = (name) => {
  if (!name) return [];
  let raw = String(name).toUpperCase();

  raw = raw
    .replace(/BB&T|BB AND T|BBANDT|BBT/gi, "TRUIST")
    .replace(/BRANCH BANKING & TRUST COMPANY|BRANCH BANKING & TRUST|BRANCH BANKING/gi, "TRUIST")
    .replace(/SUN TRUST|SUNTRUST/gi, "TRUIST")
    .replace(/BANK OF AMERICA(?:, N\.A\.?|, NY|, N\.A\.?, NY)?/gi, "BANKOFAMERICA")
    .replace(/&/g, " ");

  raw = raw
    .replace(/\b(N\.?A\.?|COMPANY|CO\.?|CORP\.?|LLC|NATIONAL|SAVINGS|ASSOCIATION|THE|AND)\b/g, " ")
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw) return [];
  return raw.split(" ").filter(Boolean).map(normalizeBankToken);
};

const bankNamesLooselyMatch = (selectedName, lookedUpName) => {
  const aTokens = normalizeBankName(selectedName);
  const bTokens = normalizeBankName(lookedUpName);
  if (!aTokens.length || !bTokens.length) return false;

  const aSet = new Set(aTokens);
  const bSet = new Set(bTokens);
  let intersection = 0;
  for (const t of aSet) if (bSet.has(t)) intersection++;

  if (aSet.size === 0 || bSet.size === 0) return false;

  const exactMatch = aSet.size === bSet.size && intersection === aSet.size && intersection === bSet.size;
  if (exactMatch) return true;

  if (aSet.size === 1 && bSet.size === 1 && intersection === 1) {
    return aTokens[0] === bTokens[0];
  }

  // Whitelist superset fallback: accept when one name's token set is a strict subset
  // of the other and a canonical token for the bank appears (reduces false positives).
  const WHITELIST = new Set(["TRUIST", "BANKOFAMERICA", "CITI", "JPMORGAN", "CHASE", "WELLS"]);
  const aIsSubsetOfB = [...aSet].every((t) => bSet.has(t));
  const bIsSubsetOfA = [...bSet].every((t) => aSet.has(t));
  const hasWhitelistToken = [...aSet, ...bSet].some((t) => WHITELIST.has(t));
  if ((aIsSubsetOfB || bIsSubsetOfA) && hasWhitelistToken) return true;

  return false;
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
  routingNumber,
  setRoutingNumber,
  accountNumber,
  setAccountNumber,
  setIsRoutingVerified,
}) => {
  const bankSearchRef = useRef(null);
  const [isIncomeFocused, setIsIncomeFocused] = useState(false);
  const [bankQuery, setBankQuery] = useState(bankName || "");
  const [bankResults, setBankResults] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankError, setBankError] = useState("");
  const [isAccountNumberFocused, setIsAccountNumberFocused] = useState(false);
  const [isRoutingFocused, setIsRoutingFocused] = useState(false);
  const [routingStatus, setRoutingStatus] = useState("idle");
  const [routingError, setRoutingError] = useState("");
  const [routingMessage, setRoutingMessage] = useState("");
  const [showRoutingIcon, setShowRoutingIcon] = useState(false);

  const isIncomeActive = isIncomeFocused || (monthlyIncome && String(monthlyIncome).length > 0);
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

  const resetRoutingVerification = () => {
    setRoutingStatus("idle");
    setRoutingError("");
    setRoutingMessage("");
    setShowRoutingIcon(false);
    setIsRoutingVerified(false);
  };

  const isAccountNumberActive =
    isAccountNumberFocused || (accountNumber && String(accountNumber).length > 0);
  const isRoutingActive = isRoutingFocused || (routingNumber && String(routingNumber).length > 0);

  const verifyRoutingNumber = async (routing = routingNumber, selectedBankName = bankName) => {
    const normalizedRouting = routing.trim();
    if (!/^\d{9}$/.test(normalizedRouting)) {
      if (normalizedRouting && normalizedRouting.length < 9) {
        setRoutingStatus("invalid");
        setRoutingError("Routing number must be 9 digits.");
        setShowRoutingIcon(true);
        setIsRoutingVerified(false);
      }
      return;
    }

    setRoutingStatus("checking");
    setRoutingError("");
    setShowRoutingIcon(true);

    try {
      const resp = await fetch(`${BANKROUTING_PROXY_ENDPOINT}?routing=${normalizedRouting}`);
      if (!resp.ok) throw new Error("bankrouting proxy unavailable");
      const data = await resp.json();

      const validateData = data?.validate;
      const validateStatus = data?.validateStatus;
      const lookupData = data?.lookup;

      if (validateStatus === 404) {
        setRoutingStatus("invalid");
        setRoutingError("Couldn't verify bank. Use another bank.");
        setIsRoutingVerified(false);
        setRoutingMessage("");
        setShowRoutingIcon(true);
        return;
      }

      if (!validateData?.data?.valid) {
        setRoutingStatus("invalid");
        setRoutingError("We couldn't verify this routing number. Please try again.");
        setIsRoutingVerified(false);
        setRoutingMessage("");
        setShowRoutingIcon(true);
        return;
      }

      const lookedUpBankName =
        lookupData?.data?.bank_name ||
        lookupData?.bank_name ||
        lookupData?.data?.bankName ||
        lookupData?.bankName ||
        "";

      if (!bankNamesLooselyMatch(selectedBankName, lookedUpBankName)) {
        if (!lookedUpBankName) {
          setRoutingStatus("valid");
          setRoutingMessage("Routing number checked.");
          setIsRoutingVerified(true);
          setShowRoutingIcon(true);
          setTimeout(() => setShowRoutingIcon(false), 2000);
          return;
        }

        setRoutingStatus("invalid");
        setRoutingError("Routing number doesn't match your bank. Please try again.");
        setRoutingMessage("");
        setIsRoutingVerified(false);
        setShowRoutingIcon(true);
        return;
      }

      setRoutingStatus("valid");
      setRoutingMessage("Routing number verified.");
      setIsRoutingVerified(true);
      setShowRoutingIcon(true);
      setTimeout(() => setShowRoutingIcon(false), 2000);
    } catch {
      setRoutingStatus("invalid");
      setRoutingError("We couldn't verify this routing number. Please try again.");
      setIsRoutingVerified(false);
      setShowRoutingIcon(true);
    }
  };

  const selectedBankLabel = useMemo(() => {
    if (bankName) return bankName;
    return "";
  }, [bankName]);

  const selectedAccountLabel = useMemo(() => {
    return accountTypeOptions.find((item) => item.value === accountType)?.label || "";
  }, [accountType]);

  const handleBankSelect = (institution) => {
    const selectedName = institution.display_name || institution.canonical_name || institution.name || "";
    setBankId(institution.id);
    setBankName(selectedName);
    setBankQuery(selectedName);
    setBankResults([]);
    resetRoutingVerification();
    if (/^\d{9}$/.test(routingNumber)) {
      verifyRoutingNumber(routingNumber, selectedName);
    }
  };

  const handleBankInputChange = (event) => {
    const value = event.target.value;
    setBankId("");
    setBankName(value);
    setBankQuery(value);
    resetRoutingVerification();

    if (value.trim().length < 2) {
      setBankResults([]);
      setBankError("");
      setBankLoading(false);
    }
  };

  const handleRoutingNumberChange = (event) => {
    setRoutingNumber(event.target.value.replace(/\D/g, "").slice(0, 9));
    resetRoutingVerification();
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
        <label
          className={`block font-sans font-medium transition-colors ${
            isIncomeActive ? "text-brand-title" : "text-brand-label"
          }`}
        >
          What is your monthly income after taxes?
        </label>
        <input
          inputMode="numeric"
          className={`mt-4 w-full border-0 border-b bg-transparent px-0 py-3 text-brand-title outline-none placeholder:text-brand-placeholder transition-colors ${
            isIncomeActive ? "border-brand-title" : "border-brand-stroke"
          }`}
          placeholder="$5,500"
          value={monthlyIncome}
          onFocus={() => setIsIncomeFocused(true)}
          onBlur={() => setIsIncomeFocused(false)}
          onChange={(e) => setMonthlyIncome(formatIncome(e.target.value))}
        />
        <p className="mt-2 text-sm text-brand-body">Include income from all reliable sources.</p>
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
          <span
            className={`mb-3 block font-sans text-base font-medium transition-colors ${
              accountType ? "text-brand-title" : "text-brand-label"
            }`}
          >
            Account Type
          </span>
          <Select.Root value={accountType} onValueChange={setAccountType}>
            <Select.Trigger
              className={`flex w-full min-w-0 font-sans items-center justify-between gap-3 font-normal rounded-none border-b border-brand-stroke py-2 text-left text-base outline-none transition hover:border-brand-title ${
                accountType
                  ? "border-brand-title text-brand-title"
                  : "text-brand-placeholder"
              }`}
            >
              <span className="min-w-0 flex-1 truncate">
                <Select.Value placeholder="Select Checking/Savings">
                  {selectedAccountLabel}
                </Select.Value>
              </span>
              <Select.Icon>
                <ChevronDown
                  className={`h-4 w-4 text-brand-placeholder transition-colors ${
                    accountType ? "text-brand-title" : ""
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
                <Select.Viewport className="p-2">
                  {accountTypeOptions.map((type) => (
                    <Select.Item
                      key={type.value}
                      value={type.value}
                      className="relative flex cursor-pointer font-sans items-center rounded-xl px-3 py-3 text-sm text-brand-body outline-none transition hover:bg-brand-lightblue data-[highlighted]:bg-brand-lightblue data-[highlighted]:text-brand-title data-[state=checked]:bg-transparent data-[state=checked]:text-brand-title"
                    >
                      <Select.ItemText>
                        <span className="font-sans font-normal text-brand-title">{type.label}</span>
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="block">
          <label
            className={`mb-3 block font-sans text-base font-medium transition-colors ${
              isRoutingActive ? "text-brand-title" : "text-brand-label"
            }`}
          >
            Routing Number
          </label>
          <div className="relative">
            <input
              inputMode="numeric"
              maxLength={9}
              className={`w-full border-0 border-b bg-transparent px-0 py-3 pr-10 font-sans text-base text-brand-title outline-none placeholder:text-brand-placeholder transition-colors ${
                routingStatus === "invalid"
                  ? "border-red-500"
                  : isRoutingActive
                    ? "border-brand-title"
                    : "border-brand-stroke"
              }`}
              placeholder="9-digit routing number"
              value={routingNumber}
              onFocus={() => setIsRoutingFocused(true)}
              onChange={handleRoutingNumberChange}
              onBlur={() => {
                setIsRoutingFocused(false);
                verifyRoutingNumber();
              }}
            />
            {showRoutingIcon && routingStatus === "checking" ? (
              <Loader2 className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-placeholder animate-spin" />
            ) : showRoutingIcon && routingStatus === "valid" ? (
              <Check className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-body" />
            ) : null}
          </div>
          {routingStatus === "invalid" ? (
            <p className="mt-2 text-sm text-red-500">{routingError}</p>
          ) : routingStatus === "valid" ? (
            <p className="mt-2 text-sm text-brand-body">{routingMessage}</p>
          ) : null}
        </div>

        <div className="block">
          <label
            className={`mb-3 block font-sans text-base font-medium transition-colors ${
              isAccountNumberActive ? "text-brand-title" : "text-brand-label"
            }`}
          >
            Account Number
          </label>
          <input
            inputMode="numeric"
            maxLength={17}
            className={`w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-base text-brand-title outline-none placeholder:text-brand-placeholder transition-colors ${
              isAccountNumberActive ? "border-brand-title" : "border-brand-stroke"
            }`}
            placeholder="Account number"
            value={accountNumber}
            onFocus={() => setIsAccountNumberFocused(true)}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 17))}
            onBlur={() => setIsAccountNumberFocused(false)}
          />
          {accountNumber && !/^\d{4,17}$/.test(accountNumber) ? (
            <p className="mt-2 text-sm text-red-500">Enter a valid account number.</p>
          ) : null}
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
