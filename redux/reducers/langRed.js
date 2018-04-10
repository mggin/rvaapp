
import { langData } from '../../app/components/languagesData'

const initState = {
	selectedLangIndex: 9,
	streaming: false,
	buffering: false,
	currentLang: langData[9],
}
export default function(state = initState, action) {
 	switch(action.type){
 		//case ''
 		case 'SET_LANG':
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
 		case 'STOP_RADIO': {

 		}
 		default:
 			return state
 	}
}