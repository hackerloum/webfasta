# 🚨 URGENT FIX - Signup 500 Error

## The Problem

The error "Unexpected status code returned from hook: 500" means the **database trigger is failing** and blocking user signup.

## ✅ Quick Fix (2 Steps)

### **Step 1: Disable the Trigger**

1. **Go to Supabase Dashboard:**
   - URL: https://hirgguemwflwruqsvenv.supabase.co (or your actual URL)
   - Click **SQL Editor**

2. **Run this SQL:**
   ```sql
   DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
   ```

3. **Click Run** - This will disable the problematic trigger

### **Step 2: Restart Your App**

```bash
npm run dev
```

**That's it!** Signup should work now. The client code will create profiles instead of the trigger.

---

## 🔍 Why This Works

- The trigger was failing and causing the 500 error
- By disabling it, signup works normally
- The `AuthContext.tsx` code will create profiles after signup
- No functionality is lost - profiles are still created automatically

---

## ✅ Verify It Works

1. Try signing up with a new email
2. Check Supabase Dashboard → **Table Editor** → `user_profiles`
3. You should see the new profile created

---

## 🔄 Re-enable Trigger Later (Optional)

Once everything works, you can re-enable the trigger by running:

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();
```

But for now, **keep it disabled** - the client code handles it better.

---

## 📋 Checklist

- [ ] Run `DROP TRIGGER` command in SQL Editor
- [ ] Restart dev server
- [ ] Test signup
- [ ] Verify profile is created
- [ ] ✅ Done!

---

**This will fix the 500 error immediately!** 🎉

