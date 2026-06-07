import { BriefcaseBusiness, ChevronRight, Search } from 'lucide-react'
import { ConfidenceBox, ConsentText, Field } from './shared'

const ApplyStepThree = ({ employment, setEmployment, employmentOptions }) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-4xl">
        Almost There
      </h1>
      <p className="mt-4 text-base leading-7 text-brand-body">
        Lenders use this information to review your request and match you with available options.
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-brand-title">Employment Status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {employmentOptions.map((item) => {
            const active = employment === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setEmployment(item)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active ? 'border-brand-secondary bg-brand-secondary text-brand-white' : 'border-brand-stroke/35 bg-brand-white text-brand-body hover:border-brand-secondary'
                }`}
              >
                <BriefcaseBusiness className={`h-4 w-4 ${active ? 'text-brand-white' : 'text-brand-lightblue'}`} />
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-lg font-bold text-brand-title">What is your monthly income after taxes?</label>
        <input className="mt-4 w-full border-0 border-b border-brand-body/70 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-brand-stroke" placeholder="$65,560" />
        <p className="mt-2 text-sm text-brand-body">Include income from all reliable sources.</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Bank Name" placeholder="Lead Bank" icon={Search} />
        <Field label="Account Type" placeholder="Checking" icon={ChevronRight} />
      </div>

      <ConfidenceBox items={['Secure Application', 'No Upfront Fees', 'Takes Just a Few Minutes', 'No Obligation to Accept an Offer']} />
      <ConsentText />
    </>
  )
}

export default ApplyStepThree
