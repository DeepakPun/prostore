# Prostore - Next.js E-Commerce Application

A modern, high-performance e-commerce platform built with Next.js 15, Tailwind CSS v4, and Prisma 6. This application features full database integration, dynamic routing, responsive layouts, and secure payment simulation.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 & Shadcn UI (Radix Primitives)
- **Database**: PostgreSQL (Hosted on Vercel Storage)
- **ORM**: Prisma 6 (Locked for structural compatibility)
- **Validation**: Zod (Type inference layout)
- **Payments**: Stripe (Integrated Test Mode)

## 🛠️ Getting Started

### 1. Clone the Repository & Install Dependencies

```bash
git clone https://github.com/DeepakPun/prostore
cd prostore
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and append your connection tokens:

```env
DATABASE_URL="postgresql://your_user:password@your_://vercel-storage.com"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 3. Initialize and Seed the Database

Sync your local structural model declarations with your database and apply seed artifacts:

```bash
npx prisma generate
npx prisma db push
npx tsx ./db/seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your web browser to review the local live build.

## 📦 Production Compiling

Verify compilation schemas and optimize code assets for runtime deployments:

```bash
# Lint, check types, and build distribution assets
npm run build

# Start high-performance production server locally
npm run start
```

## 🌐 Deployment via Vercel

This project is optimized for automated CI/CD deployments through GitHub on the Vercel Hobby Platform.

1. Push code changes to your primary GitHub `main` branch.
2. Link your repository via the web dashboard workspace.
3. Inject the production `DATABASE_URL` token directly into project environment settings.
