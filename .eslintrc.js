module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:nestjs/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'nestjs/parse-int-pipe': 'off',
    'nestjs/deprecated-api-modules': 'off',
    'nestjs/use-validation-pipe': 'off',
    'import/no-unresolved': 'off',
    'nestjs/use-dependency-injection': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-undef': 'off',
    'max-classes-per-file': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off'
  },
};
