import { forwardRef, useMemo, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import DatePicker from 'react-datepicker'
import { format, parse } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarDays, ChevronDown, Search, X } from 'lucide-react'
import { ConfidenceBox, ConsentText, Field, Notice } from './shared'
import USAFlag from '../../../../assets/USA.png'

const states = [
  { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' }, { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' }, { name: 'California', code: 'CA' }, { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' }, { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' }, { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' }, { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' }, { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' }, { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' }, { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' }, { name: 'Montana', code: 'MT' }, { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' }, { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' }, { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' }, { name: 'Ohio', code: 'OH' }, { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' }, { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' }, { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' }, { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' }, { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' },
]

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  const parts = []
  if (digits.length > 0) parts.push(`(${digits.slice(0, 3)}`)
  if (digits.length >= 3) parts[0] = `(${digits.slice(0, 3)})`
  if (digits.length > 3) parts.push(` ${digits.slice(3, 6)}`)
  if (digits.length > 6) parts.push(`-${digits.slice(6, 10)}`)
  return parts.join('').replace(/\s+/g, ' ')
}

const ApplyStepTwo = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  dob,
  setDob,
  usState,
  setUsState,
}) => {
  const [stateSearch, setStateSearch] = useState('')
  const selectedDate = dob ? parse(dob, 'MM/dd/yyyy', new Date()) : null

  const filteredStates = useMemo(() => {
    const q = stateSearch.trim().toLowerCase()
    if (!q) return states
    return states.filter(
      (item) => item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q),
    )
  }, [stateSearch])

  return (
    <>
      <h1 className="text-2xl font-bold text-brand-title">
        Let&apos;s Find Loan Options That Match Your Needs
      </h1>
      <p className="mt-4 text-base text-brand-body">
        Tell us a little about your request so we can connect you with relevant partners.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Field
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div className="sm:col-span-2">
          <Field
            label="Email Address"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="mb-3 block text-base font-medium text-brand-label">Phone Number</span>
            <div className="flex items-center border-b border-brand-stroke py-2 transition-colors focus-within:border-brand-title">
              <div className="flex items-center gap-2 pr-3">
                <img src={USAFlag} alt="United States" className="h-5 w-5 border border-brand-lightblue rounded-full object-cover" />
                <span className="text-base font-medium text-brand-title">(+1)</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                maxLength={14}
                className="min-w-0 flex-1 bg-transparent text-base text-brand-title outline-none placeholder:text-brand-placeholder"
              />
            </div>
            <p className="mt-2 text-xs text-brand-label">
              Enter a complete 10-digit US number.
            </p>
          </label>
        </div>

        <div className="block">
          <span className="mb-3 block text-base font-medium text-brand-label">
            Date of Birth
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setDob(date ? format(date, 'MM/dd/yyyy') : '')}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            customInput={<DateInput />}
            wrapperClassName="w-full"
          />
        </div>

        <div className="block">
          <span className="mb-3 block text-base font-medium text-brand-label">
            State
          </span>
          <Select.Root value={usState} onValueChange={setUsState}>
          <Select.Trigger className="flex w-full font-sans items-center justify-between font-normal rounded-none border-b border-brand-stroke py-2 text-left text-base text-brand-placeholder outline-none transition hover:border-brand-title">
              <Select.Value placeholder="Select state" />
              <Select.Icon>
                <ChevronDown className="h-4 w-4 text-brand-placeholder" />
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
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      placeholder="Search states..."
                    className="w-full font-sans bg-transparent text-sm text-brand-title outline-none placeholder:text-brand-placeholder"
                    />
                    {stateSearch ? (
                      <button
                        type="button"
                        onClick={() => setStateSearch('')}
                        className="text-brand-placeholder transition hover:text-brand-title"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
                <Select.Viewport className="max-h-72 overflow-auto p-2">
                  {filteredStates.length ? (
                    filteredStates.map((item) => (
                      <Select.Item
                        key={item.code}
                        value={item.name}
                        className="relative flex cursor-pointer font-sans items-center rounded-xl px-3 py-3 text-sm text-brand-body outline-none transition hover:bg-brand-lightblue data-[highlighted]:bg-brand-lightblue data-[state=checked]:bg-brand-lightblue data-[state=checked]:text-brand-title"
                      >
                        <Select.ItemText>
                          <span className="flex items-center gap-2">
                            <span className="font-sans font-normal text-brand-title">{item.name}</span>
                            <span className="text-xs text-brand-label">{item.code}</span>
                          </span>
                        </Select.ItemText>
                      </Select.Item>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-sm text-brand-label">No states found.</div>
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <Notice text="Applicants must be at least 18 years old." />
      <ConfidenceBox items={['Secure Application', 'No Upfront Fees', 'Takes Just a Few Minutes', 'No Obligation to Accept an Offer']} />
      <ConsentText />
    </>
  )
}

export default ApplyStepTwo

const DateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    ref={ref}
    onClick={onClick}
    className="flex w-full font-sans items-center justify-between border-b border-brand-stroke py-2 text-left font-normal text-brand-title outline-none transition hover:border-brand-title rounded-none"
  >
    <span className={value ? 'text-brand-title' : 'text-brand-placeholder'}>
      {value || placeholder}
    </span>
    <CalendarDays className="h-4 w-4 text-brand-placeholder" />
  </button>
))
