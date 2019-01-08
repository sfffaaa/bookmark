import {
    CREATE_BOOKMARK_ACTION_TYPE,
    LIST_BOOKMARK_ACTION_TYPE,
    DELETE_BOOKMARK_ACTION_TYPE,
    UPGRADE_BOOKMARK_ACTION_TYPE,
} from '../constants/action-types';

// [TODO] Think about mask
const bookmarkInitState = {
    data: [],
    needUpdate: false,
    errMsg: null,
};

/* eslint-disable-next-line import/prefer-default-export */
export const bookmarkReducer = (bookmarks = bookmarkInitState, action) => {
    switch (action.type) {
    case CREATE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case CREATE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        // [TODO] Add need update exist.
        return Object.assign({}, bookmarks, {
            needUpdate: true,
            errMsg: null,
        });

    case LIST_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case LIST_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return Object.assign({}, bookmarks, {
            data: action.response.data.data,
            needUpdate: false,
            errMsg: null,
        });

    case DELETE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case DELETE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return Object.assign({}, bookmarks, {
            needUpdate: true,
            errMsg: null,
        });

    case UPGRADE_BOOKMARK_ACTION_TYPE.PENDING:
        console.log(action);
        return bookmarks;
    case UPGRADE_BOOKMARK_ACTION_TYPE.SUCCESS:
        console.log(action);
        return Object.assign({}, bookmarks, {
            needUpdate: true,
            errMsg: null,
        });

    case CREATE_BOOKMARK_ACTION_TYPE.ERROR:
    case LIST_BOOKMARK_ACTION_TYPE.ERROR:
    case DELETE_BOOKMARK_ACTION_TYPE.ERROR:
    case UPGRADE_BOOKMARK_ACTION_TYPE.ERROR:
        console.log(action);
        return Object.assign({}, bookmarks, {
            needUpdate: false,
            errMsg: (action.response && action.response.errMsg)
                    || (action.error && action.error.errMsg)
                    || 'Unknown error',
        });


    default:
        return bookmarks;
    }
};
