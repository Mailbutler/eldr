const eslintPluginTypescript = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const eslint = require('@eslint/js');

module.exports = [
  eslint.configs.recommended,
  ...eslintPluginTypescript.configs.recommended,
  eslintPluginPrettierRecommended,

  {

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      ecmaVersion: 5,
      sourceType: 'module'
    },

    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
      curly: ['error', 'multi-line', 'consistent'],
      eqeqeq: ['error', 'smart'],
      'spaced-comment': ['error', 'always', { markers: ['/', '!'] }],
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

      'no-nested-ternary': ['error'],
      'no-unneeded-ternary': ['error'],
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'prefer-const': 'error',
      'prefer-rest-params': 'off',
      'no-var': 'error',
      'no-extra-boolean-cast': 'off',
      'no-redeclare': 'off',
      'no-restricted-imports': 'off',
      'no-throw-literal': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],

      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-prototype-builtins': 'off',
      'no-debugger': 'error',
      'no-console': 'error',

      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'crypto-js',
              message: 'Please only import the required crypto function, for example `crypto-js/md5`'
            }
          ],

          patterns: [
            {
              group: ['vue/*'],
              message: 'Please use `vue` instead',
              allowTypeImports: false
            },
            {
              group: ['!crypto-js/*']
            }
          ]
        }
      ]
    }
  }
];
