# API Utility

This utility provides a standardized way to make API calls that work in both local development and production environments.

## Usage

Import the utility functions in your components:

```javascript
import { get, post, put, del } from '../utils/api';
```

Then use them in your components:

```javascript
// GET request
const response = await get('/projects');
const data = await response.json();

// POST request
const response = await post('/projects', { title: 'New Project' });

// PUT request
const response = await put('/projects/1', { title: 'Updated Project' });

// DELETE request
const response = await del('/projects/1');
```

## Configuration

The API utility automatically determines the correct base URL based on the environment:

- In development: Uses `VITE_API_URL` from `.env` file (defaults to `http://localhost:5000/api`)
- In production: Uses `VITE_API_URL_PROD` from `.env` file (defaults to your serverless function URL)

## Environment Variables

Make sure your `.env` file contains the following variables:

```
VITE_API_URL=http://localhost:5000/api
VITE_API_URL_PROD=https://nodejs-serverless-function-express-iota-ten.vercel.app
```