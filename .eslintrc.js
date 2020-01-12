module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': 'module-alias',
  },
  "globals": {
    "describe": true,
    "expect": true,
    "afterAll": true,
    "beforeAll": true,
    "beforeEach": true,
    "it": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": false
      }
    ],
    "global-require": 0,
    "no-console": 0,
    "no-alert": 0,
    "no-param-reassign": 0,
    "max-len": 0,
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "func-names": [
      "error",
      "never"
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id"
        ]
      }
    ],
    "camelcase": 0
  }
};
