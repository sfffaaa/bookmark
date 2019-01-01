import { combineReducers } from 'redux';
import { bookmarkReducer } from './bookmarkReducer';

/* eslint-disable-next-line import/prefer-default-export */
export const myCombineReducers = combineReducers({
    bookmarks: bookmarkReducer,
});
