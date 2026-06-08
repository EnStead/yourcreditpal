import Logo from '../../../../assets/Logo.svg?react'

const BlogLoadingState = ({ title = 'Loading article' }) => {
  return (
    <div className="mx-auto flex min-h-[22rem] w-full max-w-3xl flex-col items-center justify-center px-5 py-14 text-center">
      <div className="flex h-24 w-24 items-center justify-center">
        <Logo className="h-16 w-16 animate-spin text-brand-primary [animation-duration:1.6s]" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-brand-title">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-brand-body">
        Getting the latest YourCreditPal insights ready for you.
      </p>
      <div className="mt-6 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-darkBlue [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-secondary" />
      </div>
    </div>
  )
}

export default BlogLoadingState
