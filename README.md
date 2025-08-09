## Portfolio (Angular 18 + Firebase)

Modern personal portfolio SPA built with Angular 18 standalone components and Signals. Content (profile, contacts, socials, resume, and portfolio projects) is loaded from Firebase (Firestore + Storage). A callable Cloud Function handles contact form submissions.

### Features
- **Responsive layout** with a persistent profile sidebar and tabbed navigation
- **About**: profile presentation, services, soft skills, technologies
- **Resume**: experience, education, languages, and skills
- **Portfolio**: category filter and lazy image loading
- **Contact**: embedded Google Map and contact form that calls a Firebase Function
- **Angular 18**: standalone components, Signals, `@defer` for idle loading

### Tech stack
- **Angular**: 18.x, standalone APIs, Signals
- **Firebase**: Firestore, Storage, Functions (callable)
- **AngularFire**: compat APIs for Firestore/Storage
- **RxJS**: for async streams and transformations

---

## Getting started

### Prerequisites
- Node.js 20+ and npm 10+
- A Firebase project with Firestore, Storage, and Functions enabled

### 1) Install dependencies
```bash
npm ci
```

### 2) Configure Firebase
Update `src/environments/environment.ts` with your Firebase config:
```ts
export const environment = {
  firebaseConfig: {
    apiKey: '...YOUR_API_KEY...',
    authDomain: '...YOUR_AUTH_DOMAIN...',
    databaseURL: '...YOUR_DB_URL...',
    projectId: '...YOUR_PROJECT_ID...',
    storageBucket: '...YOUR_STORAGE_BUCKET...',
    messagingSenderId: '...YOUR_SENDER_ID...',
    appId: '...YOUR_APP_ID...'
  }
};
```
Note: Do not commit secrets publicly. Consider using different configs per environment.

### 3) Seed Firestore + Storage
Create the following collections and documents in Firestore. Upload referenced images to Firebase Storage and store their paths (not public URLs); the app resolves Storage paths to download URLs at runtime.

- **profiles** (single document)
```ts
interface Profile { id?: string; avatar: string; name: string; title: string; presentation: string[]; googleMap: string; }
```
Example:
```json
{
  "avatar": "avatars/my-avatar.png",
  "name": "Your Name",
  "title": "Frontend Developer",
  "presentation": [
    "Short intro paragraph 1.",
    "Short intro paragraph 2."
  ],
  "googleMap": "https://www.google.com/maps/embed?..."
}
```

- **contacts**
```ts
interface ContactItem { icon: string; title: string; value: string; link?: string; type?: 'link' | 'address' | 'date'; }
```

- **socials**
```ts
interface SocialItem { link: string; icon: string; }
```

- **projects**
```ts
interface ProjectItem { category: string; image: string; title: string; url: string; }
```
Store `image` as a Storage path, e.g. `portfolio/project-1.png`.

- **techSkills**, **languages**
```ts
interface ProgressItem { title: string; value: string; } // value like '80%'
```

- **educations**, **experiences**
```ts
interface TimelineItem { title: string; timeline: string; description: string; }
```

### 4) Contact form function
Deploy a callable function named `sendInquiryMail` in your Firebase project. The app calls it with the form payload. Minimal TypeScript signature:
```ts
export const sendInquiryMail = onCall(async (request) => {
  const data = request.data as { name: string; email: string; message: string };
  // send email or store inquiry
  return { ok: true };
});
```

### 5) Run locally
```bash
npm run start
# http://localhost:4200
```

---

## Project structure

- `src/app/app.routes.ts`: route definitions for tabs (about, resume, portfolio, contact)
- `src/app/app.component.ts|html`: root layout (profile sidebar, tabs, router outlet)
- `src/app/core/profile/*`: profile sidebar, contacts, socials, and `ProfileService`
- `src/app/core/about/*`: services, soft-skills, technologies sections
- `src/app/core/resume/*`: timelines and progress lists via `ResumeService`
- `src/app/core/portfolio/*`: projects list, category filter, `PortfolioService`
- `src/app/core/contact/*`: map and contact form, calls `ContactService`
- `src/app/shared/ui/*`: reusable UI components (image, loader, border-article, etc.)
- `src/environments/environment.ts`: Firebase config

Key providers are registered in `src/app/app.config.ts` using Angular standalone `ApplicationConfig`:
- Router via `provideRouter`
- Firebase via `AngularFireModule.initializeApp(...)`

---

## Available scripts

- `npm run start`: start dev server
- `npm run build`: production build to `dist/portfolio`
- `npm run test`: run unit tests (Karma)

---

## Build
```bash
npm run build
# Output: dist/portfolio
```

### GitHub Pages deployment
For a user/organization site repository (e.g. `username.github.io`):
- Build the app: `npm run build`
- Serve the contents of `dist/portfolio` from the repo root or configure Pages to use `dist/portfolio` as the publish directory
- Optional SPA fallback: copy `index.html` to `404.html` in the published output to support deep links

---

## Notes
- The app uses Angular Signals (`signal`, `computed`, `effect`) and `@defer` blocks to lazy-render sections for performance.
- Firestore queries use `valueChanges({ idField: 'id' })` and are written in a straightforward, realtime style. Adjust subscriptions for pagination or SSR as needed.
- Storage paths are resolved to download URLs at runtime; ensure the referenced files exist in Storage and your security rules allow read access.

---

## Security
Review and harden your Firebase Security Rules for Firestore and Storage. Never expose admin credentials or API secrets in client code. Consider adding environment-specific files and excluding them from version control.

