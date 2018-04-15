
import { langData } from '../../app/components/languagesData'
import { AsyncStorage } from 'react-native'

const initState = {
	selectedLangIndex: 15,
	streaming: false,
	buffering: false,
	currentLang: langData[9],
}
export default function(state = initState, action) {
 	switch(action.type){
 		//case ''
 		case 'SET_LANG':
 			try {
  				AsyncStorage.setItem('@lang', action.langIndex.toString());
			} catch (error) {
  				// Error saving data
  				console.log(error)
			}
			AsyncStorage.getItem('@lang')
			.then(lang => {console.log(lang)})
 			return {
 				...state,
 				selectedLangIndex: action.langIndex
 			}
 			break
 		case 'CONTROL_RADIO':
 			if (state.streaming) {
 				return {
 					...state,
 					streaming: false
 				}
 			} else {
 				return {
 					...state,
 					streaming: true
 				}
 			}
 			break
 		case 'BUFFER': 
 			return {
 				...state,
 				buffering: true
 			}
 		case 'SET_RADIO': {
 			return {
 				...state,
 				currentLang: langData[state.selectedLangIndex]
 			}
 		}
 		case 'GET_LANG':
 			console.log(action.value)
 			if (action.value === null){
 				return state
 			} else {
				return {
					...state,
					selectedLangIndex: parseInt(action.value)
				}
			}
 		default:
 			return state
 	}
}