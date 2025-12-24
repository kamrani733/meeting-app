# Meeting Scheduling Application

A modern, enterprise-grade web application for managing user meetings built with Next.js, TypeScript, and React Query.

## Features

### Meeting Form
- **Create & Edit Meetings**: Users can create new meetings or edit existing ones
- **Dynamic Title**: Meeting title automatically updates based on first and last name input
- **Smart Form Validation**: Submit button is enabled only when all required fields are valid
- **Error Handling**: Fields with errors display red borders, and the first error field is automatically focused
- **Contact Method Selection**: Modal-based selection with support for:
  - Phone (Call & SMS)
  - Email
  - WhatsApp
  - Telegram
  - Face Time
  - IMO
- **Phone Number Formatting**: Automatic formatting to `+98 912 111 1111` format
- **Date & Time Picker**: Interactive calendar modal with time slot selection
- **Future Date Validation**: Only future dates and times can be selected
- **Purpose Field**: Optional text area with 250 character limit

### Success Page
- Beautiful success screen with purple checkmark icon
- Grid pattern background
- Meeting details display
- Quick actions: "Add New One" and "Edit Meeting" buttons

### Edit Page
- Separate page for editing meetings
- Pre-filled form with existing meeting data
- Uses React Query cache to avoid unnecessary API calls

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: TanStack Query (React Query) 5.90.12
- **Form Management**: React Hook Form 7.69.0
- **Validation**: Zod 4.2.1
- **HTTP Client**: Axios 1.13.2

## Installation

1. Clone the repository:
```bash
git clone git@github.com:kamrani733/meeting-app.git
cd meeting-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Setup

The application requires a backend API server running on `http://localhost:3000/api`. 

### API Endpoints

#### GET `/api/contact-methods`
Returns available contact methods.

**Response:**
```json
[
  {
    "id": "phone",
    "label": "Phone",
    "icon": "📞"
  }
]
```

#### GET `/api/schedule-times`
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

#### GET `/api/meetings/:id`
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

#### POST `/api/meetings`
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

#### PUT `/api/meetings/:id`
Updates an existing meeting.

**Request Body:** Same as POST

## Project Structure

```
meeting-app/
├── app/
│   ├── meetings/
│   │   ├── create/
│   │   │   └── page.tsx          # Create meeting page
│   │   └── [id]/
│   │       ├── page.tsx          # Success page
│   │       └── edit/
│   │           └── page.tsx      # Edit meeting page
│   ├── layout.tsx                # Root layout with QueryClientProvider
│   ├── page.tsx                  # Home page (redirects to create)
│   └── providers.tsx             # React Query provider
├── components/
│   ├── form/
│   │   ├── MeetingForm.tsx       # Main form component
│   │   ├── ContactMethodField.tsx # Contact method input
│   │   ├── ContactMethodModal.tsx # Contact method selection modal
│   │   ├── DateTimePicker.tsx     # Date/time picker input
│   │   └── DateTimePickerModal.tsx # Calendar and time slot modal
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       └── Modal.tsx              # Reusable modal component
├── lib/
│   ├── api.ts                    # Axios instance configuration
│   ├── queries.ts                # React Query hooks
│   └── validations.ts            # Zod validation schemas
└── types/
    └── meeting.ts                # TypeScript type definitions
```

## Key Features Implementation

### Form Validation
- Real-time validation using Zod schemas
- Phone number format validation: `+98 912 111 1111`
- Email validation for email contact method
- Future date/time validation
- Automatic error focus on first invalid field

### State Management
- React Query for server state management
- Automatic cache updates on mutations
- Optimistic updates for better UX
- Cache invalidation on successful operations

### User Experience
- Dynamic form title based on user input
- Disabled submit button until form is valid
- Modal-based selections for better UX
- Responsive design with Tailwind CSS
- Loading states and error handling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Tailwind CSS for styling
- No inline comments (as per project requirements)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project
