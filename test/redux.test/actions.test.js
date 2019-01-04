/* global describe it expect */
import * as actions from '../../frontend/myredux/actions/bookmarks';
import { MYURL } from './constant';

describe('Redux action test', () => {
    it('should create an action to add a bookmark', () => {
        expect(actions.createBookmark(MYURL)).toMatchSnapshot();
    });
});
