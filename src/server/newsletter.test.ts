import { describe, expect, it } from 'vitest'
import { normalizeNewsletterEmail } from './newsletter'

describe('normalizeNewsletterEmail', () => {
  it('normalizes valid addresses', () => {
    expect(normalizeNewsletterEmail('  HELLO@Example.com ')).toBe('hello@example.com')
  })

  it('rejects malformed addresses', () => {
    expect(normalizeNewsletterEmail('not-an-email')).toBe('')
    expect(normalizeNewsletterEmail('a@b')).toBe('')
  })
})
