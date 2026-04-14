#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const REPO_NAME = 'mythos-experiment';
const GITHUB_USER = 'ismailnyza';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN or GH_TOKEN environment variable required.');
  process.exit(1);
}

function run(cmd, options = {}) {
  console.log(`$ ${cmd}`);
  try {
    const result = execSync(cmd, { 
      cwd: REPO_ROOT, 
      encoding: 'utf8', 
      stdio: 'pipe',
      ...options 
    });
    console.log(result.trim());
    return result;
  } catch (error) {
    console.error(`Command failed: ${cmd}`);
    console.error(error.stdout?.toString() || error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Full Deployment: GitHub Repo + Pages\n');
  
  // Step 1: Check if remote exists
  try {
    run('git remote get-url origin');
    console.log('✅ Remote origin already exists.');
  } catch {
    console.log('🌐 No remote origin found.');
    
    // Step 2: Create GitHub repo via API
    console.log('📦 Creating GitHub repository...');
    const createCmd = `gh repo create ${REPO_NAME} --public --source=. --remote=origin --push`;
    try {
      run(createCmd);
      console.log('✅ Repository created and pushed.');
    } catch (error) {
      console.log('⚠️  Failed to create via gh, trying API directly...');
      // Fallback: create via API
      const apiUrl = `https://api.github.com/user/repos`;
      const data = JSON.stringify({ name: REPO_NAME, private: false });
      const curlCmd = `curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3+json" ${apiUrl} -d '${data}'`;
      run(curlCmd);
      
      // Add remote
      const remoteUrl = `https://github.com/${GITHUB_USER}/${REPO_NAME}.git`;
      run(`git remote add origin ${remoteUrl}`);
      run('git push -u origin main');
    }
  }
  
  // Step 3: Deploy to GitHub Pages
  console.log('\n📄 Deploying to GitHub Pages...');
  try {
    // Use existing deploy script
    const deployScript = path.join(__dirname, 'deploy-to-gh-pages.js');
    require(deployScript);
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\n📋 Manual deployment steps:');
    console.log('1. Go to https://github.com/ismailnyza/mythos-experiment/settings/pages');
    console.log('2. Set Source: "Deploy from a branch"');
    console.log('3. Branch: "gh-pages" (root folder)');
    console.log('4. Click Save');
  }
}

main().catch(error => {
  console.error('Deployment failed:', error.message);
  process.exit(1);
});