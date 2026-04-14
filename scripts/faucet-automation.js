#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const WALLET_ADDRESS = '0xC9b90EF3273C5c271848Bb02461883C4078EAa5d';
const FAUCET_URL = 'https://faucets.chain.link/sepolia'; // No account required

async function requestTestEth() {
  console.log('🚀 Starting automated faucet request...');
  console.log(`📭 Wallet: ${WALLET_ADDRESS}`);
  console.log(`🌐 Faucet: ${FAUCET_URL}`);
  
  const browser = await chromium.launch({ 
    headless: true, // Run in background
    slowMo: 1000 // Slow down for observation
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('\n1. Navigating to faucet...');
    await page.goto(FAUCET_URL);
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    console.log('2. Page loaded, looking for wallet input...');
    
    // Try to find wallet address input
    const walletInput = await page.locator('input[type="text"], input[placeholder*="address"], input[placeholder*="Address"]').first();
    
    if (await walletInput.count() > 0) {
      console.log('3. Found wallet input, filling address...');
      await walletInput.fill(WALLET_ADDRESS);
      
      // Look for submit button
      const submitButton = await page.locator('button:has-text("Send"), button:has-text("Request"), button:has-text("Submit"), button[type="submit"]').first();
      
      if (await submitButton.count() > 0) {
        console.log('4. Found submit button, clicking...');
        await submitButton.click();
        
        // Wait for response
        await page.waitForTimeout(5000);
        
        // Check for success message
        const successSelectors = [
          'text=success',
          'text=Success',
          'text=requested',
          'text=Requested',
          'text=submitted',
          'text=Submitted',
          'text=ETH will be sent',
          'text=transaction'
        ];
        
        let success = false;
        for (const selector of successSelectors) {
          const element = await page.locator(selector).first();
          if (await element.count() > 0) {
            console.log(`✅ Success indicator found: "${selector}"`);
            success = true;
            break;
          }
        }
        
        if (success) {
          console.log('\n🎉 Faucet request appears successful!');
          console.log('Please check the page for any CAPTCHA or verification steps.');
          console.log('Transaction should arrive in 1-5 minutes.');
          
          // Take screenshot for documentation
          const screenshotPath = path.join(__dirname, '..', 'logs', 'faucet-request.png');
          await page.screenshot({ path: screenshotPath });
          console.log(`📸 Screenshot saved: ${screenshotPath}`);
          
        } else {
          console.log('\n⚠️  Could not confirm success automatically.');
          console.log('Please check the page manually for:');
          console.log('1. CAPTCHA verification');
          console.log('2. Twitter/GitHub login requirement');
          console.log('3. Email verification');
          console.log('4. Any other manual step');
        }
        
      } else {
        console.log('❌ Could not find submit button');
        console.log('Page HTML structure:');
        const body = await page.locator('body').innerHTML();
        console.log(body.substring(0, 1000) + '...');
      }
      
    } else {
      console.log('❌ Could not find wallet input field');
      console.log('Current page title:', await page.title());
      
      // Take screenshot to see what's on page
      const screenshotPath = path.join(__dirname, '..', 'logs', 'faucet-page.png');
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }
    
  } catch (error) {
    console.error('❌ Error during automation:', error.message);
    
    // Take error screenshot
    const errorPath = path.join(__dirname, '..', 'logs', 'faucet-error.png');
    await page.screenshot({ path: errorPath });
    console.log(`📸 Error screenshot: ${errorPath}`);
    
  } finally {
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Check if faucet requires manual verification');
    console.log('2. Monitor wallet on Sepolia explorer:');
    console.log(`   https://sepolia.etherscan.io/address/${WALLET_ADDRESS}`);
    console.log('3. Once ETH arrives, update revenue-log.md');
    console.log('4. Proceed with DigitalOcean account creation');
    
    // Keep browser open for manual intervention if needed
    console.log('\n⚠️  Browser will stay open for 60 seconds for manual intervention...');
    console.log('Press Ctrl+C to close early.');
    
    await page.waitForTimeout(60000);
    await browser.close();
  }
}

// Ensure logs directory exists
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Run the automation
requestTestEth().catch(console.error);