import { combineReducers } from 'redux'
import { reducer as userReducer } from './user'
import { reducer as themeReducer } from './theme'

const reducer = combineReducers({
  userInfo: userReducer,
  themeInfo: themeReducer,
})

export default reducer
