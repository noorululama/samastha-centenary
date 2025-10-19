# Admin Dashboard Documentation

## 🎉 New Features Added!

### 1. **Secure Login System**

**Login Page:** `/login`

- Username/password authentication using environment variables
- Session-based authentication with HTTP-only cookies
- Automatic redirect to dashboard after login
- Protected routes using Next.js middleware

**Default Credentials (Change in `.env.local`):**
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=samastha@2025
```

### 2. **Comprehensive Dashboard**

**Dashboard URL:** `/dashboard`

Features include:

#### 📊 **Statistics Overview**
- **Total Registrations** - Overall volunteer count
- **Today's Registrations** - New registrations today
- **This Week** - Registrations in the last 7 days  
- **Blood Group Distribution** - Count by blood type

#### 🔍 **Advanced Filtering**
- **Search** - By name, phone number, or SKSSF membership number
- **Blood Group Filter** - Filter by specific blood groups
- **Real-time Filtering** - Instant results as you type
- **Active Filter Badges** - Visual indicators of active filters

#### 📥 **Export Features**
- **CSV Export** - Download all volunteer data
- **Formatted Data** - Properly escaped CSV format
- **Timestamped Files** - Unique filename with timestamp
- **One-Click Download** - Simple export button

#### 👁️ **Volunteer Details**
- **View Modal** - Click "View" to see full details
- **Organized Display** - Clean, card-based layout
- **All Information** - Complete volunteer profile
- **Easy Close** - Click outside or X button to close

#### 🔄 **Data Management**
- **Refresh Data** - Manual refresh button
- **Auto-Load** - Loads on page open
- **Record Count** - Shows filtered vs total records
- **Responsive Table** - Works on all screen sizes

### 3. **Security Features**

#### Route Protection
- Dashboard requires authentication
- Auto-redirect to login if not authenticated
- Session management with cookies
- Secure logout functionality

#### Authentication Flow
```
User visits /dashboard 
→ Middleware checks session
→ If no session, redirect to /login
→ User logs in
→ Session created
→ Redirect to /dashboard
```

### 4. **API Endpoints**

#### Authentication APIs

**POST `/api/auth/login`**
```json
{
  "username": "admin",
  "password": "samastha@2025"
}
```

**POST `/api/auth/logout`**
- No body required
- Clears session cookie

#### Data APIs

**GET `/api/volunteers`**
- Public endpoint
- Returns all volunteers (limited to 100)
- Sorted by newest first

**GET `/api/volunteers/export`**
- Protected endpoint (requires authentication)
- Returns CSV file
- Includes all volunteer data

## 📱 Using the Dashboard

### Step 1: Login

1. Navigate to: `http://localhost:3000/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `samastha@2025`
3. Click "Sign In"
4. You'll be redirected to the dashboard

### Step 2: View Data

The dashboard shows:
- Statistics cards at the top
- Search and filter tools
- Complete volunteer list in a table
- Pagination-ready design

### Step 3: Search & Filter

**Search:**
- Type in the search box
- Searches: name, phone, SKSSF number
- Real-time results

**Filter by Blood Group:**
- Select from dropdown
- Shows count for each blood group
- Combine with search for precise results

### Step 4: Export Data

1. Click "Export CSV" button
2. File downloads automatically
3. Open in Excel/Google Sheets
4. Contains all volunteer information

### Step 5: View Details

1. Click "View" button on any volunteer
2. Modal opens with complete details
3. Review all information
4. Close modal to return to table

### Step 6: Logout

1. Click "Logout" button in header
2. Session cleared
3. Redirected to login page

## 🔐 Security Configuration

### Changing Admin Credentials

Edit `.env.local`:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

**Important:**
- Use strong passwords in production
- Never commit `.env.local` to git
- Change default credentials immediately
- Consider implementing password hashing for production

### Session Management

Current implementation:
- Cookie-based sessions
- 24-hour expiration
- HTTP-only cookies (secure)
- Same-site protection

**For Production:**
- Implement JWT tokens
- Use proper session store (Redis, etc.)
- Add refresh tokens
- Implement rate limiting

## 📊 Dashboard Features Summary

### Statistics
✅ Total registrations count  
✅ Today's registrations  
✅ Weekly registrations  
✅ Blood group distribution  

### Filters & Search
✅ Real-time search  
✅ Blood group filter  
✅ Active filter indicators  
✅ Clear filters option  

### Data Management
✅ View complete volunteer details  
✅ Sortable table  
✅ Responsive design  
✅ Refresh data button  

### Export
✅ CSV export  
✅ All data included  
✅ Proper formatting  
✅ One-click download  

### Security
✅ Login authentication  
✅ Protected routes  
✅ Session management  
✅ Secure logout  

## 🎨 UI/UX Features

- **Modern Design** - Gradient headers, clean cards
- **Responsive** - Works on mobile, tablet, desktop
- **Icons** - Lucide React icons throughout
- **Loading States** - Spinners for async operations
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Visual confirmation of actions

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Access login:**
   ```
   http://localhost:3000/login
   ```

3. **Login with default credentials:**
   - Username: `admin`
   - Password: `samastha@2025`

4. **Use the dashboard!**

## 📝 Files Added/Modified

### New Files:
- `/app/login/page.tsx` - Login page
- `/app/dashboard/page.tsx` - Main dashboard
- `/app/api/auth/login/route.ts` - Login API
- `/app/api/auth/logout/route.ts` - Logout API
- `/app/api/volunteers/export/route.ts` - Export API
- `/lib/auth.ts` - Authentication utilities
- `/middleware.ts` - Route protection

### Modified Files:
- `.env.local` - Added admin credentials

## 🔄 Data Flow

```
User Registration Form
    ↓
POST /api/volunteers
    ↓
MongoDB (volunteers collection)
    ↓
GET /api/volunteers
    ↓
Dashboard Display
    ↓
Export CSV (if needed)
```

## 💡 Tips

1. **Search Tips:**
   - Search is case-insensitive
   - Partial matches work
   - Searches multiple fields

2. **Export Tips:**
   - Export includes all data (ignores filters)
   - CSV format works with Excel/Sheets
   - File named with timestamp

3. **Security Tips:**
   - Change default password
   - Use HTTPS in production
   - Implement proper session management
   - Add rate limiting for login attempts

## 🆘 Troubleshooting

**Can't login?**
- Check `.env.local` file exists
- Verify credentials are correct
- Clear browser cookies
- Restart dev server

**Export not working?**
- Check if logged in
- Verify MongoDB connection
- Check browser console for errors

**Dashboard not loading?**
- Check MongoDB is running
- Verify API endpoints work
- Check network tab in DevTools

---

**Your admin dashboard is ready to use!** 🎉

Access it at: http://localhost:3000/login
