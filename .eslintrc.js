module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    cypress: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [ 'react', 'jest', 'cypress' ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
}
