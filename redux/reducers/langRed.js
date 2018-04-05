
import { langData } from '../../app/components/languagesData'

const initState = {
	selectedLangIndex: 15,
	streaming: false,
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
 		case 'CONTROL_AUDIO':
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
 		default:
 			return state
 	}
}