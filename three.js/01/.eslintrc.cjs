module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended'],
  rules: {
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'prettier/prettier': 'warn',
  },
};
