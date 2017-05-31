import {
  ADD_FAVOR_VIDEO,
  REPLACE_FAVOR_VIDEO,
  CHANGE_MODAL_STATE,
  SELECT_ROW,
  FONTSIZE_DEC,
  CHANGE_FONTSIZE
} from './types';


export const addFavorVideo = (item) => {
  return {
    type: ADD_FAVOR_VIDEO ,
    payload: item
  }
}
export const replaceFavorVideo = (item) => {
  return {
    type: REPLACE_FAVOR_VIDEO ,
    payload: item
  }
}
export const changeModalState = (item) => {
  return {
    type: CHANGE_MODAL_STATE ,
    payload: item
  }
}
export const selectRow = (item) => {
  return {
    type: SELECT_ROW ,
    payload: item
  }
}
export const changeFontSize = (item) => {
  return {
    type: CHANGE_FONTSIZE ,
    payload: item
  }
}
export const fontSizeDec = (item) => {
  return {
    type: FONTSIZE_DEC ,
    payload: size
  }
}
// export const goToPlay = (number) => {
//   return (dispatch) => {
//     Actions.PlayScene({ numberOfPlayer: number })
//   }
// }
