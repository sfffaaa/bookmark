/* global describe it */
import { expect } from 'chai';
import { CREATE_BOOKMARK } from '../../frontend/myredux/constants/action-types';
import * as actions from '../../frontend/myredux/actions/bookmarks';

describe('Redux action test', () => {
    it('should create an action to add a bookmark', () => {
        const MYURL = 'http://NOUSEURL';
        const expected = { type: CREATE_BOOKMARK, url: MYURL };
        const actual = actions.createBookmark(MYURL);
        expect(actual).to.be.eql(expected);
    });
});
