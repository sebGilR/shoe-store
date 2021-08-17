module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "dot-notation": 0,
  }
};