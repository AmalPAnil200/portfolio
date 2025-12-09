# Migration from MongoDB to MySQL

This document outlines the changes made to migrate the application from MongoDB to MySQL.

## Changes Made

### 1. Dependencies
- Removed `mongoose` dependency
- Added `mysql2` and `sequelize` dependencies

### 2. Database Configuration
- Replaced MongoDB connection with MySQL connection using Sequelize
- Updated environment variables in `.env` file

### 3. Models
- Converted all Mongoose models to Sequelize models
- Updated data types and schema definitions
- Added proper associations and hooks for password hashing

### 4. Controllers
- Updated all database queries to use Sequelize instead of Mongoose
- Modified create, read, update, and delete operations
- Updated authentication checks

### 5. Middleware
- Updated auth middleware to work with Sequelize

## Environment Variables

The following environment variables are now used for MySQL configuration:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Amal@123
DB_NAME=portfolio
```

## Setting up MySQL

To fully utilize the MySQL integration, follow these steps:

1. Install MySQL server on your system
2. Create a database named `portfolio`:
   ```sql
   CREATE DATABASE portfolio;
   ```
3. Create a user with appropriate permissions or use the root user with the password specified in the `.env` file

## Fallback Mode

If the MySQL connection fails, the application will automatically fall back to in-memory data storage. This ensures that the application remains functional even when the database is not available.

## Files Modified

- `server/config/db.js` - Database configuration
- `server/models/*.js` - All model files
- `server/controllers/*.js` - All controller files
- `server/middleware/auth.js` - Authentication middleware
- `server/scripts/createAdmin.js` - Admin creation script
- `server/.env` - Environment variables
- `server/package.json` - Dependencies

## Testing

To test the MySQL integration:

1. Ensure MySQL server is running
2. Create the database and user as specified above
3. Start the server with `npm start`
4. The application should connect to MySQL successfully

If you encounter any connection issues, check:
- MySQL server is running
- Database name is correct
- Username and password are correct
- User has appropriate permissions on the database