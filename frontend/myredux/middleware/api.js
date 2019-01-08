import axios from 'axios';
import {
    CREATE_BOOKMARK_ACTION_TYPE,
    LIST_BOOKMARK_ACTION_TYPE,
    DELETE_BOOKMARK_ACTION_TYPE,
} from '../constants/action-types';

/* eslint-disable-next-line no-unused-vars, import/prefer-default-export */
export const apiMiddleware = ({ dispatch }) => next => (action) => {
    if (action.type !== 'API') {
        next(action);
        return;
    }

    // [TODO] Add UUID for tracking
    switch (action.actionType.TYPE) {
    case CREATE_BOOKMARK_ACTION_TYPE.TYPE:
        dispatch({ type: action.actionType.PENDING });
        // [TODO] I need return id...
        axios.post(action.payload.url, {
            url: action.payload.bookURL,
        }).then((response) => {
            if (response.data.success === true) {
                dispatch({
                    type: action.actionType.SUCCESS,
                    bookURL: action.payload.bookURL,
                    response,
                });
            } else {
                console.log('Return not success!');
                dispatch({
                    type: action.actionType.ERROR,
                    bookURL: action.payload.bookURL,
                    response,
                });
            }
        }).catch((error) => {
            dispatch({
                type: action.actionType.ERROR,
                bookURL: action.payload.bookURL,
                error,
            });
        });
        break;
    case LIST_BOOKMARK_ACTION_TYPE.TYPE:
        dispatch({ type: action.actionType.PENDING });
        axios.post(action.payload.url).then((response) => {
            if (response.data.success === true) {
                dispatch({
                    type: action.actionType.SUCCESS,
                    response,
                });
            } else {
                console.log('Return not success!');
                dispatch({
                    type: action.actionType.ERROR,
                    response,
                });
            }
        }).catch((error) => {
            dispatch({
                type: action.actionType.ERROR,
                error,
            });
        });
        break;
    case DELETE_BOOKMARK_ACTION_TYPE.TYPE:
        dispatch({ type: action.actionType.PENDING });
        axios.post(action.payload.url, {
            id: action.payload.id,
        }).then((response) => {
            if (response.data.success === true) {
                dispatch({
                    type: action.actionType.SUCCESS,
                    response,
                });
            } else {
                console.log('Return not success!');
                dispatch({
                    type: action.actionType.ERROR,
                    response,
                });
            }
        }).catch((error) => {
            dispatch({
                type: action.actionType.ERROR,
                error,
            });
        });
        break;
    default:
        console.log(`Error should be handle ${action.actionType.TYPE}`);
        next(action);
    }
};
