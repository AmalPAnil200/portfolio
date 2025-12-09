# Ornamental Shop Backend API

This is the backend API for the Ornamental Shop project, built with Node.js, Express, and MongoDB.

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project (admin only)
- `PUT /api/projects/:id` - Update a project (admin only)
- `DELETE /api/projects/:id` - Delete a project (admin only)

### Design Works
- `GET /api/design-works` - Get all design works
- `GET /api/design-works/:id` - Get a specific design work
- `POST /api/design-works` - Create a new design work (admin only)
- `PUT /api/design-works/:id` - Update a design work (admin only)
- `DELETE /api/design-works/:id` - Delete a design work (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a new service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

### Contact
- `POST /api/contact` - Submit a contact message (public)
- `GET /api/contact` - Get all contact messages (admin only)
- `GET /api/contact/:id` - Get a specific contact message (admin only)
- `PUT /api/contact/:id` - Update a contact message (admin only)
- `DELETE /api/contact/:id` - Delete a contact message (admin only)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register admin (setup only)
- `GET /api/admin/profile` - Get admin profile (admin only)

## Authentication

Most admin endpoints require authentication. To authenticate, include the Authorization header with a Bearer token:

```
Authorization: Bearer <your_token>
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ornamental_shop
JWT_SECRET=your_jwt_secret_key
```

## Setup

1. Install dependencies: `npm install`
2. Make sure MongoDB is running
3. Set up the admin user: `npm run setup-admin`
4. Start the server: `npm start` or `npm run dev` for development

## Initial Admin Credentials

Username: admin
Password: admin123

**Important:** Change the default password in production!