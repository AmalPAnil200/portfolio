# Admin Panel

## Access
- **Login Page**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Projects Management**: `/admin/projects`
- **Services Management**: `/admin/services`
- **Messages Management**: `/admin/messages`
- **Settings**: `/admin/settings`

## Default Credentials
- **Username**: `admin`
- **Password**: `password123`

## Features
1. Dashboard with statistics
2. Project management (view, add, edit, delete)
3. Services management (view, add, edit, delete)
4. Messages management (view, mark as read/unread, delete)
5. Settings (profile, password, notifications, appearance)

## API Endpoints
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create a new project
- `PUT /api/admin/projects/:id` - Update a project
- `DELETE /api/admin/projects/:id` - Delete a project
- `GET /api/admin/services` - Get all services
- `POST /api/admin/services` - Create a new service
- `PUT /api/admin/services/:id` - Update a service
- `DELETE /api/admin/services/:id` - Delete a service
- `GET /api/admin/contacts` - Get all contact messages
- `PUT /api/admin/contacts/:id` - Update a contact message
- `DELETE /api/admin/contacts/:id` - Delete a contact message