import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
	const isCollapsed = ref(true)

	function toggleCollapsed() {
		isCollapsed.value = !isCollapsed.value
	}

	return { isCollapsed, toggleCollapsed }
}, { persist: { paths: ['isCollapsed'] } })
