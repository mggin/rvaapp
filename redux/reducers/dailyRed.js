

const initState = {
	audio_url: 'http://apps.rveritas-asia.org/mp3files/Myanmar/2018%20SW%20Programs/January//MYANMAR%20PROGRAM%2031%20January%2018%20PM.mp3',
	playing: false,
	buffering: false,
	playableDuration: 100000,
	currentTime: 0,
	hours: '00',
	minutes: '00',
	seconds: '00',
}
export default function(state = initState, action) {
 	switch(action.type){
 		//case ''
 		case 'CONTROL_AUDIO':
 			if (state.playing) {
 				return {
 					...state,
 					playing: false
 				}
 			} else {
 				return {
 					...state,
 					playing: true
 				}
 			}
 			break
 		case 'AUDIO_BUFFER': 
 			return {
 				...state,
 				buffering: true
 			}
 			break
 		case 'SET_AUDIO': 
 			return {
 				...state,
 				audio_url: action.url
 			}
 			break
 		case 'STOP_RADIO': {

 		}
 		case 'SET_DURATION': 
 			return {
 				...state,
 				playableDuration: action.time
 			}
 			break

 		case 'SET_CURRENT_TIME': {
 			let currentTime = action.currentTime * 1000
	        let hours = Math.floor(currentTime / (1000 * 60 * 60) % 60);
	        let minutes = Math.floor(currentTime / (1000 * 60) % 60);
	        let seconds = Math.floor(currentTime / 1000 % 60);
	        hours = hours < 10 ? '0' + hours : hours;
	        minutes = minutes < 10 ? '0' + minutes : minutes;
	        seconds = seconds < 10 ? '0' + seconds : seconds;
	        console.log('second' + seconds)
	        return {
	        	...state,
	        	currentTime: action.currentTime,
	        	hours,
	        	minutes,
	        	seconds
	        }
 			break
 		}
 		case 'SET_SEEK_TIME': {
 			let currentTime = action.sliderValue * 1000
	        let hours = Math.floor(currentTime / (1000 * 60 * 60) % 60);
	        let minutes = Math.floor(currentTime / (1000 * 60) % 60);
	        let seconds = Math.floor(currentTime / 1000 % 60);
	        hours = hours < 10 ? '0' + hours : hours;
	        minutes = minutes < 10 ? '0' + minutes : minutes;
	        seconds = seconds < 10 ? '0' + seconds : seconds;
	        return {
	        	...state,
	        	currentTime: action.sliderValue,
	        	hours,
	        	minutes,
	        	seconds
	        }
 			break
 		}
 		default:
 			return state
 	}
}