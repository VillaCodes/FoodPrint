module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecma: 13,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
      node:true,
      es2021: true,
    },
  };
