import * as types from '../actions/types';
const INITIAL_STATE = {list:[], modalState: true, selectedId: ''};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_FAVOR_VIDEO:
      let oldList = state.list
      return {
        ...state,
        list: [...oldList, action.payload]
      }
      break;
    case types.REPLACE_FAVOR_VIDEO:
      return {
        ...state,
        list: action.payload
      }
      break;
    case types.CHANGE_MODAL_STATE:
      return {
        ...state,
        modalState: action.payload
      }
      break;
    case types.SELECT_ROW:
      return {
        ...state,
        selectedId: action.payload
      }
      break;
    default:
      return state
  }
}
