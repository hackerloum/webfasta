# Quick Fix for Signup 500 Error

## 🚨 Immediate Fix Steps

The 500 error is likely because:
1. The migration hasn't been run yet
2. The trigger function has permission issues
3. Email confirmation might be required

---

## ✅ Step-by-Step Fix

### **Step 1: Check Your Supabase URL**

I notice your error shows: `eyvunthlgxmokspfwcii.supabase.co`
But you provided: `hirgguemwflwruqsvenv.supabase.co`

**Check your `.env` file:**
```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
```

Make sure it matches your actual Supabase project URL!

---

### **Step 2: Run the Migration**

1. **Go to Supabase Dashboard:**
   - Open: https://hirgguemwflwruqsvenv.supabase.co (or your actual URL)
   - Click **SQL Editor** in the left sidebar

2. **Run Migration 001:**
   - Copy ALL contents from `supabase/migrations/001_create_user_profiles.sql`
   - Paste into SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   - Wait for "Success" message

3. **Run Migration 002 (Fix):**
   - Copy ALL contents from `supabase/migrations/002_fix_signup_trigger.sql`
   - Paste into SQL Editor
   - Click **Run**
   - Wait for "Success" message

---

### **Step 3: Disable Email Confirmation (Temporary)**

The 500 error might be because email confirmation is required:

1. **In Supabase Dashboard:**
   - Go to **Authentication** → **Settings**
   - Find **Email Auth** section
   - **Disable** "Enable email confirmations"
   - Click **Save**

2. **This allows immediate signup without email verification**

---

### **Step 4: Check Auth Settings**

1. **Go to Authentication → Settings:**
   - Ensure **Email** provider is enabled
   - Check **Site URL** is set correctly
   - Verify **Redirect URLs** include your localhost

2. **Add Redirect URL:**
   - Go to **Authentication** → **URL Configuration**
   - Add: `http://localhost:8080`
   - Add: `http://localhost:5173` (if using Vite default)
   - Click **Save**

---

### **Step 5: Test Again**

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Clear browser cache/localStorage:**
   - Open DevTools (F12)
   - Go to **Application** → **Local Storage**
   - Clear all Supabase-related items
   - Refresh page

3. **Try signing up again**

---

## 🔍 Debugging Steps

### **Check Supabase Logs:**

1. **Go to Supabase Dashboard:**
   - Click **Logs** in left sidebar
   - Select **Postgres Logs**
   - Look for errors related to `handle_new_user` or `user_profiles`

### **Check Database:**

Run this in SQL Editor to verify setup:

```sql
-- Check if table exists
SELECT * FROM user_profiles LIMIT 1;

-- Check if function exists
SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';

-- Check if trigger exists
SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
```

### **Test Trigger Manually:**

```sql
-- This should return without error
SELECT handle_new_user();
```

---

## 🛠️ Alternative: Manual Profile Creation

If the trigger still fails, we can create profiles manually in the code:

The `AuthContext.tsx` already has fallback code that will create the profile if the trigger fails. But let's make sure it works:

1. **Check browser console** for any errors
2. **Check Network tab** for the actual error response
3. **Share the error message** from the response

---

## 📋 Checklist

- [ ] `.env` file has correct Supabase URL
- [ ] Migration 001 run successfully
- [ ] Migration 002 run successfully
- [ ] Email confirmation disabled (temporary)
- [ ] Redirect URLs configured
- [ ] Browser cache cleared
- [ ] Dev server restarted
- [ ] Test signup again

---

## 🆘 If Still Not Working

### **Get More Details:**

1. **Open Browser DevTools (F12)**
2. **Go to Network tab**
3. **Try signing up**
4. **Click on the failed request** (`/auth/v1/signup`)
5. **Check Response tab** - it will show the actual error message
6. **Share that error message** so I can help further

### **Common Issues:**

1. **"relation user_profiles does not exist"**
   - Migration not run → Run migration 001

2. **"permission denied for table user_profiles"**
   - RLS blocking → Check policies are created

3. **"function handle_new_user() does not exist"**
   - Trigger function missing → Run migration 002

4. **"email already exists"**
   - User already signed up → Try different email

---

## 💡 Quick Test

Try this minimal test in SQL Editor:

```sql
-- Test if we can insert into user_profiles
INSERT INTO user_profiles (id, email, subscription_plan)
VALUES (
  gen_random_uuid(),
  'test@example.com',
  'free'
);
```

If this fails, the table or policies have issues.
If this works, the issue is with the trigger.

---

**Let me know what error you see in the Network tab response!**

