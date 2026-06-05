import Star from '../../../../assets/Star.svg?react'

const HeaderSection = () => {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-brand-accent2">
          <span>Communication Preferences</span>
          <Star className="h-3 w-3 text-brand-accent2" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-brand-title sm:text-5xl">
          Manage Your Communication Preferences
        </h1>
        <p className="mx-auto mt-5 max-w-3xl sm:text-lg leading-8 text-brand-body">
          You can unsubscribe from promotional emails, SMS messages, and other marketing communications related to CreditPal and participating partners.
        </p>
      </div>
    </section>
  )
}

export default HeaderSection
 