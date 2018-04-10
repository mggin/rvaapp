import {combineReducers} from 'redux'
import langRed from './langRed'
import dailyRed from './dailyRed'

const allReducers = combineReducers({
	langRedData: langRed,
	dailyRedData: dailyRed
})

export default allReducers;
