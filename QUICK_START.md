# Quick Start Guide 🚀

## ✅ Your Application is Running!

**Live at:** http://localhost:3000

Click the preview button in your IDE to view the application!

---

## 📱 Available Pages

### 1. Registration Form (Main Page)
**URL:** http://localhost:3000

The main volunteer registration form with:
- Beautiful Malayalam interface
- All required fields
- Real-time validation
- Professional UI design

### 2. Admin Dashboard
**URL:** http://localhost:3000/admin

View and manage all registrations:
- Complete list of volunteers
- Sortable table
- Contact information
- Registration timestamps

---

## 🗄️ Database Setup (IMPORTANT!)

Your application is configured but needs a MongoDB database to save registrations.

### Quick Option: MongoDB Atlas (Cloud - 5 minutes)

1. **Sign up:** https://www.mongodb.com/cloud/atlas (Free tier available!)
2. **Create cluster:** Click "Build a Database" → Choose FREE tier
3. **Create user:** Add username/password (save these!)
4. **Allow access:** Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
5. **Get connection string:** 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

6. **Update `.env.local` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/samastha-centenary?retryWrites=true&w=majority
   ```

7. **Restart server:**
   - Stop current server (Ctrl+C in terminal)
   - Run: `npm run dev`

### Alternative: Local MongoDB

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The `.env.local` file is already configured for local MongoDB
4. Just restart: `npm run dev`

---

## 🎯 Test the Form

1. Open http://localhost:3000
2. Fill in all required fields:
   - **Name:** Your full name
   - **Address:** Full address
   - **Dars/Institution:** Institution name
   - **Blood Group:** Select from dropdown
   - **Phone Number:** 10 digits (e.g., 9876543210)
   - **WhatsApp:** 10 digits
   - **SKSSF Number:** Membership number
   - **Previous Experience:** Optional

3. Click "സബ്മിറ്റ് ചെയ്യുക" (Submit)
4. If MongoDB is connected, you'll see success message!
5. Check admin dashboard to see the registration

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for code issues
npm run lint
```

---

## ❓ Quick Troubleshooting

### "Registration failed" after submitting form
→ MongoDB not connected. Follow database setup above.

### Form validation errors
→ Check that:
- Phone numbers are exactly 10 digits
- All required fields are filled
- Blood group is selected

### Port 3000 already in use
```bash
# Find and kill the process
npx kill-port 3000

# Or use different port
npx next dev -p 3001
```

### Changes not showing
→ Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📊 View Registrations

### Option 1: Admin Dashboard (Easy)
Visit: http://localhost:3000/admin

### Option 2: API Call
```bash
curl http://localhost:3000/api/volunteers
```

### Option 3: MongoDB Directly
```bash
# If using MongoDB Atlas
mongosh "YOUR_MONGODB_URI"
db.volunteers.find().pretty()

# If using local MongoDB
mongosh samastha-centenary
db.volunteers.find().pretty()
```

---

## 🎨 Customization

### Change Colors
Edit Tailwind classes in:
- `app/page.tsx` - Main page
- `components/RegistrationForm.tsx` - Form
- `app/admin/page.tsx` - Admin dashboard

### Update Deadline Date
Find and edit in `app/page.tsx`:
```tsx
// Line ~42
<p className="text-amber-800 mt-1">
  20-10-25 തിങ്കൾ മഗ്രിബിന് മുമ്പായി
</p>
```

### Add New Form Fields
1. Update schema: `lib/validation.ts`
2. Update database model: `models/Volunteer.ts`
3. Add field to form: `components/RegistrationForm.tsx`
4. Update admin display: `app/admin/page.tsx`

---

## 📦 Project Structure

```
.
├── app/                          # Next.js app directory
│   ├── api/volunteers/route.ts   # API endpoint
│   ├── admin/page.tsx            # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main form page
│   └── globals.css               # Global styles
├── components/
│   └── RegistrationForm.tsx      # Form component
├── lib/
│   ├── mongodb.ts                # Database connection
│   └── validation.ts             # Form validation
├── models/
│   └── Volunteer.ts              # Database schema
├── .env.local                    # Environment variables
└── package.json                  # Dependencies
```

---

## 🚀 Ready to Deploy?

See `DEPLOYMENT.md` for complete deployment guide to:
- Vercel (Recommended - Free)
- Netlify
- Railway
- Self-hosted VPS

---

## 📚 Documentation Files

- **README.md** - Project overview and general info
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Production deployment guide
- **QUICK_START.md** - This file (Quick reference)

---

## ✨ Features Implemented

✅ Modern Next.js 14 with App Router
✅ TypeScript for type safety
✅ MongoDB integration with Mongoose
✅ Form validation with Zod
✅ React Hook Form for form handling
✅ Tailwind CSS for styling
✅ Malayalam language support
✅ Responsive design (mobile/tablet/desktop)
✅ Admin dashboard
✅ Real-time validation
✅ Success/error notifications
✅ Professional UI/UX

---

## 🆘 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check `DEPLOYMENT.md` for deployment help
3. Review error messages in browser console (F12)
4. Check terminal for server errors

---

**Happy coding! Your registration form is ready to use! 🎉**

Remember to set up MongoDB to enable form submissions!
