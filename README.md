# Course Selling App (Backend)

This repository contains the backend implementation of a course selling app built using Node.js, Express, and MongoDB. The API enables admins to manage courses, including creating, updating, deleting, and archiving courses to a deleted records collection.

## Features

1. **Admin Authentication**:
   - Signup and login for admins with secure password hashing using bcrypt.
   - Authentication using JWT tokens for secure access.

2. **Course Management**:
   - Create new courses.
   - Update existing courses.
   - Delete courses and transfer them to a separate `DeletedCourses` collection.

3. **Middleware**:
   - Admin middleware to protect routes and ensure only authenticated admins can access them.

## Setup Instructions

### Prerequisites

- Node.js installed (v16 or later recommended).
- MongoDB database instance (local or cloud-based).
- Environment variables configured in a `.env` file.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URL=<your_mongo_database_url>
   ADMIN_SECRET=<your_admin_jwt_secret>
   USER_SECRET=<your_user_jwt_secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will be running on `http://localhost:3000` (or your configured port).

## API Endpoints

### Admin Authentication

#### Signup
**POST** `/admin/signup`
- **Body Parameters**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword",
    "firstname": "John",
    "lastname": "Doe"
  }
  ```
- **Response**:
  - Success: `200 OK` `{ "message": "Admin created successfully" }`
  - Error: `400 Bad Request` `{ "message": "Email already exists" }`

#### Signin
**POST** `/admin/signin`
- **Body Parameters**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  - Success: `200 OK` `{ "token": "<JWT>", "message": "Login successful" }`
  - Error: `400 Bad Request` `{ "message": "Incorrect password" }` or `{ "message": "Email not found" }`

### Course Management

#### Create Course
**POST** `/admin/course`
- **Headers**:
  - Authorization: Bearer `<JWT>`
- **Body Parameters**:
  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "price": 100,
    "imageurl": "https://example.com/image.jpg"
  }
  ```
- **Response**:
  - Success: `200 OK` `{ "message": "Course created successfully" }`
  - Error: `400 Bad Request` `{ "message": "Course already exists" }`

#### Update Course
**PUT** `/admin/course`
- **Headers**:
  - Authorization: Bearer `<JWT>`
- **Body Parameters**:
  ```json
  {
    "courseId": "<course_id>",
    "title": "Updated Title",
    "description": "Updated Description",
    "price": 150,
    "imageurl": "https://example.com/updated-image.jpg"
  }
  ```
- **Response**:
  - Success: `200 OK` `{ "message": "Course updated successfully" }`
  - Error: `400 Bad Request` `{ "message": "Course does not exist" }`

#### Delete Course
**DELETE** `/admin/course`
- **Headers**:
  - Authorization: Bearer `<JWT>`
- **Body Parameters**:
  ```json
  {
    "courseId": "<course_id>"
  }
  ```
- **Response**:
  - Success: `200 OK` `{ "message": "Course deleted successfully" }`
  - Error: `400 Bad Request` `{ "message": "Course not found" }`

## Database Models

### Admin
```javascript
const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String
});
```

### Course
```javascript
const courseSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  imageurl: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'Admin' }
});
```

### DeletedCourse
```javascript
const deletedCourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageurl: String,
  deleterId: { type: Schema.Types.ObjectId, ref: 'Admin' }
});
```

## License
This project is licensed under the MIT License.
```
