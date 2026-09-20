# Internal Portal (Demo App)

An internal employee portal for sharing and discovering project-related knowledge within an organization.

## Features

- Employee authentication
- Create, update, and delete blog posts
- Create and manage post categories
- Add and manage tags
- Search posts by keywords
- View project-related blog posts

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL
- Next.js Server Actions

## Architecture

This project is built as a full-stack Next.js application.

The frontend and backend are implemented within the same Next.js application. Server Actions are used for server-side operations and database interactions instead of a separate REST API.

This approach was chosen because the application is a relatively small internal portal and does not currently require an API for external clients.
### App Flow
```
Frontend (Next Js)
   ↓
Next.js Server Actions
   ↓
Prisma ORM
   ↓
PostgreSQL
```
## Getting Started

```bash
git clone <repository-url>
cd <project-directory>
npm install
```
## Setup .env file
### Refer more on .env.example 
```
DATABASE_URL=""

BETTER_AUTH_SECRET=""

BETTER_AUTH_URL= # Base URL of your app
UPLOADTHING_TOKEN=''
```

## Technical Decisions

### Why Server Actions Instead of a Separate API?

The application is a small scope application. For this scope, Next.js Server Actions provides a direct way to handle server-side operations such as creating, updating, and deleting posts while keeping database access on the server. Plus there's no need for a public API.

### Why No Seperate State Management?

Separate client-side state management was not introduced as it would be overkill for the scope of the application. Next.js built-in features such as useParams() and App Router loading states are used, with Zustand used only for small shared UI state.
