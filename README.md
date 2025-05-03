URL shortening service built with Go, Redis, and Fiber.

## Features

- Shorten long URLs into compact, shareable links.
- Custom short URLs.
- Rate limiting to prevent abuse.
- Expiry for shortened URLs.

## Prerequisites

- Docker and Docker Compose installed.
- Golang installed.

## Set Up Environment Variables

Create an `.env` file in the `api/` directory with the following variables:

```env
DB_ADDR="db:6379"
DB_PASS=""
APP_PORT=":3000"
DOMAIN="localhost:3000"
API_QUOTA=10
```

## Start the Application

Run the following command to start the application using Docker Compose:

```bash
docker-compose up --build
```

This will start the API service on `http://localhost:3000` and the Redis database.

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
