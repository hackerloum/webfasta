# 📝 Step-by-Step: Create "generate-code" Function

Since you don't see the function in the list, here's exactly what to do:

---

## 🎯 What You'll See in Supabase Dashboard

When you go to **Edge Functions**, you might see:

### **Option A: Empty State**
- A message like "No functions yet" or "Get started with Edge Functions"
- A button: **"Create Function"** or **"New Function"** or **"+"**

### **Option B: List of Functions**
- You might see other functions (like `zenopay-payment`)
- But NOT `generate-code`
- Look for a **"+"** button or **"Create Function"** button (usually top right)

---

## ✅ Step-by-Step Instructions

### **1. Go to Supabase Dashboard**
- URL: https://hirgguemwflwruqsvenv.supabase.co
- Click **"Edge Functions"** in left sidebar

### **2. Create New Function**
- Click **"Create Function"** or **"New Function"** or **"+"** button
- If you see a template selector, choose **"Blank Function"** or **"Empty Function"**

### **3. Name the Function**
- Function name: **`generate-code`**
- ⚠️ **Important**: Use exactly `generate-code` (lowercase, with hyphen)
- Click **"Create"** or **"Continue"**

### **4. You'll See an Editor**
- It might have some default/template code
- **Delete all of it** (Ctrl+A, then Delete)

### **5. Copy the Complete Code**
- Open: `supabase/functions/generate-code/index.ts` in your code editor
- **Select ALL** (Ctrl+A)
- **Copy** (Ctrl+C)

### **6. Paste into Supabase Editor**
- Click in the Supabase editor
- **Paste** (Ctrl+V)
- You should see the complete function code (239 lines)

### **7. Deploy**
- Look for **"Deploy"** button (usually top right, might be green)
- Click it
- Wait 30-60 seconds
- You should see: **"Function deployed successfully"** or **"Deployment complete"**

### **8. Verify**
- The function should now appear in your functions list
- Status should show as **"Active"** or **"Deployed"**

### **9. Test Your App**
- Go to: `http://localhost:8080/builder`
- Hard refresh: `Ctrl + Shift + R`
- Try generating code - CORS error should be gone!

---

## 🖼️ Visual Guide (What Buttons Look Like)

The buttons might be labeled as:
- **"Create Function"**
- **"New Function"**  
- **"Add Function"**
- **"+"** (plus icon)
- **"Deploy"** (green button, usually top right)
- **"Save & Deploy"**

---

## 🐛 Troubleshooting

### **"Function name already exists"**
- This means it DOES exist! Look more carefully in the list
- Or try a different name temporarily: `generate-code-v2`

### **Can't find "Create Function" button**
- Make sure you're in the **Edge Functions** section (not Database, not API)
- Try refreshing the page
- Or use the CLI method (see QUICK_DEPLOY_GUIDE.md)

### **Deploy button is grayed out**
- Make sure you've pasted the code
- Check for syntax errors (red underlines)
- The code should be 239 lines

### **Still getting CORS error after deployment**
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard refresh: `Ctrl + Shift + R`
3. Check function logs in Supabase Dashboard
4. Make sure the function shows as "Active"

---

## 💡 Pro Tip

After creating the function, you can:
- Click on it anytime to edit
- View logs to see requests
- Set environment variables (like CLAUDE_API_KEY) in Settings

---

## ✅ Success Checklist

- [ ] Function created with name `generate-code`
- [ ] Code pasted (239 lines)
- [ ] Function deployed successfully
- [ ] Function shows as "Active" in list
- [ ] Tested in app - no CORS error

If all checked ✅, you're done! 🎉

