#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration - UPDATE THESE!
const CONFIG = {
  email: '', // Set your email here
  password: '', // Set your password here
  firstName: '', // Optional
  lastName: ''  // Optional
};

const DO_REGISTER_URL = 'https://cloud.digitalocean.com/registrations/new';

async function createDigitalOceanAccount() {
  console.log('🚀 Starting DigitalOcean account creation...');
  
  if (!CONFIG.email || !CONFIG.password) {
    console.error('❌ ERROR: Please update CONFIG in the script with email and password');
    console.log('Edit scripts/digitalocean-automation.js and fill in:');
    console.log('  email: "your-email@example.com"');
    console.log('  password: "your-secure-password"');
    console.log('Then run again.');
    return;
  }
  
  const browser = await chromium.launch({ 
    headless: false, // Show browser for manual steps
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('\n1. Navigating to DigitalOcean registration...');
    await page.goto(DO_REGISTER_URL);
    await page.waitForLoadState('networkidle');
    
    console.log('2. Filling registration form...');
    
    // Fill email
    await page.locator('input[type="email"], input[name*="email"], input[id*="email"]').first().fill(CONFIG.email);
    
    // Fill password
    await page.locator('input[type="password"], input[name*="password"], input[id*="password"]').first().fill(CONFIG.password);
    
    // Try to fill first/last name if fields exist
    if (CONFIG.firstName) {
      const firstNameSelectors = [
        'input[name*="first"], input[name*="firstName"], input[id*="first"]',
        'input[name*="given"], input[placeholder*="First"]'
      ];
      
      for (const selector of firstNameSelectors) {
        const field = await page.locator(selector).first();
        if (await field.count() > 0) {
          await field.fill(CONFIG.firstName);
          break;
        }
      }
    }
    
    if (CONFIG.lastName) {
      const lastNameSelectors = [
        'input[name*="last"], input[name*="lastName"], input[id*="last"]',
        'input[name*="family"], input[placeholder*="Last"]'
      ];
      
      for (const selector of lastNameSelectors) {
        const field = await page.locator(selector).first();
        if (await field.count() > 0) {
          await field.fill(CONFIG.lastName);
          break;
        }
      }
    }
    
    // Look for submit/continue button
    const submitButtons = [
      'button:has-text("Sign up"), button:has-text("Continue"), button:has-text("Create Account")',
      'button[type="submit"]:has-text("Sign"), button:has-text("Get Started")'
    ];
    
    let submitted = false;
    for (const selector of submitButtons) {
      const button = await page.locator(selector).first();
      if (await button.count() > 0) {
        console.log('3. Found submit button, clicking...');
        await button.click();
        submitted = true;
        break;
      }
    }
    
    if (!submitted) {
      console.log('❌ Could not find submit button');
      console.log('Please complete registration manually.');
    } else {
      console.log('4. Waiting for next steps...');
      await page.waitForTimeout(5000);
      
      // Check for success or next steps
      const successIndicators = [
        'text=verify your email',
        'text=Check your email',
        'text=verification email',
        'text=Welcome',
        'text=dashboard'
      ];
      
      let foundSuccess = false;
      for (const selector of successIndicators) {
        const element = await page.locator(selector).first();
        if (await element.count() > 0) {
          console.log(`✅ ${selector} found - registration successful!`);
          foundSuccess = true;
          break;
        }
      }
      
      if (!foundSuccess) {
        console.log('⚠️  Could not confirm automatic success.');
        console.log('Please check for:');
        console.log('1. Email verification required');
        console.log('2. CAPTCHA challenge');
        console.log('3. Additional form fields');
      }
    }
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, '..', 'logs', 'do-registration.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
  } catch (error) {
    console.error('❌ Error during automation:', error.message);
    
    const errorPath = path.join(__dirname, '..', 'logs', 'do-error.png');
    await page.screenshot({ path: errorPath });
    console.log(`📸 Error screenshot: ${errorPath}`);
    
  } finally {
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Check your email for verification link');
    console.log('2. Complete email verification');
    console.log('3. Log into DigitalOcean dashboard');
    console.log('4. Go to Profile → Referrals to get your link');
    console.log('5. Update content/digitalocean-tutorial.md with your link');
    
    console.log('\n⚠️  Browser will stay open for manual completion...');
    console.log('Press Ctrl+C to close when done.');
    
    await page.waitForTimeout(30000); // 30 seconds for manual steps
    await browser.close();
  }
}

async function getReferralLink() {
  console.log('\n=== GETTING REFERRAL LINK ===');
  console.log('Once logged into DigitalOcean:');
  console.log('1. Click your profile picture (top right)');
  console.log('2. Select "Referrals" from dropdown');
  console.log('3. Find "Your referral link" section');
  console.log('4. Copy the URL (looks like: https://m.do.co/c/UNIQUE_CODE)');
  console.log('5. Update the tutorial content with this link');
  
  const tutorialPath = path.join(__dirname, '..', 'content', 'digitalocean-tutorial.md');
  console.log(`\nTutorial file: ${tutorialPath}`);
  console.log('Replace "REFERRAL_LINK_HERE" with your actual link.');
}

// Ensure logs directory exists
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Run based on command line argument
const command = process.argv[2] || 'help';

switch (command) {
  case 'create-account':
    createDigitalOceanAccount();
    break;
  case 'get-referral':
    getReferralLink();
    break;
  case 'help':
  default:
    console.log('DigitalOcean Automation Script');
    console.log('==============================');
    console.log('\nUsage:');
    console.log('  node scripts/digitalocean-automation.js create-account');
    console.log('  node scripts/digitalocean-automation.js get-referral');
    console.log('\nIMPORTANT: Before running create-account:');
    console.log('1. Edit the script and fill in CONFIG object');
    console.log('2. Set email and password (and optional name)');
    console.log('3. Save the file');
    console.log('\nThe script will open a browser and guide you through registration.');
}