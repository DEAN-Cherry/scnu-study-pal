// @ts-check

import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import unocss from '@unocss/eslint-config/flat'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import { parser as tsParser } from 'typescript-eslint'

export default tseslint.config(
	...pluginVue.configs['flat/strongly-recommended'],
	...tseslint.configs.recommended,
	unocss,
	{
		plugins: { '@stylistic': stylistic },
		rules: {
			'vue/max-attributes-per-line': ['warn', { singleline: 4, multiline: 3 }],
			'@stylistic/semi': ['error',
				'never',
				{ beforeStatementContinuationChars: 'always' }],
			'@stylistic/comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline', functions: 'never' }],
			'@stylistic/comma-spacing': ['error', { before: false, after: true }],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/arrow-spacing': ['error', { before: true, after: true }],
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/no-trailing-spaces': ['error', { 'ignoreComments': true }],
			'@stylistic/no-multi-spaces': ['error'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/array-element-newline': ['error', { multiline: true, minItems: 3 }],
			'@stylistic/object-curly-newline': ['error', { multiline: true, minProperties: 4 }],
			'@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
		},
	},
	{ files: ['**/*.vue'], languageOptions: { parser: vueParser, parserOptions: { parser: tsParser, ecmaVersion: 'latest', sourceType: 'module' } } },
	{ files: ['**/*.ts', '**/*.tsx'], languageOptions: { parser: tsParser, parserOptions: { sourceType: 'module' } } }
)
