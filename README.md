# Metro Backend API

A backend API system for managing metro stations and announcements.  
The project provides user authentication, station management, announcements management, validation, error handling, and real-time updates using Socket.IO.

---

# Features

## Authentication
- User registration
- User login
- JWT authentication
- Protected routes

## Stations
- Create stations
- Get all stations
- Get station details
- Update stations
- Delete stations

## Announcements
- Create announcements
- Get all announcements
- Get announcement details
- Update announcements
- Delete announcements

## Realtime Updates
Using Socket.IO:
- New announcement notifications
- Updated announcement notifications
- Deleted announcement notifications

## Other Features
- MongoDB database
- Express.js REST API
- Service layer architecture
- Request validation
- Global error handling
- Swagger API documentation

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Socket.IO
- Express Validator
- Swagger

---

# Project Structure

```
metro-backend
│
├── src
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── stationController.js
│   │   └── announcementController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Station.js
│   │   └── Announcement.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── stationRoutes.js
│   │   └── announcementRoutes.js
│   │
│   ├── services
│   │   ├── authService.js
│   │   ├── stationService.js
│   │   └── announcementService.js
│   │
│   ├── middleware
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   │
│   ├── sockets
│   │   └── socket.js
│   │
│   ├── validators
│   │   ├── authValidator.js
│   │   ├── stationValidator.js
│   │   └── announcementValidator.js
│   │
│   └── app.js
│
└── server.js
```

---

# Installation

Clone the project:

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

Create a `.env` file in the root folder:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Run The Project

Development mode:

```bash
npm run dev
```

The server will run on:

```
http://localhost:5000
```

---

# API Documentation

Swagger documentation:

```
http://localhost:5000/api-docs
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

Body:

```json
{
    "name":"User",
    "email":"user@test.com",
    "password":"123456"
}
```


### Login

```
POST /api/auth/login
```

Body:

```json
{
    "email":"user@test.com",
    "password":"123456"
}
```

---

# Stations

### Create Station

```
POST /api/stations
```

Body:

```json
{
    "name":"Main Station",
    "location":"Cairo",
    "line":"Line 1"
}
```


### Get Stations

```
GET /api/stations
```

---

# Announcements

### Get Announcements

```
GET /api/announcements
```


### Create Announcement

Protected route:

```
POST /api/announcements
```

Headers:

```
Authorization: Bearer TOKEN
```

Body:

```json
{
    "title":"Metro Delay",
    "message":"Train delayed 10 minutes",
    "station":"station_id"
}
```


### Update Announcement

Protected route:

```
PUT /api/announcements/:id
```


### Delete Announcement

Protected route:

```
DELETE /api/announcements/:id
```

---

# Socket.IO Events

Client connection:

```javascript
const socket = io("http://localhost:5000");
```


## New Announcement

Event:

```
newAnnouncement
```


Example:

```javascript
socket.on("newAnnouncement",(data)=>{
    console.log(data);
});
```


## Updated Announcement

Event:

```
updatedAnnouncement
```


## Deleted Announcement

Event:

```
deletedAnnouncement
```

---

# Error Handling

The API returns JSON errors:

Example:

```json
{
    "message":"Error message"
}
```

---

# Validation

The API validates incoming requests and returns validation errors:

Example:

```json
{
    "errors":[
        {
            "msg":"Field is required"
        }
    ]
}
```

---

# Author

Metro Backend Project