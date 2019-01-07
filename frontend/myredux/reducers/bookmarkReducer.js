import { CREATE_BOOKMARK_ACTION_TYPE, LIST_BOOKMARK_ACTION_TYPE }
    from '../constants/action-types';

/* eslint-disable-next-line import/prefer-default-export */
export const bookmarkReducer = (bookmarks = {data: [], needUpdate: false}, action) => {
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
            data: bookmarks.data.concat({...action.response.data.data }),
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
    default:
        return bookmarks;
    }
};
