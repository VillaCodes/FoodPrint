module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecma: 13,
      sourceType: 'module',
      "ecmaFeatures": {
            "jsx": true
        },
      project: ['./tsconfig.json']
    },
    plugins: [
      '@typescript-eslint',
      'react',
    ],
    extends: [
      'eslint:recommended',
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:import/recommended",
    ],
    env: {
      node:true,
      es2021: true,
    },
    "rules": {
    "@typescript-eslint/ban-ts-ignore": "off",
    }
  };
