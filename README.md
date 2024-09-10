# Social Network API

## Description
This project is a NoSQL API for a social network web application. Built using Express.js, MongoDB, and Mongoose, this API allows users to share thoughts, react to friends' thoughts, and create a friend list. The API meets the requirements of handling large amounts of unstructured data and provides endpoints for creating, updating, and deleting users, thoughts, and reactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [License](#license)



## Installation
Clone the repository: git clone https://github.com/your-username/social-network-api.git
Navigate to the project directory: cd social-network-api
Install dependencies: npm install

* Set up environment variables: Create a .env file in the root directory and add your MongoDB connection string:

MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
Start the server: npm start

## Usage
Once the server is running, you can use tools like Insomnia or Postman to interact with the API. The API routes are outlined below.

## API Routes
/api/users
GET /api/users: Retrieve all users.
GET /api/users/
: Retrieve a single user by their _id, with populated thought and friend data.
POST /api/users: Create a new user. Example payload:
json
Copy code
{
  "username": "kim",
  "email": "desveaux@gmail.com"
}
PUT /api/users/
: Update a user by their _id.
DELETE /api/users/
: Remove a user by their _id. 
/api/users/
/friends/
POST /api/users/
/friends/
: Add a new friend to a user's friend list.
DELETE /api/users/
/friends/
: Remove a friend from a user's friend list.
/api/thoughts
GET /api/thoughts: Retrieve all thoughts.
GET /api/thoughts/
: Retrieve a single thought by its _id.
POST /api/thoughts: Create a new thought. 

Example payload:
json
Copy code
{
  "thoughtText": "Here's a cool thought...",
  "username": "kim",
  "userId": "5edff358a0fcb779aa7b118b"
}
PUT /api/thoughts/
: Update a thought by its _id.
DELETE /api/thoughts/
: Remove a thought by its _id.


## Models

User
username: String, unique, required, trimmed.
email: String, required, unique, matches a valid email address.
thoughts: Array of _id values referencing the Thought model.
friends: Array of _id values referencing the User model (self-reference).
friendCount: Virtual property to retrieve the length of the user's friends array.

Thought
thoughtText: String, required, between 1 and 280 characters.
createdAt: Date, default to the current timestamp, formatted on query.
username: String, required.
reactions: Array of nested documents created with the reactionSchema.
reactionCount: Virtual property to retrieve the length of the thought's reactions array.

Reaction (Schema Only - future plan to incorporate this)
reactionId: ObjectId, default value is a new ObjectId.
reactionBody: String, required, 280 character maximum.
username: String, required.
createdAt: Date, default value to the current timestamp, formatted on query.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

VIDEOWALKTHROUGH: https://www.loom.com/share/f1f6376e4a0e4d97aec001e7acf5e651

GITHUB: https://github.com/KimCBNS/social-app

