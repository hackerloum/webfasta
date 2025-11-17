# 🚀 START HERE - Complete Setup Guide

## ✅ Your Supabase Credentials

- **URL:** `https://hirgguemwflwruqsvenv.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0`
- **Service Role Key:** Get this from your Supabase Dashboard → Settings → API (keep it secret!)

---

## 📝 Step 1: Create .env File (REQUIRED)

**You must create this file manually!**

1. **In your project root**, create a new file named `.env`
2. **Copy and paste this exact content:**

```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
```

3. **Save the file**

**⚠️ Important:** The `.env` file is in `.gitignore` - it won't be committed to git (this is good for security).

---

## 🗄️ Step 2: Create Database (REQUIRED)

1. **Open Supabase Dashboard:**
   - Go to: https://hirgguemwflwruqsvenv.supabase.co
   - Click **SQL Editor** (left sidebar)

2. **Copy and paste this SQL:**

```sql
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise', 'starter', 'business')),
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_subscription_plan_idx ON user_profiles(subscription_plan);
```

3. **Click "Run"** (or press Ctrl+Enter)
4. **Wait for "Success" message**

---

## 🚫 Step 3: Disable Trigger (FIXES 500 ERROR)

**Still in SQL Editor, run this:**

```sql
-- Disable the trigger that causes 500 errors
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
```

**Click "Run"**

**Why?** The trigger was causing signup to fail. The client code now creates profiles automatically.

---

## ⚙️ Step 4: Configure Auth (IMPORTANT)

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Settings**

2. **Disable Email Confirmation:**
   - Find **Email Auth** section
   - **Uncheck** "Enable email confirmations"
   - Click **Save**

3. **Configure Redirect URLs:**
   - Go to **Authentication** → **URL Configuration**
   - **Site URL:** `http://localhost:8080`
   - **Redirect URLs:** Add these:
     - `http://localhost:8080/**`
     - `http://localhost:5173/**`
   - Click **Save**

---

## 🚀 Step 5: Start Your App

1. **Make sure `.env` file exists** (from Step 1)

2. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C if running)
   npm run dev
   ```

3. **Clear browser cache:**
   - Press **F12** to open DevTools
   - Go to **Application** tab
   - Click **Local Storage** → Clear all
   - Refresh page (F5)

---

## ✅ Step 6: Test Signup

1. **Click "Get Started" or "Sign Up"** in the app
2. **Fill in the form:**
   - Email: `test@example.com`
   - Password: `test1234` (min 6 characters)
   - Full Name: `Test User`
3. **Click "Create Account"**
4. **Should work!** ✅

---

## 🔍 Verify It Works

### **Check 1: User Created**
- Supabase Dashboard → **Authentication** → **Users**
- Should see your test user

### **Check 2: Profile Created**
- Supabase Dashboard → **Table Editor** → `user_profiles`
- Should see profile with `subscription_plan: 'free'`

### **Check 3: Can Access Builder**
- After signup, you should be redirected to Pricing
- Click any plan
- Should redirect to Builder
- Builder should load without errors

---

## 🐛 If Signup Still Fails

### **Check 1: .env File**
- Make sure `.env` exists in project root
- Verify URL is exactly: `https://hirgguemwflwruqsvenv.supabase.co`
- Verify key matches exactly
- **Restart dev server** after creating/editing `.env`

### **Check 2: Database**
- Make sure Step 2 SQL ran successfully
- Check **Table Editor** → `user_profiles` exists

### **Check 3: Trigger**
- Make sure Step 3 SQL ran (trigger disabled)
- Check **Database** → **Triggers** → should NOT see `on_auth_user_created`

### **Check 4: Auth Settings**
- Email confirmation should be **disabled**
- Redirect URLs should be configured

### **Check 5: Browser Console**
- Open DevTools (F12)
- Go to **Console** tab
- Look for any error messages
- Share the error if you see one

---

## 📋 Quick Checklist

- [ ] `.env` file created with correct values
- [ ] Database table created (Step 2)
- [ ] Trigger disabled (Step 3)
- [ ] Email confirmation disabled (Step 4)
- [ ] Redirect URLs configured (Step 4)
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Test signup works
- [ ] Profile created
- [ ] Can access Builder

---

## 🎉 Success!

Once all steps are complete:
- ✅ Signup works without 500 errors
- ✅ Profiles auto-created
- ✅ Plans can be selected
- ✅ Builder is accessible
- ✅ AI generation works
- ✅ Everything is configured!

---

**Need help?** Check the error message in browser console (F12) and share it with me!

