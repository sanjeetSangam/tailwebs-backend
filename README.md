# Teacher Portal Backend

## Overview

This repository contains the backend components for the Teacher Portal project. It provides API endpoints for user authentication, student management, and data retrieval.

## Technology Stack

-   **Node.js**: JavaScript runtime for building the server.
-   **Express.js**: Web framework for building RESTful APIs.
-   **MongoDB**: Database for storing student records.

## Setup

### Prerequisites

-   Node.js and npm (or yarn) installed.
-   MongoDB or PostgreSQL instance set up and running.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sanjeetSangam/tailwebs-backend.git
    cd tailwebs-backend
    ```

2. Make sure you have .env with the following:

    ```bash
    MONGODB_URI=mongodb://localhost:27017
    ACCESS_TOKEN_SECRET=thisismysecret
    ACCESS_TOKEN_EXPIRY=1d
    ```

3. Start the server:
    ```bash
    npm i
    npm start
    ```

## API Endpoints

### Authentication

-   **POST /auth/v1/user/login**

    -   Description: User login to get a token.

-   **GET /auth/v1/user/logout**

    -   Description: Log out the authenticated user.

-   **POST /auth/v1/user/register**

    -   Description: Create a new user.

### Student Management

-   **POST /auth/v1/student/create**

    -   Description: Create a new student.

-   **PATCH /auth/v1/student/edit/:studentId**

    -   Description: Edit Student.

-   **PATCH /auth/v1/student/delete/:studentId**

    -   Description: Delete Student.

-   **GET /auth/v1/student/fetch**

    -   Description: Fetch all students.
