#!/usr/bin/env node

const { ethers } = require('ethers');

const wallets = [
  {
    name: 'Sepolia Testnet',
    address: '0xC9b90EF3273C5c271848Bb02461883C4078EAa5d',
    rpc: 'https://rpc.sepolia.org'
  },
  {
    name: 'Ethereum Mainnet',
    address: '0xB170EaDc4561DEAE89B00766f8fb372795472331',
    rpc: 'https://eth.llamarpc.com'
  }
];

async function checkBalance(wallet) {
  const provider = new ethers.JsonRpcProvider(wallet.rpc);
  try {
    const balance = await provider.getBalance(wallet.address);
    const balanceEth = ethers.formatEther(balance);
    return { success: true, balanceEth };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🔍 Checking wallet balances (using public RPC)...\n');
  
  for (const wallet of wallets) {
    console.log(`${wallet.name}:`);
    console.log(`  Address: ${wallet.address}`);
    
    const result = await checkBalance(wallet);
    if (result.success) {
      console.log(`  Balance: ${result.balanceEth} ETH`);
      // Approx USD conversion (ETH ~ $3000)
      const usdValue = (parseFloat(result.balanceEth) * 3000).toFixed(2);
      console.log(`  USD Estimate: $${usdValue}`);
    } else {
      console.log(`  Error: ${result.error}`);
    }
    console.log('');
  }
  
  console.log('---');
  console.log('Note: Testnet ETH has no real value.');
  console.log('Mainnet ETH balance is real cryptocurrency.');
}

main().catch(console.error);