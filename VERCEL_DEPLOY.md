# Vercel Deployment Guide

Your UrbanReporter app is now configured to deploy on Vercel!

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your GROQ API key

## Deployment Steps

### 1. Push your code to GitHub/GitLab/Bitbucket
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Vite configuration
4. Add environment variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (from your `.env` file)
5. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
cd "urban report"
vercel
# Follow the prompts
# Add GROQ_API_KEY when asked for environment variables
```

### 3. Set Environment Variables

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environment**: Production, Preview, Development (select all)
3. Save and redeploy

## How It Works

- **Frontend**: Built with Vite and deployed as static files
- **API Routes**: The `/api/chat` endpoint is handled by `api/chat.js` as a Vercel serverless function
- **Environment Variables**: `GROQ_API_KEY` is securely stored in Vercel

## Local Development

For local development, you can either:

**Option 1: Use Vercel CLI (recommended)**
```bash
vercel dev
```

**Option 2: Run backend separately**
```bash
# Terminal 1: Backend
cd backend
node server.js

# Terminal 2: Frontend
npm run dev
```

## Troubleshooting

- **API not working**: Check that `GROQ_API_KEY` is set in Vercel environment variables
- **Build fails**: Ensure all dependencies are in `package.json`
- **CORS errors**: Already handled in `api/chat.js`

## Notes

- The `api/chat.js` file is automatically recognized by Vercel as a serverless function
- No need to configure routes - Vercel handles it automatically
- The proxy in `vite.config.js` is only used for local development

