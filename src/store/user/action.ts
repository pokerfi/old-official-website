import * as actionTypes from './constants'

export const SetPrompt = (res: Object) => ({
  type: actionTypes.SET_PROMPT,
  isPrompt: res,
})

export const SetLoading = (res: Object) => ({
  type: actionTypes.SET_LOADING,
  isLoading: res,
})

export const SaveAddress = (res: string) => ({
  type: actionTypes.SAVE_ADDRESS,
  address: res,
})

export const SaveInviterAddress = (res: string) => ({
  type: actionTypes.SAVE_INVITER_ADDRESS,
  inviterAddress: res,
})
