# User Account App

A simple React application for managing user accounts. Ideally created for an intern-level assignment.

## Features

- **User Registration**: Create a new account with name, email, and password.
- **Login**: Authenticate using your registered credentials.
- **Profile Management**: View and edit your profile information.
- **Secure Handling**: Data is persisted locally in your browser.

## Tech Stack

- React (v16+)
- JavaScript (No TypeScript)
- React Router for navigation
- Bootstrap for styling
- LocalStorage for data persistence

## Setup Instructions

1.  Make sure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm start
    ```
4.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Authentication Logic

This application uses `localStorage` to simulate a backend database.

- **Registration**: Stores user object in a `users` array in localStorage.
- **Login**: Checks credentials against the `users` array and sets a `user` session key in localStorage.
- **Protected Routes**: The Account page checks for the existence of the `user` session key.
