import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveRejectionCopy } from './rejectionCopy.js'

test('puts an unavailable consent service first without hiding the other reasons', () => {
  const copy = resolveRejectionCopy([
    'credit_score_below_580', 'trustedform_unverified',
  ], 'Generic rejection')
  assert.match(copy.body, /on our side/i)
  assert.deepEqual(copy.bullets, ['The credit score range selected was below 580.'])
})

test('distinguishes an invalid consent record from a service failure', () => {
  const copy = resolveRejectionCopy(['trustedform_invalid'], 'Generic rejection')
  assert.match(copy.body, /did not pass verification/i)
  assert.doesNotMatch(copy.body, /unavailable|on our side/i)
})

test('shows specific known reasons alongside unfamiliar codes without exposing raw codes', () => {
  const copy = resolveRejectionCopy([
    'phone_type_non_fixed_voip', 'future_internal_code', 'phone_type_voip', 'zip_state_mismatch',
  ], 'Generic rejection')
  assert.deepEqual(copy.bullets, [
    'Internet-based (VoIP) phone numbers are not accepted. Use a mobile or landline number.',
    "Your ZIP code doesn't match the selected state.",
  ])
  assert.equal(resolveRejectionCopy(['future_internal_code'], 'Generic rejection').body, 'Generic rejection')
})
