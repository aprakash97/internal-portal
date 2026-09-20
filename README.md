# Internal Portal (Demo App)
# Deployment https://internal-portal-dun.vercel.app/

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
## Database Setup 

```
npx prisma generate
npx prisma migrate deploy
````

## Technical Decisions

### Why Server Actions Instead of a Separate API?

The application is a small scope application. For this scope, Next.js Server Actions provides a direct way to handle server-side operations such as creating, updating, and deleting posts while keeping database access on the server. Plus there's no need for a public API.

### Why No Seperate State Management?

Separate client-side state management was not introduced as it would be overkill for the scope of the application. Next.js built-in features such as useParams() and App Router loading states are used, with Zustand used only for small shared UI state.

## Screenshots

### Home <img width="959" height="599" alt="Screenshot 2026-09-20 071442" src="https://github.com/user-attachments/assets/638df56a-9401-4109-bbeb-11704583001e" />
### Auth <img width="959" height="599" alt="Screenshot 2026-09-20 071603" src="https://github.com/user-attachments/assets/155dee78-db01-4b4d-98d1-3b577ccc0dfe" />
### Dashboard<img width="959" height="599" alt="ss3" src="https://github.com/user-attachments/assets/d6f7c16b-b6ad-4843-be7c-ef0cab10d855" />
### Post handling <img width="959" height="590" alt="Screenshot 2026-09-20 070741" src="https://github.com/user-attachments/assets/c828d393-8425-4854-971e-8f932fb592e7" />
### Post page <img width="959" height="590" alt="Screenshot 2026-09-20 071702" src="https://github.com/user-attachments/assets/e3642a09-4fd1-4aea-aede-14c85a1c5d43" />
### Simple search feature <img width="959" height="599" alt="Screenshot 2026-09-20 071740" src="https://github.com/user-attachments/assets/a78fef40-c797-46b4-a881-08b89dcaf8eb" />



