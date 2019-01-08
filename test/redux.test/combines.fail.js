/* global describe it expect */
import deepFreeze from 'deep-freeze';

import * as actions from '../../frontend/myredux/actions/bookmarks';
import { bookmarkReducer } from '../../frontend/myredux/reducers/bookmarkReducer';
import { MYURL } from './constant';

describe('Redux action + reductor test', () => {
    it('should create an action to add a bookmark in empty list', () => {
        expect(bookmarkReducer([], actions.createBookmark(MYURL))).toMatchSnapshot();
    });

    it('should create an action to add a bookmark in empty list', () => {
        const initState = deepFreeze([{ url: 'http://my.test' }]);
        expect(bookmarkReducer(initState, actions.createBookmark(MYURL))).toMatchSnapshot();
    });
});
