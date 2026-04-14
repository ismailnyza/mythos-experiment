# DigitalOcean Experiment Setup

## Steps to Create Account and Generate Referral Link

### 1. Create DigitalOcean Account
1. Go to https://cloud.digitalocean.com/registrations/new
2. Enter email address
3. Create password
4. Verify email
5. Complete basic account setup

### 2. Generate Referral Link
1. Log into DigitalOcean dashboard
2. Click on your profile picture → "Referrals"
3. Find "Your referral link" section
4. Copy the unique referral URL
5. It should look like: `https://m.do.co/c/UNIQUE_CODE`

### 3. Update Content with Referral Link
Replace `REFERRAL_LINK_HERE` in `content/digitalocean-tutorial.md` with actual referral link.

### 4. Deploy Content
Options for free deployment:
- **Dev.to** - Developer community platform
- **Hashnode** - Developer blogging platform
- **GitHub Pages** - Static site hosting
- **Medium** - General blogging platform

### 5. Track Results
Use the affiliate tracker script:
```bash
./scripts/affiliate-tracker.sh status
./scripts/affiliate-tracker.sh log-click "source"
./scripts/affiliate-tracker.sh log-conversion 25 "DigitalOcean" "proof_url"
```

## Account Information Needed
- Email for account creation
- Password (store securely)
- Referral link (for content)

## Expected Timeline
- **Day 1**: Account creation, content deployment
- **Day 2**: Initial promotion (share on relevant communities)
- **Day 3-7**: Monitor clicks and conversions
- **Day 8**: Analyze results, decide to scale or pivot

## Success Criteria
- At least 10 clicks in first 48 hours
- At least 1 conversion ($25 credit) in first 7 days
- Documented process for scaling if successful

## Notes
- DigitalOcean referral gives $25 credit per successful referral
- Referred user must spend $25 to trigger credit
- Credit appears in DO account, not cash
- For cash revenue, need alternative strategies or convert DO credit through usage