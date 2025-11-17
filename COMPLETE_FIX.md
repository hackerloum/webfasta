# 🔧 Complete Fix for Signup 500 Error

## 🚨 The Problem

The error shows: `eyvunthlgxmokspfwcii.supabase.co`
But you provided: `hirgguemwflwruqsvenv.supabase.co`

**Your `.env` file might have the wrong URL!**

---

## ✅ Complete Fix (3 Steps)

### **Step 1: Fix Your .env File**

1. **Check your `.env` file** in the project root
2. **Make sure it has the CORRECT URL:**
   ```env
   VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
   ```

3. **If the URL is different, update it!**

---

### **Step 2: Create the Database Table**

1. **Go to Supabase Dashboard:**
   - Use the CORRECT URL: https://hirgguemwflwruqsvenv.supabase.co
   - Click **SQL Editor**

2. **Run this SQL (creates the table):**
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

   -- Enable RLS
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

3. **Click Run**

---

### **Step 3: Disable the Problematic Trigger**

1. **Still in SQL Editor, run this:**
   ```sql
   -- Disable the trigger that's causing 500 errors
   DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
   ```

2. **Click Run**

---

### **Step 4: Disable Email Confirmation**

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Settings**
   - Find **Email Auth** section
   - **Uncheck** "Enable email confirmations"
   - Click **Save**

---

### **Step 5: Restart Everything**

1. **Stop your dev server** (Ctrl+C)
2. **Clear browser cache:**
   - Open DevTools (F12)
   - Application → Local Storage
   - Clear all
3. **Restart dev server:**
   ```bash
   npm run dev
   ```
4. **Try signing up again**

---

## ✅ How It Works Now

1. User signs up → Supabase creates user account ✅
2. Client code creates profile → No trigger needed ✅
3. User can select plan → Profile updated ✅
4. User accesses Builder → All working ✅

---

## 🔍 Verify Everything

### **Check 1: Correct URL**
- Open browser DevTools (F12)
- Go to **Network** tab
- Try signing up
- Check the request URL - should match your Supabase project

### **Check 2: Table Exists**
- Supabase Dashboard → **Table Editor**
- Should see `user_profiles` table

### **Check 3: Signup Works**
- Try signing up with a new email
- Should work without 500 error
- Check console for "User profile created successfully"

### **Check 4: Profile Created**
- After signup, check **Table Editor** → `user_profiles`
- Should see new row with your user

---

## 🐛 If Still Not Working

### **Check the Actual Error:**

1. **Open DevTools (F12)**
2. **Network tab**
3. **Try signing up**
4. **Click the failed request**
5. **Response tab** - copy the error message

### **Common Issues:**

1. **Wrong Supabase URL in .env**
   - Fix: Update `.env` with correct URL

2. **Table doesn't exist**
   - Fix: Run Step 2 SQL

3. **RLS blocking**
   - Fix: Policies should be created in Step 2

4. **Email confirmation required**
   - Fix: Disable in Step 4

---

## 📋 Final Checklist

- [ ] `.env` file has correct Supabase URL
- [ ] `user_profiles` table created
- [ ] RLS policies created
- [ ] Trigger disabled
- [ ] Email confirmation disabled
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Test signup works
- [ ] Profile created successfully

---

**This should fix it! The trigger was the problem - disabling it and using client-side profile creation is more reliable.** 🎉

