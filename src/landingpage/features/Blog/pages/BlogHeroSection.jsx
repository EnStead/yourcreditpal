import Star from '../../../../assets/Star.svg?react'

const BlogHeroSection = () => {
  return (
    <section className="px-5 pt-14 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-brand-accent2">Insights</span>
          <Star className="h-3 w-3 text-brand-accent2" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-brand-title sm:text-5xl lg:text-6xl">
          Financial Tips, Loan Guides & Helpful Resources
        </h1>
        <p className="mx-auto mt-5 max-w-2xl sm:text-lg leading-8 text-brand-body">
          Explore helpful articles about personal loans, credit, borrowing, repayment, and financial planning.
        </p>
      </div>
    </section>
  )
}

export default BlogHeroSection
