import {
  LOAD_LIST_DATA,
  REPLACE_FAVOR_VIDEO,
  CHANGE_MODAL_STATE,
  SELECTED_POST0,
  SELECTED_POST1,
  SELECTED_POST2,
  FONTSIZE_DEC,
  CHANGE_FONTSIZE
} from './types';


export const loadListData = (data) => {
  return {
    type: LOAD_LIST_DATA,
    payload: data
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
export const selectedPost0 = (item) => {
  return {
    type: SELECTED_POST0 ,
    payload: item
  }
}
export const selectedPost1 = (item) => {
  return {
    type: SELECTED_POST1 ,
    payload: item
  }
}
export const selectedPost2 = (item) => {
  return {
    type: SELECTED_POST2 ,
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
