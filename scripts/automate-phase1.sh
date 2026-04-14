#!/usr/bin/env bash
set -euo pipefail

# Phase 1 Automation Master Script
# Coordinates faucet request and DigitalOcean setup

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "=== Mythos Experiment Phase 1 Automation ==="
echo "Goal: Get test ETH and create DigitalOcean account"
echo

# Check dependencies
check_deps() {
    echo "Checking dependencies..."
    
    # Check Node.js
    if ! command -v node >/dev/null 2>&1; then
        echo "❌ Node.js not found"
        return 1
    fi
    
    # Check npm packages
    if [ ! -d "node_modules" ]; then
        echo "⚠️  node_modules not found, running npm install..."
        npm install
    fi
    
    # Check Playwright
    if ! npx playwright --version >/dev/null 2>&1; then
        echo "⚠️  Playwright not fully installed, installing browser..."
        npx playwright install chromium
    fi
    
    echo "✅ Dependencies check passed"
    return 0
}

run_faucet() {
    echo
    echo "=== STEP 1: Request Test ETH from Faucet ==="
    echo "Wallet: 0xC9b90EF3273C5c271848Bb02461883C4078EAa5d"
    echo "Faucet: https://faucets.chain.link/sepolia"
    echo
    
    read -p "Press Enter to open faucet automation (or Ctrl+C to skip)..." -r
    
    echo "🚀 Launching faucet automation..."
    echo "Note: This will open a browser window."
    echo "You may need to complete CAPTCHA or verification manually."
    echo
    
    node scripts/faucet-automation.js
    
    echo
    echo "=== Faucet Instructions ==="
    echo "1. Complete any manual verification (CAPTCHA, etc.)"
    echo "2. Wait 1-5 minutes for test ETH"
    echo "3. Check wallet on explorer:"
    echo "   https://sepolia.etherscan.io/address/0xC9b90EF3273C5c271848Bb02461883C4078EAa5d"
    echo "4. Note the transaction hash when ETH arrives"
}

setup_digitalocean() {
    echo
    echo "=== STEP 2: Create DigitalOcean Account ==="
    echo "URL: https://cloud.digitalocean.com/registrations/new"
    echo
    
    echo "⚠️  IMPORTANT: Before running automation:"
    echo "1. Edit scripts/digitalocean-automation.js"
    echo "2. Fill in CONFIG object with email/password"
    echo "3. Save the file"
    echo
    
    read -p "Have you updated the CONFIG in the script? (y/N): " -r
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please edit the script first, then run again."
        echo "File: scripts/digitalocean-automation.js"
        return 1
    fi
    
    echo "🚀 Launching DigitalOcean automation..."
    echo "Note: This will open a browser window."
    echo "You may need to complete email verification manually."
    echo
    
    node scripts/digitalocean-automation.js create-account
    
    echo
    echo "=== Next Steps After Registration ==="
    echo "1. Check email for verification link"
    echo "2. Complete email verification"
    echo "3. Log into DigitalOcean"
    echo "4. Get your referral link (Profile → Referrals)"
    echo "5. Update tutorial with your link"
}

update_content() {
    echo
    echo "=== STEP 3: Update Tutorial Content ==="
    echo
    
    if [ ! -f "content/digitalocean-tutorial.md" ]; then
        echo "❌ Tutorial content not found"
        return 1
    fi
    
    echo "Current tutorial placeholder:"
    grep -n "REFERRAL_LINK_HERE" content/digitalocean-tutorial.md || echo "No placeholder found"
    
    echo
    echo "To update:"
    echo "1. Get your referral link from DigitalOcean"
    echo "2. Run: sed -i 's|REFERRAL_LINK_HERE|YOUR_ACTUAL_LINK|g' content/digitalocean-tutorial.md"
    echo "3. Verify: grep -n 'm.do.co' content/digitalocean-tutorial.md"
    
    read -p "Do you have your referral link ready to update? (y/N): " -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your referral link: " -r LINK
        if [ -n "$LINK" ]; then
            sed -i "s|REFERRAL_LINK_HERE|$LINK|g" content/digitalocean-tutorial.md
            echo "✅ Tutorial updated with your link"
            echo "Preview:"
            grep -n "referral" content/digitalocean-tutorial.md | head -5
        fi
    fi
}

deploy_content() {
    echo
    echo "=== STEP 4: Deploy Content ==="
    echo
    
    echo "Deployment options:"
    echo "1. Dev.to (developer community)"
    echo "2. Hashnode (developer blogging)"
    echo "3. GitHub Pages (static hosting)"
    echo "4. Medium (general audience)"
    echo "5. Personal blog/website"
    
    echo
    echo "Recommended: Dev.to for developer audience"
    echo "URL: https://dev.to/new"
    
    echo
    echo "Once deployed, share in:"
    echo "- r/devops on Reddit"
    echo "- DevOps Discord servers"
    echo "- Twitter/LinkedIn with relevant hashtags"
    echo "- Hacker News (if high quality)"
}

track_progress() {
    echo
    echo "=== STEP 5: Track Progress ==="
    echo
    
    echo "Tracking commands:"
    echo "./scripts/affiliate-tracker.sh status"
    echo "./scripts/affiliate-tracker.sh log-click 'source'"
    echo "./scripts/affiliate-tracker.sh log-conversion 25 'DigitalOcean' 'proof'"
    
    echo
    echo "Monitor on DigitalOcean:"
    echo "1. Dashboard → Referrals"
    echo "2. Track clicks and conversions"
    echo "3. $25 credit per successful referral"
}

show_status() {
    echo
    echo "=== CURRENT STATUS ==="
    ./scripts/affiliate-tracker.sh status
}

main() {
    check_deps || exit 1
    
    echo
    echo "Select an option:"
    echo "1) Run faucet automation (get test ETH)"
    echo "2) Setup DigitalOcean account"
    echo "3) Update tutorial with referral link"
    echo "4) Deploy content instructions"
    echo "5) Track progress commands"
    echo "6) Show current status"
    echo "7) Run all steps (interactive)"
    echo "8) Exit"
    
    read -p "Choice (1-8): " -r CHOICE
    
    case $CHOICE in
        1) run_faucet ;;
        2) setup_digitalocean ;;
        3) update_content ;;
        4) deploy_content ;;
        5) track_progress ;;
        6) show_status ;;
        7)
            run_faucet
            setup_digitalocean
            update_content
            deploy_content
            track_progress
            show_status
            ;;
        8) exit 0 ;;
        *) echo "Invalid choice" ;;
    esac
    
    echo
    echo "=== Phase 1 Automation Complete ==="
    echo "Next: Monitor clicks and conversions for $25 credit"
    echo "Check revenue-log.md for milestone updates"
}

# Run main function
main "$@"