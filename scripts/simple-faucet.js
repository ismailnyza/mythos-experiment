// Simple faucet request script
const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting simple faucet request...');
  console.log('Wallet: 0xC9b90EF3273C5c271848Bb02461883C4078EAa5d');
  console.log('Opening browser to: https://faucets.chain.link/sepolia');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://faucets.chain.link/sepolia');
    console.log('Page loaded. Please manually:');
    console.log('1. Enter wallet address in the form');
    console.log('2. Complete any CAPTCHA/verification');
    console.log('3. Submit the request');
    console.log('4. Wait for test ETH (1-5 minutes)');
    
    // Keep browser open for 2 minutes for manual action
    await page.waitForTimeout(120000);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
    console.log('Browser closed.');
    console.log('Check wallet: https://sepolia.etherscan.io/address/0xC9b90EF3273C5c271848Bb02461883C4078EAa5d');
  }
})();