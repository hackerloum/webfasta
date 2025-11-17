# 🔧 Fix Edge Function 500 Error

## ⚠️ The Problem

Error: `POST https://hirgguemwflwruqsvenv.supabase.co/functions/v1/generate-code 500 (Internal Server Error)`

This means the `generate-code` Edge Function is either:
1. **Not deployed** to Supabase
2. **Deployed but has an error** in the code
3. **Missing environment variables**

---

## ✅ SOLUTION: Deploy or Re-deploy the Function

### **Step 1: Check if Function Exists**

1. **Go to Supabase Dashboard:**
   - URL: https://hirgguemwflwruqsvenv.supabase.co
   - Click **"Edge Functions"** in left sidebar

2. **Look for `generate-code`:**
   - ✅ **If it EXISTS:** Go to Step 2A
   - ❌ **If it DOESN'T EXIST:** Go to Step 2B

---

### **Step 2A: Function EXISTS - Re-deploy It**

1. **Click on `generate-code`** to open it
2. **Click "Edit"** or open the code editor
3. **Select ALL code** (Ctrl+A) and **DELETE it**
4. **Open this file:** `supabase/functions/generate-code/index.ts`
5. **Copy ALL code** (Ctrl+A, Ctrl+C)
6. **Paste into Supabase editor** (Ctrl+V)
7. **Click "Deploy"** button (top right)
8. **Wait 30-60 seconds** for deployment
9. **Go to Step 3**

---

### **Step 2B: Function DOESN'T EXIST - Create It**

1. **Click "Create Function"** or **"New Function"** button (top right)
2. **Function name:** `generate-code` (exactly, lowercase, with hyphen)
3. **Click "Create"**
4. **Delete any default code** (Ctrl+A, Delete)
5. **Open this file:** `supabase/functions/generate-code/index.ts`
6. **Copy ALL code** (Ctrl+A, Ctrl+C)
7. **Paste into Supabase editor** (Ctrl+V)
8. **Click "Deploy"** button
9. **Wait 30-60 seconds** for deployment
10. **Go to Step 3**

---

### **Step 3: Set Environment Variable (IMPORTANT!)**

The function needs the Claude API key as an environment variable:

1. **In Supabase Dashboard:**
   - Go to **"Edge Functions"** → **`generate-code`**
   - Click **"Settings"** tab (or look for "Environment Variables" or "Secrets")

2. **Add Secret/Environment Variable:**
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** `your_claude_api_key_here` (get from https://console.anthropic.com/)
   - Click **"Save"** or **"Add Secret"**

3. **Note:** If you can't find "Settings" or "Secrets":
   - The function has a fallback hardcoded key (temporary)
   - But it's better to set it as an environment variable

---

### **Step 4: Check Function Logs**

1. **In Supabase Dashboard:**
   - Go to **"Edge Functions"** → **`generate-code`**
   - Click **"Logs"** tab

2. **Test the function:**
   - Go to your app: `http://localhost:8080/builder`
   - Try generating code
   - Go back to **Logs** tab

3. **Look for errors:**
   - ✅ **If you see:** `POST request received` → Function is working!
   - ❌ **If you see:** `500 Internal Server Error` → Check the error message
   - ❌ **If you see:** `Node cannot be found` → Function might not be deployed correctly

---

## 🐛 Still Getting Error?

### **Option 1: Check Function Status**

1. Go to **Edge Functions** list
2. Find `generate-code`
3. **Status should be:** "Active" or "Deployed" (green)
4. If it shows "Error" or "Failed", click on it and check the error

---

### **Option 2: Verify Function Code**

Make sure the function code in Supabase Dashboard matches `supabase/functions/generate-code/index.ts`:

**Key things to check:**
- ✅ Line 16: `Deno.serve(async (req) => {`
- ✅ Line 72: `const CLAUDE_API_KEY = Deno.env.get("CLAUDE_API_KEY") || "...";`
- ✅ Line 127: `const response = await fetch("https://api.anthropic.com/v1/messages", {`
- ✅ Should be ~250 lines of code

---

### **Option 3: Test Function Directly**

1. **In Supabase Dashboard:**
   - Go to **Edge Functions** → **`generate-code`**
   - Click **"Invoke"** or **"Test"** tab

2. **Test payload:**
   ```json
   {
     "prompt": "Create a simple hello world page",
     "conversationHistory": [],
     "userContext": null
   }
   ```

3. **Click "Invoke"** or **"Run"**
   - ✅ **If it works:** You should see a response with code
   - ❌ **If it fails:** Check the error message

---

### **Option 4: Use Supabase CLI (Advanced)**

If dashboard doesn't work, use CLI:

1. **Install Supabase CLI** (if not installed):
   ```powershell
   npm install -g supabase
   ```

2. **Login:**
   ```powershell
   supabase login
   ```

3. **Link project:**
   ```powershell
   cd "C:\Users\Ghost\Desktop\ai-website-studio-main"
   supabase link --project-ref hirgguemwflwruqsvenv
   ```

4. **Deploy function:**
   ```powershell
   supabase functions deploy generate-code
   ```

5. **Set secret:**
   ```powershell
   supabase secrets set CLAUDE_API_KEY=your_claude_api_key_here
   ```

---

## 📝 Common Errors & Solutions

### **Error: "Function not found"**
- **Solution:** Function not deployed. Follow Step 2B above.

### **Error: "500 Internal Server Error"**
- **Solution:** 
  1. Check function logs (Step 4)
  2. Verify environment variable is set (Step 3)
  3. Re-deploy function (Step 2A)

### **Error: "Invalid API key"**
- **Solution:** 
  1. Set `CLAUDE_API_KEY` environment variable (Step 3)
  2. Re-deploy function after setting the variable

### **Error: "CORS error"**
- **Solution:** 
  1. Make sure function code has OPTIONS handler (lines 21-27)
  2. Re-deploy function

---

## ✅ Success Checklist

After deploying, verify:

- [ ] Function appears in Edge Functions list
- [ ] Function status shows "Active" or "Deployed"
- [ ] `CLAUDE_API_KEY` environment variable is set
- [ ] Function logs show "POST request received" when testing
- [ ] App can invoke function without 500 error

---

## 🎯 Quick Fix (5 minutes)

**If you just want to fix it fast:**

1. Go to: https://hirgguemwflwruqsvenv.supabase.co
2. Click **Edge Functions** → **`generate-code`** (or create it)
3. Copy ALL code from `supabase/functions/generate-code/index.ts`
4. Paste into Supabase editor
5. Click **Deploy**
6. Set `CLAUDE_API_KEY` secret (if option available)
7. Wait 60 seconds
8. Test in app

**That's it!** 🚀

