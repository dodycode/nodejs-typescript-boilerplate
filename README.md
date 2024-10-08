# TypeScript Hono Drizzle Zod API Boilerplate

This project is a boilerplate for building a NodeJS API using TypeScript, Hono, Drizzle ORM, and Zod, that implemented Repository Design Pattern.

## Features

- **TypeScript**: For type-safe JavaScript development
- **Hono**: A lightweight and fast web framework
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **Zod**: Runtime type checking and validation
- **PostgreSQL**: As the database backend
- **Repository Pattern**: For clean separation of data access logic
- **Generic Base Repository**: Reduces code repetition for CRUD operations
- **Input Validation**: Using Zod schemas and custom middleware
- **Docker**: Easy PostgreSQL setup with Docker Compose
- **Prettier**: For consistent code formatting
- **ESLint**: For identifying and fixing code quality issues

## Prerequisites

- Node.js (v14 or later recommended)
- Docker and Docker Compose
- npm or yarn package manager

## Project Structure

```
.
├── src/
│   ├── controllers/
|   |   ├── todoController.ts
│   │   └── your-controller
│   ├── db/
│   │   ├── db.ts
│   │   └── schema.ts
│   ├── middleware/
│   │   └── validator.ts
│   ├── models/
|   |   ├── todo.ts
│   │   └── your-entity-model
│   ├── repositories/
│   │   ├── baseRepository.ts
│   │   ├── todoRepository.ts
│   │   └── your-repository
│   ├── routes/
|   |   ├── todoRoutes.ts
│   │   └── your-routes
│   └── index.ts
├── drizzle/
│   └── your-database-migration-files
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── drizzle.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/dodycode/ts-hono-drizzle-zod-boilerplate.git
   cd ts-hono-drizzle-zod-boilerplate
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the PostgreSQL database using Docker:

   ```
   docker-compose up -d
   ```

4. Set up your environment variables:

   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` in `.env`:
     ```
     DATABASE_URL=postgres://myuser:mypassword@localhost:5432/myapp
     ```
     Note: You can configure postgre user in `docker-compose.yml`

5. Create database migrations:

   ```
   npm run generate
   ```

6. Run database migrations:

   ```
   npm run migrate
   ```

7. Start the development server:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:3000`.

## Database Management

This project uses Drizzle ORM for database management. Here are the available scripts and when to use them:

- `npm run generate`: Generate Drizzle migration files (run this after making changes to your schema)
- `npm run migrate`: Run Drizzle migrations (use this for the initial setup and when you want to apply migrations)
- `npm run push`: Push schema changes to the database (use this during development to quickly apply schema changes)
- `npm run studio`: Open Drizzle Studio for database management

### Workflow for Schema Changes

1. Make changes to your schema in `/src/server/db/schema/`
2. Run `pnpm generate` or `npm run generate` to create a new migration
3. Run `pnpm push` or `npm run push` to apply the changes to your development database

For production or when you need to keep track of migrations:

1. Make changes to your schema
2. Run `pnpm generate` or `npm run generate`
3. Run `pnpm migrate` or `npm run migrate` to apply the migrations

Remember to commit the generated migration files to your version control system.

## API Endpoints

- `GET /api/todos`: Retrieve all todos
- `GET /api/todos/:id`: Retrieve a specific todo
- `POST /api/todos`: Create a new todo
- `PUT /api/todos/:id`: Update an existing todo
- `DELETE /api/todos/:id`: Delete a todo

## Scripts

- `npm start`: Start the development server
- `npm run build`: Compile TypeScript to JavaScript
- `npm run migrate`: Run database migrations
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run format`: Run Prettier to automatically format your code
- `npm run format:check`: Check if your code is properly formatted without making changes

## Docker Commands

- Start the PostgreSQL container: `docker-compose up -d`
- Stop the PostgreSQL container: `docker-compose down`
- View container logs: `docker-compose logs`

## Adding New Entities

1. Define the entity schema in `src/db/schema.ts`
2. Create a model file in `src/models/` with Zod schemas and type definitions
3. Create a repository in `src/repositories/` extending the `BaseRepository`
4. Create a controller in `src/controllers/`
5. Define routes in `src/routes/`
6. Update `src/index.ts` to include the new routes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
