module.exports = {
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    node: true,
    mocha: true,
  },
  extends: [
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': ['error', 'ignorePackages', {
      'ts': 'never',
      '': 'never'
    }],
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/member-ordering': 'off',
  },
}
