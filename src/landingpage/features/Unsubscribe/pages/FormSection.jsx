import { useState } from 'react'
import SubImage from '../../../../assets/SubImage.png'
import Globe from '../../../../assets/Globe.png'

const communicationTypes = [
  'Email Marketing',
  'SMS/Text Messages',
  'Phone Calls',
  'Browser Notifications',
  'All Communications',
]

const FormSection = ({ submitted, onSubmit }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    communications: ['Email Marketing'],
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleToggle = (item) => {
    setForm((current) => {
      const exists = current.communications.includes(item)

      if (item === 'All Communications') {
        return {
          ...current,
          communications: exists ? [] : [...communicationTypes],
        }
      }

      const next = exists
        ? current.communications.filter((value) => value !== item)
        : [...current.communications.filter((value) => value !== 'All Communications'), item]

      return {
        ...current,
        communications: next,
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <section className="px-5 pt-12 pb-20 sm:px-8 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
        <div className="lg:pt-8">
          {!submitted ? (
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-brand-title sm:text-4xl">
                We Respect Your Preferences
              </h2>
              <p className="mt-4 max-w-xl sm:text-lg leading-8 text-brand-body/80">
                CreditPal works to process unsubscribe requests as quickly as possible. Some third-party partner systems may take additional time to fully update communication preferences.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 max-w-xl">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block group">
                    <span className={`text-sm font-medium transition-colors group-focus-within:text-brand-title ${form.firstName ? 'text-brand-title' : 'text-brand-secondary'}`}>
                      First Name
                    </span>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="E.g; John"
                      className="mt-2 w-full border-0 border-b border-brand-stroke bg-transparent px-0 pb-3 text-base text-brand-title outline-none placeholder:text-brand-placeholder focus:border-brand-primary"
                    />
                  </label>
                  <label className="block group">
                    <span className={`text-sm font-medium transition-colors group-focus-within:text-brand-title ${form.lastName ? 'text-brand-title' : 'text-brand-secondary'}`}>
                      Last Name
                    </span>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="E.g; Doe"
                      className="mt-2 w-full border-0 border-b border-brand-stroke bg-transparent px-0 pb-3 text-base text-brand-title outline-none placeholder:text-brand-placeholder focus:border-brand-primary"
                    />
                  </label>
                </div>

                <label className="mt-8 block group">
                  <span className={`text-sm font-medium transition-colors group-focus-within:text-brand-title ${form.email ? 'text-brand-title' : 'text-brand-secondary'}`}>
                    Email Address
                  </span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="johndoe@gmail.com"
                    className="mt-2 w-full border-0 border-b border-brand-stroke bg-transparent px-0 pb-3 text-base text-brand-title outline-none placeholder:text-brand-placeholder focus:border-brand-primary"
                  />
                </label>

                <label className="mt-8 block group">
                  <span className={`text-sm font-medium transition-colors group-focus-within:text-brand-title ${form.phone ? 'text-brand-title' : 'text-brand-secondary'}`}>
                    Phone Number
                  </span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(+1) 234-567-8900"
                    className="mt-2 w-full border-0 border-b border-brand-stroke bg-transparent px-0 pb-3 text-base text-brand-title outline-none placeholder:text-brand-placeholder focus:border-brand-primary"
                  />
                </label>

                <div className="mt-8">
                  <p className={`text-sm font-medium transition-colors ${form.communications.length > 0 ? 'text-brand-title' : 'text-brand-secondary'}`}>Communication Types</p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    {communicationTypes.map((item) => (
                      <label key={item} className={`flex items-center gap-3 text-base font-medium transition-colors ${form.communications.includes(item) ? 'text-brand-title' : 'text-brand-body'}`}>
                        <input
                          type="checkbox"
                          checked={form.communications.includes(item)}
                          onChange={() => handleToggle(item)}
                          className="h-4 w-4 rounded border-brand-stroke text-brand-primary focus:ring-brand-primary"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-10 inline-flex bg-brand-primary text-brand-white px-10 py-3 transition hover:bg-brand-offwhite"
                >
                  Submit Request
                </button>
              </form>
            </div>
          ) : (
            <div className="flex min-h-[38rem] flex-col items-center justify-center text-center">
              <img src={Globe} alt="Submission received" className="h-28 w-28 object-contain" />
              <h2 className="mt-8 text-3xl font-bold tracking-[-0.03em] text-brand-title sm:text-4xl">
                Your Request Has Been Received
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-brand-body/80">
                We’ve started processing your communication preference request. Most updates happen quickly, though some partner systems may take up to 10 business days to fully update.
              </p>
              <p className="mt-6 max-w-lg text-base leading-7 text-brand-body/80">
                You may still receive operational or application-related communications where necessary.
              </p>
            </div>
          )}
        </div>

        <div className="hidden lg:block lg:pt-8">
          <div className="overflow-hidden rounded-[0.15rem]">
            <img
              src={submitted ? SubImage : SubImage}
              alt={submitted ? 'Submission received' : 'Communication preference illustration'}
              className="h-[42rem] w-full object-cover lg:h-[46rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormSection
