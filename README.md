# Task Application Playground

A simple **Task Management API** built with **Node.js**, **Express**, **Sequelize**, and **MySQL**.

Supports user registration, login, and simple CRUD operations for tasks.

It was completed as a technical assessment for an application to a local telecommunications company in the Philippines, with a one-day time constraint.

The goal of the exercise was to demonstrate my understanding of core frontend concepts, application state management, and interaction with data flows within a limited timeframe.

---

## Run with Docker

`docker-compose up --build`

After running `docker-compose up --build`, you can access the site at http://localhost:3000, assuming **MySQL** was ran correctly by the `docker-compose`.

# API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/user`          | Register new user |
| POST   | `/api/login`         | Login and get JWT |
| POST   | `/api/task`          | Create task       |
| GET    | `/api/tasks`         | Get user’s tasks  |
| PUT    | `/api/task/:task_id` | Update task       |
| DELETE | `/api/task/:task_id` | Delete task       |

Tech Stack:
Node.js + Express
MySQL + Sequelize
JWT + bcrypt
Docker + Docker Compose

### Notes

- Environment variables (e.g., DB credentials) are configured in `docker-compose.yml`.
- All responses are in JSON format.
- Error codes and messages are logged to the console (for testing purposes only).
- JWT tokens expire after 1 hour and used a temporary signing key.
- The MySQL root user is used; stored procedures and indexes were not implemented but should be considered in production.
- TypeScript types are not defined, and many frontend styles are repeated. No design toolkit was used; styling is done with `styled-components`.
