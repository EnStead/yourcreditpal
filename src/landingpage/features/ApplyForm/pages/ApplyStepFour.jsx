import { House } from 'lucide-react'
import { ConsentList, SecureNoticeCard } from './shared'

const ApplyStepFour = ({ housing, setHousing, housingOptions }) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-4xl">
        Almost There
      </h1>
      <p className="mt-4 text-base leading-7 text-brand-body">
        Lenders use this information to review your request and match you with available options.
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-brand-title">Housing Status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {housingOptions.map((item) => {
            const active = housing === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setHousing(item)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active ? 'border-brand-secondary bg-brand-secondary text-brand-white' : 'border-brand-stroke/35 bg-brand-white text-brand-body hover:border-brand-secondary'
                }`}
              >
                <House className={`h-4 w-4 ${active ? 'text-brand-white' : 'text-brand-lightblue'}`} />
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <label className="block">
          <span className="mb-3 block text-base font-medium text-brand-body">Street Address</span>
          <input className="w-full border-0 border-b border-brand-body/40 bg-transparent py-2 text-base text-brand-title outline-none placeholder:text-brand-stroke" placeholder="123 Main Street" />
        </label>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-3 block text-base font-medium text-brand-body">City</span>
            <input className="w-full border-0 border-b border-brand-body/40 bg-transparent py-2 text-base text-brand-title outline-none placeholder:text-brand-stroke" placeholder="E.g Atlanta" />
          </label>
          <label className="block">
            <span className="mb-3 block text-base font-medium text-brand-body">Postal/Zip Code</span>
            <input className="w-full border-0 border-b border-brand-body/40 bg-transparent py-2 text-base text-brand-title outline-none placeholder:text-brand-stroke" placeholder="Enter Zip code" />
          </label>
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
