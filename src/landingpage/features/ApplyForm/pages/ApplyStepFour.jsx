import { House } from 'lucide-react'
import Home from "../../../../assets/Homes.svg?react";
import Rent from "../../../../assets/Rent.svg?react";
import Family from "../../../../assets/Family.svg?react";
import Other from "../../../../assets/Other.svg?react";
import { ConsentList, SecureNoticeCard, Field } from './shared'

const iconMap = {
  "Own Home": Home,
  "Rent": Rent,
  "Living with Family": Family,
  "Other": Other,
};

const ApplyStepFour = ({ housing, setHousing, housingOptions, streetAddress, setStreetAddress, city, setCity, zipCode, setZipCode }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">
        Almost There
      </h1>
      <p className="mt-3 text-base text-brand-body">
        Lenders use this information to review your request and match you with available options.
      </p>

      <div className="mt-8">
        <h2 className="font-bold text-brand-title">Housing Status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {housingOptions.map((item) => {
            const active = housing === item
            const Icon = iconMap[item] || House;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setHousing(item)}
                className={`inline-flex font-sans font-light items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active ? 'bg-brand-primary text-brand-white' : 'border-brand-stroke bg-brand-white text-brand-body hover:border-brand-secondary'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-brand-white' : 'text-brand-lightblue'}`} />
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 font-sans">
        <Field
          label="Street Address"
          placeholder="123 Main Street"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="City"
            placeholder="E.g Atlanta"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Field
            label="Postal/Zip Code"
            placeholder="Enter Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>

      <SecureNoticeCard
        title="Your Information Is Secure"
        text="We use encrypted connections and verification systems to help protect your information throughout the application process."
      />
      <ConsentList />
    </>
  )
}

export default ApplyStepFour
