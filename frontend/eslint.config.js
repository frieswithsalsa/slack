// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // storybook-static — сборка Storybook, там минифицированные чужие бандлы
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      // Даёт парсер TypeScript: без него eslint спотыкается на первом же interface
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // В TS-файлах работает версия правила от typescript-eslint,
      // базовая даёт ложные срабатывания на типах и перегрузках
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Конфиги проекта выполняются в Node, а не в браузере: тут свои глобали
    files: ['vite.config.ts', '.storybook/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.node },
  },
  ...storybook.configs["flat/recommended"],
])
