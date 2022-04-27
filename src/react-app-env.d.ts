/// <reference types="react-scripts" />

declare module 'classnames'

declare module 'redux-immutable' {
  const combineReducers: any
  export { combineReducers }
}
declare module 'react-offcanvas' {
  export const OffCanvas: any
  export const OffCanvasMenu: any
  export const OffCanvasBody: any
}
declare module 'video-react' {
  export const Player: any
}
