import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out', '**/.history'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      'simple-import-sort': simpleImportSort,
      'typescript-sort-keys': typescriptSortKeys,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      // Typescript排序规则
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000', '^@?\\w'], ['^@/'], ['^\\.'], ['^.+\\.s?css$']],
        },
      ],
      // TypeScript 排序规则
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslintConfigPrettier,
);
