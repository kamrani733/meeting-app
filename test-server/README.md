# Test Server

Test server for Meeting Scheduling Application API.

## Requirements

- Node.js version 20.19.5 or higher

## Installation

1. Navigate to the test-server directory:
```bash
cd test-server
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### GET `/api/contact-methods`
Returns available contact methods for the modal.

**Response:**
```json
[
  {
    "id": "phone",
    "label": "Phone",
    "icon": "phone.png"
  }
]
```

### GET `/api/schedule-times`
Returns available time slots for scheduling.

**Response:**
```json
[
  {
    "id": "1",
    "label": "4-5 pm"
  }
]
```

### GET `/api/meetings/:id`
Returns meeting details by ID.

**Response:**
```json
{
  "id": "1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "contactMethod": "phone",
  "contactValue": "+98 912 111 1111",
  "scheduleTime": "2025-01-05T16:00:00",
  "scheduleDate": "2025-01-05",
  "purpose": "Business discussion",
  "createdAt": "2025-01-01T10:00:00",
  "updatedAt": "2025-01-01T10:00:00"
}
```

### POST `/api/meetings`
Creates a new meeting.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "contactMethod": "phone",
  "contactValue": "+98 912 111 1111",
  "scheduleTime": "2025-01-05T16:00:00",
  "scheduleDate": "2025-01-05",
  "purpose": "Business discussion"
}
```

**Response:** Returns the created meeting object with `id`, `createdAt`, and `updatedAt`.

### PUT `/api/meetings/:id`
Updates an existing meeting.

**Request Body:** Same as POST

**Response:** Returns the updated meeting object.

## Database

The server uses SQLite database. The database file will be created automatically on first run.

