# 🚀 Netlify Deployment Guide

## 📋 Prerequisites

- GitHub repository: `https://github.com/hackerloum/webfasta.git`
- Netlify account (free tier works fine)
- Node.js 20+ (handled automatically by Netlify)

---

## 🎯 Quick Deploy via GitHub

### **Step 1: Connect Repository to Netlify**

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the repository: **`hackerloum/webfasta`**
6. Click **"Configure the site"**

### **Step 2: Configure Build Settings**

Netlify should auto-detect these settings from `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `20` (automatically set)

If you need to set manually:
- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### **Step 3: Set Environment Variables**

Click **"Advanced"** → **"New variable"** and add these:

#### **Required Variables:**

```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
```

#### **Optional (for AI features):**

```env
VITE_CLAUDE_API_KEY=your_claude_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important Notes:**
- ⚠️ **Never commit API keys to GitHub** - only set them in Netlify dashboard
- ✅ The Anon Public Key is safe to use in client-side code
- 🔒 Service Role Key should NEVER be used in client-side code

### **Step 4: Deploy**

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, your site will be live at: `https://your-site-name.netlify.app`

---

## 🔧 Configuration Files

### **`netlify.toml`**

This file is already in your repository and contains:
- Build configuration
- SPA routing redirects (for React Router)
- Security headers
- Cache headers for static assets

### **`public/_redirects`**

This file ensures all routes are handled by `index.html` for client-side routing.

---

## 🔄 Continuous Deployment

Once connected, Netlify will automatically deploy:
- ✅ Every push to `main` branch
- ✅ Every pull request (as preview deployments)
- ✅ Manually triggered deployments

---

## 🌐 Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS

---

## 📊 Build Settings Summary

```
Build command:    npm run build
Publish directory: dist
Node version:     20
Branch:           main
```

---

## 🔍 Troubleshooting

### **Issue: "Build failed"**

**Solutions:**
- Check build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct build script
- Check Node version compatibility

### **Issue: "404 on routes"**

**Solutions:**
- Verify `public/_redirects` file exists
- Check `netlify.toml` has redirect rules
- Ensure file is in `public/` directory (not `dist/`)

### **Issue: "Environment variables not working"**

**Solutions:**
- Variables must start with `VITE_` for Vite apps
- Restart build after adding variables
- Check spelling in Netlify dashboard matches code

### **Issue: "Supabase connection failed"**

**Solutions:**
- Verify `VITE_SUPABASE_URL` is correct
- Verify `VITE_SUPABASE_PUBLISHABLE_KEY` is correct (anon key, not service role)
- Check Supabase project is active
- Verify CORS settings in Supabase dashboard

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly at Netlify URL
- [ ] All routes work (no 404 errors)
- [ ] Authentication works (sign up/sign in)
- [ ] Database connection works
- [ ] AI features work (if API keys are set)
- [ ] Environment variables are set correctly
- [ ] Custom domain configured (if applicable)

---

## 📚 Additional Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deploying)

---

## 🎉 Success!

Your AI Website Studio is now live on Netlify! 🚀

**Live URL:** `https://your-site-name.netlify.app`

---

**Last Updated:** 2025
**Status:** ✅ Ready for deployment

