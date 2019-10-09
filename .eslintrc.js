module.exports = {
  env: {
    browser: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {},
  parser: 'babel-eslint'
};
