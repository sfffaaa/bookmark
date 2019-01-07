import axios from 'axios';
import { CREATE_BOOKMARK_ACTION_TYPE } from '../constants/action-types';

/* eslint-disable-next-line no-unused-vars, import/prefer-default-export */
export const apiMiddleware = ({ dispatch }) => next => (action) => {
    if (action.type !== 'API') {
        next(action);
        return;
    }

    const BASE_URL = 'http://localhost:3000';
    if (action.actionType.TYPE === CREATE_BOOKMARK_ACTION_TYPE.TYPE) {
        dispatch({ type: action.actionType.PENDING });
        axios.post(`${BASE_URL}/${action.payload.url}`, {
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
    }
};
