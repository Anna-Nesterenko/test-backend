**Project Overview** <br/>
<br/>
This project is a Node.js server application that uses Socket.IO <br/>
for real-time communication and MariaDB with Knex.js for database management. <br/>
The server provides endpoints for user and topic management, allowing administrators to create, <br/>
update, and delete users and topics. Users can view topics and receive real-time notifications about new topic creations.<br/>
<br/>
**Features** 
<br/>
User Authentication: <br/>
Administrators can create, update, and delete user accounts. <br/>
Topic Management: <br/>
Administrators can create, update, and delete topics. <br/>
User Notifications: <br/>
Users receive real-time notifications when new topics are created. <br/>
Database Integration: <br/>
Utilizes MariaDB as the database and Knex.js as the query builder. <br/>
Real-Time Communication: Implements Socket.IO for real-time communication between clients and the server.<br/>
<br/>
**Getting Started**<br/>
<br/>
Clone the repository: git clone https://github.com/your-username/project-name.git <br/>
Navigate to the project directory: cd project-name <br/>
Install dependencies: npm install<br/>
<br/>
**Usage Configure** <br/>
<br/>
environment variables by creating a .env file based on the provided .env.example. <br/>
npm run start:dev: Start the server in development mode with migrations and seeding. <br/>
Access the application via http://localhost:3000.<br/>
<br/>
**API Routes**<br/>
<br/>
Authentication <br/>
POST /api/login: Authenticate user login.<br/>
<br/>
Users<br/>
GET /api/users: Retrieve a list of users (Admin only). <br/>
POST /api/users: Create a new user (Admin only). <br/>
PUT /api/users/🆔 Update a user's details (Admin only). <br/>
DELETE /api/users/🆔 Delete a user (Admin only).<br/>
<br/>
Topics <br/>
GET /api/topics: Retrieve a list of topics. <br/>
POST /api/topics: Create a new topic (Admin only). <br/>
PUT /api/topics/🆔 Update a topic's details (Admin only). <br/>
DELETE /api/topics/🆔 Delete a topic (Admin only).<br/>
<br/>
Logout <br/>
POST /api/logout: Log out the user.<br/>
<br/>
Token Refresh <br/>
POST /api/refresh: Refresh access token.<br/>
<br/>
**Database** <br/>
<br/>
The project utilizes MariaDB as the database management system. <br/>
Database migrations and seed data are managed using Knex.js.<br/>
<br/>
**Socket.IO** <br/>
<br/>
Socket.IO is used to provide real-time communication between the server and clients. <br/>
Users receive notifications about new topic creations.<br/>
