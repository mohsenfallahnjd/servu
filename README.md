# ServiceTime

A minimal web app to track periodic maintenance for your **cars** and **motorcycles** — log service dates, mileage, and what was done.

## Features

- User registration and sign-in
- Add cars and motorcycles with odometer tracking
- Log services with predefined options (oil change, filters, brakes, chain lube, etc.)
- Full service history per vehicle
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

   Or connect Vercel Postgres and run `prisma migrate deploy` if using migrations.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run db:push` | Sync schema to database |
| `bun run db:studio` | Open Prisma Studio |
