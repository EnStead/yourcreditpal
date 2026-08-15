const NAME_PATTERN = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/

export const nameError = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.length < 2) return 'Must be at least 2 characters.'
  if (!NAME_PATTERN.test(trimmed)) return 'Use letters, hyphens or apostrophes only.'
  return ''
}

export const capitalizeName = (value) => {
  const trimmed = value.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : trimmed
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emailError = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.'
  return ''
}

export const zipError = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (!/^\d{5}$/.test(trimmed)) return 'Enter a 5-digit ZIP code.'
  return ''
}

const PO_BOX_PATTERN = /\bp[\s.]?o[\s.]?\s*box\b/i

export const streetAddressError = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.length < 5) return 'Enter your full street address.'
  if (PO_BOX_PATTERN.test(trimmed)) return 'PO Box addresses cannot be used.'
  return ''
}

export const cityError = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.length < 2) return 'Must be at least 2 characters.'
  return ''
}

// Standard ABA routing-number checksum: weighted 3-7-1 digit sum must divide evenly by 10.
export const isValidAbaChecksum = (routing) => {
  if (!/^\d{9}$/.test(routing)) return false
  const d = routing.split('').map(Number)
  const sum = 3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + 1 * (d[2] + d[5] + d[8])
  return sum % 10 === 0
}

export const capitalizeCity = (value) => {
  const trimmed = value.trim()
  return trimmed
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}
