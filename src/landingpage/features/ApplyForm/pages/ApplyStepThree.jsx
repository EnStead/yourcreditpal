import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  BriefcaseBusiness,
  Briefcase,
  UserRound,
  Coffee,
  HeartPulse,
  SearchX,
  Search,
  ChevronDown,
} from "lucide-react";
import MoneyBag from "../../../../assets/MoneyBag.svg?react";
import Self from "../../../../assets/Self.svg?react";
import Retired from "../../../../assets/Retired.svg?react";
import Benefits from "../../../../assets/Benefits.svg?react";
import Unemployed from "../../../../assets/Unemployed.svg?react";
import { ConfidenceBox, ConsentText, Field } from "./shared";

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

const ApplyStepThree = ({
  employment,
  setEmployment,
  employmentOptions,
  monthlyIncome,
  setMonthlyIncome,
  bankName,
  setBankName,
  accountType,
  setAccountType,
}) => {
  const [isIncomeFocused, setIsIncomeFocused] = useState(false);
  const isIncomeActive = isIncomeFocused || (monthlyIncome && String(monthlyIncome).length > 0);

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
        <Field
          label="Bank Name"
          placeholder="Lead Bank"
          icon={Search}
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
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
