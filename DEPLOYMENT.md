# Deployment Guide: Smart File Organizer CLI

This guide shows how to deploy the Smart File Organizer CLI as a web service on various platforms.

## Quick Deployment Options

### 1. DigitalOcean (Recommended for Production)
Complete step-by-step guide: [DigitalOcean Deployment Guide](../content/digitalocean-deployment-guide.md)

**Benefits:**
- 99.99% uptime SLA
- Global network (14 datacenters)
- Easy scaling
- **$200 free credit for new users** ([Sign up here](https://m.do.co/c/affiliate-link-placeholder))

### 2. Local Development
```bash
# Clone repository
git clone https://github.com/ismailnyza/mythos-experiment.git
cd mythos-experiment

# Install dependencies
npm install

# Install CLI globally
npm install -g .

# Test installation
organize --help
```

### 3. Docker Deployment
```bash
# Build Docker image
docker build -t file-organizer .

# Run container
docker run -v /host/path:/data file-organizer organize --source=/data --target=/data/sorted
```

## API Deployment

The repository includes an Express.js API wrapper that exposes CLI functionality via HTTP endpoints.

### API Endpoints
- `GET /health` - Service health check
- `GET /version` - CLI version information  
- `POST /organize` - Organize files (requires source and target paths)

## Monitoring

### Logs
```bash
# View application logs
pm2 logs file-organizer-api

# View system logs
journalctl -u file-organizer-api
```

### Metrics
- CPU usage
- Memory consumption
- Disk I/O
- Network traffic

## Backup Strategy

1. **Application data**: Regular backups of organized file structures
2. **Configuration**: Version control for config files
3. **Database**: Regular exports (if using database features)

## Security Considerations

1. **Authentication**: Implement API key authentication for production
2. **Input validation**: Sanitize file paths and parameters
3. **Rate limiting**: Prevent abuse of API endpoints
4. **Logging**: Audit trails for file operations

## Troubleshooting

### Common Issues

1. **Permission errors**: Ensure proper file permissions
2. **Disk space**: Monitor available storage
3. **Memory limits**: Adjust Node.js memory limits if needed
4. **Network issues**: Check firewall and network configuration

### Debug Mode
```bash
# Enable verbose logging
organize --source=/path --target=/path/sorted --verbose

# Dry run mode
organize --source=/path --target=/path/sorted --dry-run
```

## Support

For deployment assistance:
1. Check the [DigitalOcean documentation](https://docs.digitalocean.com/)
2. Review application logs
3. Open an issue on GitHub

---

*Disclosure: This guide contains affiliate links to DigitalOcean. Using these links supports the development of open-source tools like Smart File Organizer CLI.*