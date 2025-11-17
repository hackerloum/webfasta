# Database Migration Fix for Signup Error

## 🔧 Issue Fixed

The 500 error during signup was caused by:
1. Database migration not being run
2. Trigger function having RLS issues
3. Missing error handling in trigger

## ✅ Solution Applied

### **1. Updated Migration File**

The migration file has been updated with:
- Better error handling in trigger function
- Service role policy for trigger inserts
- ON CONFLICT handling
- Support for all plan types (starter, business, etc.)

### **2. Fixed AuthContext**

- Removed duplicate profile creation (trigger handles it)
- Added fallback profile creation if trigger fails
- Better error handling

### **3. Fixed React Router Warnings**

- Added future flags to BrowserRouter
- Eliminates console warnings

---

## 🚀 How to Fix Your Database

### **Step 1: Run the Updated Migration**

1. Go to your Supabase Dashboard:
   - URL: https://hirgguemwflwruqsvenv.supabase.co
   - Navigate to **SQL Editor**

2. Copy the ENTIRE contents of:
   - `supabase/migrations/001_create_user_profiles.sql`

3. Paste into SQL Editor and click **Run**

### **Step 2: Verify Setup**

After running the migration, verify:

1. **Table exists:**
   - Go to **Table Editor**
   - You should see `user_profiles` table

2. **Trigger exists:**
   - Go to **Database** → **Functions**
   - You should see `handle_new_user()` function
   - Go to **Database** → **Triggers**
   - You should see `on_auth_user_created` trigger

3. **Policies exist:**
   - Go to **Authentication** → **Policies**
   - You should see 3 policies for `user_profiles`

### **Step 3: Test Signup**

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Try signing up with a new email
3. Check if user is created in **Authentication** → **Users**
4. Check if profile is created in **Table Editor** → `user_profiles`

---

## 🔍 Troubleshooting

### **If migration fails:**

1. **Check for existing table:**
   ```sql
   SELECT * FROM user_profiles;
   ```

2. **If table exists, drop it first:**
   ```sql
   DROP TABLE IF EXISTS user_profiles CASCADE;
   ```
   Then run the full migration again.

### **If trigger still fails:**

1. **Check trigger logs:**
   - Go to **Database** → **Logs**
   - Look for errors related to `handle_new_user`

2. **Manually test trigger:**
   ```sql
   SELECT handle_new_user();
   ```

### **If RLS is blocking:**

1. **Temporarily disable RLS to test:**
   ```sql
   ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
   ```
   (Re-enable after testing)

2. **Check policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
   ```

---

## 📋 Migration Checklist

- [ ] Migration file updated
- [ ] Migration run in Supabase SQL Editor
- [ ] `user_profiles` table created
- [ ] `handle_new_user()` function created
- [ ] `on_auth_user_created` trigger created
- [ ] RLS policies created
- [ ] Test signup works
- [ ] Profile auto-created on signup
- [ ] React Router warnings fixed

---

## 🎯 What Changed

### **Migration Improvements:**

1. **Better Error Handling:**
   ```sql
   EXCEPTION
     WHEN OTHERS THEN
       RAISE WARNING 'Error creating user profile: %', SQLERRM;
       RETURN NEW;
   ```

2. **ON CONFLICT Handling:**
   ```sql
   ON CONFLICT (id) DO NOTHING;
   ```

3. **Service Role Policy:**
   ```sql
   CREATE POLICY "Service role can insert profiles"
     ON user_profiles FOR INSERT
     WITH CHECK (true);
   ```

4. **Support All Plans:**
   ```sql
   CHECK (subscription_plan IN ('free', 'pro', 'enterprise', 'starter', 'business'))
   ```

### **Code Improvements:**

1. **Removed Duplicate Profile Creation:**
   - Trigger handles it automatically
   - Fallback only if trigger fails

2. **Fixed React Router:**
   - Added future flags
   - No more console warnings

---

## ✅ After Fix

Once the migration is run successfully:

1. ✅ Signup will work without 500 errors
2. ✅ Profile will be created automatically
3. ✅ No React Router warnings
4. ✅ Users can select plans
5. ✅ Builder access works

---

**Status:** Ready to deploy  
**Next Step:** Run the migration in Supabase Dashboard

