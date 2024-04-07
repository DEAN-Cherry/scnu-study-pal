export function handleOutput () {
	const wrapper = getWrapper()
	return wrapper.getModel(true)?.getValue() ?? 'Why null here'
}

