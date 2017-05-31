import { combineReducers } from 'redux';
import ListFavorVideo from './ListFavorVideo';
import ReaderModalReducer from './ReaderModalReducer';

export default combineReducers({
  listFavorVideo: ListFavorVideo,
  readerModalReducer: ReaderModalReducer,
})
