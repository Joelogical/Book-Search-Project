# Book Search Project

A full-stack MERN application that allows users to search for books using the Google Books API, create an account, and save their favorite books to their profile.

## Features

- 🔍 Search for books using the Google Books API
- 👤 User authentication with JWT
- 📚 Save and remove books from your profile
- 🎨 Modern UI with React and Bootstrap
- 🚀 GraphQL API with Apollo Server
- 📱 Responsive design for all devices

## Technologies Used

- **Frontend:**

  - React
  - Apollo Client
  - React Router
  - Bootstrap
  - Vite

- **Backend:**
  - Node.js
  - Express
  - Apollo Server
  - GraphQL
  - MongoDB
  - Mongoose
  - JWT Authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Joelogical/Book-Search-Project.git
   cd Book-Search-Project
   ```

2. Install dependencies for both server and client:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run develop
   ```

This will start both the backend server (on port 3001) and the frontend development server (on port 5173).

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Create an account or log in
3. Use the search bar to find books
4. Click "Save" on any book to add it to your profile
5. View your saved books in the "See Your Books" section
6. Remove books from your profile as needed

## Deployment

This project is deployed on Render. You can access the live version at:
[Book Search Project](https://book-search-project-joelogical.onrender.com)

## Author

- GitHub: [Joelogical](https://github.com/Joelogical)

