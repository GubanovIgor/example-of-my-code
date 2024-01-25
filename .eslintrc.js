module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'eslint-plugin-tsdoc',
    'eslint-plugin-prefer-arrow',
  ],
  rules: {
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: true,
      },
    ],
    'no-implicit-coercion': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'error',
    'react/jsx-key': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'internal',
          'builtin',
          ['sibling', 'parent'],
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-absolute-path': 2,
    'import/no-useless-path-segments': 2,
    'import/newline-after-import': 2,
    'tsdoc/syntax': 'warn',
    // Covered by TypeScript
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',
    'no-nested-ternary': 'error',
  },
};
