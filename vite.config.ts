import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unfonts from 'unplugin-fonts/vite'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		Unocss(),
		Unfonts({
			// Google Fonts API V2
			google: {
				/**
				 * enable preconnect link injection
				 *   <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
				 * default: true
				 */
				preconnect: false,

				/**
				 * values: auto, block, swap(default), fallback, optional
				 * default: 'swap'
				 */
				display: 'block',
				/**
				 * define where the font load tags should be inserted
				 * default: 'head-prepend'
				 *   values: 'head' | 'body' | 'head-prepend' | 'body-prepend'
				 */
				injectTo: 'head-prepend',

				/**
				 * Fonts families lists
				 */
				families: [
					// families can be either strings (only regular 400 will be loaded)
					'Source Sans Pro',
					'Noto Sans SC',
					// or objects
					{
						/**
						 * Family name (required)
						 */
						name: 'Roboto',

						/**
						 * Family styles
						 */
						styles: 'ital,wght@0,400;1,200',

						/**
						 * enable non-blocking renderer
						 *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
						 * default: true
						 */
						defer: true,
					},
				],
			},
		}),
		Components({
			resolvers: [
				IconsResolver({
					prefix: 'icon',
					enabledCollections: ['ep',
						'mdi',
						'fa',
						'fa-brands'],
				}),
				ElementPlusResolver({ importStyle: 'sass' }),
			],
		}),
		AutoImport({
			// targets to transform
			// global imports to register
			imports: [
				// presets
				'vue',
				'vue-router',
				// custom
				{
					'@vueuse/core': [
						// named imports
						// 'useMouse', import { useMouse } from '@vueuse/core',
						// alias
						// ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
					],
					'axios': [
						// default imports
						['default', 'axios'], // import { default as axios } from 'axios',
					],
					'uuid': [
						['v4', 'uuidv4'],
					],
					'pinia': [
						'defineStore',
					],
				},
				// example type import
				{
					from: 'vue-router',
					imports: ['RouteLocationRaw'],
					type: true,
				},
			],
			// Enable auto import by filename for default module exports under directories
			defaultExportByFilename: false,

			// Auto import for module exports under directories
			// by default it only scan one level of modules under the directory
			dirs: [
				'./src/apis',
				'./src/hooks',
				'./src/stores',
				'./src/composables/**',
				'./src/utils',
				// './composables' // only root modules
				// './composables/**', // all nested modules
				// ...
			],

			// Filepath to generate corresponding .d.ts file.
			// Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
			// Set `false` to disable.
			dts: './auto-imports.d.ts',

			// Auto import inside Vue template
			// see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
			vueTemplate: false,

			// Custom resolvers, compatible with `unplugin-vue-components`
			// see https://github.com/antfu/unplugin-auto-import/pull/23/
			resolvers: [
				ElementPlusResolver({ importStyle: 'sass' }), IconsResolver(),
			],

			// Inject the imports at the end of other imports
			injectAtEnd: true,

			// Generate corresponding .eslintrc-auto-import.json file.
			// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
			eslintrc: {
				enabled: false, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),
		Icons({ autoInstall: true }),

	],

	optimizeDeps: { exclude: ['pyodide'], esbuildOptions: { plugins: [importMetaUrlPlugin] } },
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
	css: { preprocessorOptions: { scss: { additionalData: '@use "@/styles/element/index.scss" as *;' } } },
})
