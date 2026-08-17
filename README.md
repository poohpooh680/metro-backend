# MetroSync Backend API

A backend REST API system for managing metro stations and announcements.  
The project provides user authentication, station management, announcement management, validation, error handling, testing, and real-time updates using Socket.IO.

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes

### Stations Management
- Create stations
- Get all stations
- Get station by ID
- Update station information
- Delete stations

### Announcements Management
- Create announcements
- Get all announcements
- Get announcement by ID
- Update announcements
- Delete announcements
- Filter announcements by station, type, and date

### Real-Time Updates
- Socket.IO integration
- Users can join station rooms
- Real-time announcement notifications
- Viewer presence tracking

### Security & Validation
- Request validation
- Password hashing with bcrypt
- JWT authorization
- Centralized error handling
- CORS configuration

### Testing
- API endpoint tests using Jest and Supertest
- Socket.IO tests
- Authentication tests
- Announcement CRUD tests

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
- Jest
- Supertest
- Swagger API Documentation

---

# Project Structure

```
metro-backend
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── sockets
│   │
│   ├── validators
│   │
│   └── app.js
│
├── tests
│   ├── app.test.js
│   └── socket.test.js
│
├── server.js
├── seed.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Go into the project folder:

```bash
cd metro-backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

# Running the Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

The server will run on:

```
http://localhost:5000
```

---

# API Documentation

Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

---

# Health Check

Endpoint:

```
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/v1/auth/register
```

### Login

```
POST /api/v1/auth/login
```

---

## Stations

### Get Stations

```
GET /api/v1/stations
```

### Get Station

```
GET /api/v1/stations/:id
```

### Create Station

```
POST /api/v1/stations
```

### Update Station

```
PUT /api/v1/stations/:id
```

### Delete Station

```
DELETE /api/v1/stations/:id
```

---

## Announcements

### Get Announcements

```
GET /api/v1/announcements
```

### Get Announcement

```
GET /api/v1/announcements/:id
```

### Create Announcement

```
POST /api/v1/announcements
```

### Update Announcement

```
PUT /api/v1/announcements/:id
```

### Delete Announcement

```
DELETE /api/v1/announcements/:id
```

---

# Running Tests

Run all tests:

```bash
npm test
```

Current test coverage includes:

- Authentication
- Station endpoints
- Announcement CRUD operations
- Authorization checks
- Socket.IO connections
- Real-time events

---

# Real-Time Socket Events

## Join Station Room

Client emits:

```javascript
socket.emit("joinStation", stationId);
```

## New Announcement

Server emits:

```javascript
newAnnouncement
```

## Viewer Updates

Server emits:

```javascript
presenceUpdate
```

---

# Author

youssef