module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "dot-notation": 0,
    "react/jsx-props-no-spreading": "off",
  }
};