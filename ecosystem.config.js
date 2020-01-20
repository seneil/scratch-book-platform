require('dotenv').config({ path: 'variables.env' });

module.exports = {
  apps: [{
    name: 'scratch-book-platform',
    script: './src/index.js',
    watch: ['./src'],
    watch_delay: 1000,
    max_restarts: 5,
    max_memory_restart: '150M',
    ignore_watch: ['.git', 'node_modules'],
    env: {
      NODE_ENV: 'development',
    },
  }],
  deploy: {
    staging: {
      user: process.env.DEPLOYMENT_USER,
      host: process.env.DEPLOYMENT_HOST,
      repo: process.env.DEPLOYMENT_REPO,
      path: process.env.DEPLOYMENT_PATH,
      ref: 'origin/develop',
      'pre-deploy': 'git fetch --all',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install --production && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
