# Gym Membership & Fitness Tracker System

A MERN-stack web application for managing gym memberships and tracking fitness progress.

## Tech Stack
- Frontend: React.js, React Router, Axios, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt

## Features
- User registration & login (JWT authentication)
- Profile management
- Membership plan browsing & selection
- BMI calculator
- Workout tracker & workout history
- Admin dashboard (member management)

## Project Structure
```
gym-tracker/
  backend/     -> Express API server
  frontend/    -> React client app
```

## Setup

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
