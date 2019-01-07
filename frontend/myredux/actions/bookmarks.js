import { CREATE_BOOKMARK_ACTION_TYPE, LIST_BOOKMARK_ACTION_TYPE }
    from '../constants/action-types';

const BASE_URL = 'http://localhost:3000';

export const createBookmark = url => ({
    type: 'API',
    payload: {
        bookURL: url,
        url: `${BASE_URL}/api/create`,
    },
    actionType: CREATE_BOOKMARK_ACTION_TYPE,
});

export const listBookmark = () => ({
    type: 'API',
    payload: {
        url: `${BASE_URL}/api/list`,
    },
    actionType: LIST_BOOKMARK_ACTION_TYPE,
});
