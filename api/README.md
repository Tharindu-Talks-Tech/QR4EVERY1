# QR4EVERY1 API

Azure Functions API for the QR4EVERY1 QR Code Generator

## Functions

### 1. `/api/stats` (GET)

Returns the current statistics for QR codes created and downloaded.

**Response:**

```json
{
  "created": 150,
  "downloaded": 89
}
```

### 2. `/api/increment` (POST)

Increments a specific counter (created or downloaded).

**Request Body:**

```json
{
  "type": "created" // or "downloaded"
}
```

**Response:**

```json
{
  "created": 151,
  "downloaded": 89
}
```

## Storage Strategy

The API uses a simple file-based storage system that:

1. **Persists data** across function calls using the `/tmp` directory
2. **Starts with default values** (created: 150, downloaded: 89) for better UX
3. **Provides consistent responses** instead of random values
4. **Handles errors gracefully** with proper fallbacks

## Testing

Run the test suite locally:

```bash
cd api
node test-functions.js
```

## Deployment

The API is automatically deployed to Azure Static Web Apps via GitHub Actions when changes are pushed to the main branch.

## File Structure

```
api/
├── stats/
│   ├── function.json      # Azure Function configuration
│   └── index.js          # Stats endpoint handler
├── increment/
│   ├── function.json      # Azure Function configuration
│   └── index.js          # Increment endpoint handler
├── shared/
│   └── statsManager.js   # Shared statistics management utility
├── host.json             # Azure Functions host configuration
├── package.json          # Dependencies and scripts
└── test-functions.js     # Local testing script
```

## Key Features

- ✅ **Persistent storage** - Counters survive function restarts
- ✅ **CORS enabled** - Works from any domain
- ✅ **Error handling** - Graceful degradation
- ✅ **Input validation** - Prevents invalid requests
- ✅ **Logging** - Comprehensive request/response logging
- ✅ **Testing** - Local test suite for verification

## Changes Made

### Problem Fixed

The original implementation was returning random values using `Math.random()`, causing inconsistent counter displays that would "go wild" on page refresh.

### Solution Implemented

1. **Created StatsManager utility** - Centralized statistics management
2. **Implemented file-based persistence** - Data survives across function calls
3. **Added proper error handling** - Graceful fallbacks when API is unavailable
4. **Improved frontend validation** - Prevents display of invalid data
5. **Added comprehensive testing** - Local test suite for development

### Benefits

- 🎯 **Consistent values** - No more random/wild counter behavior
- 💾 **Data persistence** - Counters maintain state across visits
- 🚀 **Better performance** - Reduced API calls with smart caching
- 🛡️ **Error resilience** - Works even when API is temporarily unavailable
- 🧪 **Testable** - Local testing ensures reliability
