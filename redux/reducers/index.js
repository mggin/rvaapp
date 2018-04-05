import {combineReducers} from 'redux'
import langRed from './langRed'

const allReducers = combineReducers({
	langRedData: langRed,
})

export default allReducers;
