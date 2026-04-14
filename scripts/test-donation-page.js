#!/usr/bin/env node

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// Simple static server
const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(DOCS_DIR, url);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    }[ext] || 'text/plain';
    
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

async function runTest() {
  console.log('🚀 Testing donation page...');
  
  // Start server
  server.listen(PORT);
  console.log(`📡 Server started on http://localhost:${PORT}`);
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(`http://localhost:${PORT}`);
    
    // Check title
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Check wallet address displayed
    const address = await page.textContent('#walletAddress');
    console.log(`📭 Wallet address found: ${address.trim()}`);
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, '..', 'logs', 'donation-page.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
    // Check QR code image
    const qrSrc = await page.getAttribute('.qr-code img', 'src');
    console.log(`🔳 QR code src: ${qrSrc}`);
    
    console.log('\n✅ Donation page test passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    server.close();
    console.log('🛑 Server stopped.');
  }
}

runTest().catch(console.error);