import { CREATE_BOOKMARK } from '../constants/action-types';

/* eslint-disable-next-line import/prefer-default-export */
export const bookmarkReducer = (bookmarks = [], action) => {
    switch (action.type) {
    case CREATE_BOOKMARK:
        return bookmarks.concat({ url: action.url });
    default:
        return bookmarks;
    }
};
