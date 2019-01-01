import { createStore, applyMiddleware } from 'redux';
import { myCombineReducers } from '../reducers/index';
import { logMiddleware } from '../middleware/log';

const initialState = {
    bookmarks: [],
};

/* eslint-disable-next-line import/prefer-default-export */
export const store = createStore(
    myCombineReducers,
    initialState,
    applyMiddleware(logMiddleware),
);
