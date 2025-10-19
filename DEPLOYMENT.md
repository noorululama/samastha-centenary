# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the best platform for Next.js applications and offers a generous free tier.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - സമസ്ത നൂറാം വാർഷികം registration form"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Sign up for Vercel**
   - Go to https://vercel.com
   - Sign up with your GitHub account

3. **Import your project**
   - Click "Add New..." → "Project"
   - Select your repository
   - Vercel will auto-detect Next.js settings

4. **Configure Environment Variables**
   - Before deploying, add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/samastha-centenary`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

### MongoDB Atlas Setup for Production

1. **Create MongoDB Atlas Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create a Cluster**
   - Choose AWS/Google Cloud/Azure
   - Select free tier (M0)
   - Choose region closest to your users

3. **Create Database User**
   - Database Access → Add New Database User
   - Choose username and strong password
   - Save credentials securely

4. **Whitelist IP Address**
   - Network Access → Add IP Address
   - For Vercel, add: `0.0.0.0/0` (allow from anywhere)
   - Note: This is safe as you're using authentication

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `samastha-centenary`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/samastha-centenary?retryWrites=true&w=majority
```

## Alternative Deployment Options

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy

### Railway

1. Go to https://railway.app
2. Create new project from GitHub repo
3. Add MongoDB plugin (or use external MongoDB Atlas)
4. Add environment variables
5. Deploy automatically

### Self-Hosted (VPS)

**Requirements:**
- Node.js 18+
- MongoDB
- Process manager (PM2)
- Nginx (optional, for reverse proxy)

**Steps:**

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install MongoDB**
   ```bash
   # Follow official MongoDB installation guide for your OS
   ```

3. **Clone your repository**
   ```bash
   git clone YOUR_REPO_URL
   cd samastha-centenary-registration
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create .env.local**
   ```bash
   echo "MONGODB_URI=mongodb://localhost:27017/samastha-centenary" > .env.local
   ```

6. **Build the application**
   ```bash
   npm run build
   ```

7. **Install PM2**
   ```bash
   npm install -g pm2
   ```

8. **Start the application**
   ```bash
   pm2 start npm --name "samastha-form" -- start
   pm2 save
   pm2 startup
   ```

9. **Configure Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

Required for all deployments:

```env
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# Optional: Node environment
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Test form submission
- [ ] Verify data is saving to MongoDB
- [ ] Check admin dashboard at `/admin`
- [ ] Test on mobile devices
- [ ] Verify all validation messages appear correctly
- [ ] Check Malayalam text displays properly
- [ ] Test error handling (try invalid inputs)
- [ ] Monitor database connection in production
- [ ] Set up monitoring/alerts (optional)
- [ ] Configure custom domain (optional)

## Custom Domain Setup (Vercel)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update your domain's DNS records as instructed
5. Wait for DNS propagation (can take up to 48 hours)

## Security Recommendations

1. **Never commit `.env.local` to Git** (already in .gitignore)
2. **Use strong MongoDB passwords**
3. **Enable MongoDB authentication**
4. **Regularly backup your database**
5. **Monitor database access logs**
6. **Set up rate limiting** (for production)
7. **Use HTTPS** (automatic with Vercel)

## Monitoring & Maintenance

### Vercel Analytics (Free)
- Automatic performance monitoring
- Real-time visitor stats
- No setup required

### MongoDB Atlas Monitoring
- Database performance metrics
- Storage usage
- Connection monitoring
- Alerts for issues

### Backup Strategy

**Automated Backups (MongoDB Atlas):**
- Atlas provides automatic backups
- Configure backup schedule in cluster settings

**Manual Backup:**
```bash
# Export all volunteers
mongoexport --uri="YOUR_MONGODB_URI" --collection=volunteers --out=volunteers-backup.json

# Import backup
mongoimport --uri="YOUR_MONGODB_URI" --collection=volunteers --file=volunteers-backup.json
```

## Troubleshooting Deployment

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Can't Connect to MongoDB
- Verify connection string is correct
- Check network access whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Form Not Submitting in Production
- Check browser console for errors
- Verify environment variables are set
- Check API route is accessible

### Slow Performance
- Enable caching in MongoDB queries
- Consider upgrading MongoDB tier
- Optimize images and assets
- Use Vercel Edge Functions

## Support & Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Netlify Docs:** https://docs.netlify.com

---

**Need help?** Check the troubleshooting section or review the deployment platform's documentation.
