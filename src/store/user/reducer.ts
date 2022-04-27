import * as actionTypes from './constants'

const initState = {
  isPrompt: {
    isOpen: false,
    title: '',
    type: 0,
  },
  isLoading: {
    isOpen: false,
    title: '',
  },
  address: '',
  inviterAddress: '',
}

export default function reducer(state = initState, action: any) {
  const { type } = action
  switch (type) {
    case actionTypes.SET_PROMPT:
      return { ...state, isPrompt: action.isPrompt }
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.isLoading }
    case actionTypes.SAVE_ADDRESS:
      return { ...state, address: action.address }
    case actionTypes.SAVE_INVITER_ADDRESS:
      return { ...state, inviterAddress: action.inviterAddress }
    default:
      return state
  }
}
