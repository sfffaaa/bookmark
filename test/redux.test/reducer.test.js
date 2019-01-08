/* global describe it expect */
import deepFreeze from 'deep-freeze';

import { bookmarkReducer } from '../../frontend/myredux/reducers/bookmarkReducer';
import {
    CREATE_BOOKMARK_ACTION_TYPE,
    LIST_BOOKMARK_ACTION_TYPE,
    DELETE_BOOKMARK_ACTION_TYPE,
    UPGRADE_BOOKMARK_ACTION_TYPE,
} from '../../frontend/myredux/constants/action-types';

describe('bookmark reducer test', () => {
    it('test error occurs', () => {
        const bookmarkInitStates = [{
            data: [],
            needUpdate: false,
            errMsg: null,
        }, {
            data: ['dummy1'],
            needUpdate: true,
            errMsg: 'ewrer',
        }];

        const errorTypes = [
            CREATE_BOOKMARK_ACTION_TYPE.ERROR,
            LIST_BOOKMARK_ACTION_TYPE.ERROR,
            DELETE_BOOKMARK_ACTION_TYPE.ERROR,
            UPGRADE_BOOKMARK_ACTION_TYPE.ERROR,
        ];
        for (let j = 0; j < bookmarkInitStates.length; j += 1) {
            const bookmarkInitState = bookmarkInitStates[j];
            for (let i = 0; i < errorTypes.length; i += 1) {
                const errorType = errorTypes[i];
                expect(bookmarkReducer(
                    deepFreeze(bookmarkInitState), {
                        type: errorType,
                        response: {
                            errMsg: 'error',
                        },
                    },
                )).toMatchSnapshot();

                expect(bookmarkReducer(
                    deepFreeze(bookmarkInitState), {
                        type: errorType,
                        error: {
                            errMsg: 'error',
                        },
                    },
                )).toMatchSnapshot();

                expect(bookmarkReducer(
                    deepFreeze(bookmarkInitState), {
                        type: errorType,
                    },
                )).toMatchSnapshot();
            }
        }
    });

    it('test pending occurs', () => {
        const bookmarkInitStates = [{
            data: [],
            needUpdate: false,
            errMsg: null,
        }, {
            data: ['dummy1'],
            needUpdate: true,
            errMsg: 'ewrer',
        }];

        const pendingTypes = [
            CREATE_BOOKMARK_ACTION_TYPE.PENDING,
            LIST_BOOKMARK_ACTION_TYPE.PENDING,
            DELETE_BOOKMARK_ACTION_TYPE.PENDING,
            UPGRADE_BOOKMARK_ACTION_TYPE.PENDING,
        ];
        for (let j = 0; j < bookmarkInitStates.length; j += 1) {
            const bookmarkInitState = bookmarkInitStates[j];
            for (let i = 0; i < pendingTypes.length; i += 1) {
                const pendingType = pendingTypes[i];
                expect(bookmarkReducer(
                    deepFreeze(bookmarkInitState), {
                        type: pendingType,
                    },
                )).toMatchSnapshot();
            }
        }
    });

    it('test success occurs without list', () => {
        const bookmarkInitStates = [{
            data: ['dummy1'],
            needUpdate: false,
            errMsg: 'ewrer',
        }];
        const successTypes = [
            CREATE_BOOKMARK_ACTION_TYPE.SUCCESS,
            DELETE_BOOKMARK_ACTION_TYPE.SUCCESS,
            UPGRADE_BOOKMARK_ACTION_TYPE.SUCCESS,
        ];
        for (let j = 0; j < bookmarkInitStates.length; j += 1) {
            const bookmarkInitState = bookmarkInitStates[j];
            for (let i = 0; i < successTypes.length; i += 1) {
                const successType = successTypes[i];
                expect(bookmarkReducer(
                    deepFreeze(bookmarkInitState), {
                        type: successType,
                    },
                )).toMatchSnapshot();
            }
        }
    });

    it('test success occurs with list', () => {
        const bookmarkInitStates = [{
            data: ['dummy1'],
            needUpdate: true,
            errMsg: 'ewrer',
        }];
        for (let j = 0; j < bookmarkInitStates.length; j += 1) {
            const bookmarkInitState = bookmarkInitStates[j];
            expect(bookmarkReducer(
                deepFreeze(bookmarkInitState), {
                    type: LIST_BOOKMARK_ACTION_TYPE.SUCCESS,
                    response: { data: { data: ['1', '2', '3'] } },
                },
            )).toMatchSnapshot();
        }
    });

    it('test no action', () => {
        const bookmarkInitState = [{
            data: ['dummy1'],
            needUpdate: true,
            errMsg: 'ewrer',
        }];
        expect(bookmarkReducer(
            deepFreeze(bookmarkInitState), {
                type: '__WHAT_IS_THIS__',
                response: { data: { data: ['1', '2', '3'] } },
            },
        )).toMatchSnapshot();

        expect(bookmarkReducer(undefined, { type: '__WHAT_IS_THIS__' })).toMatchSnapshot();
    });
});
