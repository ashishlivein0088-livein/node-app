# TodoFlow

A full-stack Node.js todo application built with Express.js and a modern vanilla HTML, CSS, and JavaScript frontend.

## Features

- Simple two-page flow with a landing/login page and a home dashboard
- Express REST API for todo CRUD operations
- MVC-inspired backend structure for scalability
- In-memory data layer that can be replaced with a database later
- Responsive, modern UI with smooth transitions and dark mode persistence
- Logging and centralized error handling middleware

## Project Structure

```text
project-root/
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── utils/
├── views/
├── .env
├── .env.example
├── app.js
├── package.json
└── server.js
```

## Install

Run the following commands from the project root:

```bash
npm install
npm run dev
```

If you want to install packages manually instead of using package.json, use:

```bash
npm install express dotenv uuid cors morgan
npm install -D nodemon
```

## Available Scripts

- `npm run dev` starts the app with nodemon
- `npm start` starts the app with Node.js

## API Endpoints

- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

## Environment Variables

Copy `.env.example` into `.env` if needed and configure:

```env
PORT=3000
```

## Notes

- Todos are stored in memory and reset when the server restarts.
- The code is organized so a database-backed repository can be added without changing the frontend.