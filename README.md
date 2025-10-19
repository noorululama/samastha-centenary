# സമസ്ത നൂറാം വാർഷികം - Volunteer Registration Form

A modern, professional volunteer registration form built with Next.js, TypeScript, and MongoDB for സമസ്ത നൂറാം വാർഷികം (Samastha Centenary).

## Features

- ✅ Modern UI with Tailwind CSS
- ✅ Form validation with Zod
- ✅ MongoDB database integration
- ✅ TypeScript for type safety
- ✅ Responsive mobile-first design
- ✅ Malayalam language support with Google Fonts
- ✅ Professional form validation
- ✅ Real-time form feedback
- ✅ **Duplicate data prevention** 🆕
- ✅ User-friendly error messages in Malayalam
- ✅ Admin dashboard with login authentication
- ✅ CSV export functionality
- ✅ Edit and delete volunteer records
- ✅ Search and filter capabilities

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
│   │   ├── auth/                  # Authentication endpoints
│   │   ├── export/                # CSV export endpoint
│   │   └── volunteers/
│   │       ├── route.ts          # API endpoint (with duplicate check)
│   │       └── [id]/
│   │           └── route.ts      # Edit/Delete endpoints
│   ├── dashboard/
│   │   └── page.tsx              # Admin dashboard
│   ├── login/
│   │   └── page.tsx              # Admin login page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout (with fonts)
│   └── page.tsx                  # Home page (registration form)
├── components/
│   └── RegistrationForm.tsx      # Main form (with duplicate handling)
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   ├── mongodb.ts                # MongoDB connection utility
│   └── validation.ts             # Zod validation schema
├── models/
│   └── Volunteer.ts              # Mongoose model (with unique indexes)
├── middleware.ts                 # Route protection
├── DUPLICATE_HANDLING.md         # Duplicate feature documentation
├── ADMIN_DASHBOARD.md            # Dashboard documentation
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
Register a new volunteer (with automatic duplicate detection)

**Duplicate Check:** Phone Number, WhatsApp Number, SKSSF Membership Number

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

### PUT /api/volunteers/[id]
Update volunteer information (admin only)

### DELETE /api/volunteers/[id]
Delete a volunteer record (admin only)

### POST /api/auth/login
Admin authentication

### POST /api/auth/logout
End admin session

### GET /api/export
Export all volunteers to CSV (admin only)

## Admin Dashboard

### Access
- URL: `http://localhost:3000/login`
- Default credentials in `.env.local`:
  ```
  ADMIN_USERNAME=admin
  ADMIN_PASSWORD=samastha@2025
  ```

### Features
- 📊 Real-time statistics
- 🔍 Search and filter volunteers
- 📊 Export to CSV
- ✏️ Edit volunteer information
- 🗑️ Delete volunteers (2-click confirmation)
- 🔒 Secure session-based authentication

**See [`ADMIN_DASHBOARD.md`](./ADMIN_DASHBOARD.md) for detailed documentation.**

## Duplicate Data Prevention 🆕

The system automatically prevents duplicate registrations by checking:
- 📱 **Phone Number** (ഫോൺ നമ്പർ)
- 💬 **WhatsApp Number** (WhatsApp നമ്പർ)
- 🎫 **SKSSF Membership Number** (SKSSF മെമ്പർഷിപ്പ് നമ്പർ)

### User Experience
When a duplicate is detected:
1. ⚠️ User sees a friendly **yellow warning** in Malayalam
2. 👤 Shows which fields are duplicated
3. 📝 Displays the name of the existing registration
4. 💡 Provides helpful suggestions on what to do next

**See [`DUPLICATE_HANDLING.md`](./DUPLICATE_HANDLING.md) for complete documentation.**

## Building for Production

```bash
npm run build
npm start
```

## Documentation

| Document | Description |
|----------|-------------|
| [`README.md`](./README.md) | This file - project overview |
| [`ADMIN_DASHBOARD.md`](./ADMIN_DASHBOARD.md) | Complete admin dashboard guide |
| [`DUPLICATE_HANDLING.md`](./DUPLICATE_HANDLING.md) | Duplicate prevention feature docs |
| [`DUPLICATE_DETECTION_FLOW.md`](./DUPLICATE_DETECTION_FLOW.md) | Technical flow diagrams |
| [`DUPLICATE_QUICK_REF.md`](./DUPLICATE_QUICK_REF.md) | Quick reference card |
| [`EDIT_DELETE_GUIDE.md`](./EDIT_DELETE_GUIDE.md) | Edit/delete functionality |
| [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) | Quick start guide |
| [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) | Implementation details |

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
