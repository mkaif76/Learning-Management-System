## Learning Management System (LMS) Backend
Welcome to the backend API for the Learning Management System. This document provides a complete guide on how to test all the features and endpoints of the deployed application using an API client like Postman or Insomnia.

Live API Base URL: https://learning-management-system-97tb.onrender.com

Core Concepts
User Roles
There are two user roles in this system:

User: Can view courses, enroll, and track their own progress.

Admin: Can do everything a user can, plus create courses, lessons, and quizzes.

Authentication
Most endpoints are protected. To access them, you must first log in to get a JSON Web Token (JWT).

This token must be included in the Authorization header of your requests as a Bearer Token.

Format: Authorization: Bearer <your_jwt_token_here>

Step-by-Step Testing Guide
Follow these steps in order to test the full functionality of the API. We will create two users (an admin and a regular user), create content as the admin, and then interact with it as the regular user.

Part 1: User & Admin Setup
First, we need to create our user accounts and get their authentication tokens.

Step 1.1: Create a Normal User
Send a POST request to create a standard user.

Method: POST

URL: {{BASE_URL}}/api/auth/signup

Body (JSON):

{
    "name": "Normal User",
    "email": "user@example.com",
    "password": "password123"
}
<img width="1273" height="745" alt="image" src="https://github.com/user-attachments/assets/7acbd129-cea1-4b00-a854-8e086a9746f5" />

Step 1.2: Create an Admin User
Send another POST request to create the user who will be our admin.

<img width="1244" height="734" alt="image" src="https://github.com/user-attachments/assets/9fcca3ac-9809-4478-9595-f0ef1b59426d" />

Cannot create the admin because the email is alread regisered, let's change the email
Method: POST

URL: {{BASE_URL}}/api/auth/signup

Body (JSON):

{
    "name": "Admin User",
    "email": "admin1@example.com",
    "password": "adminpassword"
}
<img width="1274" height="740" alt="image" src="https://github.com/user-attachments/assets/01009cf4-077c-4c9f-b166-9ee7b3f40140" />

Important: You must manually change this user's role from "user" to "admin" in your MongoDB Atlas database to grant them admin privileges.
This is for security reason only the admin can grant the access of admin resources

Step 1.3: Log In and Get Tokens
Log in as both users to get their unique JWTs. Save these tokens! You will need them for all subsequent requests.

Method: POST

URL: {{BASE_URL}}/api/auth/login

Body (for Admin Token):

{
    "email": "admin1@example.com",
    "password": "adminpassword"
}

Body (for User Token):

{
    "email": "user@example.com",
    "password": "password123"
}
<img width="1236" height="767" alt="image" src="https://github.com/user-attachments/assets/e43ba28b-cf24-436e-9788-5d3c0575d72c" />


Action: Copy the token from each response and save them. We'll refer to them as ADMIN_TOKEN and USER_TOKEN.

Part 2: Content Management (Admin Role)
Use the ADMIN_TOKEN for all requests in this section.

Step 2.1: Create a Course
Method: POST

URL: {{BASE_URL}}/api/courses

Authorization: Bearer ADMIN_TOKEN

Body (JSON):

{
    "title": "Ultimate Node.js Course",
    "description": "Learn Node.js from scratch, from the basics to advanced concepts.",
    "instructor": "Mohammad Kaif",
    "price": 9999
}
<img width="1271" height="796" alt="image" src="https://github.com/user-attachments/assets/2d959696-b0d8-4541-bb2c-6aa02056a059" />


Action: From the response, copy the _id of the newly created course. We'll call it COURSE_ID.

Step 2.2: Add a Lesson to the Course
Method: POST

URL: {{BASE_URL}}/api/courses/{{COURSE_ID}}/lessons

Authorization: Bearer ADMIN_TOKEN

Body (JSON):

{
    "title": "Lesson 1: Introduction to Node.js",
    "videoUrl": "[https://www.youtube.com/watch?v=example1](https://www.youtube.com/watch?v=example1)"
}
<img width="1498" height="781" alt="image" src="https://github.com/user-attachments/assets/abc5faaf-3af0-4eea-9647-c4edc833731d" />

Action: From the lessons array in the response, copy the _id of this new lesson. We'll call it LESSON_ID.

Step 2.3 Get All Courses (Public, Paginated)
Endpoint: GET /api/courses?page=1&limit=5
Auth: None
<img width="1130" height="680" alt="image" src="https://github.com/user-attachments/assets/5dc0d1c1-7cef-49ad-a105-724f9a174143" />

Get a Single Course (Public)
Endpoint: GET /api/courses/:courseId
Auth: None
<img width="1277" height="754" alt="image" src="https://github.com/user-attachments/assets/4277528b-612b-4214-a981-6f3a92537a69" />

 Enroll in a Course (User Only)

Step 2.3: Add a Quiz to the Course
Method: POST

URL: {{BASE_URL}}/api/courses/{{COURSE_ID}}/quizzes

Authorization: Bearer ADMIN_TOKEN

Body (JSON):

{
    "title": "Node.js Basics Quiz",
    "questions": [
        {
            "text": "What is Node.js?",
            "options": [{"text": "A frontend framework"}, {"text": "A runtime environment"}],
            "correctAnswer": 1
        },
        {
            "text": "What
