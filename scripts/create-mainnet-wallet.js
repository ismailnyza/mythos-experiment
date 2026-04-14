#!/usr/bin/env node

// Ethereum Mainnet Wallet Generator
// Creates a wallet for real crypto donations
// DISPLAYS MNEMONIC AND PRIVATE KEY - USER MUST SAVE THEM SECURELY

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

async function createMainnetWallet() {
  try {
    console.log('=== Ethereum Mainnet Wallet Generator ===');
    console.log('Creating a new wallet for REAL cryptocurrency donations');
    console.log('⚠️  ⚠️  ⚠️  SECURITY WARNING ⚠️  ⚠️  ⚠️');
    console.log('This will display your PRIVATE KEY and MNEMONIC PHRASE.');
    console.log('Anyone with these can access ALL FUNDS in this wallet.');
    console.log('You MUST save them SECURELY OFFLINE.');
    console.log('');
    
    // Create random wallet
    const wallet = ethers.Wallet.createRandom();
    
    // Get wallet details
    const address = wallet.address;
    const mnemonic = wallet.mnemonic.phrase;
    const privateKey = wallet.privateKey;
    const timestamp = new Date().toISOString();
    
    // Display wallet info
    console.log('✅ Wallet created successfully!');
    console.log(`📝 Timestamp: ${timestamp}`);
    console.log(`🌐 Network: Ethereum Mainnet`);
    console.log(`📍 Public Address: ${address}`);
    console.log('');
    console.log('=== CRITICAL SECURITY INFORMATION ===');
    console.log('');
    console.log('🔐 MNEMONIC PHRASE (12 words):');
    console.log(`   ${mnemonic}`);
    console.log('');
    console.log('🔑 PRIVATE KEY:');
    console.log(`   ${privateKey}`);
    console.log('');
    console.log('⚠️  ⚠️  ⚠️  IMPORTANT ⚠️  ⚠️  ⚠️');
    console.log('1. WRITE DOWN the mnemonic phrase and private key on PAPER');
    console.log('2. Store them in a SECURE, OFFLINE location');
    console.log('3. NEVER share these with anyone');
    console.log('4. NEVER enter them into any website or application');
    console.log('5. These are REQUIRED to access funds in this wallet');
    console.log('6. This information will NOT be shown again');
    console.log('');
    console.log('Press Ctrl+C to abort if you are not ready to save.');
    console.log('Continuing in 10 seconds...');
    
    // Give user time to read
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update wallet.md with mainnet address
    const walletMdPath = path.join(__dirname, '..', 'wallet.md');
    
    try {
      let content = fs.readFileSync(walletMdPath, 'utf8');
      
      // Create mainnet section
      const mainnetSection = `## Mainnet Wallet (For Real Revenue)\n- **Network**: Ethereum Mainnet\n- **Public Address**: ${address}\n- **Created**: ${timestamp}\n- **Type**: Self-custody wallet\n- **Security**: Private key/mnemonic stored OFFLINE by user\n- **Explorer**: https://etherscan.io/address/${address}\n- **Purpose**: Receiving real cryptocurrency donations/payments\n- **Status**: ✅ Ready for Phase 1 donations\n\n## Important Security Notes\n- Private key and mnemonic were displayed ONCE during wallet creation\n- User MUST have saved them securely offline\n- Only public address is stored in this document\n- Never send funds to this address if you did not save the private key\n`;
      
      // Check if mainnet section already exists
      if (content.includes('## Mainnet Wallet')) {
        // Replace existing mainnet section
        const mainnetRegex = /## Mainnet Wallet[\s\S]*?(?=\n## |$)/;
        if (mainnetRegex.test(content)) {
          content = content.replace(mainnetRegex, mainnetSection);
        }
      } else {
        // Add after testnet section or at end
        const testnetEnd = content.indexOf('## Next Steps');
        if (testnetEnd !== -1) {
          content = content.slice(0, testnetEnd) + mainnetSection + '\n' + content.slice(testnetEnd);
        } else {
          content += '\n\n' + mainnetSection;
        }
      }
      
      fs.writeFileSync(walletMdPath, content);
      console.log('\n✅ wallet.md updated with mainnet address');
      console.log(`📁 Location: ${walletMdPath}`);
      
    } catch (error) {
      console.error('Error updating wallet.md:', error.message);
      console.log('Wallet created but documentation not updated.');
      console.log(`Public address: ${address}`);
    }
    
    // Save public address only to a separate file (gitignored)
    const publicInfo = {
      timestamp,
      network: 'Ethereum Mainnet',
      address,
      note: 'Private key and mnemonic NOT stored. User must have saved them.',
      warning: 'Never commit private keys or mnemonics to repository'
    };
    
    const publicPath = path.join(__dirname, '..', 'wallet-mainnet-public.json');
    fs.writeFileSync(publicPath, JSON.stringify(publicInfo, null, 2));
    console.log(`\n✅ Public info saved to ${publicPath}`);
    
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Send ETH or other ERC-20 tokens to the address above');
    console.log('2. Monitor balance on Etherscan');
    console.log('3. Record transactions in revenue-log.md');
    console.log('4. Use this wallet for donation campaigns');
    
    return { address, timestamp };
    
  } catch (error) {
    console.error('Error creating wallet:', error.message);
    console.error('Make sure ethers.js is installed: npm install ethers');
    process.exit(1);
  }
}

// Check if ethers is available
try {
  require.resolve('ethers');
} catch {
  console.error('Error: ethers.js library not found.');
  console.log('Install it with: npm install ethers');
  process.exit(1);
}

createMainnetWallet().catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});