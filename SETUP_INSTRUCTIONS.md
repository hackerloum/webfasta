# 🚀 Complete Setup Instructions

## ✅ Your Supabase Configuration

- **URL:** `https://hirgguemwflwruqsvenv.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0`
- **Service Role:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE2NTQ2MiwiZXhwIjoyMDc4NzQxNDYyfQ.f1cUEFxR3W_-_PnP-rX3XSSH7Nu0JZhoCSwio_fkh6o`

---

## 📝 Step 1: Create .env File

**Create a file named `.env` in the project root** with this content:

```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
```

**Important:** The `.env` file is in `.gitignore` - it won't be committed to git.

---

## 🗄️ Step 2: Create Database Table

1. **Go to Supabase Dashboard:**
   - URL: https://hirgguemwflwruqsvenv.supabase.co
   - Click **SQL Editor** in left sidebar

2. **Run this SQL (creates the table and policies):**
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

3. **Click Run** (or press Ctrl+Enter)

---

## 🚫 Step 3: Disable Problematic Trigger

**Still in SQL Editor, run this:**

```sql
-- Disable the trigger that causes 500 errors
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
```

**Click Run**

**Why?** The trigger was causing 500 errors. The client code now creates profiles automatically, so we don't need the trigger.

---

## ⚙️ Step 4: Configure Auth Settings

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Settings**

2. **Email Auth Settings:**
   - **Uncheck** "Enable email confirmations" (for now, to allow immediate signup)
   - Click **Save**

3. **URL Configuration:**
   - Go to **Authentication** → **URL Configuration**
   - **Site URL:** `http://localhost:8080` (or your dev port)
   - **Redirect URLs:** Add:
     - `http://localhost:8080/**`
     - `http://localhost:5173/**` (Vite default)
   - Click **Save**

---

## 🚀 Step 5: Start Your App

1. **Make sure `.env` file exists** with correct values

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Clear browser cache:**
   - Open DevTools (F12)
   - Go to **Application** → **Local Storage**
   - Clear all items
   - Refresh page

---

## ✅ Step 6: Test Signup

1. **Click "Get Started" or "Sign Up"**
2. **Fill in:**
   - Email: `test@example.com`
   - Password: `password123` (min 6 chars)
   - Full Name: `Test User`
3. **Click "Create Account"**
4. **Should work without 500 error!**

---

## 🔍 Verify Everything Works

### **Check 1: User Created**
- Supabase Dashboard → **Authentication** → **Users**
- Should see your new user

### **Check 2: Profile Created**
- Supabase Dashboard → **Table Editor** → `user_profiles`
- Should see profile with `subscription_plan: 'free'`

### **Check 3: Can Select Plan**
- After signup, you should be on Pricing page
- Click any plan card
- Should redirect to Builder

### **Check 4: Builder Access**
- Should be able to access `/builder`
- AI chat should work
- Code generation should work

---

## 🐛 Troubleshooting

### **"Failed to load resource: 500"**

**Solution:**
1. Make sure trigger is disabled (Step 3)
2. Check `.env` file has correct URL
3. Restart dev server

### **"Table user_profiles does not exist"**

**Solution:**
- Run Step 2 SQL again

### **"Permission denied"**

**Solution:**
- Make sure RLS policies are created (Step 2)
- Check user is authenticated

### **"Invalid API key"**

**Solution:**
- Check `.env` file exists
- Verify key matches exactly
- Restart dev server after creating `.env`

---

## 📋 Complete Checklist

- [ ] `.env` file created with correct URL and key
- [ ] Database table created (Step 2)
- [ ] RLS policies created (Step 2)
- [ ] Trigger disabled (Step 3)
- [ ] Email confirmation disabled (Step 4)
- [ ] Redirect URLs configured (Step 4)
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Test signup works
- [ ] Profile created successfully
- [ ] Can select plan
- [ ] Can access Builder

---

## 🎉 You're All Set!

Once all steps are complete:
- ✅ Signup works
- ✅ Profiles auto-created
- ✅ Plans can be selected
- ✅ Builder is accessible
- ✅ AI generation works

**Everything should be working now!** 🚀

