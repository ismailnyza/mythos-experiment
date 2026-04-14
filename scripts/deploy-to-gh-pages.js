#!/usr/bin/env node

/**
 * Deploy donation site to GitHub Pages
 * Requires GITHUB_TOKEN environment variable with repo permissions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const DEPLOY_DIR = path.join(REPO_ROOT, 'deploy');
const GH_PAGES_BRANCH = 'gh-pages';

function runCommand(cmd, cwd = REPO_ROOT) {
  console.log(`$ ${cmd}`);
  try {
    const output = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Command failed: ${cmd}`);
    console.error(error.stdout?.toString() || error.message);
    process.exit(1);
  }
}

function checkGitStatus() {
  console.log('🔍 Checking git status...');
  const status = runCommand('git status --porcelain');
  if (status.trim()) {
    console.warn('⚠️  There are uncommitted changes. Commit them before deploying.');
    console.log('You can commit with: git add . && git commit -m "Pre-deploy commit"');
    const shouldContinue = process.env.FORCE_DEPLOY === 'true';
    if (!shouldContinue) {
      console.log('Set FORCE_DEPLOY=true to ignore this warning.');
      process.exit(1);
    }
  }
}

function checkRemote() {
  console.log('🔍 Checking git remote...');
  try {
    runCommand('git remote get-url origin');
  } catch {
    console.error('❌ No git remote "origin" found.');
    console.log('Please add a remote with: git remote add origin <your-repo-url>');
    process.exit(1);
  }
}

function deploy() {
  console.log('🚀 Deploying to GitHub Pages...\n');
  
  // Ensure we're on main branch
  const currentBranch = runCommand('git branch --show-current').trim();
  console.log(`Current branch: ${currentBranch}`);
  
  // Create orphan gh-pages branch or switch to existing
  try {
    runCommand(`git checkout --orphan ${GH_PAGES_BRANCH}`);
  } catch {
    runCommand(`git checkout ${GH_PAGES_BRANCH}`);
  }
  
  // Remove everything except deploy folder
  console.log('🧹 Cleaning branch...');
  const files = fs.readdirSync(REPO_ROOT);
  files.forEach(file => {
    if (file === '.git') return;
    if (file === 'deploy') return;
    const filePath = path.join(REPO_ROOT, file);
    try {
      fs.rmSync(filePath, { recursive: true, force: true });
    } catch (err) {
      console.warn(`Could not remove ${file}: ${err.message}`);
    }
  });
  
  // Move deploy contents to root
  console.log('📦 Moving deploy to root...');
  const deployFiles = fs.readdirSync(DEPLOY_DIR);
  deployFiles.forEach(file => {
    const src = path.join(DEPLOY_DIR, file);
    const dest = path.join(REPO_ROOT, file);
    fs.renameSync(src, dest);
  });
  
  // Remove empty deploy folder
  fs.rmdirSync(DEPLOY_DIR);
  
  // Add all files
  runCommand('git add .');
  
  // Commit
  try {
    runCommand('git commit -m "Deploy donation site to GitHub Pages"');
  } catch (err) {
    console.log('No changes to commit.');
  }
  
  // Push to gh-pages branch
  console.log('📤 Pushing to remote...');
  const ghToken = process.env.GITHUB_TOKEN;
  if (ghToken) {
    // Replace origin URL with token
    const remoteUrl = runCommand('git remote get-url origin').trim();
    const authedUrl = remoteUrl.replace('https://', `https://x-access-token:${ghToken}@`);
    runCommand(`git push -f ${authedUrl} ${GH_PAGES_BRANCH}`);
  } else {
    runCommand(`git push -f origin ${GH_PAGES_BRANCH}`);
  }
  
  // Switch back to original branch
  runCommand(`git checkout ${currentBranch}`);
  
  // Restore original state
  console.log('🔁 Restoring original branch...');
  runCommand('git checkout .');
  
  console.log('\n✅ Deployment complete!');
  console.log('Your site will be available at:');
  console.log('  https://<your-username>.github.io/<repo-name>/');
  console.log('\n⚠️  Remember to enable GitHub Pages in repo settings:');
  console.log('  Settings → Pages → Source: gh-pages branch → Save');
}

function main() {
  console.log('=== GitHub Pages Deployment ===\n');
  
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  GITHUB_TOKEN environment variable not set.');
    console.log('You can set it with:');
    console.log('  export GITHUB_TOKEN=your_token_here');
    console.log('\nWithout a token, you must have SSH credentials set up.');
    console.log('Continue anyway? (y/n)');
    const answer = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    answer.question('> ', (input) => {
      answer.close();
      if (input.toLowerCase() === 'y') {
        checkGitStatus();
        checkRemote();
        deploy();
      } else {
        console.log('Deployment cancelled.');
        process.exit(0);
      }
    });
  } else {
    checkGitStatus();
    checkRemote();
    deploy();
  }
}

if (require.main === module) {
  main();
}