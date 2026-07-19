**[elonehoo.me](https://elonehoo.me)**

my personal website powered by [React](https://react.dev/) and [TanStack Start](https://tanstack.com/start)

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.

Credits

- [antfu/antfu.me](https://github.com/antfu/antfu.me)

- [moeyua/astro-theme-typography](https://blog.moeyua.com/)

- [emilkowal.ski](https://emilkowal.ski/)

- [anyway.fm](https://anyway.fm/)

Newsletter

The subscription API writes emails to `data/newsletter/subscribers.json`. It needs a TanStack Start server runtime with write access to the Git checkout; prerendered static files alone cannot persist new subscribers.

If this repository is public, do not store real subscriber emails in this file. Use a private repository, a private branch, or an encrypted file.

Environment variables:

```bash
NEWSLETTER_SUBSCRIBERS_PATH=data/newsletter/subscribers.json
NEWSLETTER_SENT_POSTS_PATH=data/newsletter/sent-posts.json
NEWSLETTER_SITE_URL=https://elonehoo.me
NEWSLETTER_FROM="Elone Hoo <hi@elonehoo.me>"
NEWSLETTER_GIT_CWD=/path/to/elonehoo.me
NEWSLETTER_GIT_COMMIT=true
NEWSLETTER_GIT_PUSH=false
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASS=your-password
SMTP_SECURE=false
```

Send new posts:

```bash
pnpm newsletter:send -- --dry-run
pnpm newsletter:send -- --latest
pnpm newsletter:send -- --post=0040.building-cloud-agent-infrastructure
```
