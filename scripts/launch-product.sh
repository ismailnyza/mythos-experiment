#!/usr/bin/env bash
set -euo pipefail

# Launch script for Smart File Organizer product
# Execute Phase 1 revenue generation

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PRODUCT_DIR="$REPO_ROOT/products/file-organizer"

cd "$REPO_ROOT"

echo "=== LAUNCH: Smart File Organizer CLI ==="
echo "Price: $2.99 | Target: First sale within 72 hours"
echo

show_menu() {
    echo "Select action:"
    echo "1) Test the product locally"
    echo "2) Create sales channel (Gumroad/Stripe)"
    echo "3) Generate marketing materials"
    echo "4) Launch on Reddit"
    echo "5) Launch on Twitter"
    echo "6) Check sales dashboard"
    echo "7) Update revenue tracking"
    echo "8) Exit"
    echo
}

test_product() {
    echo "=== Testing Smart File Organizer ==="
    
    # Check if product files exist
    if [ ! -f "$PRODUCT_DIR/file-organizer.js" ]; then
        echo "❌ Product not found: $PRODUCT_DIR/file-organizer.js"
        return 1
    fi
    
    echo "✅ Product files found"
    echo "📁 Location: $PRODUCT_DIR"
    echo
    echo "File structure:"
    ls -la "$PRODUCT_DIR/"
    
    echo
    echo "📋 README preview:"
    head -20 "$PRODUCT_DIR/README.md"
    
    echo
    echo "🚀 To test locally:"
    echo "cd $PRODUCT_DIR"
    echo "node file-organizer.js --help"
}

setup_sales() {
    echo "=== Setting Up Sales Channel ==="
    echo
    echo "Option 1: Gumroad (Recommended)"
    echo "  URL: https://gumroad.com"
    echo "  Steps:"
    echo "  1. Create account"
    echo "  2. Add product: Smart File Organizer CLI"
    echo "  3. Price: $2.99"
    echo "  4. Upload: products/file-organizer.zip"
    echo "  5. Enable digital delivery"
    echo
    echo "Option 2: Stripe"
    echo "  URL: https://stripe.com"
    echo "  Steps:"
    echo "  1. Create account"
    echo "  2. Set up payment link"
    echo "  3. Price: $2.99"
    echo "  4. Delivery: Email automation"
    echo
    echo "Option 3: GitHub Sponsors"
    echo "  URL: https://github.com/sponsors"
    echo "  Steps:"
    echo "  1. Enable sponsorships"
    echo "  2. Create $3/month tier"
    echo "  3. Add $2.99 one-time option"
    echo
    echo "⚠️  ACTION REQUIRED: Choose platform and set up account"
}

generate_marketing() {
    echo "=== Generating Marketing Materials ==="
    
    # Create demo GIF command (placeholder)
    echo "📹 Demo GIF creation:"
    echo "  # Record terminal session"
    echo "  asciinema rec demo.cast"
    echo "  # Convert to GIF"
    echo "  agg demo.cast demo.gif"
    echo
    echo "📝 Reddit post template:"
    cat << 'EOF'
Title: Show HN: Smart File Organizer CLI - Organize 1000+ files in seconds ($2.99)

Hey r/commandline,

I built a CLI tool that automatically organizes messy folders by file type, date, or custom rules.

**Features:**
- Smart categorization (50+ file types)
- Safe operations with undo
- Cross-platform (macOS/Linux/Windows)
- Configurable with YAML/JSON
- Processes 1000+ files in seconds

**Demo:** [GIF showing before/after]
**Price:** $2.99 (introductory)
**GitHub:** [Link to repo]

I've been using this to keep my downloads/desktop organized and thought others might find it useful. Would love feedback!

**30-day money-back guarantee**
EOF
    echo
    echo "🐦 Twitter thread template:"
    echo "  Thread:"
    echo "  1/ Just launched Smart File Organizer CLI!"
    echo "  2/ Tired of messy downloads/desktop folders?"
    echo "  3/ This tool organizes 1000+ files in seconds"
    echo "  4/ By type, date, or custom rules"
    echo "  5/ Safe operations with undo feature"
    echo "  6/ Cross-platform: macOS, Linux, Windows"
    echo "  7/ Price: $2.99 (introductory)"
    echo "  8/ Link: [Your sales page]"
    echo "  9/ 30-day money-back guarantee"
}

launch_reddit() {
    echo "=== Launching on Reddit ==="
    echo
    echo "Target subreddits:"
    echo "  - r/commandline"
    echo "  - r/programming"
    echo "  - r/devops"
    echo "  - r/DataHoarder"
    echo "  - r/productivity"
    echo
    echo "⚠️  IMPORTANT: Read subreddit rules before posting!"
    echo "   - No excessive self-promotion"
    echo "   - Engage with comments"
    echo "   - Be transparent about commercial nature"
    echo
    echo "📅 Schedule:"
    echo "  Day 1: r/commandline (primary audience)"
    echo "  Day 2: r/programming"
    echo "  Day 3: r/devops"
    echo "  Day 4: r/DataHoarder"
    echo
    echo "📊 Track performance:"
    echo "  - Upvotes/comments"
    echo "  - Click-through rate"
    echo "  - Conversion rate"
}

launch_twitter() {
    echo "=== Launching on Twitter ==="
    echo
    echo "Strategy:"
    echo "  1. Create engaging thread"
    echo "  2. Use relevant hashtags"
    echo "  3. Tag relevant accounts"
    echo "  4. Engage with replies"
    echo "  5. Retweet positive feedback"
    echo
    echo "Hashtags:"
    echo "  #cli #developer #productivity #automation"
    echo "  #opensource #devops #programming"
    echo
    echo "Accounts to consider tagging:"
    echo "  @github @nodejs @ThePracticalDev"
    echo
    echo "📅 Schedule tweets:"
    echo "  - Launch thread (Day 1)"
    echo "  - Demo GIF (Day 2)"
    echo "  - User testimonial (Day 3)"
    echo "  - Update announcement (Day 7)"
}

check_sales() {
    echo "=== Sales Dashboard ==="
    echo
    echo "Metrics to track:"
    echo "  - Total sales"
    echo "  - Revenue"
    echo "  - Conversion rate"
    echo "  - Refund rate"
    echo "  - Customer feedback"
    echo
    echo "Tools:"
    echo "  - Gumroad dashboard"
    echo "  - Stripe dashboard"
    echo "  - Google Analytics"
    echo "  - Email open rates"
    echo
    echo "Success targets:"
    echo "  - Day 1: First sale"
    echo "  - Day 3: 10+ sales"
    echo "  - Week 1: $50+ revenue"
    echo "  - Month 1: $200+ revenue"
}

update_revenue() {
    echo "=== Updating Revenue Tracking ==="
    echo
    echo "After first sale:"
    echo "  ./scripts/affiliate-tracker.sh log-conversion 2.99 \"Gumroad\" \"sale-proof\""
    echo "  ./scripts/affiliate-tracker.sh update-milestone 1 \"in-progress\""
    echo
    echo "Check current status:"
    ./scripts/affiliate-tracker.sh status | head -30
}

main() {
    while true; do
        show_menu
        read -p "Choice (1-8): " choice
        
        case $choice in
            1) test_product ;;
            2) setup_sales ;;
            3) generate_marketing ;;
            4) launch_reddit ;;
            5) launch_twitter ;;
            6) check_sales ;;
            7) update_revenue ;;
            8) exit 0 ;;
            *) echo "Invalid choice" ;;
        esac
        
        echo
        read -p "Press Enter to continue..." -r
        clear
    done
}

# Run main function
main "$@"