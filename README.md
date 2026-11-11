# HR Report

Full-stack HR Report application built with Next.js (App Router), NestJS, TypeORM, MySQL 8, and Bun runtime, containerized with Docker and packaged with a Nix flake.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)
- Optional for local development: [Nix](https://nixos.org/) with flakes enabled, or [Bun](https://bun.sh/) 1.1+

## Dev shell (`nix develop`)

Enter the reproducible development shell with all required tools pre-installed (Bun, Node.js 22, Docker, Docker Compose, MySQL client, Git, nixpkgs-fmt):

```bash
nix develop
```

Or using direnv (automatic via `.envrc`):

```bash
direnv allow
```

Non-flake fallback:

```bash
nix-shell
```

## Run with Docker

Start the full stack (MySQL 8, NestJS backend, and Next.js frontend) in production containers:

```bash
docker compose up -d --build
```

Access the application:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Health: [http://localhost:4000/api/health](http://localhost:4000/api/health)
- Backend Report API: [http://localhost:4000/api/report](http://localhost:4000/api/report)

Stop containers:

```bash
docker compose down
```

Reset database and volumes:

```bash
docker compose down -v
```

## Run in dev mode

Run dev servers with hot reload and MySQL port 3306 exposed:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Alternatively, to run natively on the host after entering `nix develop`:

1. Start MySQL container:
   ```bash
   docker compose up -d mysql
   ```

2. Start backend:
   ```bash
   cd backend
   bun install
   bun run start:dev
   ```

3. Start frontend:
   ```bash
   cd frontend
   bun install
   bun run dev
   ```

## Environment variables

Configured in `.env` (seeded from `.env.example`):

| Variable | Description | Default |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `rootsecret` |
| `MYSQL_DATABASE` | Database name | `hr_db` |
| `MYSQL_USER` | Application DB user | `hr_user` |
| `MYSQL_PASSWORD` | Application DB password | `hr_password` |
| `MYSQL_PORT` | MySQL external port (dev) | `3306` |
| `BACKEND_PORT` | Backend HTTP port | `4000` |
| `NODE_ENV` | Application environment | `production` |
| `DB_HOST` | MySQL hostname | `mysql` (Docker) / `127.0.0.1` (Local) |
| `DB_PORT` | MySQL internal port | `3306` |
| `DB_USERNAME` | Database username | `hr_user` |
| `DB_PASSWORD` | Database password | `hr_password` |
| `DB_DATABASE` | Database name | `hr_db` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |
| `FRONTEND_PORT` | Frontend HTTP port | `3000` |
| `NEXT_PUBLIC_API_URL` | Public API endpoint for browser | `http://localhost:4000/api` |
| `INTERNAL_API_URL` | Internal API endpoint for SSR | `http://backend:4000/api` |

## API

Base URL: `http://localhost:4000/api`

### `GET /api/report`

Returns the HR report dataset joining Employee, Department, Salary, and Attendance.

Query parameters:
- `search` (optional): Case-insensitive match on employee name or email.
- `department` (optional): Filter by exact department name.
- `status` (optional): Filter by attendance status (`Present`, `Absent`, or `Leave`).

Example response:
```json
[
  {
    "employee_name": "Alice Smith",
    "department_name": "Human Resources",
    "email": "alice@company.com",
    "basic_salary": 50000,
    "bonus": 5000,
    "attendance_date": "2025-04-01",
    "status": "Present"
  }
]
```

### `GET /api/departments`

Returns a list of department names for filter dropdowns:

```json
["Finance", "Human Resources", "IT", "Marketing"]
```

### `GET /api/health`

Healthcheck endpoint for Docker orchestration:

```json
{
  "status": "ok",
  "timestamp": "2026-11-11T04:30:00.000Z"
}
```
