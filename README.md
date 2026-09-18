# Genzcodemy Frontend (v2.0)

Next.js 16 (App Router) + TypeScript + Tailwind v4 frontend for Genzcodemy.
Talks to a separate backend repo (Next.js API routes + Supabase)   see the
API contract doc your team is using as the shared source of truth.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in real values
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (safe for client) |
| `NEXT_PUBLIC_BACKEND_API_URL` | Base URL of your friend's backend API repo |
| `NEXT_PUBLIC_ADMIN_PORTAL_SLUG` | Hidden admin route segment   **change before deploying**, never link to it in the UI, exclude it from sitemap/robots.txt |

## Folder structure

```
src/
├── app/
│   ├── (public)/     # Home, About, Courses, Contact, Hire-from-us, Login, Signup
│   ├── (student)/    # /dashboard/*   protected by proxy.ts
│   ├── (admin)/       # /admin-portal/*   protected by proxy.ts + role check
│   └── layout.tsx     # Root layout, wraps AuthProvider + AuthGateProvider
├── components/
│   ├── auth/          # AuthGateModal   gates Enroll/Book/Enquire CTAs
│   ├── courses/
│   └── layout/         # Header, Footer
├── lib/
│   ├── api/            # ALL backend calls go through here   one file per resource
│   ├── auth/            # AuthContext (session + role)
│   └── supabase/         # Browser + server Supabase clients
├── types/                # Shared types matching the API contract
└── proxy.ts               # Route protection (Next.js 16's middleware successor)
```

## Key patterns to keep

- **Never call `fetch()` directly in a component.** Always go through
  `lib/api/*`. If the backend's response shape changes, you only edit one
  file per resource, not every page that uses it.
- **Auth-gating CTAs, not pages.** Public pages stay fully visible for SEO  
  only the *action* (Enroll, Book, Enquire) checks `useAuthGate().requireAuth()`.
- **Role checks happen twice**: once in `proxy.ts` (UX   redirect before the
  page even renders) and once on the backend for every request (security  
  the frontend check is not enough on its own).

## Before deploying

1. Rename the `(admin)/admin-portal/` folder to match your real
   `NEXT_PUBLIC_ADMIN_PORTAL_SLUG` and make sure it's non-guessable.
2. Add `admin-portal` (or whatever slug you pick) to a `robots.txt`
   disallow rule and make sure it's never linked from any public page.
3. Confirm `proxy.ts` matcher still excludes static assets so auth cookies
   refresh correctly on every navigation.
4. Swap the admin Courses page's simple form for whatever validation rules
   you want (slug uniqueness etc.)   currently only checked backend-side.

## What's stubbed / needs backend to fully test

- All `lib/api/*` calls assume the backend contract is live. Until then,
  every list page will show its loading/error state.
- File upload form fields (`file_upload` type in the form builder) render a
  placeholder   wire up once the backend's Supabase Storage endpoint exists.
