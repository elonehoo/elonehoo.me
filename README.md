**[elonehoo.me](https://elonehoo.me)**

my personal website powered by [React](https://react.dev/) and [TanStack Start](https://tanstack.com/start)

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.

Credits

- [antfu/antfu.me](https://github.com/antfu/antfu.me)

- [moeyua/astro-theme-typography](https://blog.moeyua.com/)

- [emilkowal.ski](https://emilkowal.ski/)

- [anyway.fm](https://anyway.fm/)

## Vercel deployment

The `main` branch deploys with the TanStack Start preset, Node.js 24, and the pinned pnpm version. Nitro builds the prerendered pages and the newsletter API. For a Node.js host, `pnpm build` followed by `pnpm start` still serves the site.

Newsletter subscriptions on production Vercel deployments use a private Vercel Blob store connected only to Production. The SDK reads `BLOB_STORE_ID` with Vercel OIDC credentials or `BLOB_READ_WRITE_TOKEN`; never expose these through `VITE_` variables. Each normalized address has its own SHA-256-named object, and duplicate requests never overwrite the original subscription. Preview deployments return HTTP 503 for subscriptions and cannot write to the production list. Local development keeps using `data/newsletter/subscribers.json`.

The existing `pnpm newsletter:send --dry-run` command can read the private store when its server-side Blob credentials are present, or the existing local subscriber JSON otherwise. Sending mail still requires the existing SMTP configuration; deployment does not send email. Sent-post history remains the local `NEWSLETTER_SENT_POSTS_PATH` file, as before.
