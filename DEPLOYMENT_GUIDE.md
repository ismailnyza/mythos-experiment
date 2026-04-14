# Deployment Guide

Your donation site is ready in the `docs/` folder. Here's how to deploy it:

## Option 1: GitHub Pages (Easiest)

1. **Create a GitHub repository** (if you haven't)
   - Go to https://github.com/new
   - Name it (e.g., `mythos-experiment`)
   - Make it **Public**
   - Don't add README, .gitignore, or license

2. **Push your code**
   ```bash
   cd /home/ismael/Desktop/mythos-experiment
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main` → `/docs` folder
   - Click **Save**
   - Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Option 2: Netlify (Free, Instant)

1. **Sign up at https://netlify.com** (free, with GitHub/GitLab)
2. **Drag & drop** the `docs/` folder to Netlify's dashboard
3. **Get a URL** instantly (e.g., `mythos-experiment.netlify.app`)

## Option 3: Vercel (Free, Developer-Friendly)

1. **Sign up at https://vercel.com** (GitHub account)
2. **Import your repository**
3. **Deploy** with default settings
4. **Get a URL** (e.g., `mythos-experiment.vercel.app`)

## Option 4: Local Server (Testing)

```bash
cd /home/ismael/Desktop/mythos-experiment
python3 -m http.server 8000 --directory docs/
# Then visit http://localhost:8000
```

## What's Included

The `docs/` folder contains:
- `index.html` – Donation landing page with wallet address
- `style.css` – Styling
- QR code for easy scanning
- Progress tracker (will update with real donations)

## Wallet Monitoring

Once deployed, donations will be sent to:
**Ethereum Address**: `0xB170EaDc4561DEAE89B00766f8fb372795472331`

To check for donations manually:
- Visit https://etherscan.io/address/0xB170EaDc4561DEAE89B00766f8fb372795472331
- Or run: `node scripts/check-balance-simple.js`

## Next Steps After Deployment

1. **Share the URL** on social media
2. **Use the prepared posts** in `content/reddit-post.md` and `content/twitter-thread.md`
3. **Monitor** `revenue-log.md` for incoming transactions

---

**Need help?** Tell me which option you prefer, and I'll guide you through it.