require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
  ],
});
require('module-alias/register');

require('./application');
