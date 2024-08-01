module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel-config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'require-jsdoc': 0,
    'operator-linebreak': 'off',
    'linebreak-style': 0,
  },
  plugins: ['jest'],
};
