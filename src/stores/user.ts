export const useUserStore = defineStore('user', () => {
	const user = ref<User.User | null>(null)

	function setUser(id: number, name: string, school: string, gender: number) {
		user.value = {
			id: id,
			name: name,
			school: school,
			gender: gender,
			avatar: null,
		} as User.User
	}

	return { user, setUser }

}, { persist:{ paths:['user'] } })
