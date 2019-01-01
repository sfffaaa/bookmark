/* eslint-disable-next-line no-unused-vars, import/prefer-default-export */
export const logMiddleware = ({ getState, dispatch }) => next => (action) => {
    console.log(`Action: ${action.type}`);
    next(action);
};
