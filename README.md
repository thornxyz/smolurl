URL shortening service built with React, Go, Redis, and Fiber.

## Features

- Custom short URLs.
- Rate limiting to prevent abuse.
- Expiry for shortened URLs.

## Prerequisites

- Docker and Docker Compose installed.

## Set Up Environment Variables

Create a `.env` file in the `api/` directory with the following variables:

```env
DB_ADDR="db:6379"
DB_PASS=""
APP_PORT=":3000"
DOMAIN="localhost:3000"
API_QUOTA=10
```

Create a `.env` file in the `frontend/` directory with the following variables:

```
VITE_API_URL="http://localhost:3000"
```

## Start the Application

Run the following command to start the entire application (API, database, and frontend) using Docker Compose:

```bash
docker-compose up --build
```

This will start:

- The API service on `http://localhost:3000`
- The Redis database
- The Frontend service on `http://localhost:8080`

## Frontend Service

The frontend is built with React and Vite. It is containerized and runs on port `8080`.

### Access the Frontend

Once the application is running, you can access the frontend at:

```
http://localhost:8080
```

The frontend communicates with the API service to provide a user-friendly interface for shortening and managing URLs.

### 4. API Endpoints

#### Shorten a URL

**POST** `/shorten`

Request Body:

```json
{
  "url": "https://example.com",
  "short": "customAlias", // optional
  "expiry": 24 // optional, in hours
}
```

Response:

```json
{
  "url": "https://example.com",
  "short": "http://localhost:3000/customAlias",
  "expiry": 24,
  "rate_limit": 9,
  "rate_limit_reset": 30
}
```

#### Resolve a Short URL

**GET** `/:url`

Redirects to the original URL or returns a 404 if not found.

## Stop the Application

To stop the application, press `Ctrl+C` and run:

```bash
docker-compose down
```
