# Payment Integration Fixes

## 🔧 Issues Fixed

### **1. CORS Errors** ✅
**Problem**: Edge Function was blocking CORS preflight requests.

**Solution**:
- Added proper CORS headers including `Access-Control-Allow-Methods`
- Fixed OPTIONS request handling with proper status code (204)
- Improved error handling for JSON parsing

### **2. Missing Payments Table** ✅
**Problem**: No database table to track payment transactions.

**Solution**:
- Created `payments` table migration (`003_create_payments_table.sql`)
- Includes all payment details (order_id, transaction_id, amount, status, etc.)
- Row Level Security (RLS) enabled for user privacy
- Indexes for fast lookups

### **3. Payment Service** ✅
**Problem**: Using direct `fetch()` which doesn't handle Supabase auth automatically.

**Solution**:
- Updated to use `supabase.functions.invoke()` which:
  - Handles authentication automatically
  - Manages CORS properly
  - Provides better error handling

---

## 📋 Database Migration

### **Run the Migration**

You need to run the new migration to create the `payments` table:

```sql
-- This is in: supabase/migrations/003_create_payments_table.sql
```

**Via Supabase Dashboard**:
1. Go to **SQL Editor**
2. Copy the contents of `supabase/migrations/003_create_payments_table.sql`
3. Run the SQL

**Via Supabase CLI**:
```bash
supabase db push
```

### **Payments Table Schema**

```sql
payments (
  id UUID PRIMARY KEY
  user_id UUID (references auth.users)
  order_id TEXT UNIQUE
  transaction_id TEXT
  plan_id TEXT
  amount NUMERIC(10, 2)
  currency TEXT (default: 'TZS')
  buyer_email TEXT
  buyer_name TEXT
  buyer_phone TEXT
  status TEXT (pending, completed, failed, cancelled)
  zenopay_response JSONB
  error_message TEXT
  created_at TIMESTAMP
  updated_at TIMESTAMP
)
```

---

## 🔧 Configuration Required

### **1. Set Environment Variables in Supabase**

Go to **Supabase Dashboard** → **Edge Functions** → **zenopay-payment** → **Settings** → **Environment Variables**

Add these variables:

```
ZENOPAY_API_KEY=000GTt5huRVorBPtnjmQ2bqo-UTVCElL9HCZgdit8IiFyJs95p-ZecCspeeqY4QdDymNby1BkmubByIVL9WTew
SUPABASE_URL=https://hirgguemwflwruqsvenv.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**To get your Service Role Key**:
1. Go to **Settings** → **API**
2. Copy the **service_role** key (keep it secret!)

### **2. Deploy the Edge Function**

```bash
supabase functions deploy zenopay-payment
```

---

## 🐛 Troubleshooting

### **406 Errors on user_profiles**

This is usually a content-type issue. The Supabase client handles this automatically, but if you see 406 errors:

1. **Check RLS Policies**: Make sure the user is authenticated
2. **Check Content-Type**: The Supabase client sets this automatically
3. **Check API Headers**: Ensure `apikey` header is set

### **409 Errors (Conflict)**

This usually means:
- Duplicate entry (e.g., trying to insert a profile that already exists)
- Unique constraint violation

**Solution**: The code should handle this with `ON CONFLICT DO NOTHING` in the trigger.

### **CORS Errors**

If you still see CORS errors:

1. **Check Edge Function is deployed**: 
   ```bash
   supabase functions list
   ```

2. **Check function URL**: Should be `https://your-project.supabase.co/functions/v1/zenopay-payment`

3. **Verify CORS headers**: The function now includes proper CORS headers

### **"Function not found" Error**

The Edge Function might not be deployed:

```bash
# Deploy the function
supabase functions deploy zenopay-payment

# Verify it's deployed
supabase functions list
```

### **Payment Not Stored in Database**

If payments aren't being stored:

1. **Check SUPABASE_URL**: Must be your full Supabase URL
2. **Check SUPABASE_SERVICE_ROLE_KEY**: Must be the service_role key (not anon key)
3. **Check payments table exists**: Run the migration
4. **Check logs**: Look at Edge Function logs in Supabase Dashboard

---

## ✅ Testing Checklist

- [ ] Payments table migration run successfully
- [ ] Edge Function deployed
- [ ] Environment variables set in Supabase
- [ ] Can access `/pricing` page
- [ ] Payment dialog opens when selecting a plan
- [ ] Payment form validates correctly
- [ ] Payment request succeeds (no CORS errors)
- [ ] Payment record created in database
- [ ] User profile updated after payment
- [ ] No 406/409 errors in console

---

## 📊 What Happens Now

1. **User selects plan** → Payment dialog opens
2. **User fills form** → Validates phone, email, etc.
3. **User clicks Pay** → Calls Edge Function via `supabase.functions.invoke()`
4. **Edge Function**:
   - Validates request
   - Calls ZenoPay API
   - Stores payment record in `payments` table
   - Updates user profile subscription plan
   - Returns success/error response
5. **Frontend** → Shows success message and redirects

---

## 🔒 Security Notes

- ✅ Payments table has RLS enabled
- ✅ Users can only see their own payments
- ✅ Service role key is required for Edge Function to update profiles
- ✅ All payment data is stored securely
- ✅ API keys are in environment variables (not hardcoded in production)

---

**Status**: ✅ All fixes applied  
**Next Step**: Run the migration and deploy the Edge Function

