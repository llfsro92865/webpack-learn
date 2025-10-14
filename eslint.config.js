// eslint.config.js
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,

      // ① 强制能用 const 就用 const
      'prefer-const': 'error',            // 原生规则，对 TS 同样适用
      // （可选）② TS 专用版，功能几乎一样
      // '@typescript-eslint/prefer-const': 'error',

      'no-undef': 'off',
    },
  },
  { ignores: ['dist/**', 'node_modules/**'] },
];