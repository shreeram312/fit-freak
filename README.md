# Fitness Tracker

A full-stack fitness tracking application built with modern web technologies.

## Tech Stack

**Backend**

- Node.js + Express
- TypeScript
- PostgreSQL (Neon) with Drizzle ORM
- Clerk for authentication
- CORS enabled

**Mobile**

- React Native (Expo)
- Expo Router for navigation
- TanStack React Query for data fetching
- Clerk authentication
- Axios for API calls

## Project Structure

```
fitness-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/     - Request handlers
│   │   ├── db/              - Database schema & migrations
│   │   ├── routes/          - API endpoints
│   │   ├── lib/             - Utilities & helpers
│   │   ├── middleware/      - Express middleware
│   │   ├── types/           - TypeScript types
│   │   └── index.ts         - Entry point
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
│
├── mobile/
│   ├── app/
│   │   ├── (auth)/          - Authentication screens
│   │   ├── (tabs)/          - Main app screens
│   │   └── _layout.tsx      - Root layout
│   ├── services/
│   │   ├── api.ts           - API client
│   │   ├── auth.ts          - Auth queries
│   │   └── workouts.ts      - Workout queries
│   ├── components/
│   │   ├── auth/            - Auth components
│   │   └── ui/              - Reusable components
│   ├── lib/
│   │   ├── api.ts           - Axios setup
│   │   └── constants.ts     - App constants
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
│
└── README.md
```

## Setup

**Prerequisites**

- Node.js 18+
- pnpm installed globally: `npm install -g pnpm`

**Backend**

```bash
cd backend
pnpm install
pnpm run db:migrate
pnpm run dev
```

**Mobile**

```bash
cd mobile
pnpm install
pnpm start
```

## Features

- User authentication with Clerk
- Workout tracking
- Exercise management
- Real-time data sync with React Query
- Cross-platform (iOS/Android)

## Environment Variables

Create `.env` files in both backend and mobile directories:

**Backend**

```
DATABASE_URL=your_neon_database_url
CLERK_SECRET_KEY=your_clerk_secret
PORT=3000
```

**Mobile**

```
EXPO_PUBLIC_API_URL=http://your-backend-url
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
```
