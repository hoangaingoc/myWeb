
# Install dependencies
$ npm install

# Running server
$ node app.js

The server listens at port 3000

# APIs

### User Model
{
username: "john_doe",
password: "securepassword",
dob: "1990-01-01"
}

### Post Model
{
id: 16939883939,
title: "My First Blog Post",
content: "This is the content of the post.",
createAt: "2024-09-08T12:00:00Z",
username: "john_doe",
status: "public",  // "public" or "private"
type: "technology"
}

### Like Model
{
id: 16939883939,
idPost: 16939883939,
username: "john_doe",
createAt: "2024-09-08T12:00:00Z"
}

# API Endpoints

### Register a User
POST http://localhost:3000/register

Request Body:
{
"username": "john_doe",
"password": "securepassword",
"dob": "1990-01-01"
}

### Login
POST http://localhost:3000/login

Request Body:
{
"username": "john_doe",
"password": "securepassword"
}

### Creating a Post
POST http://localhost:3000/posts

Request Body:
{
"title": "My First Blog Post",
"content": "This is the content of the post.",
"username": "john_doe",
"status": "public",  // "public" or "private"
"type": "technology"
}

### Getting all Posts
GET http://localhost:3000/posts

### Getting a Post by ID
GET http://localhost:3000/posts/1

### Updating a Post by ID
PUT http://localhost:3000/posts/1

Request Body:
{
"title": "Updated Blog Post Title",
"content": "Updated content",
"status": "private",  // "public" or "private"
"type": "science"
}

### Deleting a Post by ID
DELETE http://localhost:3000/posts/1

### Liking a Post
POST http://localhost:3000/posts/1/like

Request Body:
{
"username": "john_doe"
}

### Unliking a Post
POST http://localhost:3000/posts/1/unlike

Request Body:
{
"username": "john_doe"
}

### Getting all Likes for a Post
GET http://localhost:3000/posts/1/likes
