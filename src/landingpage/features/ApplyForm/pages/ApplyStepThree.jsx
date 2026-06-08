import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  BriefcaseBusiness,
  Search,
  ChevronDown,
} from "lucide-react";
import MoneyBag from "../../../../assets/MoneyBag.svg?react";
import Self from "../../../../assets/Self.svg?react";
import Retired from "../../../../assets/Retired.svg?react";
import Benefits from "../../../../assets/Benefits.svg?react";
import Unemployed from "../../../../assets/Unemployed.svg?react";
import { ConfidenceBox, Field } from "./shared";

const formatIncome = (value) => {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
};

// Map each employment status to an icon.
// You can swap these out with custom icons from your assets folder (like MoneyBag).
const iconMap = {
  "Employed Full-Time": MoneyBag,
  "Employed Part-Time": MoneyBag,
  "Self-Employed": Self,
  Retired: Retired,
  "Benefits/Disability": Benefits,
  Unemployed: Unemployed,
};

const bankOptions = [
  { id: "academy-bank", name: "Academy Bank" },
  { id: "alliant-credit-union", name: "Alliant Credit Union" },
  { id: "ally-bank", name: "Ally Bank" },
  { id: "american-express-national-bank", name: "American Express National Bank" },
  { id: "amegy-bank", name: "Amegy Bank" },
  { id: "arvest-bank", name: "Arvest Bank" },
  { id: "associated-bank", name: "Associated Bank" },
  { id: "bank-of-america", name: "Bank of America" },
  { id: "bank-of-the-west", name: "Bank of the West" },
  { id: "bank-ozk", name: "Bank OZK" },
  { id: "bankunited", name: "BankUnited" },
  { id: "barclays-us", name: "Barclays US" },
  { id: "bask-bank", name: "Bask Bank" },
  { id: "bmo-bank", name: "BMO Bank" },
  { id: "busey-bank", name: "Busey Bank" },
  { id: "cadence-bank", name: "Cadence Bank" },
  { id: "capital-city-bank", name: "Capital City Bank" },
  { id: "capital-one", name: "Capital One" },
  { id: "charles-schwab-bank", name: "Charles Schwab Bank" },
  { id: "chase", name: "Chase" },
  { id: "chime", name: "Chime" },
  { id: "citizens-bank", name: "Citizens Bank" },
  { id: "citi", name: "Citi" },
  { id: "city-national-bank", name: "City National Bank" },
  { id: "comerica-bank", name: "Comerica Bank" },
  { id: "commerce-bank", name: "Commerce Bank" },
  { id: "community-bank", name: "Community Bank" },
  { id: "current", name: "Current" },
  { id: "discover-bank", name: "Discover Bank" },
  { id: "east-west-bank", name: "East West Bank" },
  { id: "eastern-bank", name: "Eastern Bank" },
  { id: "everbank", name: "EverBank" },
  { id: "fifth-third-bank", name: "Fifth Third Bank" },
  { id: "first-bank", name: "First Bank" },
  { id: "first-citizens-bank", name: "First Citizens Bank" },
  { id: "first-commonwealth-bank", name: "First Commonwealth Bank" },
  { id: "first-financial-bank", name: "First Financial Bank" },
  { id: "first-hawaiian-bank", name: "First Hawaiian Bank" },
  { id: "first-horizon-bank", name: "First Horizon Bank" },
  { id: "first-interstate-bank", name: "First Interstate Bank" },
  { id: "first-national-bank", name: "First National Bank" },
  { id: "flagstar-bank", name: "Flagstar Bank" },
  { id: "frost-bank", name: "Frost Bank" },
  { id: "goldman-sachs-marcus", name: "Marcus by Goldman Sachs" },
  { id: "green-dot-bank", name: "Green Dot Bank" },
  { id: "hancock-whitney-bank", name: "Hancock Whitney Bank" },
  { id: "huntington-bank", name: "Huntington Bank" },
  { id: "keybank", name: "KeyBank" },
  { id: "laurel-road", name: "Laurel Road" },
  { id: "lendingclub-bank", name: "LendingClub Bank" },
  { id: "live-oak-bank", name: "Live Oak Bank" },
  { id: "m-and-t-bank", name: "M&T Bank" },
  { id: "midfirst-bank", name: "MidFirst Bank" },
  { id: "navy-federal-credit-union", name: "Navy Federal Credit Union" },
  { id: "nbkc-bank", name: "nbkc bank" },
  { id: "old-national-bank", name: "Old National Bank" },
  { id: "oneunited-bank", name: "OneUnited Bank" },
  { id: "patelco-credit-union", name: "Patelco Credit Union" },
  { id: "penfed-credit-union", name: "PenFed Credit Union" },
  { id: "pnc-bank", name: "PNC Bank" },
  { id: "popular-bank", name: "Popular Bank" },
  { id: "regions-bank", name: "Regions Bank" },
  { id: "sallie-mae-bank", name: "Sallie Mae Bank" },
  { id: "santander-bank", name: "Santander Bank" },
  { id: "seacoast-bank", name: "Seacoast Bank" },
  { id: "security-service-federal-credit-union", name: "Security Service Federal Credit Union" },
  { id: "sofi", name: "SoFi" },
  { id: "southstate-bank", name: "SouthState Bank" },
  { id: "state-employees-credit-union", name: "State Employees' Credit Union" },
  { id: "synchrony-bank", name: "Synchrony Bank" },
  { id: "synovus-bank", name: "Synovus Bank" },
  { id: "td-bank", name: "TD Bank" },
  { id: "texas-capital-bank", name: "Texas Capital Bank" },
  { id: "third-federal", name: "Third Federal" },
  { id: "truist", name: "Truist" },
  { id: "u-s-bank", name: "U.S. Bank" },
  { id: "umpqua-bank", name: "Umpqua Bank" },
  { id: "upgrade", name: "Upgrade" },
  { id: "usaa-federal-savings-bank", name: "USAA Federal Savings Bank" },
  { id: "valley-bank", name: "Valley Bank" },
  { id: "varobank", name: "Varo Bank" },
  { id: "vystar-credit-union", name: "VyStar Credit Union" },
  { id: "webster-bank", name: "Webster Bank" },
  { id: "wells-fargo", name: "Wells Fargo" },
  { id: "western-alliance-bank", name: "Western Alliance Bank" },
  { id: "wintrust-bank", name: "Wintrust Bank" },
  { id: "woodforest-national-bank", name: "Woodforest National Bank" },
  { id: "zions-bank", name: "Zions Bank" },
  { id: "other", name: "Can't find your bank?" },
];

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
  const [isIncomeFocused, setIsIncomeFocused] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const isIncomeActive = isIncomeFocused || (monthlyIncome && String(monthlyIncome).length > 0);
  const selectedBank = bankOptions.find((bank) => bank.id === bankId);
  const isBankActive = Boolean(bankId || bankName);
  const filteredBanks = bankOptions.filter((bank) =>
    bank.name.toLowerCase().includes(bankSearch.trim().toLowerCase()),
  );

  const handleBankSelect = (value) => {
    const bank = bankOptions.find((option) => option.id === value);
    setBankId(value);
    setBankName(value === "other" ? "" : bank?.name || "");
    setBankSearch("");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">Almost There</h1>
      <p className="mt-3 text-base text-brand-body">
        Lenders use this information to review your request and match you with
        available options.
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
                className={`inline-flex items-center font-sans font-light gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? " bg-brand-primary text-brand-white"
                    : "border-brand-stroke bg-brand-white text-brand-body hover:border-brand-secondary"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-brand-white" : "text-brand-lightblue"}`}
                />
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <label className={`block font-medium font-sans transition-colors ${isIncomeActive ? 'text-brand-title' : 'text-brand-label'}`}>
          What is your monthly income after taxes?
        </label>
        <input
          inputMode="numeric"
          className={`mt-4 w-full border-0 border-b bg-transparent px-0 py-3 outline-none placeholder:text-brand-placeholder text-brand-title transition-colors ${isIncomeActive ? 'border-brand-title' : 'border-brand-stroke'}`}
          placeholder="$5,500"
          value={monthlyIncome}
          onFocus={() => setIsIncomeFocused(true)}
          onBlur={() => setIsIncomeFocused(false)}
          onChange={(e) => setMonthlyIncome(formatIncome(e.target.value))}
        />
        <p className="mt-2 text-sm text-brand-body">
          Include income from all reliable sources.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="block">
          <span className={`mb-3 block font-sans text-base font-medium transition-colors ${isBankActive ? 'text-brand-title' : 'text-brand-label'}`}>
            Bank Name
          </span>
          <Select.Root value={bankId} onValueChange={handleBankSelect}>
            <Select.Trigger className={`flex w-full bg-transparent font-sans items-center justify-between font-normal rounded-none border-b py-2 text-left text-base outline-none transition ${isBankActive ? 'border-brand-title text-brand-title' : 'border-brand-stroke text-brand-placeholder hover:border-brand-title'}`}>
              <Select.Value placeholder="Search or select bank">
                {selectedBank?.name || bankName}
              </Select.Value>
              <Select.Icon>
                <ChevronDown className={`h-4 w-4 transition-colors ${isBankActive ? 'text-brand-title' : 'text-brand-placeholder'}`} />
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
                      value={bankSearch}
                      onChange={(e) => setBankSearch(e.target.value)}
                      placeholder="Search banks..."
                      className="w-full font-sans bg-transparent text-sm text-brand-title outline-none placeholder:text-brand-placeholder"
                    />
                  </div>
                </div>
                <Select.Viewport className="max-h-72 overflow-auto p-2">
                  {filteredBanks.length ? (
                    filteredBanks.map((bank) => (
                      <Select.Item
                        key={bank.id}
                        value={bank.id}
                        className="relative flex cursor-pointer font-sans items-center rounded-xl px-3 py-3 text-sm text-brand-body outline-none transition hover:bg-brand-lightblue data-[highlighted]:bg-brand-lightblue/20 data-[state=checked]:bg-brand-lightblue data-[state=checked]:text-brand-title"
                      >
                        <Select.ItemText>
                          <span className="font-sans font-normal text-brand-title">{bank.name}</span>
                        </Select.ItemText>
                      </Select.Item>
                    ))
                  ) : (
                    <Select.Item
                      value="other"
                      className="relative flex cursor-pointer font-sans items-center rounded-xl bg-brand-lightblue px-3 py-3 text-sm text-brand-title outline-none transition hover:bg-brand-primary hover:text-brand-white data-[highlighted]:bg-brand-primary data-[highlighted]:text-brand-white"
                    >
                      <Select.ItemText>
                        <span className="font-sans font-semibold">Can&apos;t find your bank? Type it manually</span>
                      </Select.ItemText>
                    </Select.Item>
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          {bankId === "other" ? (
            <div className="mt-4">
              <Field
                label="Bank Name"
                placeholder="Enter your bank name"
                value={bankName}
                forceActive
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
          ) : null}
        </div>
        <div className="block">
          <span className={`mb-3 block font-sans text-base font-medium transition-colors ${accountType ? 'text-brand-title' : 'text-brand-label'}`}>
            Account Type
          </span>
          <Select.Root value={accountType} onValueChange={setAccountType}>
            <Select.Trigger className={`flex w-full bg-transparent font-sans items-center justify-between font-normal rounded-none border-b py-2 text-left text-base outline-none transition ${accountType ? 'border-brand-title text-brand-title' : 'border-brand-stroke text-brand-placeholder hover:border-brand-title'}`}>
              <Select.Value placeholder="Select Checking/Savings" />
              <Select.Icon>
                <ChevronDown className={`h-4 w-4 transition-colors ${accountType ? 'text-brand-title' : 'text-brand-placeholder'}`} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={8}
                className="z-50 font-sans w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-brand-stroke bg-brand-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
              >
                <Select.Viewport className="p-2">
                  {['Checking', 'Savings'].map((type) => (
                    <Select.Item
                      key={type}
                      value={type}
                      className="relative flex cursor-pointer font-sans items-center rounded-xl px-3 py-3 text-sm text-brand-body outline-none transition hover:bg-brand-lightblue data-[highlighted]:bg-brand-lightblue/20 data-[state=checked]:bg-brand-lightblue data-[state=checked]:text-brand-title"
                    >
                      <Select.ItemText>
                        <span className="font-sans font-normal text-brand-title">{type}</span>
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
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
