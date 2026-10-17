import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { head, put } from '@vercel/blob'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { addNewsletterSubscriber, NewsletterUnavailableError, normalizeNewsletterEmail } from './newsletter'

vi.mock('@vercel/blob', () => ({ head: vi.fn<typeof head>(), put: vi.fn<typeof put>() }))

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetAllMocks()
})

describe('normalizeNewsletterEmail', () => {
  it('normalizes valid addresses', () => {
    expect(normalizeNewsletterEmail('  HELLO@Example.com ')).toBe('hello@example.com')
  })

  it('rejects malformed addresses', () => {
    expect(normalizeNewsletterEmail('not-an-email')).toBe('')
    expect(normalizeNewsletterEmail('a@b')).toBe('')
  })
})

describe('newsletter persistence', () => {
  it('keeps different subscribers in separate private objects and deduplicates retries', async () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    vi.stubEnv('BLOB_STORE_ID', 'test-store')
    const objects = new Map<string, string>()
    vi.mocked(put).mockImplementation(async (pathname, body, options) => {
      expect(options).toMatchObject({ access: 'private', addRandomSuffix: false, allowOverwrite: false })
      expect(pathname).not.toContain('@')
      if (objects.has(pathname))
        throw new Error('already exists')
      objects.set(pathname, String(body))
      return { pathname } as Awaited<ReturnType<typeof put>>
    })
    vi.mocked(head).mockImplementation(async (pathname) => {
      if (!objects.has(String(pathname)))
        throw new Error('not found')
      return { pathname } as Awaited<ReturnType<typeof head>>
    })

    const results = await Promise.all([
      addNewsletterSubscriber('first@example.com'),
      addNewsletterSubscriber('second@example.com'),
      addNewsletterSubscriber('first@example.com'),
    ])
    expect(objects.size).toBe(2)
    expect(results.map(result => result.created)).toEqual([true, true, false])
    expect([...objects.values()].map(value => JSON.parse(value).email).sort())
      .toEqual(['first@example.com', 'second@example.com'])
  })

  it('does not report success when persistent storage is unavailable', async () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    vi.stubEnv('BLOB_STORE_ID', 'test-store')
    vi.mocked(put).mockRejectedValue(new Error('storage unavailable'))
    vi.mocked(head).mockRejectedValue(new Error('storage unavailable'))
    await expect(addNewsletterSubscriber('first@example.com')).rejects.toThrow('storage unavailable')
  })

  it('prevents previews from writing to the production store', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    vi.stubEnv('BLOB_STORE_ID', 'production-store')
    await expect(addNewsletterSubscriber('first@example.com')).rejects.toBeInstanceOf(NewsletterUnavailableError)
    expect(put).not.toHaveBeenCalled()
  })

  it('preserves local JSON storage for development', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'newsletter-'))
    vi.stubEnv('VERCEL_ENV', '')
    vi.stubEnv('VERCEL', '')
    vi.stubEnv('BLOB_STORE_ID', '')
    vi.stubEnv('BLOB_READ_WRITE_TOKEN', '')
    vi.stubEnv('NEWSLETTER_GIT_CWD', directory)
    vi.stubEnv('NEWSLETTER_GIT_COMMIT', 'false')
    try {
      await Promise.all([
        addNewsletterSubscriber('first@example.com'),
        addNewsletterSubscriber('second@example.com'),
        addNewsletterSubscriber('first@example.com'),
      ])
      const store = JSON.parse(await readFile(join(directory, 'data/newsletter/subscribers.json'), 'utf8'))
      expect(store.subscribers).toHaveLength(2)
    }
    finally {
      await rm(directory, { recursive: true, force: true })
    }
  })
})
