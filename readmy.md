Project Overview
This project is a Node.js server application that uses Socket.IO for real-time communication and MariaDB with Knex.js for database management. The server provides endpoints for user and topic management, allowing administrators to create, update, and delete users and topics. Users can view topics and receive real-time notifications about new topic creations.

Features
User Authentication: Administrators can create, update, and delete user accounts.
Topic Management: Administrators can create, update, and delete topics.
User Notifications: Users receive real-time notifications when new topics are created.
Database Integration: Utilizes MariaDB as the database and Knex.js as the query builder.
Real-Time Communication: Implements Socket.IO for real-time communication between clients and the server.

Getting Started
Clone the repository: git clone https://github.com/your-username/project-name.git
Navigate to the project directory: cd project-name
Install dependencies: npm install

Usage
Configure environment variables by creating a .env file based on the provided .env.example.
npm run start:dev: Start the server in development mode with migrations and seeding.
Access the application via http://localhost:3000.

API Routes

Authentication
POST /api/login: Authenticate user login.

User Management
GET /api/users: Retrieve a list of users (Admin only).
POST /api/users: Create a new user (Admin only).
PUT /api/users/:id: Update a user's details (Admin only).
DELETE /api/users/:id: Delete a user (Admin only).

Topic Management
GET /api/topics: Retrieve a list of topics.
POST /api/topics: Create a new topic (Admin only).
PUT /api/topics/:id: Update a topic's details (Admin only).
DELETE /api/topics/:id: Delete a topic (Admin only).

Logout
POST /api/logout: Log out the user.

Token Refresh
POST /api/refresh: Refresh access token.

Database
The project utilizes MariaDB as the database management system. Database migrations and seed data are managed using Knex.js.

Socket.IO
Socket.IO is used to provide real-time communication between the server and clients. Users receive notifications about new topic creations.
