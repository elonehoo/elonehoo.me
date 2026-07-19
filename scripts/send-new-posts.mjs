#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, isAbsolute, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'
import nodemailer from 'nodemailer'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = process.env.NEWSLETTER_SITE_URL || 'https://elonehoo.me'
const args = process.argv.slice(2)

const dryRun = args.includes('--dry-run')
const latestOnly = args.includes('--latest')
const force = args.includes('--force')
const postArg = getArgValue('--post')

function getArgValue(name) {
  const prefix = `${name}=`
  const match = args.find(arg => arg.startsWith(prefix))

  return match?.slice(prefix.length)
}

function resolveDataPath(envName, fallbackPath) {
  const configuredPath = process.env[envName] || fallbackPath

  return isAbsolute(configuredPath)
    ? configuredPath
    : join(rootDir, configuredPath)
}

function readJsonFile(filePath, fallback) {
  if (!existsSync(filePath)) {
    return fallback
  }

  return JSON.parse(readFileSync(filePath, 'utf8'))
}

function writeJsonFile(filePath, value) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function readSubscribers() {
  const filePath = resolveDataPath(
    'NEWSLETTER_SUBSCRIBERS_PATH',
    join('data', 'newsletter', 'subscribers.json'),
  )
  const store = readJsonFile(filePath, { subscribers: [] })

  if (!Array.isArray(store.subscribers)) {
    return []
  }

  return store.subscribers
    .map(subscriber => subscriber.email)
    .filter(email => typeof email === 'string' && email)
}

function readSentPosts() {
  const filePath = resolveDataPath(
    'NEWSLETTER_SENT_POSTS_PATH',
    join('data', 'newsletter', 'sent-posts.json'),
  )
  const store = readJsonFile(filePath, { posts: [] })

  if (!Array.isArray(store.posts)) {
    return { filePath, posts: [] }
  }

  return {
    filePath,
    posts: store.posts.filter(post => typeof post.path === 'string'),
  }
}

function readPosts() {
  const postsDir = join(rootDir, 'content', 'posts')

  if (!existsSync(postsDir)) {
    throw new Error(`Posts directory not found: ${postsDir}`)
  }

  return readdirSync(postsDir)
    .filter(file => file.endsWith('.md') && file !== '0000.index.md')
    .map((file) => {
      const slug = basename(file, '.md')
      const publicSlug = /^\d+\.\D/.test(slug)
        ? slug.replace(/^\d+\./, '')
        : slug
      const filePath = join(postsDir, file)
      const parsed = matter(readFileSync(filePath, 'utf8'))
      const date = parsed.data.date ? new Date(parsed.data.date) : new Date(0)
      const postPath = `/posts/${publicSlug}`

      return {
        date,
        description: String(parsed.data.description || ''),
        file,
        path: postPath,
        slug,
        title: String(parsed.data.title || slug),
        url: new URL(postPath, siteUrl).toString(),
      }
    })
    .filter(post => Number.isFinite(post.date.getTime()))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

function pickPosts(posts, sentPostPaths) {
  let candidates = posts

  if (postArg) {
    candidates = candidates.filter((post) => {
      return post.slug === postArg || post.path === postArg || post.file === postArg
    })

    if (!candidates.length) {
      throw new Error(`Post not found: ${postArg}`)
    }
  }

  if (!force) {
    candidates = candidates.filter(post => !sentPostPaths.has(post.path))
  }

  if (latestOnly) {
    candidates = candidates.slice(-1)
  }

  return candidates
}

function requireEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587)

  return nodemailer.createTransport({
    auth: {
      pass: requireEnv('SMTP_PASS'),
      user: requireEnv('SMTP_USER'),
    },
    host: requireEnv('SMTP_HOST'),
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : port === 465,
  })
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}

function renderEmail(post) {
  const publishedAt = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeZone: 'Asia/Shanghai',
  }).format(post.date)
  const title = escapeHtml(post.title)
  const description = escapeHtml(post.description)
  const url = escapeHtml(post.url)

  return {
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.65; color: #111;">
        <p style="color: #666; margin: 0 0 12px;">${publishedAt}</p>
        <h1 style="font-size: 24px; line-height: 1.3; margin: 0 0 12px;">${title}</h1>
        <p style="margin: 0 0 20px;">${description}</p>
        <p style="margin: 0 0 24px;">
          <a href="${url}" style="color: #2f8f46;">阅读全文</a>
        </p>
        <p style="color: #777; font-size: 13px; margin: 0;">
          你收到这封邮件，是因为你订阅了 elonehoo.me 的新文章通知。
        </p>
      </div>
    `,
    subject: `新文章：${post.title}`,
    text: [
      post.title,
      '',
      post.description,
      '',
      post.url,
      '',
      '你收到这封邮件，是因为你订阅了 elonehoo.me 的新文章通知。',
    ].join('\n'),
  }
}

async function sendPost(transporter, post, subscribers) {
  const from = process.env.NEWSLETTER_FROM || 'Elone Hoo <hi@elonehoo.me>'
  const email = renderEmail(post)

  for (const subscriber of subscribers) {
    await transporter.sendMail({
      from,
      html: email.html,
      subject: email.subject,
      text: email.text,
      to: subscriber,
    })
  }
}

async function main() {
  const subscribers = readSubscribers()
  const sentStore = readSentPosts()
  const sentPostPaths = new Set(sentStore.posts.map(post => post.path))
  const posts = pickPosts(readPosts(), sentPostPaths)

  if (!subscribers.length) {
    console.log('No newsletter subscribers.')
    return
  }

  if (!posts.length) {
    console.log('No new posts to send.')
    return
  }

  if (dryRun) {
    console.log(`[dry-run] ${posts.length} post(s), ${subscribers.length} subscriber(s).`)
    posts.forEach((post) => {
      console.log(`[dry-run] ${post.path}`)
    })
    return
  }

  const transporter = createTransporter()

  for (const post of posts) {
    await sendPost(transporter, post, subscribers)
    sentStore.posts.push({
      path: post.path,
      sentAt: new Date().toISOString(),
    })
    sentPostPaths.add(post.path)
    console.log(`Sent ${post.path} to ${subscribers.length} subscriber(s).`)
  }

  sentStore.posts = sentStore.posts
    .filter((post, index, posts) => {
      return posts.findIndex(item => item.path === post.path) === index
    })
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt))

  writeJsonFile(sentStore.filePath, { posts: sentStore.posts })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
