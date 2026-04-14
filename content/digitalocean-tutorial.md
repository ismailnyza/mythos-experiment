# How to Deploy a Node.js API on DigitalOcean in 5 Minutes

*Published: April 14, 2026*  
*Category: DevOps, Tutorial, Cloud*

DigitalOcean is one of the simplest cloud platforms for developers. In this tutorial, I'll show you how to deploy a basic Node.js API using their App Platform - completely free to start.

## Why DigitalOcean?

I've been using DigitalOcean for side projects because:
- **Simple pricing** - no complex billing tiers
- **Great documentation** - easy to follow tutorials
- **Developer-friendly** - designed for engineers, not enterprise sales
- **$200 free credit** for new users (use my [referral link](REFERRAL_LINK_HERE) to get started)

## Prerequisites

- A DigitalOcean account ([sign up here](REFERRAL_LINK_HERE) if you don't have one)
- Basic Node.js knowledge
- Git installed locally

## Step 1: Create a Simple Node.js API

Create a new directory and add `package.json`:

```json
{
  "name": "do-node-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

Create `index.js`:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from DigitalOcean!',
    timestamp: new Date().toISOString(),
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/do-node-api.git
git push -u origin main
```

## Step 3: Deploy on DigitalOcean App Platform

1. Log into your [DigitalOcean dashboard](https://cloud.digitalocean.com)
2. Click "Create" → "Apps"
3. Connect your GitHub repository
4. Select your repo and branch
5. DigitalOcean will auto-detect it's a Node.js app
6. Click "Next" → "Create Resources"

That's it! Your app will deploy in 2-3 minutes.

## Step 4: Test Your API

Once deployed, you'll get a URL like `https://your-app.ondigitalocean.app`. Test it:

```bash
curl https://your-app.ondigitalocean.app
# Response: {"message":"Hello from DigitalOcean!","timestamp":"2026-04-14T08:25:00.000Z","status":"running"}
```

## Cost Breakdown

- **App Platform**: Free for 3 static sites or 1 app (512MB RAM)
- **Additional apps**: $5/month each
- **Database add-ons**: Start at $15/month
- **Bandwidth**: First 1TB free, then $0.01/GB

For most side projects, you can stay completely free.

## Why I Recommend DigitalOcean

After trying AWS, Google Cloud, and Azure, I keep coming back to DigitalOcean for:

1. **No hidden costs** - What you see is what you pay
2. **Simple UI** - No certification needed to navigate
3. **Fast deployment** - Less config, more shipping
4. **Great community** - Active tutorials and support

## Get Started

If you're new to DigitalOcean, use my [referral link](REFERRAL_LINK_HERE) to get $200 in free credit (enough for 4 months of a basic droplet). This helps support my tutorials at no extra cost to you.

## Next Steps

- Add a MongoDB database ($15/month)
- Set up custom domain (free)
- Configure auto-deploy from GitHub
- Add monitoring with Uptime Robot (free)

---

*Disclosure: This post contains affiliate links. If you sign up through my link, I may receive credit at no additional cost to you. I only recommend services I personally use and trust.*

*Tags: #digitalocean #nodejs #tutorial #devops #cloud #api #deployment*