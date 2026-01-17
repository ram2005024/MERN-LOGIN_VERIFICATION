# MERN Authentication System

A complete authentication system built with the MERN stack, featuring user registration, login, email verification, and password recovery.

**Live Demo:** https://mern-login-verification-frontend.vercel.app/

## About

This project was created as a beginner-friendly learning exercise to understand full-stack authentication and user management. It implements secure authentication flows and CRUD operations with MongoDB.

## Features

- User Registration with email verification
- User Login with JWT authentication
- Forgot Password functionality
- Reset Password with secure tokens
- Email Verification system
- Protected routes and middleware
- Complete CRUD operations for user management

## Tech Stack

**Frontend:**
- React + Vite
- Axios for API requests
- React Router for navigation

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- bcrypt for password hashing

## Project Structure

```
MERN_LOGIN_VERIFICATION/
├── Backend/
│   ├── config/           # Database and email configuration
│   ├── controllers/      # Route controllers
│   ├── Middlewares/      # Authentication middleware
│   ├── Model/            # MongoDB models
│   ├── Routes/           # API routes
│   └── Templates/        # Email templates
└── Frontend/
    ├── public/
    └── src/
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB (local or Atlas)
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd MERN-LOGIN_VERIFICATION
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Install frontend dependencies
```bash
cd ../Frontend
npm install
```

4. Create a `.env` file in the Backend directory
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
CLIENT_URL=http://localhost:5173
PORT=5000
```

5. Run the application
```bash
# Start backend (from Backend directory)
npm start

# Start frontend (from Frontend directory)
npm run dev
```

The application will run at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

## What I Learned

- Implementing secure user authentication with JWT
- Password hashing and validation with bcrypt
- Email verification workflow
- Password reset functionality with secure tokens
- Protected routes and middleware
- MongoDB schema design for user management
- Frontend-backend integration
- Error handling and validation

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Email verification before account activation
- Secure password reset with expiring tokens
- Protected API routes with middleware

## Contributing

This is a learning project, but suggestions and improvements are welcome!

## License

This project is open source and available under the MIT License.

---

Built while learning full-stack authentication with the MERN stack
