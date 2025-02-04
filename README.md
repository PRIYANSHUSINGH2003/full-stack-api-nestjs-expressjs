# Full Stack API Development with NestJS/ExpressJS, PostgreSQL, and Prisma

## GitHub Repository
**Repository Name:** full-stack-api-nestjs-expressjs

## Project Overview
This project is a RESTful API for a simplified project management system where users can create and manage projects, assign tasks, and track task statuses.

## Features
- User Management (Create, Update, Delete, List Users)
- Project Management (Create, Update, Delete, List Projects)
- Task Management (Add, Assign, Update, Delete Tasks)
- Permissions (Only assigned users can update tasks/projects)
- Filtering & Search (Filter tasks by status and assigned user)
- JWT Authentication
- PostgreSQL Database with Prisma ORM

## Setup Instructions

### Prerequisites
- Node.js (>=16)
- PostgreSQL
- Prisma CLI

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/PRIYANSHUSINGH2003/full-stack-api-nestjs-expressjs.git
   cd full-stack-api-nestjs-expressjs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Update `.env` with your PostgreSQL connection string.
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Seed the database (optional):
   ```sh
   npx ts-node prisma/seed.ts
   ```
6. Start the server:
   ```sh
   npm run start
   ```

## API Endpoints

### User Endpoints
- `POST /users` - Create a user
- `GET /users` - List all users
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Project Endpoints
- `POST /projects` - Create a project
- `GET /projects` - List all projects
- `PUT /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project

### Task Endpoints
- `POST /projects/:projectId/tasks` - Create a task under a project
- `GET /projects/:projectId/tasks` - List tasks for a project
- `PUT /tasks/:id` - Update task details or status
- `DELETE /tasks/:id` - Delete a task

### Filter Endpoints
- `GET /tasks?status=IN_PROGRESS&assignedUserId=uuid` - Filter tasks by status and assigned user

## Testing the API
1. Use Postman or a similar tool to test the API endpoints.
2. Authenticate using JWT to access protected routes.
3. Verify CRUD operations for Users, Projects, and Tasks.

## Demo
A short screen recording demonstrating the API testing process will be available soon.

---
### Contributors
- **Your Name** (yourusername)

### License
This project is licensed under the MIT License.

