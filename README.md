# Netflix Clone

This project is a Netflix clone with a backend built using Node.js and Express.js, and a frontend that utilizes the TMDB API to display movie data. The application ensures that only authorized users can access the content.

## Project Overview

### Backend

- Built with Node.js and Express.js
- Uses MongoDB for data storage
- Implements user authentication and authorization
- Manages user data and provides API endpoints for frontend communication

### Frontend

- Utilizes the TMDB (The Movie Database) API for movie/TV show data
- Implements user registration and login
- Displays content only to authorized users

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

### Frontend

- React.js (assumed)
- TMDB API

## Features

- User registration and login
- User authentication and authorization
- Display of movie/TV show data from TMDB API
- Content restriction to logged-in users only

## User Schema

The user schema defines the structure of user data in the database:

- Username (String, required)
- Email (String, required, unique)
- Password (String, required, hashed)
- CreatedAt (Date, default: current date)
- UpdatedAt (Date, default: current date)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

git clone https://github.com/md-ismaeel/netflix_fullStack.git

## API Endpoints

- POST /api/v1/user/register - Register a new user
- POST /api/v1//user/login - User login
- POST /api/v1//user/logout - User login
- GET /api/movies - Fetch movie data (requires authentication)

## Development

1. Backend Development

   - Implement user authentication using JWT
   - Create API endpoints for user registration, login, and movie data
   - Implement middleware for route protection

2. Frontend Development

   - Set up React components for user interface
   - Implement user registration and login forms
   - Create protected routes for authenticated users
   - Fetch and display movie data from TMDB API

3. Integration
   - Connect frontend with backend API
   - Implement state management (e.g., Redux or Context API) for user authentication

## Security Considerations

- Use HTTPS for all communications
- Implement proper input validation and sanitization
- Store passwords securely using bcrypt or a similar hashing algorithm
- Use environment variables for sensitive information
- Implement rate limiting to prevent abuse

## Future Enhancements

- Add user profiles
- Implement a recommendation system
- Add a search functionality

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## Acknowledgments

- TMDB for providing the movie database API
- Netflix for inspiration
