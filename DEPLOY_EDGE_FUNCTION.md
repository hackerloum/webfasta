# 🚀 Deploy Edge Function to Fix CORS Error

## ⚠️ Important: CORS Fix Applied

The CORS configuration has been updated in `supabase/functions/generate-code/index.ts`. You need to **redeploy the function** for the changes to take effect.

---

## 📋 Deployment Options

### **Option 1: Deploy via Supabase Dashboard (Easiest)**

1. **Go to Supabase Dashboard:**
   - URL: https://hirgguemwflwruqsvenv.supabase.co
   - Navigate to **Edge Functions** in the left sidebar

2. **Find the `generate-code` function:**
   - Click on it to open the function editor

3. **Update the code:**
   - Copy the entire contents of `supabase/functions/generate-code/index.ts`
   - Paste it into the Supabase Dashboard editor
   - Click **Deploy** or **Save**

4. **Wait for deployment to complete** (usually takes 30-60 seconds)

---

### **Option 2: Deploy via Supabase CLI (Recommended for Production)**

#### **Step 1: Install Supabase CLI**

**Windows (PowerShell):**
```powershell
# Using Scoop (if you have it)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or using npm
npm install -g supabase
```

**Or download directly:**
- Visit: https://github.com/supabase/cli/releases
- Download the Windows executable
- Add it to your PATH

#### **Step 2: Login to Supabase**

```bash
supabase login
```

This will open a browser window for authentication.

#### **Step 3: Link Your Project**

```bash
cd "C:\Users\Ghost\Desktop\ai-website-studio-main"
supabase link --project-ref hirgguemwflwruqsvenv
```

#### **Step 4: Deploy the Function**

```bash
supabase functions deploy generate-code
```

---

### **Option 3: Manual Upload via Dashboard**

1. **Go to Supabase Dashboard:**
   - Navigate to **Edge Functions** → **generate-code**

2. **Upload the file:**
   - Click **Upload** or **Edit**
   - Copy the contents of `supabase/functions/generate-code/index.ts`
   - Paste into the editor
   - Click **Deploy**

---

## ✅ Verify Deployment

After deployment, test the function:

1. **Open your app** at `http://localhost:8080`
2. **Navigate to the Builder page** (`/builder`)
3. **Try generating code** - the CORS error should be gone!

---

## 🔍 What Was Fixed

The CORS configuration now includes:

- ✅ Proper OPTIONS preflight handling with status 200
- ✅ Dynamic origin handling for localhost development
- ✅ Comprehensive CORS headers
- ✅ Proper error response handling with CORS headers

---

## 🐛 If CORS Error Persists

1. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Reload the page

2. **Hard refresh:**
   - Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

3. **Check function is deployed:**
   - Go to Supabase Dashboard → Edge Functions
   - Verify `generate-code` shows as "Active"

4. **Check browser console:**
   - Open DevTools (F12)
   - Look for any remaining CORS errors
   - Check the Network tab for the function request

---

## 📝 Notes

- The function must be redeployed for changes to take effect
- Deployment usually takes 30-60 seconds
- The CORS fix works for both development (localhost) and production environments
- If you add new origins in production, update the `allowedOrigins` array in the function

