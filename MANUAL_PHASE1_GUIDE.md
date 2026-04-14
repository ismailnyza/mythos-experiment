# Manual Phase 1 Execution Guide

## Current Status
Automation tools are installed but security restrictions prevent automated browser execution. Manual completion required.

## Step 1: Get Test ETH from Faucet

### Wallet Address
`0xC9b90EF3273C5c271848Bb02461883C4078EAa5d`

### Instructions
1. Open browser to: https://faucets.chain.link/sepolia
2. Enter wallet address: `0xC9b90EF3273C5c271848Bb02461883C4078EAa5d`
3. Complete any CAPTCHA or verification
4. Submit request
5. Wait 1-5 minutes for test ETH

### Verification
- Check: https://sepolia.etherscan.io/address/0xC9b90EF3273C5c271848Bb02461883C4078EAa5d
- Look for incoming transaction
- Note transaction hash

### After Receiving ETH
```bash
cd /home/ismael/Desktop/mythos-experiment
./scripts/affiliate-tracker.sh log-conversion 0.1 "Sepolia Faucet" "TX_HASH_HERE"
```

## Step 2: Create DigitalOcean Account

### Instructions
1. Go to: https://cloud.digitalocean.com/registrations/new
2. Enter email address
3. Create password
4. Complete registration
5. Verify email (check inbox)
6. Log into dashboard

## Step 3: Get Referral Link

### Instructions
1. Log into DigitalOcean
2. Click profile picture (top right)
3. Select "Referrals"
4. Find "Your referral link" section
5. Copy URL (looks like: `https://m.do.co/c/UNIQUE_CODE`)

## Step 4: Update Tutorial Content

### Instructions
```bash
cd /home/ismael/Desktop/mythos-experiment

# Replace with your actual link
sed -i 's|REFERRAL_LINK_HERE|YOUR_ACTUAL_LINK|g' content/digitalocean-tutorial.md

# Verify update
grep -n "m.do.co" content/digitalocean-tutorial.md
```

## Step 5: Deploy Content

### Platform Options
1. **Dev.to** (recommended): https://dev.to/new
2. **Hashnode**: https://hashnode.com/create
3. **GitHub Pages**: Push to GitHub repo
4. **Medium**: https://medium.com/new-story

### Deployment Steps
1. Copy content from `content/digitalocean-tutorial.md`
2. Paste into chosen platform
3. Add appropriate tags (#digitalocean, #nodejs, #tutorial)
4. Publish
5. Get URL of published article

## Step 6: Promote Content

### Channels
- **Reddit**: r/devops, r/node, r/webdev
- **Twitter**: Tweet with relevant hashtags
- **LinkedIn**: Share in professional networks
- **Discord**: Developer communities
- **Hacker News**: If high quality

## Step 7: Track Progress

### Tracking Commands
```bash
# Check status
./scripts/affiliate-tracker.sh status

# Log a click
./scripts/affiliate-tracker.sh log-click "Reddit"

# Log a conversion ($25 DO credit)
./scripts/affiliate-tracker.sh log-conversion 25 "DigitalOcean" "PROOF_URL"

# Update milestone
./scripts/affiliate-tracker.sh update-milestone 1 "completed"
```

### Monitor DigitalOcean
1. Dashboard → Referrals
2. Track clicks and conversions
3. $25 credit per successful referral

## Expected Timeline
- **Day 1**: Complete Steps 1-5 (setup)
- **Day 2**: Deploy and initial promotion
- **Day 3-7**: Monitor and engage
- **Day 8**: Analyze results

## Success Criteria
- ✅ Test ETH received (wallet verification)
- ✅ DO account created with referral link
- ✅ Tutorial published with affiliate link
- ✅ First click tracked within 24 hours
- ✅ First conversion ($25 credit) within 7 days

## Notes
- All tools and tracking systems are ready
- Documentation is complete
- Only manual browser actions required
- System will track all progress automatically once manual steps are done

## Quick Start Command
```bash
# After manual steps, run:
cd /home/ismael/Desktop/mythos-experiment
./scripts/affiliate-tracker.sh status
```