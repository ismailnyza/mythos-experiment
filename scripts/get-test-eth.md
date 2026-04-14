# Get Test ETH for Sepolia Wallet

## Wallet Address
`0xC9b90EF3273C5c271848Bb02461883C4078EAa5d`

## Sepolia Faucet Options

### 1. Alchemy Sepolia Faucet (Recommended)
- URL: https://sepoliafaucet.com/
- Requires: Alchemy account (free)
- Amount: 0.5 ETH per day
- Steps:
  1. Create free Alchemy account
  2. Go to sepoliafaucet.com
  3. Connect wallet or enter address
  4. Request test ETH

### 2. Infura Sepolia Faucet
- URL: https://www.infura.io/faucet/sepolia
- Requires: Infura account (free)
- Amount: 0.5 ETH per day

### 3. QuickNode Sepolia Faucet
- URL: https://faucet.quicknode.com/ethereum/sepolia
- Requires: QuickNode account (free tier)
- Amount: 0.1 ETH per request

### 4. Chainlink Faucet
- URL: https://faucets.chain.link/sepolia
- No account required
- Amount: 0.1 ETH
- May require Twitter/GitHub verification

## Steps to Get Test ETH

1. **Choose a faucet** (Alchemy recommended)
2. **Create account** if required (free)
3. **Enter wallet address**: `0xC9b90EF3273C5c271848Bb02461883C4078EAa5d`
4. **Request test ETH** (usually 0.1-0.5 ETH)
5. **Wait for confirmation** (1-5 minutes)
6. **Verify on explorer**: https://sepolia.etherscan.io/address/0xC9b90EF3273C5c271848Bb02461883C4078EAa5d

## Verify Transaction

After receiving test ETH:
1. Check Sepolia explorer for wallet
2. Look for incoming transaction
3. Note transaction hash
4. Update revenue-log.md with test transaction

## Test Transaction Script

Once you have test ETH, run:
```bash
# Log test transaction
./scripts/affiliate-tracker.sh log-conversion 0.1 "Sepolia Faucet" "TX_HASH"

# Update Phase 1 status (test transaction)
sed -i 's/Phase 1.*Not started/Phase 1   | First $1 | Test complete | 2026-04-14 | Test transaction/' revenue-log.md
```

## Purpose of Test ETH
1. Verify wallet is functional
2. Test transaction tracking workflow
3. Confirm explorer integration works
4. Practice before real revenue

## Next After Test ETH
1. Create DigitalOcean account
2. Generate referral link
3. Deploy tutorial content
4. Begin real affiliate experiment