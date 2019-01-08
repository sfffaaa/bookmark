/* global describe it expect */
import deepFreeze from 'deep-freeze';

import { MYURL } from './constant';
import { bookmarkReducer } from '../../frontend/myredux/reducers/bookmarkReducer';
import { CREATE_BOOKMARK_ACTION_TYPE } from '../../frontend/myredux/constants/action-types';

describe('bookmark reducer test', () => {
    it('should add bookmark to empty list', () => {
        const action = { type: CREATE_BOOKMARK_ACTION_TYPE, url: MYURL };
        expect(bookmarkReducer(deepFreeze([]), action)).toMatchSnapshot();
    });

    it('should add bookmark to non-empty list', () => {
        const EXIST_ELEMENT = { url: 'http://show.me.the.money' };
        const action = { type: CREATE_BOOKMARK_ACTION_TYPE, url: MYURL };
        expect(bookmarkReducer(deepFreeze([EXIST_ELEMENT]), action)).toMatchSnapshot();
    });

    it('should no add bookmark to empty list', () => {
        const action = { type: '__IMNOTACTION__', url: MYURL };

        expect(bookmarkReducer(deepFreeze([]), action)).toMatchSnapshot();
    });
});
