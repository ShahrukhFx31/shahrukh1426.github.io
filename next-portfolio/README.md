Portfolio (Next.js + Tailwind + Firebase Storage)

This is a Next.js portfolio scaffold using the App Router, Tailwind CSS, and a Firebase Storage client for images/assets. It is configured for static export to support GitHub Pages. Firebase Hosting can also be used for SSR if you choose to enable it later.

## Getting Started

First, install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

You can start editing the page by modifying `src/app/page.tsx`. The app auto-updates as you edit files.

## Firebase setup

Create a Firebase project and add a Web App. Then add these environment variables (e.g., `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Use the helper in `src/lib/firebase.ts` to access Storage.

## Deploy

### GitHub Pages (static export)

Set a base path to your repo name when building for Pages:

```
NEXT_PUBLIC_BASE_PATH=/your-repo-name
npm run build
```

Then publish the `out` folder to Pages. You can automate with a GitHub Action.

### Firebase Hosting

Firebase Hosting supports Next.js SSR via the Firebase CLI integration. If you want a purely static site, keep `output: 'export'`. To enable SSR, remove `output: 'export'` in `next.config.ts` and follow Firebase Hosting docs for Next.js.
