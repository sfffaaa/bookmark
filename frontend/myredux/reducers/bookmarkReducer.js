import {
    CREATE_BOOKMARK_ACTION_TYPE,
    LIST_BOOKMARK_ACTION_TYPE,
    DELETE_BOOKMARK_ACTION_TYPE,
} from '../constants/action-types';

// [TODO] Think about mask
const bookmarkInitState = {
    data: [],
    needUpdate: false,
};

/* eslint-disable-next-line import/prefer-default-export */
export const bookmarkReducer = (bookmarks = bookmarkInitState, action) => {
    switch (action.type) {
    case CREATE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case CREATE_BOOKMARK_ACTION_TYPE.ERROR:
        console.log(action);
        return bookmarks;
    case CREATE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        // [TODO] Add need update exist.
        return Object.assign({}, bookmarks, {
            needUpdate: true,
        });
    case LIST_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case LIST_BOOKMARK_ACTION_TYPE.ERROR:
        console.log(action);
        return bookmarks;
    case LIST_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return Object.assign({}, bookmarks, {
            data: action.response.data.data,
            needUpdate: false,
        });
    case DELETE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case DELETE_BOOKMARK_ACTION_TYPE.ERROR:
        console.log(action);
        return bookmarks;
    case DELETE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return Object.assign({}, bookmarks, {
            needUpdate: true,
        });
    default:
        return bookmarks;
    }
};
