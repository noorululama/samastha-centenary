# 🚀 Quick Reference Card

## 🔑 Admin Login Credentials

```
URL: http://localhost:3000/login

Username: admin
Password: samastha@2025
```

> ⚠️ **IMPORTANT**: Change these credentials in `.env.local` before deploying to production!

## 📍 Important URLs

| Page | URL | Description |
|------|-----|-------------|
| Registration Form | `http://localhost:3000` | Public volunteer registration |
| Admin Login | `http://localhost:3000/login` | Dashboard login page |
| Dashboard | `http://localhost:3000/dashboard` | Main admin dashboard |
| Old Admin (Legacy) | `http://localhost:3000/admin` | Original simple admin page |

## 🎯 Dashboard Features at a Glance

### Statistics Cards
- 📊 Total Registrations
- 📈 Today's Count
- 📅 This Week's Count
- 🩸 Blood Group Types

### Search & Filter
- 🔍 **Search**: Name, Phone, SKSSF Number
- 🩸 **Filter**: By Blood Group
- ✖️ **Clear**: Remove active filters

### Actions
- 📥 **Export CSV**: Download all data
- 🔄 **Refresh**: Reload volunteer list
- 👁️ **View**: See complete details
- ✏️ **Edit**: Modify volunteer information
- 🗑️ **Delete**: Remove volunteer (2-click confirm)
- 🚪 **Logout**: End session

## 🛠️ Common Tasks

### Task 1: View All Volunteers
1. Login at `/login`
2. Dashboard loads automatically
3. See all volunteers in table

### Task 2: Search for Specific Volunteer
1. Type in search box
2. Results filter instantly
3. Clear search to see all

### Task 3: Export Data to Excel
1. Click "Export CSV" button
2. File downloads automatically
3. Open in Excel/Google Sheets

### Task 4: View Volunteer Details
1. Click "View" button
2. Modal opens with full info
3. Click X or outside to close

### Task 5: Filter by Blood Group
1. Select blood group from dropdown
2. Table updates instantly
3. See count in dropdown

### Task 6: Edit Volunteer Information
1. Click "Edit" (blue pencil) button
2. Update fields in modal
3. Click "Save Changes"
4. Confirmation message appears

### Task 7: Delete a Volunteer
1. Click "Delete" (red trash) button
2. Button shows "Confirm?"
3. Click again to confirm delete
4. Click X to cancel

## 🔐 Security Notes

### Credentials Storage
- Stored in `.env.local` file
- Never commit to git
- Change before production

### Session Duration
- 24 hours validity
- Auto-logout after expiry
- Manual logout available

### Protected Routes
- `/dashboard` - Requires login
- `/admin` - Requires login
- All API export endpoints - Requires login

## 📊 Data Export Format

CSV file includes:
- Name
- Address
- Dars/Institution
- Blood Group
- Phone Number
- WhatsApp Number
- SKSSF Membership Number
- Previous Experience
- Registration Date

## 🎨 Dashboard Shortcuts

| Action | Button/Location |
|--------|----------------|
| Refresh Data | Top right, next to Logout |
| Export CSV | Below search bar |
| Search | Left side filter bar |
| Blood Filter | Dropdown next to search |
| View Details | Green eye icon in table |
| Edit Volunteer | Blue pencil icon in table |
| Delete Volunteer | Red trash icon in table |
| Logout | Top right corner |

## 📱 Responsive Design

Dashboard works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check `.env.local` exists and has credentials |
| Dashboard blank | Check MongoDB is running |
| Export fails | Ensure you're logged in |
| No data showing | Click refresh or check MongoDB connection |

## 📞 Quick Support

1. **Check server**: Is `npm run dev` running?
2. **Check MongoDB**: Is database connected?
3. **Check browser**: Clear cookies if issues
4. **Check console**: F12 → Console tab for errors

---

## 🎯 Most Common Workflows

### Daily Admin Tasks
1. Login → Dashboard
2. Check today's stats
3. Review new volunteers
4. Export if needed
5. Logout

### Weekly Review
1. Login
2. Check "This Week" stat
3. Filter by blood groups
4. Export weekly data
5. Review in Excel

### Searching Specific Volunteer
1. Login
2. Use search box
3. Type name/phone/SKSSF
4. Click "View" for details
5. Note: Search is real-time!

---

**Made with ❤️ for സമസ്ത നൂറാം വാർഷികം**
