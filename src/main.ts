import 'element-plus/theme-chalk/src/message.scss'
import '@/styles/index.scss'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueMonacoEditorPlugin, {
	paths: {
		// The recommended CDN config
		vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
	},
})
app.mount('#app')
