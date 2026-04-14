#!/usr/bin/env node

/**
 * Simple Gumroad API Client
 * For creating and managing digital products
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class GumroadClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://api.gumroad.com/v2';
  }

  async request(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.gumroad.com',
        port: 443,
        path: `/v2${endpoint}`,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(`Gumroad API error: ${parsed.message || 'Unknown error'}`));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async createProduct(productData) {
    // Gumroad product creation API
    const data = {
      name: productData.name,
      description: productData.description,
      price: productData.price, // in cents
      currency: productData.currency || 'USD',
      customizable_price: productData.customizablePrice || false,
      require_shipping: productData.requireShipping || false,
      published: productData.published || true,
      // ... other product fields
    };

    return this.request('POST', '/products', data);
  }

  async getProducts() {
    return this.request('GET', '/products');
  }

  async getSales() {
    return this.request('GET', '/sales');
  }
}

// Simple CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  const help = () => {
    console.log(`
Simple Gumroad CLI
==================
Usage: node gumroad-simple.js <command> [options]

Commands:
  setup          - Configure Gumroad access token
  create-product - Create a new product
  list-products  - List your products
  list-sales     - List your sales

Setup:
  1. Get access token from: https://gumroad.com/settings/advanced
  2. Run: node gumroad-simple.js setup YOUR_TOKEN
  3. Token will be saved to .gumroad-token

Example:
  node gumroad-simple.js create-product "My Product" 299 "Product description"
    `);
  };

  const configPath = path.join(__dirname, '..', '.gumroad-token');

  const getToken = () => {
    if (fs.existsSync(configPath)) {
      return fs.readFileSync(configPath, 'utf8').trim();
    }
    return process.env.GUMROAD_ACCESS_TOKEN;
  };

  const saveToken = (token) => {
    fs.writeFileSync(configPath, token);
    console.log('✅ Token saved to .gumroad-token');
  };

  switch (command) {
    case 'setup':
      if (args.length < 2) {
        console.log('❌ Please provide access token: node gumroad-simple.js setup YOUR_TOKEN');
        process.exit(1);
      }
      saveToken(args[1]);
      break;

    case 'create-product':
      {
        const token = getToken();
        if (!token) {
          console.log('❌ No Gumroad token found. Run setup first.');
          process.exit(1);
        }

        if (args.length < 4) {
          console.log('❌ Usage: create-product <name> <price-cents> <description>');
          process.exit(1);
        }

        const client = new GumroadClient(token);
        const productData = {
          name: args[1],
          price: parseInt(args[2]), // in cents
          description: args[3],
          currency: 'USD',
          published: true
        };

        console.log('Creating product...');
        client.createProduct(productData)
          .then(result => {
            console.log('✅ Product created!');
            console.log('Product URL:', result.product?.short_url || 'Check Gumroad dashboard');
            console.log('Product ID:', result.product?.id);
          })
          .catch(error => {
            console.error('❌ Error creating product:', error.message);
            process.exit(1);
          });
      }
      break;

    case 'list-products':
      {
        const token = getToken();
        if (!token) {
          console.log('❌ No Gumroad token found. Run setup first.');
          process.exit(1);
        }

        const client = new GumroadClient(token);
        client.getProducts()
          .then(result => {
            console.log('📦 Your Products:');
            result.products?.forEach(product => {
              console.log(`  - ${product.name}: $${(product.price_cents / 100).toFixed(2)}`);
              console.log(`    URL: ${product.short_url}`);
              console.log(`    ID: ${product.id}`);
              console.log();
            });
          })
          .catch(error => {
            console.error('❌ Error fetching products:', error.message);
            process.exit(1);
          });
      }
      break;

    case 'list-sales':
      {
        const token = getToken();
        if (!token) {
          console.log('❌ No Gumroad token found. Run setup first.');
          process.exit(1);
        }

        const client = new GumroadClient(token);
        client.getSales()
          .then(result => {
            console.log('💰 Your Sales:');
            result.sales?.forEach(sale => {
              console.log(`  - ${sale.product_name}: $${(sale.price_cents / 100).toFixed(2)}`);
              console.log(`    Buyer: ${sale.email}`);
              console.log(`    Date: ${sale.created_at}`);
              console.log();
            });
          })
          .catch(error => {
            console.error('❌ Error fetching sales:', error.message);
            process.exit(1);
          });
      }
      break;

    default:
      help();
      break;
  }
}

module.exports = GumroadClient;