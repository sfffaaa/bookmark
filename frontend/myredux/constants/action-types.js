const asyncActionType = type => ({
    TYPE: `${type}_TYPE`,
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
});


/* eslint-disable-next-line import/prefer-default-export */
export const CREATE_BOOKMARK_ACTION_TYPE = asyncActionType('CREATE_BOOKMARK');
