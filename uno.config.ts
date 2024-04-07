// uno.config.ts
import { defineConfig } from 'unocss'
import {
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'
export default defineConfig({
	// ...UnoCSS options
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
	],
	transformers: [
		transformerDirectives(), transformerVariantGroup(),
	],

})
