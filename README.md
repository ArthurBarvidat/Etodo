# E-Todo — Full Stack Todo Web Application

A full stack todo application built with Node.js, MySQL, and React. Users can register, log in, and manage their personal tasks through a REST API secured with JWT authentication.

## What it does

- User registration and login with hashed passwords (bcrypt) and JWT tokens
- Full CRUD on todo items (create, read, update, delete)
- Protected routes — all task operations require authentication
- Containerized with Docker for easy deployment

## Project structure

```
├── e-todo.sql              # MySQL database schema
├── docker-compose.yml      # Docker Compose (backend + database + frontend)
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js           # Express entry point
│       ├── config/db.js        # MySQL connection
│       ├── middleware/
│       │   ├── auth.js         # JWT middleware
│       │   └── notfound.js     # 404 handler
│       └── routes/
│           ├── auth/auth.js    # /register, /login
│           ├── todos/todos.js  # CRUD todos
│           └── user/user.js    # User management
└── frontend/               # React frontend
```

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | No | Register a new user |
| POST | `/login` | No | Login and get JWT token |
| GET | `/user` | Yes | Get current user info |
| GET | `/user/todos` | Yes | Get current user's todos |
| GET | `/users/:id` | Yes | Get user by ID or email |
| PUT | `/users/:id` | Yes | Update user |
| DELETE | `/users/:id` | Yes | Delete user |
| GET | `/todos` | Yes | Get all todos |
| GET | `/todos/:id` | Yes | Get a todo |
| POST | `/todos` | Yes | Create a todo |
| PUT | `/todos/:id` | Yes | Update a todo |
| DELETE | `/todos/:id` | Yes | Delete a todo |

## Run with Docker

```bash
cp .env.example .env   # fill in your credentials
docker-compose up
```

This starts the database, backend API, and frontend in one command.

## Run manually

### Database

```bash
cat e-todo.sql | mysql -u root -p
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Environment variables (.env)

```
MYSQL_DATABASE=etodo
MYSQL_HOST=db
MYSQL_USER=your_user
MYSQL_ROOT_PASSWORD=your_password
PORT=3001
SECRET=your_jwt_secret
```

## Tech stack

- **Backend**: Node.js, Express, mysql2, jsonwebtoken, bcryptjs, dotenv
- **Frontend**: React
- **Database**: MySQL
- **Deployment**: Docker, Docker Compose

## Project context

Built as part of an Epitech web development project. The goal was to build a complete REST API from scratch with authentication, then connect it to a frontend and containerize the whole stack.
