import * as types from '../actions/types';
const INITIAL_STATE = {modalState: false, fontSize: 14};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_MODAL_STATE:
      return {
        ...state,
        modalState: action.payload
      }
      break;
    case types.CHANGE_FONTSIZE:
      return {
        ...state,
        fontSize: action.payload
      }
      break;
    case types.FONTSIZE_DEC:
      return {
        ...state,
        padding: action.payload
      }
      break;
    default:
      return state
  }
}
