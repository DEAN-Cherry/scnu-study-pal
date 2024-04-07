export const useCodeStore = defineStore('code', () => {
	const input = ref<string>('print("Hello, World!")')
	return { input }
}, { persist: { paths: ['input'] } })
