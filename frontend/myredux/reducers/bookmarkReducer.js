import { CREATE_BOOKMARK_ACTION_TYPE } from '../constants/action-types';

/* eslint-disable-next-line import/prefer-default-export */
export const bookmarkReducer = (bookmarks = [], action) => {
    switch (action.type) {
    case CREATE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case CREATE_BOOKMARK_ACTION_TYPE.ERROR:
        console.log(action);
        return bookmarks;
    case CREATE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return bookmarks.concat({ ...action.response.data.data });
    default:
        return bookmarks;
    }
};
