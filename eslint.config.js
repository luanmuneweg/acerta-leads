import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            jsxA11y.flatConfigs.recommended,
            ...tanstackQuery.configs['flat/recommended'],
            prettierConfig,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'react-refresh/only-export-components': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'jsx-a11y/no-autofocus': 'off',
        },
    },
])
