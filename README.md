# സമസ്ത നൂറാം വാർഷികം - Volunteer Registration Form

A modern, professional volunteer registration form built with Next.js, TypeScript, and MongoDB for സമസ്ത നൂറാം വാർഷികം (Samastha Centenary).

## Features

- ✅ Modern UI with Tailwind CSS
- ✅ Form validation with Zod
- ✅ MongoDB database integration
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ Malayalam language support
- ✅ Professional form validation
- ✅ Real-time form feedback

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB on your system
- Start MongoDB service
- The default connection string in `.env.local` will work

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Update `.env.local` with your connection string

### 3. Configure Environment Variables

The `.env.local` file is already created. If using MongoDB Atlas, update it:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/samastha-centenary?retryWrites=true&w=majority
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── volunteers/
│   │       └── route.ts          # API endpoint for volunteer registration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── RegistrationForm.tsx      # Main registration form component
├── lib/
│   ├── mongodb.ts                # MongoDB connection utility
│   └── validation.ts             # Zod validation schema
├── models/
│   └── Volunteer.ts              # Mongoose model for volunteers
└── package.json
```

## Form Fields

The registration form collects the following information:

- **Name** (പേര്)
- **Address** (വിലാസം)
- **Dars/Institution** (ദാർസ് / സ്ഥാപനം)
- **Blood Group** (രക്തഗ്രൂപ്പ്)
- **Phone Number** (ഫോൺ നമ്പർ)
- **WhatsApp Number** (WhatsApp നമ്പർ)
- **SKSSF Membership Number** (SKSSF മെമ്പർഷിപ്പ് നമ്പർ)
- **Previous Experience** (മുൻകാല സമ്മേളനങ്ങളിൽ സേവനം)

## API Endpoints

### POST /api/volunteers
Register a new volunteer

**Request Body:**
```json
{
  "name": "John Doe",
  "address": "123 Main St",
  "darsInstitution": "XYZ Institution",
  "bloodGroup": "A+",
  "phoneNumber": "1234567890",
  "whatsappNumber": "1234567890",
  "skssfMembershipNumber": "SKSSF123",
  "previousExperience": "Conference 2020, 2021"
}
```

### GET /api/volunteers
Retrieve all registered volunteers (last 100)

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icons

## License

This project is created for സമസ്ത നൂറാം വാർഷികം volunteer registration.

## Support

For any issues or questions, please contact the development team.
