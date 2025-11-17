# Supabase Configuration Setup

## ✅ Your Supabase Credentials

Your Supabase project has been configured with the following credentials:

### **Project Details:**
- **Project URL:** `https://hirgguemwflwruqsvenv.supabase.co`
- **Anon Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0`
- **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE2NTQ2MiwiZXhwIjoyMDc4NzQxNDYyfQ.f1cUEFxR3W_-_PnP-rX3XSSH7Nu0JZhoCSwio_fkh6o`

---

## 🚀 Setup Instructions

### **1. Create `.env` File**

Create a `.env` file in the root directory of your project:

```bash
# In the project root directory
touch .env
```

### **2. Add Environment Variables**

Copy the following into your `.env` file:

```env
VITE_SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcmdndWVtd2Zsd3J1cXN2ZW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjU0NjIsImV4cCI6MjA3ODc0MTQ2Mn0.tTBUWSKXdW2WNbKUAWQXVV4HO-6fHqH4lLPCWB3jCb0
```

**⚠️ Important:** 
- The `.env` file is already in `.gitignore` - it won't be committed to git
- Never commit your `.env` file to version control
- The Service Role Key should NEVER be used in client-side code

---

## 📋 Next Steps

### **1. Run Database Migration**

You need to create the `user_profiles` table in your Supabase database:

1. **Option A: Via Supabase Dashboard**
   - Go to: https://hirgguemwflwruqsvenv.supabase.co
   - Navigate to **SQL Editor**
   - Copy and paste the contents of `supabase/migrations/001_create_user_profiles.sql`
   - Click **Run**

2. **Option B: Via Supabase CLI**
   ```bash
   supabase db push
   ```

### **2. Verify Database Setup**

After running the migration, verify:

1. **Table Created:**
   - Go to **Table Editor** in Supabase Dashboard
   - You should see `user_profiles` table

2. **RLS Policies:**
   - Go to **Authentication** → **Policies**
   - Verify RLS is enabled
   - Check that policies are created

3. **Trigger Created:**
   - Go to **Database** → **Functions**
   - Verify `handle_new_user()` function exists

---

## 🔒 Security Notes

### **Anon Public Key:**
- ✅ Safe to use in client-side code
- ✅ Used in `src/integrations/supabase/client.ts`
- ✅ Respects Row Level Security (RLS) policies

### **Service Role Key:**
- ❌ **NEVER** use in client-side code
- ❌ **NEVER** commit to git
- ✅ Only for server-side operations
- ✅ Bypasses RLS (use with extreme caution)
- ✅ Store in Supabase Edge Functions environment variables

---

## 🧪 Testing Connection

### **1. Start Development Server:**

```bash
npm run dev
```

### **2. Test Authentication:**

1. Open your app in browser
2. Click "Get Started" or "Sign Up"
3. Try creating an account
4. Check Supabase Dashboard → **Authentication** → **Users**
5. Verify user was created

### **3. Test Database:**

1. After signing up, check **Table Editor** → `user_profiles`
2. Verify a profile was automatically created
3. Check that `subscription_plan` is set to `'free'`

---

## 📊 Database Schema

### **user_profiles Table:**

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  subscription_plan TEXT DEFAULT 'free',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **RLS Policies:**
- Users can view own profile
- Users can update own profile
- Users can insert own profile

### **Auto-Profile Creation:**
- Trigger automatically creates profile on user signup
- Sets default `subscription_plan` to `'free'`

---

## 🔧 Troubleshooting

### **Issue: "Supabase URL not found"**

**Solution:**
- Check `.env` file exists in root directory
- Verify variable names are correct (must start with `VITE_`)
- Restart development server after creating `.env`

### **Issue: "Authentication not working"**

**Solution:**
- Verify Supabase URL and key in `.env`
- Check Supabase Dashboard → **Authentication** → **Settings**
- Ensure email provider is enabled
- Check browser console for errors

### **Issue: "Profile not created on signup"**

**Solution:**
- Verify migration was run successfully
- Check trigger `on_auth_user_created` exists
- Check function `handle_new_user()` exists
- Review Supabase logs for errors

### **Issue: "RLS policy error"**

**Solution:**
- Verify RLS is enabled on `user_profiles` table
- Check policies are created correctly
- Ensure user is authenticated
- Verify user ID matches profile ID

---

## 📚 Additional Resources

### **Supabase Dashboard:**
- URL: https://hirgguemwflwruqsvenv.supabase.co
- Go to: **Dashboard** → **Settings** → **API**

### **Documentation:**
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Migrations](https://supabase.com/docs/guides/database/migrations)

---

## ✅ Checklist

- [ ] `.env` file created with credentials
- [ ] Database migration run successfully
- [ ] `user_profiles` table created
- [ ] RLS policies enabled
- [ ] Trigger function created
- [ ] Test signup works
- [ ] Profile auto-created on signup
- [ ] Authentication working
- [ ] Plan selection working

---

## 🎉 Ready to Use!

Once you've:
1. Created `.env` file
2. Run the database migration
3. Verified everything works

Your authentication system is ready! Users can now:
- Sign up / Sign in
- Select subscription plans
- Access the Builder
- Get personalized AI responses

---

**Last Updated:** November 17, 2025  
**Status:** ✅ Configured

