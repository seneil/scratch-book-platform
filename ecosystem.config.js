module.exports = {
  apps: [{
    name: 'scratch-book-platform',
    script: './src/index.js',
    watch: ['./src'],
    watch_delay: 1000,
    ignore_watch: ['.git', 'node_modules'],
    env: {
      NODE_ENV: 'development',
    },
  }],
};
