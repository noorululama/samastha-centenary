# സമസ്ത നൂറാം വാർഷികം - Setup Guide

## 🎉 Your Registration Form is Ready!

The development server is already running at: **http://localhost:3000**

Click the preview button to view your application!

## 📋 What's Been Created

### 1. **Main Registration Form** (`/`)
- Beautiful, responsive Malayalam form
- All required fields with validation
- Professional UI with Tailwind CSS
- Real-time form validation
- Success/error notifications

### 2. **Admin Dashboard** (`/admin`)
- View all registered volunteers
- Sort and filter functionality
- Export-ready table format
- Visit: http://localhost:3000/admin

### 3. **API Endpoints**
- `POST /api/volunteers` - Submit registration
- `GET /api/volunteers` - Get all volunteers

## 🗄️ Database Setup

### Option 1: Local MongoDB (Quick Start)
Your `.env.local` is already configured for local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/samastha-centenary
```

**To use local MongoDB:**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The application will automatically connect

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create a new cluster (Free tier available)
3. Get your connection string
4. Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samastha-centenary
   ```
5. Restart the server: `npm run dev`

## 📝 Form Fields Included

✅ പേര് (Name) - Required
✅ വിലാസം (Address) - Required, Textarea
✅ ദാർസ് / സ്ഥാപനം (Dars/Institution) - Required
✅ രക്തഗ്രൂപ്പ് (Blood Group) - Dropdown with all blood groups
✅ ഫോൺ നമ്പർ (Phone Number) - 10-digit validation
✅ WhatsApp നമ്പർ - 10-digit validation
✅ SKSSF മെമ്പർഷിപ്പ് നമ്പർ - Required
✅ മുൻകാല സമ്മേളനങ്ങളിൽ സേവനം (Previous Experience) - Optional

## 🎨 Features

### Professional UI
- ✨ Modern gradient background
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 Accessible form controls
- 🌈 Color-coded sections
- 📊 Real-time validation feedback

### Smart Validation
- Phone numbers: Exactly 10 digits
- Required field checking
- Blood group dropdown
- Malayalam error messages

### User Experience
- Loading states during submission
- Success/error notifications
- Form auto-reset after success
- Smooth animations

## 🚀 Available Commands

```bash
# Start development server (already running!)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
.
├── app/
│   ├── api/volunteers/route.ts  # API endpoint
│   ├── admin/page.tsx           # Admin dashboard
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main form page
│   └── globals.css              # Global styles
├── components/
│   └── RegistrationForm.tsx     # Form component
├── lib/
│   ├── mongodb.ts               # DB connection
│   └── validation.ts            # Zod schemas
├── models/
│   └── Volunteer.ts             # Mongoose model
└── package.json
```

## 🔐 Data Schema

Each volunteer registration stores:
```typescript
{
  name: string
  address: string
  darsInstitution: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  phoneNumber: string (10 digits)
  whatsappNumber: string (10 digits)
  skssfMembershipNumber: string
  previousExperience: string (optional)
  createdAt: Date (automatic)
  updatedAt: Date (automatic)
}
```

## 🌐 Deployment Options

### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Connect to Vercel: https://vercel.com
3. Add MongoDB connection string in environment variables
4. Deploy!

### Other Platforms
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📊 Viewing Registrations

### Method 1: Admin Dashboard (UI)
Visit: http://localhost:3000/admin

### Method 2: API Call
```bash
curl http://localhost:3000/api/volunteers
```

### Method 3: MongoDB Directly
```bash
# Connect to MongoDB
mongosh samastha-centenary

# View all volunteers
db.volunteers.find().pretty()
```

## 🛠️ Customization Tips

### Change Colors
Edit `app/globals.css` and Tailwind classes in components

### Add More Fields
1. Update `models/Volunteer.ts`
2. Update `lib/validation.ts`
3. Add fields in `components/RegistrationForm.tsx`

### Change Deadline Date
Edit the date in `app/page.tsx` (line with "20-10-25")

## ⚠️ Important Notes

- ✅ Server is running on port 3000
- ✅ All dependencies installed
- ✅ TypeScript configured
- ✅ Tailwind CSS ready
- ⚠️ MongoDB needs to be running (local or Atlas)

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running locally, OR
- Update `.env.local` with MongoDB Atlas connection string

### Port 3000 already in use
```bash
# Stop current server (Ctrl+C)
# Change port in package.json or:
npx next dev -p 3001
```

### Form not submitting
1. Check browser console for errors
2. Verify MongoDB connection
3. Check Network tab in DevTools

## 📞 Support

For issues or questions about the code, check:
- README.md for general overview
- Comments in the code files
- Next.js documentation: https://nextjs.org/docs

---

**Ready to use!** 🎉 Open http://localhost:3000 in your browser!
