# ✅ FINAL SETUP - Follow These Steps Exactly

## 🎯 Your Credentials (Already Configured)

- **URL:** `https://hirgguemwflwruqsvenv.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0`

---

## 📝 STEP 1: Create .env File (CRITICAL!)

**You MUST create this file manually in the project root:**

1. Create a file named `.env` (not `.env.example`)
2. Copy this EXACT content:

```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
```

3. Save the file
4. **Restart your dev server** (this is important!)

---

## 🗄️ STEP 2: Run Database Migration

1. **Go to Supabase Dashboard:**
   - https://hirgguemwflwruqsvenv.supabase.co
   - Click **SQL Editor**

2. **Copy the ENTIRE contents of `SIMPLE_MIGRATION.sql`**

3. **Paste into SQL Editor**

4. **Click "Run"** (or Ctrl+Enter)

5. **Wait for "Success" message**

**This will:**
- ✅ Create `user_profiles` table
- ✅ Set up RLS policies
- ✅ **NOT create a trigger** (to avoid 500 errors)
- ✅ Grant necessary permissions

---

## ⚙️ STEP 3: Configure Auth Settings

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Settings**

2. **Disable Email Confirmation:**
   - Find **Email Auth**
   - **Uncheck** "Enable email confirmations"
   - Click **Save**

3. **Set Redirect URLs:**
   - Go to **Authentication** → **URL Configuration**
   - **Site URL:** `http://localhost:8080`
   - **Redirect URLs:** Add:
     - `http://localhost:8080/**`
     - `http://localhost:5173/**`
   - Click **Save**

---

## 🚀 STEP 4: Start Your App

```bash
# Make sure .env file exists first!
npm run dev
```

**Open:** http://localhost:8080 (or the port shown)

---

## ✅ STEP 5: Test Signup

1. Click **"Get Started"** or **"Sign Up"**
2. Fill in:
   - Email: `test@example.com`
   - Password: `test1234`
   - Name: `Test User`
3. Click **"Create Account"**
4. **Should work!** ✅

---

## 🔍 How It Works Now

1. **User signs up** → Supabase creates account ✅
2. **Client code creates profile** → `AuthContext.tsx` handles it ✅
3. **No trigger needed** → More reliable ✅
4. **User selects plan** → Profile updated ✅
5. **User accesses Builder** → Everything works ✅

---

## 🐛 Troubleshooting

### **Still getting 500 error?**

1. **Check `.env` file:**
   - Does it exist in project root?
   - Is the URL exactly: `https://hirgguemwflwruqsvenv.supabase.co`?
   - Did you restart dev server after creating it?

2. **Check database:**
   - Did Step 2 SQL run successfully?
   - Check **Table Editor** → `user_profiles` exists

3. **Check browser console:**
   - Press F12
   - Go to **Console** tab
   - Look for error messages
   - Share the exact error

### **"Table does not exist"**

- Run Step 2 SQL again

### **"Permission denied"**

- Make sure RLS policies were created (Step 2)

### **"Invalid API key"**

- Check `.env` file has correct key
- Restart dev server

---

## 📋 Final Checklist

- [ ] `.env` file created with correct values
- [ ] Dev server restarted after creating `.env`
- [ ] Database migration run (Step 2)
- [ ] Email confirmation disabled (Step 3)
- [ ] Redirect URLs configured (Step 3)
- [ ] Test signup works
- [ ] Profile created (check Table Editor)
- [ ] Can select plan
- [ ] Can access Builder

---

## 🎉 Success!

Once all steps are complete, everything should work:
- ✅ Signup without errors
- ✅ Automatic profile creation
- ✅ Plan selection
- ✅ Builder access
- ✅ AI code generation

**The trigger is disabled - client code handles everything!** 🚀

