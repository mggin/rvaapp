

export const setLang = (langIndex) => {
	return {
		type: 'SET_LANG',
		langIndex
	}
}

export const controlRadio = (langIndex) => {
	return {
		type: 'CONTROL_RADIO',
	}
}

export const setRadio = () => {
	return {
		type: 'SET_RADIO',
	}
}

export const setAudio = (url) => {
	return {
		type: 'SET_AUDIO',
		url
	}
}

export const controlAudio = () => {
	return {
		type: 'CONTROL_AUDIO',
	}
}

export const setDuration = (time) => {
	return {
		type: 'SET_DURATION',
		time
	}
}

export const setCurrentTime = (currentTime) => {
	return {
		type: 'SET_CURRENT_TIME',
		currentTime
	}
}

export const setSeekTime = (sliderValue) => {
	return {
		type: 'SET_SEEK_TIME',
		sliderValue
	}
}

export const resetControl = () => {
	return {
		type: 'RESET_CONTROL',
	}
}

export const sliding = (value) => {
	return {
		type: 'SLIDING',
		value
	}
}


export const getLang = (value) => {
	return {
		type: 'GET_LANG',
		value
	}
}





