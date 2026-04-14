#!/usr/bin/env node

const { ethers } = require('ethers');

const wallets = {
  testnet: {
    address: '0xC9b90EF3273C5c271848Bb02461883C4078EAa5d',
    provider: new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/'),
    name: 'Sepolia Testnet'
  },
  mainnet: {
    address: '0xB170EaDc4561DEAE89B00766f8fb372795472331',
    provider: new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/'),
    name: 'Ethereum Mainnet'
  }
};

async function checkBalances() {
  console.log('🔍 Checking wallet balances...\n');
  
  for (const [key, wallet] of Object.entries(wallets)) {
    try {
      const balance = await wallet.provider.getBalance(wallet.address);
      const balanceEth = ethers.formatEther(balance);
      
      console.log(`${wallet.name}:`);
      console.log(`  Address: ${wallet.address}`);
      console.log(`  Balance: ${balanceEth} ETH`);
      console.log(`  USD Estimate: $${(parseFloat(balanceEth) * 3000).toFixed(2)} (approx)`);
      console.log('');
      
    } catch (error) {
      console.log(`${wallet.name}:`);
      console.log(`  Error: ${error.message}`);
      console.log('');
    }
  }
  
  console.log('---');
  console.log('Note: Testnet ETH has no real value.');
  console.log('Mainnet ETH balance is real cryptocurrency.');
}

checkBalances().catch(console.error);