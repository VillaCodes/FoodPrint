module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecma: 13,
      sourceType: 'module',
      "ecmaFeatures": {
            "jsx": true
        }
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
    "rules": {
    "@typescript-eslint/ban-ts-ignore": "off"
    }
  };
