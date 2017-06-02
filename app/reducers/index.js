import { combineReducers } from 'redux';
import LoadListDataReducer from './LoadListDataReducer';
import ReaderModalReducer from './ReaderModalReducer';

export default combineReducers({
  loadListDataReducer: LoadListDataReducer,
  readerModalReducer: ReaderModalReducer,
})
