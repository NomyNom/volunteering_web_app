# Server Initialization (server.js)
### Purpose:
This file is the entry point of your backend. It sets up the Express server, connects to MongoDB (or simulates a connection), and mounts all the route modules.

### Key Tasks:
Loading environment variables (using dotenv).
Enabling middleware such as JSON parsing and CORS.
Connecting to MongoDB using Mongoose.
Importing and mounting route modules with specific URL prefixes (e.g., /api/auth, /api/profile).


# Server Initialization (server.js)
### Purpose:
This file is the entry point of your backend. It sets up the Express server, connects to MongoDB (or simulates a connection), and mounts all the route modules.

### Key Tasks:
Loading environment variables (using dotenv).
Enabling middleware such as JSON parsing and CORS.
Connecting to MongoDB using Mongoose.
Importing and mounting route modules with specific URL prefixes (e.g., /api/auth, /api/profile).


# Models Folder (src/components/models/)
### Purpose:
Models define the structure (schema) for the data you'll eventually store in MongoDB. They are built using Mongoose.

### Examples:
* User.js:
Defines a User schema with fields like email, password, role, and additional profile fields (fullName, address, skills, etc.).

* Event.js:
Defines an Event schema with details such as event name, description, location, required skills, urgency, and event date.

### Why They Matter:
Even though even though currently using dummy data, these models outline the expected structure for future database operations and provide a blueprint for data validation.


# Middleware Folder (src/components/middleware/)
### Purpose:
Middleware functions process requests before they reach your route handlers. They can perform tasks like authentication and authorization.

### Components:
* authMiddleware.js:
A placeholder (dummy) middleware that, in a complete implementation, would verify that a request includes a valid authentication token.

* adminMiddleware.js:
A placeholder middleware meant to restrict certain routes (like event creation) to admin users only.

### Usage:
Although currently set to simply pass requests through, these middleware functions are where you would later implement token verification and role checks.


# Validations and Integration
### Validations:
Each route includes basic validations to ensure that required fields are provided and conform to expected lengths and types (for example, checking that a full name doesn’t exceed 50 characters or that a zip code is within a valid range).

### Integration with the Front End:
The backend exposes endpoints (such as /api/auth/login, /api/profile, etc.) that the front-end can call. When form data is submitted from the front end, these endpoints validate the data and return dummy responses that mimic what a real backend would eventually do. Later on we will implement this.