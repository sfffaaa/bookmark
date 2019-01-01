import { CREATE_BOOKMARK } from '../constants/action-types';
/* eslint-disable-next-line import/prefer-default-export */
export const createBookmark = url => ({
    type: CREATE_BOOKMARK,
    url,
});
