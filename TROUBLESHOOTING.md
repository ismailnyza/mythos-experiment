# Troubleshooting FAQ

## Installation Issues

### "Command not found: organize"
```bash
# Check if installed globally
npm list -g | grep file-organizer

# Reinstall globally
npm install -g smart-file-organizer

# Add npm global bin to PATH (if needed)
export PATH="$PATH:$(npm config get prefix)/bin"
```

### Permission Errors
```bash
# Install with sudo if needed
sudo npm install -g smart-file-organizer

# Or fix npm permissions
sudo chown -R $USER:$(id -gn $USER) ~/.npm
```

## Usage Problems

### Dry Run Shows No Changes
```bash
# Check if files match patterns
organize --source=/path --target=/path/sorted --dry-run --verbose

# Test with specific file type
organize --source=/path --target=/path/sorted --pattern="*.txt" --dry-run
```

### Files Not Moving to Correct Folders
```bash
# Check file extensions (case sensitive)
ls -la /path/to/files

# View detected file types
organize --source=/path --analyze

# Customize type detection in config
```

## Performance Issues

### Slow Processing Large Directories
```bash
# Enable batch processing
organize --source=/path --batch-size=100

# Skip hash calculation (faster but less accurate)
organize --source=/path --skip-hash

# Process in background
nohup organize --source=/path --target=/path/sorted > organize.log &
```

### High Memory Usage
```bash
# Limit concurrent operations
organize --source=/path --concurrency=2

# Process in chunks
organize --source=/path --chunk-size=500
```

## Deployment Issues

### DigitalOcean Droplet Setup Fails
```bash
# Check system requirements
free -h  # Memory
df -h    # Disk space

# Update system first
apt update && apt upgrade -y

# Install Node.js correctly
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### API Service Not Starting
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs file-organizer-api

# Restart service
pm2 restart file-organizer-api

# Check port availability
netstat -tulpn | grep :3000
```

## Common Error Messages

### "ENOSPC: no space left on device"
```bash
# Check disk space
df -h

# Clear npm cache
npm cache clean --force

# Remove old logs
rm -rf ~/.npm/_logs/*
```

### "EACCES: permission denied"
```bash
# Fix directory permissions
sudo chmod 755 /path/to/directory

# Or run with appropriate permissions
sudo organize --source=/path --target=/path/sorted
```

## DigitalOcean Specific

### Can't Access Droplet
```bash
# Check firewall rules
ufw status

# Allow SSH if blocked
ufw allow ssh

# Check droplet status in DigitalOcean console
```

### $200 Credit Not Applied
1. **Verify account**: Check email for verification
2. **Contact support**: DigitalOcean support responds quickly
3. **Use different email**: Sometimes new account needed
4. **Check promotions page**: Credit may need activation

## Getting Help

### Community Support
- **GitHub Issues**: [Open an issue](https://github.com/ismailnyza/mythos-experiment/issues)
- **Stack Overflow**: Tag questions with `smart-file-organizer`
- **Email**: support@example.com (response within 24 hours)

### Paid Support Options
For enterprise or complex deployments:
- **Hourly consulting**: $50/hour
- **Custom integration**: Starting at $200
- **Priority support**: $99/month

## Prevention Tips

1. **Always use --dry-run first**
2. **Backup important files** before organization
3. **Test with small directory** before scaling
4. **Monitor system resources** during large operations
5. **Keep config files version controlled**

---

*Need reliable hosting? [DigitalOcean](https://m.do.co/c/affiliate-link-placeholder) offers $200 credit and 99.99% uptime for production deployments.*