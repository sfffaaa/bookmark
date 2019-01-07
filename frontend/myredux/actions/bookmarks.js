import { CREATE_BOOKMARK_ACTION_TYPE } from '../constants/action-types';
/* eslint-disable-next-line import/prefer-default-export */
export const createBookmark = url => ({
    type: 'API',
    payload: {
        bookURL: url,
        url: '/api/create',
    },
    actionType: CREATE_BOOKMARK_ACTION_TYPE,
});
