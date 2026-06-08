import * as Tabs from '@radix-ui/react-tabs'
import * as Select from '@radix-ui/react-select'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'

import SolarCase from '../../../../assets/SolarCase.svg?react'
import Info from '../../../../assets/Info.svg?react'
import CreditCard from '../../../../assets/CreditCard.svg?react'
import BagMoney from '../../../../assets/BagMoney.svg?react'
import Shield from '../../../../assets/Shield.svg?react'
import Send from '../../../../assets/Send.svg?react'
import Bank from '../../../../assets/Bank.svg?react'
import Phone from '../../../../assets/Phone.svg?react'
import Read from '../../../../assets/Read.svg?react'
import Call from '../../../../assets/Call.svg?react'
import Caution from '../../../../assets/Caution.svg?react'
import PhoneBook from '../../../../assets/PhoneBook.svg?react'
import Duo from '../../../../assets/Duo.svg?react'
import Location from '../../../../assets/Location.svg?react'
import UserShield from '../../../../assets/UserShield.svg?react'
import UserId from '../../../../assets/UserId.svg?react'
import Exit from '../../../../assets/Exit.svg?react'
import File from '../../../../assets/File.svg?react'
import Seal from '../../../../assets/Seal.svg?react'
import Coin from '../../../../assets/Coin.svg?react'


const tabItems = [
  { value: 'applications', label: 'Applications' },
  { value: 'loan-process', label: 'Loan Process' },
  { value: 'eligibility', label: 'Eligibility' },
  { value: 'security-privacy', label: 'Security & Privacy' },
  { value: 'repayment', label: 'Repayment' },
]

const faqs = {
  applications: [
    {
      icon: SolarCase,
      question: 'Is YourCreditPal a lender?',
      answer: 'No. YourCreditPal is a loan matching platform that connects applicants with lending partners.',
    },
    {
      icon: Info,
      question: 'What information do I need to apply?',
      answer: 'You may need to provide personal, employment, income, and banking information during the application process.',
    },
    {
      icon: BagMoney,
      question: 'How quickly can I receive funds?',
      answer: 'Funding timelines vary by lender, but some lenders may provide funds as soon as the next business day.',
    },
    {
      icon: Shield,
      question: 'Is my information secure?',
      answer: 'We use encrypted connections and modern security practices to help protect your information.',
    },
    {
      icon: Bank,
      question: 'Do I need a bank account?',
      answer: 'Most lending partners require an active checking or savings account.',
    },
    {
      icon: CreditCard,
      question: 'Does checking my options affect my credit score?',
      answer: 'Checking available loan options through YourCreditPal typically does not impact your credit score.',
    },
    {
      icon: Send,
      question: 'Can I apply more than once?',
      answer: 'Yes, though duplicate applications submitted within a short period may be reviewed differently.',
    },
    {
      icon: Phone,
      question: 'Can I apply from my phone?',
      answer: 'Yes. YourCreditPal is fully optimized for mobile devices.',
    },
  ],
  'loan-process': [
    {
      icon: SolarCase,
      question: 'How does YourCreditPal work?',
      answer: 'YourCreditPal helps connect applicants with lending partners through a simplified online process.',
    },
    {
      icon: Send,
      question: 'What happens after I submit my application?',
      answer: 'Your information may be reviewed and matched with potential lending partners.',
    },
    {
      icon: Read,
      question: 'Am I guaranteed approval?',
      answer: 'No. Approval decisions are made independently by lenders based on their own requirements.',
    },
    {
      icon: Call,
      question: 'Will a lender contact me?',
      answer: 'If matched, a lender or financial partner may contact you by phone, email, or text.',
    },
  ],
  eligibility: [
    {
      icon: Caution,
      question: 'Can I apply with bad credit?',
      answer: 'Some lenders may consider applicants with different credit backgrounds.',
    },
    {
      icon: Duo,
      question: 'Is employment required?',
      answer: 'Some lenders may require proof of income or employment.',
    },
    {
      icon: PhoneBook,
      question: 'What are the minimum age requirements?',
      answer: 'Applicants must be at least 18 years old.',
    },
    {
      icon: Location,
      question: 'What states are supported?',
      answer: 'Availability may vary depending on lender requirements and state regulations.',
    },
  ],
  'security-privacy': [
    {
      icon: UserShield,
      question: 'Is my personal information secure?',
      answer: 'We use secure encryption technology to help protect your information.',
    },
    {
      icon: UserId,
      question: 'Will my information be shared?',
      answer: 'Your information may be shared with lending partners and service providers as described in our Privacy Policy.',
    },
    {
      icon: Exit,
      question: 'How do I unsubscribe from communications?',
      answer: 'You can unsubscribe through our unsubscribe page or by following opt-out instructions in communications.',
    },
  ],
  repayment: [
    {
      icon: File,
      question: 'Who sets the loan rates and terms?',
      answer: 'Rates and repayment terms are determined by individual lenders.',
    },
    {
      icon: Seal,
      question: 'What happens if I miss a payment?',
      answer: 'Late payments may result in additional fees or collection activity depending on lender policies.',
    },
    {
      icon: Coin,
      question: 'Can I pay off my loan early?',
      answer: 'Early repayment policies vary by lender.',
    },
  ],
}

const tabPanels = {
  applications: 'grid-cols-1 lg:grid-cols-2',
  'loan-process': 'grid-cols-1 lg:grid-cols-2',
  eligibility: 'grid-cols-1 lg:grid-cols-2',
  'security-privacy': 'grid-cols-1 lg:grid-cols-2',
  repayment: 'grid-cols-1 lg:grid-cols-2',
}

const FaqTabSection = () => {
  const [activeTab, setActiveTab] = useState('applications')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 })
  const listRef = useRef(null)

  // Recalculates the position and size of the active tab background
  useEffect(() => {
    const updateIndicator = () => {
      if (listRef.current) {
        const activeElement = listRef.current.querySelector('[data-state="active"]')
        if (activeElement) {
          setIndicatorStyle({
            left: activeElement.offsetLeft,
            top: activeElement.offsetTop,
            width: activeElement.offsetWidth,
            height: activeElement.offsetHeight,
            opacity: 1,
          })
        }
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  return (
    <section className="px-5 pb-20 sm:px-10 lg:px-20">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6 ls:hidden">
          <Select.Root value={activeTab} onValueChange={setActiveTab}>
            <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-xl border border-brand-stroke bg-brand-white px-4 text-left text-base font-medium text-brand-title shadow-[0_8px_24px_rgba(15,23,42,0.04)] outline-none transition hover:border-brand-primary focus:border-brand-primary">
              <Select.Value />
              <Select.Icon className="ml-3 text-brand-title">
                <ChevronDown className="h-5 w-5" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={8}
                className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-brand-stroke bg-brand-white shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
              >
                <Select.Viewport className="p-2">
                  {tabItems.map((tab) => (
                    <Select.Item
                      key={tab.value}
                      value={tab.value}
                      className="relative flex cursor-pointer select-none items-center rounded-lg py-3 pl-3 pr-10 text-base text-brand-body outline-none transition focus:bg-brand-lightblue focus:text-brand-title data-[state=checked]:bg-brand-lightblue data-[state=checked]:text-brand-title data-[highlighted]:bg-brand-offwhite data-[highlighted]:text-brand-title"
                    >
                      <Select.ItemText>{tab.label}</Select.ItemText>
                      <Select.ItemIndicator className="absolute right-3 inline-flex items-center justify-center text-brand-primary">
                        <Check className="h-4 w-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="hidden w-full rounded-lg border border-brand-stroke bg-brand-offwhite p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ls:block">
          <Tabs.List ref={listRef} className="relative flex w-fit flex-wrap gap-14">
            {/* Gliding Indicator */}
            <div
              className="absolute rounded-lg bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out pointer-events-none"
              style={{ left: indicatorStyle.left, top: indicatorStyle.top, width: indicatorStyle.width, height: indicatorStyle.height, opacity: indicatorStyle.opacity }}
            />

            {tabItems.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="relative z-10 w-fit font-sans rounded-lg px-5 py-2 text-left text-sm font-light text-brand-label transition outline-none data-[state=active]:font-medium data-[state=active]:text-brand-title"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        {tabItems.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value} className="pt-8 outline-none data-[state=active]:animate-fade-in-up">
            <div className={`grid gap-y-10 gap-x-12 md:gap-y-12 ${tabPanels[tab.value]}`}>
              {faqs[tab.value].map((faq) => {
                const Icon = faq.icon

                return (
                  <article key={faq.question} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-lightblue text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-title">
                        {faq.question}
                      </h3>
                      <p className="mt-2 max-w-xl text-base text-brand-label">
                        {faq.answer}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  )
}

export default FaqTabSection
