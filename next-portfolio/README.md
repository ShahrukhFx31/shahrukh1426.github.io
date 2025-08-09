Portfolio (Next.js + Tailwind + shadcn/ui + Firebase)

Modern portfolio using Next.js App Router, Tailwind CSS, shadcn/ui (New York), and Firebase (Firestore + Storage). Configured for static export (GitHub Pages). Firebase Hosting can be used if you want SSR later.

## Project plan and status

- [x] Scaffold Next.js (TypeScript, App Router) and Tailwind v3
- [x] Configure static export + basePath (`next.config.ts`)
- [x] Initialize shadcn/ui (New York) and add core components (button, card, input, textarea, navigation-menu, avatar)
- [x] Header navigation using shadcn NavigationMenu
- [x] Pages: `about`, `resume`, `portfolio`, `contact`
- [x] Responsive layout wrapper with breakpoint containers
- [x] Firebase client (modular): `src/lib/firebase-client.ts`
- [x] Realtime data from Firestore
  - `profiles` → About (with avatar from Storage)
  - `languages`, `techSkills`, `educations`, `experiences` → Resume
  - `projects` (image paths resolved via Storage) → Portfolio
- [x] Remove Storage JSON fallback (Firestore-only)
- [x] Contact page: render `profiles.googleMap`
- [ ] Contact form (UI) + Firebase Function (email/notifications)
- [ ] SEO/meta (title/description per page)
- [ ] GitHub Pages CI workflow (build and publish `out/`)
- [ ] Firebase Hosting config (optional SSR)
- [ ] Analytics/Telemetry (optional)
- [ ] Testing (unit/smoke) and Lighthouse pass

## Firebase setup

Add a Web App in Firebase Console and set `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Firestore collections (documents you create via Console):
- `profiles` (1 doc)
  - `avatar`: string (Storage path, e.g. `avatars/my-avatar.png`)
  - `name`: string
  - `title`: string
  - `presentation`: string[]
  - `googleMap`: string (embed URL)
- `languages`, `techSkills`: `{ title: string; value: string }`
- `educations`, `experiences`: `{ title: string; timeline: string; description: string }`
- `projects`: `{ category: string; image: string; title: string; url: string }` (image is a Storage path)

Storage: upload images to paths referenced in the docs (e.g., `avatars/...`, `portfolio/...`). The app resolves paths to download URLs at runtime. No Storage JSON fallback is used.

## Development

```bash
npm ci
npm run dev
# http://localhost:3000
```

## Deploy

### GitHub Pages (static export)

If deploying to a project repo (not `username.github.io`), set base path when building:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name
npm run build
```

Publish the `out/` folder to GitHub Pages (recommended: add a CI workflow).

### Firebase Hosting (optional)

For SSR, remove `output: 'export'` and follow Firebase Hosting framework docs for Next.js. For a static site, you can host the `out/` directory.
