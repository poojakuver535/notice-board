# Notice Board

A full-stack Notice Board application with Create, Read, Update, and Delete (CRUD) functionality.

## Live Demo

https://notice-board-five-xi.vercel.app

## Tech Stack

- Framework: Next.js (Pages Router)
- ORM: Prisma
- Database: PostgreSQL (Neon)
- Styling: Tailwind CSS
- Hosting: Vercel (Hobby tier)

## Features

- Create, read, update, and delete notices
- Server-side input validation in API routes
- Urgent notices sorted to the top via Prisma orderBy (database-level sorting)
- Red Urgent badge for urgent notices
- Responsive card layout (mobile and desktop)
- Delete confirmation step
- Single form component for both create and edit
- RESTful API routes under pages/api/

## How to Run Locally

1. Clone the repo and install dependencies:

git clone https://github.com/poojakuver535/notice-board.git
cd notice-board
npm install

2. Create a .env file in the root with your database URL:

DATABASE_URL="your-postgresql-connection-string"

3. Push schema and start the server:

npx prisma db push
npm run dev

4. Open http://localhost:3000

## What I Would Improve With More Time

- Add pagination for large numbers of notices
- Add search and filter by category
- Add image upload using Cloudinary instead of URL input
- Add user authentication
- Add unit tests for API routes

## AI Usage

AI (Claude by Anthropic) was used throughout development for project setup, writing API routes with server-side validation, building React components, debugging Prisma version issues, deployment guidance for Vercel, and writing this README. All AI-generated code was reviewed and understood before use.
