# Simple Blog Web Application (Medium.com inspired)

Tech Stack
- Languages Used : GO, Typescript
- Frontend Frameworks : React.js, Next.js, Shadcn/ui, TailwindCSS
- Backend Frameworks : GO Fiber, GORM
- Database : Postgres (docker)

Project structure : Clean Architecture

Configuration step
- Run docker compose to open mock PostgreSQL server
- .env file (JWT_SECRET, sender email, google app password)
- server config.yaml

#### Setup Instruction
1. Clone
```bash
git clone https://github.com/Yoboba/go-nextjs-full-auth.git
```
2. dependencies installation
```bash
cd frontend
npm install
```
3. Setup environment variable for PostgreSQL and PgMyAdmin
