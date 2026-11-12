const VOIP = 'Internet-based (VoIP) phone numbers are not accepted. Use a mobile or landline number.'
const CONSENT_UNAVAILABLE = 'We could not verify your consent because our verification service was unavailable. This was an issue on our side.'

const reasonCopy = new Map([
  ['first_name_invalid', 'Your first name did not pass validation. Check how it was entered.'],
  ['last_name_invalid', 'Your last name did not pass validation. Check how it was entered.'],
  ['under_18', 'You must be 18 or older to apply.'],
  ['zip_state_mismatch', "Your ZIP code doesn't match the selected state."],
  ['email_suppressed', 'We cannot use the email address provided for this application.'],
  ['phone_suppressed', 'We cannot use the phone number provided for this application.'],
  ['email_invalid', 'We could not verify that the email address can receive mail.'],
  ['phone_invalid_or_disconnected', 'The phone number appears to be invalid or disconnected.'],
  ['phone_type_voip', VOIP],
  ['phone_type_non_fixed_voip', VOIP],
  ['phone_type_toll_free', 'Toll-free numbers are not accepted. Use a mobile or landline number.'],
  ['phone_type_unknown', 'We could not identify the phone number as mobile or landline.'],
  ['trustedform_invalid', 'The consent record for this submission did not pass verification.'],
  ['trustedform_unverified', CONSENT_UNAVAILABLE],
  ['income_below_1500', 'The monthly income provided was below $1,500.'],
  ['credit_score_below_580', 'The credit score range selected was below 580.'],
  ['credit_score_unknown', 'No credit score range was provided.'],
  ['unemployed', 'The employment status selected was Unemployed.'],
  ['benefits_disability', 'The employment status selected was Benefits/Disability.'],
  ['loan_purpose_other', 'The loan purpose selected was Others, which this application does not support.'],
  ['ip_submitted_more_than_3x_24h', 'Too many applications were submitted recently from this network.'],
])

export function resolveRejectionCopy(reasons, fallbackMessage) {
  const codes = Array.isArray(reasons) ? reasons : []
  const explanations = [...new Set(codes.map(code => reasonCopy.get(code)).filter(Boolean))]

  if (codes.includes('trustedform_unverified')) {
    return {
      title: 'We Could Not Verify Consent',
      body: CONSENT_UNAVAILABLE,
      bullets: explanations.filter(reason => reason !== CONSENT_UNAVAILABLE),
    }
  }

  if (explanations.length === 1) {
    return { body: explanations[0], bullets: [] }
  }

  return { body: fallbackMessage, bullets: explanations }
}
