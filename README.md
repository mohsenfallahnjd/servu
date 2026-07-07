# Servu — سروو

A minimal PWA to track periodic maintenance for your **cars** and **motorcycles**. Available in **Persian (فارسی)** and **English**.

## Features

- User registration and sign-in
- Add cars and motorcycles with odometer tracking
- Log services with predefined options (oil change, filters, brakes, chain lube, etc.)
- Full service history per vehicle
- **Persian / English** with RTL support and Jalali dates
- **PWA** — install on phone home screen, basic offline support
- Dark mode support
- Ready to deploy on [Vercel](https://vercel.com)

## Stack

- **Next.js 16** (App Router)
- **PostgreSQL** + **Prisma**
- **NextAuth.js** (credentials)
- **Tailwind CSS**

## Local setup

1. **Clone and install**

   ```bash
   bun install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and fill in values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` — PostgreSQL connection string ([Neon](https://neon.tech) free tier works well)
   - `AUTH_SECRET` — run `openssl rand -base64 32`

3. **Push database schema**

   ```bash
   bun run db:push
   ```

4. **Start dev server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Language

Default language is **Persian (fa)**. Switch between فارسی and English using the toggle in the header. Preference is saved in a cookie.

## PWA

On mobile, use **Add to Home Screen** to install Servu. The app registers a service worker for offline fallback pages.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab
2. Import the project in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `DATABASE_URL` — from Neon or Vercel Postgres
   - `AUTH_SECRET` — same as local
4. Deploy — `postinstall` runs `prisma generate` automatically
5. After first deploy, run migrations against production:

   ```bash
   bunx prisma db push
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run db:push` | Sync schema to database |
| `bun run db:studio` | Open Prisma Studio |
