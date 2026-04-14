# Quick Start: Smart File Organizer CLI

## 5-Minute Setup

### Option 1: Local Installation
```bash
# Install globally
npm install -g smart-file-organizer

# Test it
organize --help

# Organize your downloads
organize ~/Downloads --by=type --target=~/Downloads/sorted --dry-run
```

### Option 2: DigitalOcean Deployment (Recommended)
1. **Get $200 free credit**: [Sign up for DigitalOcean](https://m.do.co/c/affiliate-link-placeholder)
2. **Create droplet**: Ubuntu 22.04, $6/month plan
3. **Run deployment script**:
```bash
curl -L https://raw.githubusercontent.com/ismailnyza/mythos-experiment/master/scripts/deploy-digitalocean.sh | bash
```

### Option 3: Docker
```bash
docker run -v $(pwd):/data file-organizer organize --source=/data --target=/data/sorted
```

## Common Use Cases

### 1. Organize Downloads Folder
```bash
organize ~/Downloads --by=type --target=~/Downloads/organized
```

### 2. Sort Project Assets
```bash
organize ./assets --config=./organize-rules.yaml
```

### 3. Monthly Archive
```bash
organize ~/Documents --by=date --format=year-month
```

## Configuration Examples

### Basic YAML Config
```yaml
rules:
  - pattern: "*.{js,ts}"
    destination: "code/javascript"
  - pattern: "*.{py}"
    destination: "code/python"
  - pattern: "*.{jpg,png}"
    destination: "images"
```

### Advanced: Keep Structure
```yaml
rules:
  - pattern: "**/*.js"
    destination: "code/javascript"
    keep_structure: true
```

## Troubleshooting

### Permission Errors
```bash
# Run with sudo if needed
sudo organize --source=/path --target=/path/sorted

# Or fix permissions
chmod +x $(which organize)
```

### Dry Run First
```bash
# Always test first
organize --source=/path --target=/path/sorted --dry-run --verbose
```

### Check Disk Space
```bash
df -h  # Check available space
```

## Next Steps After Setup

1. **Try the API**: Deploy as web service using [DigitalOcean guide](DEPLOYMENT.md)
2. **Customize rules**: Create your own organization patterns
3. **Automate**: Set up cron job for regular organization
4. **Contribute**: Fork on GitHub, submit improvements

## Support
- **GitHub Issues**: Bug reports & feature requests
- **Email**: Support available for deployment questions
- **Community**: Share your use cases and configurations

---

*Need hosting? Get $200 free credit on [DigitalOcean](https://m.do.co/c/affiliate-link-placeholder) - perfect for deploying this tool as a service.*