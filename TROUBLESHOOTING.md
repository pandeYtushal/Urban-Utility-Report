# Troubleshooting Chatbot on Vercel

## Issue: "Server configuration error. Please contact support."

This error means `GROQ_API_KEY` is not accessible in the serverless function.

## Steps to Fix:

### 1. Verify Environment Variable in Vercel
- Go to your Vercel project dashboard
- Settings → Environment Variables
- Check that `GROQ_API_KEY` exists
- Make sure it's enabled for **Production** environment
- If you see it, try deleting and re-adding it

### 2. **IMPORTANT: Redeploy After Adding Env Var**
After adding/changing environment variables, you MUST redeploy:
- Go to **Deployments** tab
- Click the three dots (⋯) on the latest deployment
- Select **"Redeploy"**
- OR push a new commit to trigger auto-deploy

### 3. Check Function Logs
- Go to **Functions** tab in Vercel dashboard
- Click on `/api/chat` function
- Check the logs for:
  - "Missing GROQ_API_KEY" error
  - "Environment check" debug info
  - Any other errors

### 4. Test the API Directly
Try calling the API directly from browser console:
```javascript
fetch('https://your-app.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    messages: [{ role: 'user', text: 'test' }] 
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### 5. Verify API Route is Working
Check if the function is deployed:
- Go to **Functions** tab
- You should see `/api/chat` listed
- If not, the file might not be in the right location

### 6. Check File Structure
Make sure `api/chat.js` is in the root of your project:
```
urban report/
  ├── api/
  │   └── chat.js  ← Should be here
  ├── src/
  ├── package.json
  └── vercel.json
```

## Common Issues:

### Issue: Env var added but not working
**Solution**: Redeploy! Environment variables only apply to new deployments.

### Issue: Function not found
**Solution**: Make sure `api/chat.js` is in the root directory, not in a subfolder.

### Issue: CORS errors
**Solution**: Already handled in the code, but check browser console for specific errors.

### Issue: Still getting error after redeploy
**Solution**: 
1. Double-check the env var name is exactly `GROQ_API_KEY` (case-sensitive)
2. Check Vercel function logs for detailed error messages
3. Try removing and re-adding the environment variable
4. Make sure you're testing on the Production deployment, not Preview

## Quick Test:
After redeploying, open browser console and check:
- Network tab: Look for `/api/chat` request
- Console tab: Check for any error messages
- The debug logs I added will show in Vercel function logs

