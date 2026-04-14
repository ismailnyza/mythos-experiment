#!/usr/bin/env node

// Simple Ethereum testnet wallet generator
// Creates a wallet and saves public address only (for safety)

const crypto = require('crypto');
const { ethers } = require('ethers');

async function createWallet() {
  try {
    console.log('=== Ethereum Testnet Wallet Generator ===');
    console.log('Creating a new wallet for testing purposes...');
    
    // Create random wallet
    const wallet = ethers.Wallet.createRandom();
    
    // Get public address
    const address = wallet.address;
    
    // Generate a timestamp
    const timestamp = new Date().toISOString();
    
    // Create wallet info (PUBLIC INFO ONLY - no private key!)
    const walletInfo = {
      timestamp,
      network: 'Ethereum Sepolia Testnet',
      address,
      note: 'PRIVATE KEY AND MNEMONIC ARE NOT SAVED - KEEP THEM SECURE OFFLINE',
      purpose: 'Mythos Experiment Phase 1 testing',
      security_warning: 'Never commit private keys or mnemonics to repository'
    };
    
    // Display wallet info
    console.log('\n✅ Wallet created successfully!');
    console.log(`📝 Timestamp: ${timestamp}`);
    console.log(`🌐 Network: ${walletInfo.network}`);
    console.log(`📍 Public Address: ${address}`);
    console.log('\n⚠️  SECURITY NOTES:');
    console.log('1. Private key and mnemonic are NOT saved in this script');
    console.log('2. You must save the private key/mnemonic securely offline');
    console.log('3. Only the public address should be documented');
    console.log('4. This is for TESTNET only - use mainnet for real funds');
    
    // Ask if user wants to save public address
    console.log('\n---');
    console.log('Public address will be saved to wallet.md');
    console.log('Private key/mnemonic will NOT be saved.');
    
    return {
      address,
      timestamp,
      network: walletInfo.network
    };
    
  } catch (error) {
    console.error('Error creating wallet:', error.message);
    process.exit(1);
  }
}

// Check if ethers is available
try {
  require.resolve('ethers');
} catch {
  console.error('Error: ethers.js library not found.');
  console.log('Install it with: npm install ethers');
  console.log('Or create wallet manually using MetaMask.');
  process.exit(1);
}

createWallet().then(walletData => {
  // Update wallet.md with public address
  const fs = require('fs');
  const path = require('path');
  
  const walletMdPath = path.join(__dirname, '..', 'wallet.md');
  
  try {
    let content = fs.readFileSync(walletMdPath, 'utf8');
    
    // Replace wallet status section
    const newStatus = `## Status\n*Test wallet created - ready for Phase 1 testing*\n\n## Wallet Details\n- **Network**: ${walletData.network}\n- **Public Address**: ${walletData.address}\n- **Created**: ${walletData.timestamp}\n- **Type**: Self-custody test wallet\n- **Security**: Private key/mnemonic stored securely offline\n\n## Testnet Information\n- **Faucet**: Use Sepolia testnet faucet to get test ETH\n- **Explorer**: https://sepolia.etherscan.io/address/${walletData.address}\n- **Purpose**: Testing revenue tracking workflow before mainnet\n\n## Next Steps\n1. Get test ETH from faucet\n2. Test transaction tracking\n3. Switch to mainnet for real revenue`;
    
    // Find and replace the status section
    const statusRegex = /## Status\n[\s\S]*?(?=\n## |$)/;
    if (statusRegex.test(content)) {
      content = content.replace(statusRegex, newStatus);
    } else {
      // If no status section, add it after the title
      content = content.replace('# Crypto Wallet', `# Crypto Wallet\n\n${newStatus}`);
    }
    
    fs.writeFileSync(walletMdPath, content);
    console.log('\n✅ wallet.md updated with public address');
    console.log(`📁 Location: ${walletMdPath}`);
    
  } catch (error) {
    console.error('Error updating wallet.md:', error.message);
    console.log('Wallet created but documentation not updated.');
    console.log(`Public address: ${walletData.address}`);
  }
  
  console.log('\n=== NEXT STEPS ===');
  console.log('1. Save the private key/mnemonic SECURELY OFFLINE');
  console.log('2. Use Sepolia faucet to get test ETH');
  console.log('3. Test transaction tracking workflow');
  console.log('4. Begin affiliate marketing experiment');
  
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});