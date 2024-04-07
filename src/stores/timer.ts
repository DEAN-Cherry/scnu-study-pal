

export const useTimerStore = defineStore('timer', () => {
	const timer = ref<number>(0)
	const timerOn = ref<boolean>(false)
	const timerInterval = ref<number>(0)
	const timerStart = ref<number>(0)
	const timerEnd = ref<number>(0)
	const timerDuration = ref<number>(0)
	const timerRemaining = ref<number>(0)
	const timerPercent = ref<number>(0)
	const duration = ref<string>('00:00:00')

	const timerColor = computed(() => {
		if (timerPercent.value > 50) {
			return '#8cc269'
		} else if (timerPercent.value > 25) {
			return '#fcb70a'
		} else {
			return '#c21f30'
		}
	})

	function formatMilliseconds(milliseconds: number): string {
		// 计算小时、分钟和秒
		const totalSeconds = Math.floor(milliseconds / 1000)
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		// 将小时、分钟和秒格式化为两位数的字符串
		const formattedHours = hours.toString().padStart(2, '0')
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = seconds.toString().padStart(2, '0')

		// 组合成 HH:mm:ss 格式的字符串
		return `${ formattedHours }:${ formattedMinutes }:${ formattedSeconds }`
	}


	function startTimer(d: number) {
		timerDuration.value = d
		if (!timerStart.value) {
			timerStart.value = Date.now()
		}
		timerEnd.value = timerStart.value + timerDuration.value
		timerOn.value = true
		timerInterval.value = setInterval(() => {
			timer.value = Date.now()
			timerRemaining.value = timerEnd.value - timer.value
			timerPercent.value = (timerRemaining.value / timerDuration.value) * 100
			duration.value = formatMilliseconds(Date.now() - timerStart.value)
			// if (timerRemaining.value <= 0) {
			// 	clearInterval(timerInterval.value)
			// 	timerOn.value = false
			// }
		}, 1000)

	}

	function stopTimer() {
		clearInterval(timerInterval.value)
		timerOn.value = false
	}

	function resetTimer() {
		clearInterval(timerInterval.value)
		timerOn.value = false
		timer.value = 0
		timerStart.value = 0
		timerEnd.value = 0
		timerDuration.value = 0
		timerRemaining.value = 0
		timerPercent.value = 0
		duration.value = '00:00:00'
	}

	return {
		timer, timerOn, timerInterval, timerStart, timerEnd, timerDuration, timerRemaining, timerPercent, timerColor,
		duration,
		startTimer, stopTimer, resetTimer,
	}
}, {
	persist: {
 paths: ['timerStart',
'timerInterval',
'duration'],
	},
})
