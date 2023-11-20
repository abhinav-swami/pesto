# Task Manager App

`Used Nodejs v16.19.0 while development`

## Overview

This is a task management application with a frontend developed using React and a backend API developed with Node.js and Express, MongoDB as database.  
The application allows users to create, read, update, and delete tasks.

## Frontend

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **Bootstrap**: A UI development toolkit.

### Technologies Used

- **Node.js**: JavaScript runtime for running the backend server.
- **Express**: Web application framework for building the API.
- **MongoDB**: NoSQL database for storing task data.
- **Mongoose**: MongoDB object modeling for Node.js.

### How to Run Frontend `Port:3000`

- cd client
- npm install
- npm start

```
  Backend is running on Port:3001 by default proxy already added to package.json
  "proxy": "http://localhost:3001",
```

### How to Run Backend `Port:3001`

- npm install
- npm start / node index.js

```
  The server will run on http://localhost:3001.
```

Make sure to have MongoDB installed and running.

```
API Endpoints

GET /api/tasks: Retrieve tasks with optional pagination and status filter.
POST /api/tasks: Create a new task.
PUT /api/tasks/:id: Update the status of a task.
DELETE /api/tasks/:id: Delete a task by ID.
```
