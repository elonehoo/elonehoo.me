import { execFile } from 'node:child_process'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative } from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

interface NewsletterSubscriber {
  email: string
  subscribedAt: string
}

interface NewsletterStore {
  subscribers: NewsletterSubscriber[]
}

let writeQueue = Promise.resolve()

function getGitCwd() {
  return process.env.NEWSLETTER_GIT_CWD || process.cwd()
}

function getSubscribersPath() {
  const configuredPath = process.env.NEWSLETTER_SUBSCRIBERS_PATH || join('data', 'newsletter', 'subscribers.json')
  return isAbsolute(configuredPath) ? configuredPath : join(getGitCwd(), configuredPath)
}

function shouldGitCommit() {
  return process.env.NEWSLETTER_GIT_COMMIT === 'true'
}

function shouldGitPush() {
  return process.env.NEWSLETTER_GIT_PUSH === 'true'
}

function isValidNewsletterEmail(email: string) {
  const atIndex = email.indexOf('@')
  const lastDotIndex = email.lastIndexOf('.')
  return atIndex > 0
    && lastDotIndex > atIndex + 1
    && lastDotIndex < email.length - 1
    && !/\s/.test(email)
}

async function readNewsletterStore(filePath: string): Promise<NewsletterStore> {
  try {
    const parsed = JSON.parse(await readFile(filePath, 'utf8')) as Partial<NewsletterStore>
    return {
      subscribers: Array.isArray(parsed.subscribers)
        ? parsed.subscribers.filter((subscriber): subscriber is NewsletterSubscriber => {
            return typeof subscriber.email === 'string' && typeof subscriber.subscribedAt === 'string'
          })
        : [],
    }
  }
  catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === 'ENOENT')
      return { subscribers: [] }
    throw error
  }
}

async function writeNewsletterStore(filePath: string, store: NewsletterStore) {
  const tempPath = `${filePath}.tmp`
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(tempPath, `${JSON.stringify(store, null, 2)}\n`)
  await rename(tempPath, filePath)
}

async function syncNewsletterGit(filePath: string) {
  const cwd = getGitCwd()
  const gitPath = relative(cwd, filePath)
  await execFileAsync('git', ['add', '--', gitPath], { cwd })
  const { stdout } = await execFileAsync('git', ['status', '--porcelain', '--', gitPath], { cwd })

  if (stdout.trim())
    await execFileAsync('git', ['commit', '-m', 'chore(newsletter): add subscriber'], { cwd })

  if (shouldGitPush())
    await execFileAsync('git', ['push'], { cwd })
}

export function normalizeNewsletterEmail(value: unknown) {
  if (typeof value !== 'string')
    return ''
  const email = value.trim().toLowerCase()
  return isValidNewsletterEmail(email) ? email : ''
}

export function addNewsletterSubscriber(email: string) {
  const operation = writeQueue.then(async () => {
    const filePath = getSubscribersPath()
    const store = await readNewsletterStore(filePath)
    const exists = store.subscribers.some(subscriber => subscriber.email === email)

    if (!exists) {
      store.subscribers.push({ email, subscribedAt: new Date().toISOString() })
      store.subscribers.sort((left, right) => left.subscribedAt.localeCompare(right.subscribedAt))
      await writeNewsletterStore(filePath, store)
    }

    if (shouldGitCommit())
      await syncNewsletterGit(filePath)

    return { created: !exists, filePath }
  })

  writeQueue = operation.then(() => undefined, () => undefined)
  return operation
}
